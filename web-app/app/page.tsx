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
    <main className="min-h-screen bg-ink text-white font-body selection:bg-gold selection:text-ink">
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
