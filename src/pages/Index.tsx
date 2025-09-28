
import Header from '@/components/Header';
import ShaderDemo from '@/components/ShaderDemo';
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
      <ShaderDemo />
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
