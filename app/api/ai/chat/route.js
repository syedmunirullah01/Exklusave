import { NextResponse } from "next/server";
import { getAllStores } from "@/server/repositories/stores-repository";
import { getAllOffers } from "@/server/repositories/offers-repository";

function cleanJsonString(str) {
  let cleaned = str.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```json/, "").replace(/^```/, "").replace(/```$/, "").trim();
  }
  return cleaned;
}

// Reusable local smart keyword matching fallback parser
function getLocalFallbackResponse(userMessage, offers, stores) {
  const queryLower = userMessage.toLowerCase().trim();
  
  // 1. Basic greetings
  const greetings = ["hi", "hello", "hey", "salam", "aslam", "yo", "good morning", "good afternoon", "who are you", "what is this"];
  const isGreeting = greetings.some(g => queryLower === g || queryLower.startsWith(g + " ") || queryLower.endsWith(" " + g));
  
  if (isGreeting) {
    return {
      success: true,
      text: "Hello! I am Persuekey AI assistant. How can I help you find the best coupons or deals today?",
      suggestedStores: []
    };
  }

  // Helper to map store objects cleanly
  const mapStore = (s) => ({
    name: s.name,
    slug: s.slug,
    categorySlug: s.categorySlug || "general",
    logoImage: s.logoImage || ""
  });

  // 2. Explicit handlers for top 10 question suggestions
  if (queryLower.includes("how do i use a coupon")) {
    return {
      success: true,
      text: "To use a coupon code: 1. Click 'Go to Store' on any brand below. 2. Click 'Copy Code' on your desired deal. 3. Paste the code during checkout on the merchant website to claim your discount!",
      suggestedStores: stores.slice(0, 3).map(mapStore)
    };
  }

  if (queryLower.includes("submit my own coupon") || queryLower.includes("submit a coupon")) {
    return {
      success: true,
      text: "You can submit new coupons anytime! Click the emerald 'Submit a Coupon' button located in the top navigation bar, or fill out our Contact page form to share details.",
      suggestedStores: []
    };
  }

  if (queryLower.includes("contact customer support") || queryLower.includes("contact support")) {
    return {
      success: true,
      text: "Our customer support team is here to help! Click the 'Contact' link in the top menu or bottom footer to send us a message directly.",
      suggestedStores: []
    };
  }

  if (queryLower.includes("featured stores")) {
    return {
      success: true,
      text: "Here are today's top featured brand stores with active verified discounts on Persuekey:",
      suggestedStores: stores.slice(0, 4).map(mapStore)
    };
  }

  if (queryLower.includes("latest active discounts") || queryLower.includes("latest discounts")) {
    return {
      success: true,
      text: "Here are the latest verified brand stores added to Persuekey with active promo deals:",
      suggestedStores: stores.slice(0, 4).map(mapStore)
    };
  }

  // 3. Category & Filter Matching logic
  let matchedStores = [];
  const seenStoreSlugs = new Set();

  // Handle Free Shipping query specifically
  if (queryLower.includes("free shipping")) {
    const freeShippingOffers = offers.filter(o => o.status !== "Expired" && (o.title?.toLowerCase().includes("free shipping") || o.description?.toLowerCase().includes("free shipping")));
    for (const o of freeShippingOffers) {
      if (!seenStoreSlugs.has(o.storeSlug)) {
        seenStoreSlugs.add(o.storeSlug);
        const store = stores.find(s => s.slug === o.storeSlug);
        if (store) matchedStores.push(mapStore(store));
      }
    }
  }

  // Handle 50% off sales specifically
  if (queryLower.includes("50%")) {
    const fiftyPercentOffers = offers.filter(o => o.status !== "Expired" && (o.title?.includes("50%") || o.description?.includes("50%")));
    for (const o of fiftyPercentOffers) {
      if (!seenStoreSlugs.has(o.storeSlug)) {
        seenStoreSlugs.add(o.storeSlug);
        const store = stores.find(s => s.slug === o.storeSlug);
        if (store) matchedStores.push(mapStore(store));
      }
    }
  }

  // General Store and Category matching
  for (const store of stores) {
    const storeNameLower = store.name?.toLowerCase() || "";
    const storeSlugLower = store.slug?.toLowerCase() || "";
    const categoryLower = store.category?.toLowerCase() || "";
    const categorySlugLower = store.categorySlug?.toLowerCase() || "";

    const hasStoreKeyword = (storeSlugLower && queryLower.includes(storeSlugLower)) || 
                           (storeNameLower && queryLower.includes(storeNameLower));
    
    const hasCategoryKeyword = (categorySlugLower && queryLower.includes(categorySlugLower)) || 
                              (categoryLower && queryLower.includes(categoryLower)) ||
                              (queryLower.includes("fashion") && (categorySlugLower === "fashion" || categoryLower.includes("fashion") || storeNameLower.includes("gaia") || storeNameLower.includes("adidas"))) ||
                              (queryLower.includes("electronics") && (categorySlugLower.includes("electronics") || categoryLower.includes("electronics") || categorySlugLower.includes("appliance"))) ||
                              (queryLower.includes("grocery") && (categorySlugLower.includes("grocery") || categoryLower.includes("grocery") || categoryLower.includes("food")));

    if ((hasStoreKeyword || hasCategoryKeyword) && !seenStoreSlugs.has(store.slug)) {
      seenStoreSlugs.add(store.slug);
      matchedStores.push(mapStore(store));
    }
  }

  // Fallback if matchedStores is empty
  if (matchedStores.length === 0) {
    matchedStores = stores.slice(0, 3).map(mapStore);
  }

  const slicedStores = matchedStores.slice(0, 4);

  let responseText = "";
  if (slicedStores.length > 0) {
    responseText = `I found these verified stores matching your request on Persuekey! Click any card to view available coupons:`;
  } else {
    responseText = `I couldn't find any specific stores for "${userMessage}", but feel free to browse our categories or search for another brand!`;
  }

  return {
    success: true,
    text: responseText,
    suggestedStores: slicedStores
  };
}

