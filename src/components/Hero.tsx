
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GradientBlinds from '@/components/GradientBlinds';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="pt-20 section-padding relative overflow-hidden min-h-screen">
      {/* GradientBlinds Background */}
      <div className="absolute inset-0">
        <GradientBlinds
          className=""
          dpr={undefined}
          gradientColors={['#FF9FFC', '#5227FF']}
          angle={0}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">🚀 First AI Digital Marketing Agency</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text bg-gradient-to-r from-brand-blue-600 via-brand-orange-500 to-brand-blue-600 bg-clip-text text-transparent animate-gradient">
                  Content Drives Sales?
                </span>
                <br />
                <span className="text-gray-900">Kontenih is the Answer.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Driving business growth with AI solutions and integrated digital marketing strategies for all types of businesses.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-brand-blue-600 to-brand-blue-700 hover:from-brand-blue-700 hover:to-brand-blue-800 text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-brand-orange-500 text-brand-orange-500 hover:bg-brand-orange-500 hover:text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group backdrop-blur-sm bg-white/80"
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                View Portfolio
              </Button>
            </div>

            {/* Lead Generator CTA - Enhanced Modern Design */}
            <div className="pt-8">
              <div className="relative group">
                {/* Glow effect background */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue-600 via-brand-orange-500 to-brand-blue-600 rounded-3xl opacity-75 group-hover:opacity-100 transition-all duration-500 blur-sm group-hover:blur-none animate-gradient"></div>
                
                {/* Main card */}
                <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl p-8 shadow-2xl backdrop-blur-sm border border-white/30 group-hover:shadow-3xl transition-all duration-500">
                  {/* Floating icons */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 rounded-2xl flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-all duration-500">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-brand-blue-500 to-brand-blue-600 rounded-full flex items-center justify-center shadow-lg -rotate-12 group-hover:rotate-0 transition-all duration-500">
                    <span className="text-sm">⚡</span>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center space-y-6 relative z-10">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-blue-600 via-brand-orange-500 to-brand-blue-600 bg-clip-text text-transparent animate-gradient">
                        AI Lead Generator Pro
                      </h3>
                      <p className="text-gray-600 font-medium">Generate qualified prospects with advanced AI targeting</p>
                      
                      {/* Feature highlights */}
                      <div className="flex items-center justify-center gap-6 pt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-brand-blue-500 rounded-full animate-pulse"></div>
                          <span className="font-medium">Smart Targeting</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-brand-orange-500 rounded-full animate-pulse delay-300"></div>
                          <span className="font-medium">Real-time Data</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="relative">
                      <Button 
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Button clicked!');
                          // Show coming soon toast instead of navigating
                          import('@/hooks/use-toast').then(({ toast }) => {
                            toast({
                              title: "Coming Soon! 🚀",
                              description: "Fitur Lead Generator sedang dalam pengembangan dan akan segera tersedia.",
                            });
                          });
                        }}
                        className="relative bg-gradient-to-r from-brand-blue-600 via-brand-orange-500 to-brand-blue-600 hover:from-brand-blue-700 hover:via-brand-orange-600 hover:to-brand-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group/btn overflow-hidden text-lg z-10"
                        size="lg"
                      >
                        {/* Button glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                        
                        <span className="relative z-10 flex items-center">
                          Launch Lead Generator
                          <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                        </span>
                      </Button>
                      
                      {/* Removed pulse rings that might interfere with button click */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Kontenih */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-bold text-gray-900">About Kontenih</h3>
                <div className="px-3 py-1 bg-gradient-to-r from-brand-blue-500 to-brand-orange-500 text-white text-xs font-semibold rounded-full">
                  First AI Digital Marketing Agency
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Driving business growth with AI solutions and integrated digital marketing strategies. 
                We combine cutting-edge technology with creativity to produce content that 
                is not only engaging, but also effective in increasing engagement and conversions.
              </p>
              
              {/* Tujuan Kontenih */}
              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-semibold text-gray-900">Kontenih Goals:</h4>
                <div className="grid gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-blue-500 rounded-full"></div>
                    <span>Help brands reach maximum potential through quality content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-orange-500 rounded-full"></div>
                    <span>Integrate AI for content efficiency and consistency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-blue-500 rounded-full"></div>
                    <span>Create measurable and sustainable digital strategies</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-blue-600">3+</div>
                  <div className="text-xs text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-orange-500">50+</div>
                  <div className="text-xs text-gray-600">Projects Completed</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center group">
                <div className="relative">
                  <div className="text-3xl font-bold text-brand-blue-600 group-hover:scale-110 transition-transform">100+</div>
                  <div className="absolute -inset-2 bg-brand-blue-100 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">Happy Clients</div>
              </div>
              <div className="text-center group">
                <div className="relative">
                  <div className="text-3xl font-bold text-brand-orange-500 group-hover:scale-110 transition-transform">500+</div>
                  <div className="absolute -inset-2 bg-brand-orange-100 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">Content Created</div>
              </div>
              <div className="text-center group">
                <div className="relative">
                  <div className="text-3xl font-bold text-brand-blue-600 group-hover:scale-110 transition-transform">95%</div>
                  <div className="absolute -inset-2 bg-brand-blue-100 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative animate-scale-in">
            <div className="relative">
              {/* Main Card */}
              <div className="aspect-square bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/20">
                <div className="w-full h-full bg-gradient-to-br from-brand-blue-50 to-brand-orange-50 rounded-2xl shadow-inner flex items-center justify-center relative overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-8 h-8 bg-brand-blue-500 rounded-full animate-bounce"></div>
                    <div className="absolute top-8 right-8 w-6 h-6 bg-brand-orange-500 rounded-full animate-bounce delay-300"></div>
                    <div className="absolute bottom-8 left-8 w-4 h-4 bg-brand-blue-500 rounded-full animate-bounce delay-700"></div>
                    <div className="absolute bottom-4 right-4 w-5 h-5 bg-brand-orange-500 rounded-full animate-bounce delay-1000"></div>
                  </div>
                  
                  <div className="text-center space-y-6 relative z-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-brand-blue-500 to-brand-orange-500 rounded-2xl mx-auto flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-3">
                      <span className="text-3xl font-bold text-white">K</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-bold text-xl text-gray-900">Kontenih Agency</h3>
                      <p className="text-sm text-gray-600 font-medium">Your Digital Growth Partner</p>
                      <div className="flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-brand-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-brand-orange-500 rounded-full animate-pulse delay-300"></div>
                        <div className="w-2 h-2 bg-brand-blue-500 rounded-full animate-pulse delay-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-rotate-6 cursor-pointer">
                <span className="text-2xl">📱</span>
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-brand-blue-500 to-brand-blue-600 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-6 cursor-pointer">
                <span className="text-xl">💡</span>
              </div>
              
              {/* Additional Decorative Elements */}
              <div className="absolute top-1/4 -left-4 w-8 h-8 bg-brand-orange-300 rounded-full opacity-60 animate-ping"></div>
              <div className="absolute bottom-1/4 -right-4 w-6 h-6 bg-brand-blue-300 rounded-full opacity-60 animate-ping delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
