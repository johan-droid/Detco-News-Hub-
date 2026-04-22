import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Characters from "@/components/Characters";
import Gadgets from "@/components/Gadgets";
import News from "@/components/News";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink text-white font-body selection:bg-gold selection:text-ink relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-1/2 top-[-20%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
        <div className="absolute right-[-10%] top-[30%] h-[360px] w-[360px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <Navbar />
      <Hero />
      <About />
      <Characters />
      <Gadgets />
      <News />
      <Footer />
      <BackToTop />
    </main>
  );
}
