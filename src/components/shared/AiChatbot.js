"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

function SparklesIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function SendIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function MinimizeIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m4 12 8 8 8-8" />
    </svg>
  );
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I am Persuekey AI. 🌟 Ask me about any brands or stores you are shopping for today!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  async function submitQuery(queryText) {
    if (!queryText.trim() || loading) return;

    const userText = queryText.trim();
    setInput("");
    const userMsgId = `user_${Date.now()}`;
    
    // Add user message
    setMessages((prev) => [...prev, { id: userMsgId, role: "user", content: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userText }]
        })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Unable to retrieve response.");

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          role: "assistant",
          content: data.text,
          suggestedStores: data.suggestedStores || []
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: "assistant",
          content: "Sorry, I am having trouble connecting to Gemini API right now. Please try again in a moment."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    submitQuery(input);
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] font-sans antialiased">
      {/* Floating Chat Icon Toggle */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-emerald-500/20"
          title="Ask Persuekey AI"
        >
          <SparklesIcon className="h-6 w-6 animate-pulse" />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[calc(100vw-32px)] sm:w-[440px] h-[80vh] sm:h-[580px] max-h-[580px] rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform scale-100">
          
          {/* Header Title Bar */}
          <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white px-5 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black tracking-tight">Persuekey AI Assistant</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] text-emerald-300/90 font-bold tracking-wide">Online</span>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition cursor-pointer"
              aria-label="Minimize Chat"
            >
              <MinimizeIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Scroller Pane */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50 dark:bg-zinc-950/40">
            {messages.map((msg) => {
              const isAi = msg.role === "assistant";
              return (
                <div key={msg.id} className={`flex flex-col ${isAi ? "items-start" : "items-end"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      isAi
                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-800/80 rounded-tl-none"
                        : "bg-emerald-600 text-white rounded-tr-none shadow-xs"
                    }`}
                  >
                    <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
                  </div>

                  {/* Suggestion Quick Replies (only for the initial welcome message) */}
                  {msg.id === "welcome" && (
                    <div className="mt-3 flex flex-wrap gap-2 max-w-[90%]">
                      {[
                        { label: "❓ How do I use a coupon code?", text: "How do I use a coupon code?" },
                        { label: "🚚 Which stores offer free shipping?", text: "Which stores offer free shipping?" },
                        { label: "👗 Show me top fashion brands", text: "Show me top fashion brands" },
                        { label: "🔌 What electronics deals are active?", text: "What electronics deals are active?" },
                        { label: "💰 Are there any 50% off sales?", text: "Are there any 50% off sales?" },
                        { label: "✍️ How do I submit my own coupon?", text: "How do I submit my own coupon?" },
                        { label: "⭐ Show me today's featured stores", text: "Show me today's featured stores" },
                        { label: "📨 How do I contact customer support?", text: "How do I contact customer support?" },
                        { label: "🍎 Which stores have grocery deals?", text: "Which stores have grocery deals?" },
                        { label: "🔥 What are the latest active discounts?", text: "What are the latest active discounts?" }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => submitQuery(item.text)}
                          className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 hover:border-emerald-500 hover:text-emerald-500 text-[10.5px] font-extrabold text-zinc-650 dark:text-zinc-300 transition cursor-pointer active:scale-95 shadow-3xs"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Suggested Stores Redirection Cards */}
                  {isAi && msg.suggestedStores && msg.suggestedStores.length > 0 && (
                    <div className="mt-2.5 space-y-2.5 w-full max-w-[85%]">
                      {msg.suggestedStores.map((store, idx) => (
                        <div
                          key={idx}
                          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-3.5 rounded-2xl shadow-xs flex items-center justify-between gap-3 transition-all hover:border-emerald-500/35"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Circular Logo Shell */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700 overflow-hidden shadow-3xs">
                              {store.logoImage ? (
                                <img src={store.logoImage} alt={store.name} className="h-7 w-7 object-contain rounded-md" />
                              ) : (
                                <span className="text-xs font-black text-zinc-700 dark:text-zinc-300">
                                  {store.name?.charAt(0) || "S"}
                                </span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h5 className="text-[11.5px] font-black text-zinc-900 dark:text-white leading-tight truncate">
                                {store.name}
                              </h5>
                              <p className="text-[9.5px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mt-0.5">
                                Verified Store
                              </p>
                            </div>
                          </div>
                          
                          {/* Redirect Link button */}
                          <a
                            href={`/stores/${store.categorySlug || "general"}/${store.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="flex h-8 px-3 shrink-0 items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-700 text-[10px] font-extrabold text-white transition active:scale-95 cursor-pointer shadow-xs"
                          >
                            Go to Store →
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* AI Typing Loader Indicator */}
            {loading && (
              <div className="flex flex-col items-start">
                <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl rounded-tl-none p-3 border border-zinc-200/50 dark:border-zinc-805">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form Text Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-150 dark:border-zinc-850 bg-white dark:bg-zinc-950 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Ask for discount codes or stores..."
              className="flex-1 h-10 px-3.5 bg-zinc-50 dark:bg-zinc-900 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-emerald-600 dark:focus:border-emerald-600 transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition active:scale-95 cursor-pointer shadow-sm"
              aria-label="Send query"
            >
              <SendIcon className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
