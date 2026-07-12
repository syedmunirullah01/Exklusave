import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";

const BLOG_POSTS = [
  {
    title: "World Cup 2026 Tickets: Compare StubHub & viagogo Deals and Save More",
    date: "Jun 20, 2026",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    readTime: "5 min read",
    href: "#",
  },
  {
    title: "A Non-Medicated Way to Conquer Migraines (That Really Works!)",
    date: "Jun 18, 2026",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
    readTime: "5 min read",
    href: "#",
  },
  {
    title: "FIFA World Cup 2026 Tickets: The Ultimate Fan Guide to Experiencing Live Games",
    date: "Jun 18, 2026",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=600&q=80",
    readTime: "5 min read",
    href: "#",
  },
  {
    title: "Argentina National Football Team Tickets: Why Every Football Fan Should Attend",
    date: "Jun 18, 2026",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80",
    readTime: "5 min read",
    href: "#",
  },
];

function CalendarIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function LatestBlogsSection() {
  return (
    <section className="relative">
      <SectionHeader title="Latest Blogs" href="/blogs" />

      {/* Blog grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {BLOG_POSTS.map((post, idx) => (
          <article 
            key={`${post.title}-${idx}`} 
            className="group flex flex-col bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            {/* Top Featured Image container */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-100">
              {/* Blog pill badge */}
              <span className="absolute top-3.5 left-3.5 bg-purple-950/80 backdrop-blur text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full z-10 leading-none">
                Blog
              </span>
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Content Details */}
            <div className="flex flex-col flex-1 p-5">
              
              {/* Meta row: Date and Author */}
              <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon />
                  <span>{post.date}</span>
                </div>
                <span className="text-zinc-250 select-none">•</span>
                <div className="flex items-center gap-1.5">
                  <UserIcon />
                  <span>{post.author}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-[13px] font-black text-zinc-900 mt-3.5 leading-relaxed line-clamp-2 h-10 group-hover:text-emerald-600 transition-colors">
                <Link href={post.href}>
                  {post.title}
                </Link>
              </h3>

              {/* Card Footer: Read More and Clock Time */}
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4 mt-5">
                <Link 
                  href={post.href}
                  className="text-[11px] font-black text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
                >
                  Read More <span>→</span>
                </Link>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-400">
                  <ClockIcon />
                  <span>{post.readTime}</span>
                </div>
              </div>

            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
