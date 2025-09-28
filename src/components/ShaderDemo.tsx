import { ShaderAnimation } from "@/components/ui/shader-animation";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export default function ShaderDemo() {
  const kontenihWords = [
    "HELLO",
    "KONTENIH", 
    "Content Drives Sales?",
    "Kontenih is the Answer"
  ];

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      
      {/* Main Shader Animation - Always Visible with Orange/Gold Glow */}
      <div className="absolute inset-0 z-0">
        <ShaderAnimation/>
      </div>
      
      {/* Gooey Text Morphing */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center space-y-8">
          <GooeyText
            texts={kontenihWords}
            morphTime={1.5}
            cooldownTime={2}
            className="font-bold"
            textClassName="text-white drop-shadow-2xl text-shadow-lg bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent"
          />
          
          {/* Subtitle */}
          <div className="animate-fade-in delay-1000">
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Driving business growth with AI solutions and integrated digital marketing strategies
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Buttons - positioned at bottom with orange theme */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-2000">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-600/80 to-amber-600/80 hover:from-orange-700/90 hover:to-amber-700/90 text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0 backdrop-blur-sm shadow-orange-500/20"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-orange-400/50 text-white hover:bg-orange-400/10 hover:text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group backdrop-blur-sm bg-orange-500/10"
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            View Portfolio
          </Button>
        </div>
      </div>
      
      {/* Badge - positioned at top with orange theme */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 backdrop-blur-sm rounded-full shadow-lg border border-orange-400/30 animate-fade-in">
          <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse"></div>
          <span className="text-sm font-medium text-white">🚀 First AI Digital Marketing Agency</span>
        </div>
      </div>
    </div>
  )
}