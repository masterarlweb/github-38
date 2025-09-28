import { ShaderAnimation } from "@/components/ui/shader-animation";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { RainbowButton } from "@/components/ui/rainbow-borders-button";
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react';

export default function ShaderDemo() {
  const kontenihWords = [
    "HELLO",
    "KONTENIH", 
    "Content Drives Sales?",
    "Kontenih is the Answer"
  ];

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-black">
      
      {/* Main Shader Animation Background */}
      <div className="absolute inset-0 z-0">
        <ShaderAnimation/>
      </div>
      
      {/* Badge - Top */}
      <div className="relative z-20 pt-6 flex justify-center">
        <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 backdrop-blur-sm rounded-full shadow-lg border border-orange-400/30 animate-fade-in">
          <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse"></div>
          <span className="text-sm font-medium text-white">🚀 First AI Digital Marketing Agency</span>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 px-4">
        
        {/* Gooey Text Section */}
        <div className="text-center mb-8">
          <div className="h-20 flex items-center justify-center mb-6">
            <GooeyText
              texts={kontenihWords}
              morphTime={1.5}
              cooldownTime={2}
              className="font-bold"
              textClassName="text-white drop-shadow-2xl bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent text-3xl md:text-5xl lg:text-6xl"
            />
          </div>
          
          {/* Subtitle */}
          <div className="animate-fade-in delay-1000">
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto px-4">
              Driving business growth with AI solutions and integrated digital marketing strategies
            </p>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-2000">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-600/80 to-amber-600/80 hover:from-orange-700/90 hover:to-amber-700/90 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0 backdrop-blur-sm shadow-orange-500/20"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-orange-400/50 text-white hover:bg-orange-400/10 hover:text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group backdrop-blur-sm bg-orange-500/10"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              View Portfolio
            </Button>
          </div>
        </div>
        
        {/* Rainbow Buttons Section */}
        <div className="animate-fade-in delay-3000">
          <div className="text-center mb-4">
            <p className="text-xs text-gray-400">Special Limited Offer</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <RainbowButton 
              onClick={() => {
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
            
            <RainbowButton 
              onClick={() => {
                window.open('https://wa.me/62081336135036?text=Hello%20Kontenih%2C%20I%20want%20instant%20consultation!', '_blank');
              }}
              className="w-44 h-10"
            >
              <Zap className="mr-2 h-3 w-3" />
              <span className="text-sm">Instant Chat</span>
            </RainbowButton>
          </div>
        </div>
        
      </div>
      
      {/* Bottom Spacing */}
      <div className="h-8"></div>
      
    </div>
  )
}