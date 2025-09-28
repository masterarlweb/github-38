import { ShaderAnimation } from "@/components/ui/shader-animation";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
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
      <ShaderAnimation/>
      
      {/* Particle Text Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="w-full max-w-6xl px-4">
          <ParticleTextEffect words={kontenihWords} />
        </div>
      </div>
      
      {/* CTA Buttons - positioned at bottom */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-white/30 text-white hover:bg-white/10 hover:text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group backdrop-blur-sm bg-white/5"
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            View Portfolio
          </Button>
        </div>
      </div>
      
      {/* Badge - positioned at top */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full shadow-lg border border-white/20 animate-fade-in">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
          <span className="text-sm font-medium text-white">🚀 First AI Digital Marketing Agency</span>
        </div>
      </div>
    </div>
  )
}