export async function POST(request) {
  let userMessage = "";
  let offers = [];
  let stores = [];

  try {
    const { messages } = await request.json();
    userMessage = messages[messages.length - 1]?.content || "";

    const [fetchedStores, fetchedOffers] = await Promise.all([
      getAllStores(),
      getAllOffers()
    ]);
    stores = fetchedStores;
    offers = fetchedOffers;

    const apiKey = process.env.GEMINI_API_KEY;

    // Check if key is absent or a placeholder string
    if (!apiKey || apiKey === "your-key-here" || apiKey.startsWith("YOUR_")) {
      console.warn("GEMINI_API_KEY is not defined or is a placeholder. Using local smart fallback.");
      return NextResponse.json(getLocalFallbackResponse(userMessage, offers, stores));
    }

    // Format minimalist store list for context
    const storesContext = stores.map((s) => ({
      name: s.name,
      slug: s.slug,
      categorySlug: s.categorySlug || "general",
      category: s.category || "General",
      logoImage: s.logoImage || ""
    }));

    // Format minimalist active offers list for context
    const activeOffers = offers
      .filter((o) => o.status !== "Expired")
      .map((o) => {
        const store = stores.find((s) => s.slug === o.storeSlug);
        return {
          title: o.title,
          storeSlug: o.storeSlug,
          categorySlug: store?.categorySlug || "general",
          code: o.code || "DEAL-ACTIVATED",
          type: o.type
        };
      })
      .slice(0, 45);

    const systemPrompt = `You are Persuekey AI, a helpful, intelligent shopping assistant for the Persuekey coupon website.
You help users find verified discount stores and coupon deals.

Here is the directory of active Stores on Persuekey:
${JSON.stringify(storesContext, null, 2)}

Here is the list of top active Offers on Persuekey:
${JSON.stringify(activeOffers, null, 2)}

Instructions for queries:
1. "How do I use a coupon code?": Explain that they can click 'Go to Store' on any brand, click 'Copy Code' on the deal, and paste it at checkout. Recommend 2-3 top stores in suggestedStores.
2. "How do I submit my own coupon?": Tell them to click 'Submit a Coupon' in the top navigation bar or fill out the Contact page form. Return suggestedStores as [].
3. "How do I contact customer support?": Tell them to use the 'Contact' link in the header/footer. Return suggestedStores as [].
4. "Which stores offer free shipping?": List matching stores with free shipping.
5. "Show me top fashion brands" / "What electronics deals are active?" / "Which stores have grocery deals?": Match stores from those categories.
6. "Are there any 50% off sales?": Match stores with 50% discount offers.
7. "Show me today's featured stores" / "What are the latest active discounts?": Recommend top active stores from the list.

Response Format:
You MUST respond ONLY in raw JSON matching this structure:
{
  "text": "Your helpful conversational answer goes here.",
  "suggestedStores": [
    {
      "name": "Store Name",
      "slug": "store-slug",
      "categorySlug": "category-slug",
      "logoImage": "logo-image-url"
    }
  ]
}
Do not output any markdown formatting or backticks outside of the JSON. Return raw JSON only.`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser: ${userMessage}` }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const apiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      console.error(`Gemini API returned status ${apiRes.status}: ${errorText}. Falling back to local smart parser.`);
      return NextResponse.json(getLocalFallbackResponse(userMessage, offers, stores));
    }

    const data = await apiRes.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const cleaned = cleanJsonString(candidateText);
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({
      success: true,
      text: parsed.text || "Here are some top stores for you.",
      suggestedStores: parsed.suggestedStores || []
    });

  } catch (error) {
    console.error("AI Chatbot Error. Attempting final local fallback:", error);
    try {
      return NextResponse.json(getLocalFallbackResponse(userMessage, offers, stores));
    } catch (fallbackErr) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to process chat response."
        },
        { status: 500 }
      );
    }
  }
}
