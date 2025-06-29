
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-20 section-padding gradient-bg">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">Konten Bikin Cuan?</span>
                <br />
                <span className="text-gray-900">Kontenih Jawabannya.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Agensi kreatif yang membantu UMKM Indonesia membangun kehadiran digital yang menarik dan profesional melalui konten sosial media berkualitas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-medium px-8 py-3 hover-scale group"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Mulai Sekarang
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-brand-orange-500 text-brand-orange-500 hover:bg-brand-orange-50 font-medium px-8 py-3 hover-scale group"
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 h-5 w-5" />
                Lihat Portfolio
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-blue-600">100+</div>
                <div className="text-sm text-gray-600">UMKM Klien</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-orange-500">500+</div>
                <div className="text-sm text-gray-600">Konten Dibuat</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-blue-600">95%</div>
                <div className="text-sm text-gray-600">Kepuasan Klien</div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative animate-scale-in">
            <div className="aspect-square bg-gradient-to-br from-brand-blue-100 to-brand-orange-100 rounded-3xl p-8 shadow-2xl">
              <div className="w-full h-full bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-blue-500 to-brand-orange-500 rounded-2xl mx-auto flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">K</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-gray-900">Kontenih Agency</h3>
                    <p className="text-sm text-gray-600">Your Digital Growth Partner</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-brand-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">📱</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-brand-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">💡</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
