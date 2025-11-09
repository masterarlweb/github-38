
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import KontenihAI from '@/components/KontenihAI';
import { GlowingEffectDemo } from '@/components/GlowingEffectDemo';
import About from '@/components/About';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import HomeChatbot from '@/components/HomeChatbot';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <KontenihAI />
      <section className="bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10">
          <GlowingEffectDemo />
        </div>
      </section>
      <About />
      <Services />
      <Pricing />
      <Gallery />
      <Contact />
      <Footer />
      <HomeChatbot />
    </div>
  );
};

export default Index;
