import { ShaderAnimation } from "@/components/ui/shader-animation";
import { SplitText } from "@/components/ui/split-text";
import { RainbowButton } from "@/components/ui/rainbow-borders-button";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

export default function ShaderDemo() {
  const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleButtonGlow = (buttonId: string) => {
    setActiveButtons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(buttonId)) {
        newSet.delete(buttonId);
      } else {
        newSet.add(buttonId);
      }
      return newSet;
    });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const mainText = "KONTENIH - Content Drives Sales? Kontenih is the Answer";

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-black">
      
      {/* Main Shader Animation Background */}
      <div className="absolute inset-0 z-0">
        <ShaderAnimation/>
      </div>
      
      {/* Header Navigation */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo size="md" />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium px-6 border-0"
                onClick={() => window.open('https://wa.me/62081336135036?text=Halo%20Kontenih%2C%20saya%20ingin%20konsultasi%20tentang%20layanan%20sosial%20media%20marketing', '_blank')}
              >
                Consult Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-black/95 border-b border-white/10 shadow-lg backdrop-blur-md">
              <nav className="flex flex-col space-y-4 p-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <Button 
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium mt-4"
                  onClick={() => {
                    window.open('https://wa.me/62081336135036?text=Halo%20Kontenih%2C%20saya%20ingin%20konsultasi%20tentang%20layanan%20sosial%20media%20marketing', '_blank');
                    setIsMenuOpen(false);
                  }}
                >
                  Consult Now
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Badge - Top */}
      <div className="relative z-20 pt-24 pb-12 flex justify-center">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/30 to-amber-500/30 backdrop-blur-sm rounded-full shadow-2xl border border-orange-400/50 animate-fade-in shadow-orange-500/25">
          <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mr-3 animate-pulse shadow-lg shadow-orange-400/50"></div>
          <span className="text-sm font-bold text-white tracking-wide">🚀 First AI Digital Marketing Agency</span>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 px-4">
        
        {/* Glowing Split Text Section */}
        <div className="text-center mb-8 relative z-30">
          <GlowCard glowColor="orange" customSize className="w-auto h-auto p-8 bg-gradient-to-br from-black/40 via-orange-900/20 to-amber-900/20 backdrop-blur-md border border-orange-400/20">
            <div className="mb-6">
              <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight max-w-5xl mx-auto animated-gradient-text">
                {mainText}
              </h1>
            </div>
            
            {/* Subtitle */}
            <div className="animate-fade-in delay-1000">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto px-4 font-medium">
                <span className="bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
                  Driving business growth
                </span>{" "}
                <span className="text-white">
                  with AI solutions and integrated digital marketing strategies
                </span>
              </p>
            </div>
          </GlowCard>
        </div>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            .animated-gradient-text {
              background: linear-gradient(
                45deg,
                #ff6b35,
                #f7931e,
                #ffd700,
                #ffab00
              );
              background-size: 300% 300%;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: gradientShift 3s ease-in-out infinite;
              filter: drop-shadow(0 0 15px rgba(255, 107, 53, 0.2));
            }
            
            @keyframes gradientShift {
              0%, 100% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
            }
          `
        }} />
        
        {/* CTA Buttons */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-2000">
            {activeButtons.has('get-started') ? (
              <GlowCard glowColor="orange" customSize className="w-auto h-auto p-0">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-600/80 to-amber-600/80 hover:from-orange-700/90 hover:to-amber-700/90 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0 backdrop-blur-sm shadow-orange-500/20"
                  onClick={() => {
                    toggleButtonGlow('get-started');
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </GlowCard>
            ) : (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-600/80 to-amber-600/80 hover:from-orange-700/90 hover:to-amber-700/90 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0 backdrop-blur-sm shadow-orange-500/20"
                onClick={() => {
                  toggleButtonGlow('get-started');
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
            
            {activeButtons.has('portfolio') ? (
              <GlowCard glowColor="blue" customSize className="w-auto h-auto p-0">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-orange-400/50 text-white hover:bg-orange-400/10 hover:text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group backdrop-blur-sm bg-orange-500/10"
                  onClick={() => {
                    toggleButtonGlow('portfolio');
                    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  View Portfolio
                </Button>
              </GlowCard>
            ) : (
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-orange-400/50 text-white hover:bg-orange-400/10 hover:text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group backdrop-blur-sm bg-orange-500/10"
                onClick={() => {
                  toggleButtonGlow('portfolio');
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                View Portfolio
              </Button>
            )}
          </div>
        </div>
        
        {/* Rainbow Buttons Section */}
        <div className="animate-fade-in delay-3000">
          <div className="text-center mb-4">
            <p className="text-xs text-gray-400">Special Limited Offer</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {activeButtons.has('special-offer') ? (
              <GlowCard glowColor="purple" customSize className="w-auto h-auto p-0">
                <RainbowButton 
                  onClick={() => {
                    toggleButtonGlow('special-offer');
                    import('@/hooks/use-toast').then(({ toast }) => {
                      toast({
                        title: "🎉 Special Offer!",
                        description: "Get 50% off your first month! Contact us now.",
                      });
                    });
                  }}
                  className="w-44 h-10"
                >
                  <Sparkles className="mr-2 h-3 w-3" />
                  <span className="text-sm">Special Offer</span>
                </RainbowButton>
              </GlowCard>
            ) : (
              <RainbowButton 
                onClick={() => {
                  toggleButtonGlow('special-offer');
                  import('@/hooks/use-toast').then(({ toast }) => {
                    toast({
                      title: "🎉 Special Offer!",
                      description: "Get 50% off your first month! Contact us now.",
                    });
                  });
                }}
                className="w-44 h-10"
              >
                <Sparkles className="mr-2 h-3 w-3" />
                <span className="text-sm">Special Offer</span>
              </RainbowButton>
            )}
            
            {activeButtons.has('instant-chat') ? (
              <GlowCard glowColor="green" customSize className="w-auto h-auto p-0">
                <RainbowButton 
                  onClick={() => {
                    toggleButtonGlow('instant-chat');
                    window.open('https://wa.me/62081336135036?text=Hello%20Kontenih%2C%20I%20want%20instant%20consultation!', '_blank');
                  }}
                  className="w-44 h-10"
                >
                  <Zap className="mr-2 h-3 w-3" />
                  <span className="text-sm">Instant Chat</span>
                </RainbowButton>
              </GlowCard>
            ) : (
              <RainbowButton 
                onClick={() => {
                  toggleButtonGlow('instant-chat');
                  window.open('https://wa.me/62081336135036?text=Hello%20Kontenih%2C%20I%20want%20instant%20consultation!', '_blank');
                }}
                className="w-44 h-10"
              >
                <Zap className="mr-2 h-3 w-3" />
                <span className="text-sm">Instant Chat</span>
              </RainbowButton>
            )}
          </div>
        </div>
        
      </div>
      
      {/* Bottom Spacing */}
      <div className="h-8"></div>
      
    </div>
  )
}