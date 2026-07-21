import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AiChatbot from "@/components/shared/AiChatbot";

export default function PublicLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
      {/* Floating AI Chatbot Assistant */}
      <AiChatbot />
    </div>
  );
}
