
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section id="home" className="relative overflow-hidden min-h-screen">
      <WebGLShader />
      <div className="container-custom relative z-10 pt-20 pb-12 min-h-screen flex items-center px-6 lg:px-12">
        <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in pl-4 lg:pl-0">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-white">🚀 AI Marketing Agency</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text bg-gradient-to-r from-brand-blue-300 via-brand-orange-300 to-brand-blue-300 bg-clip-text text-transparent animate-gradient">
                  Content Drives Sales?
                </span>
                <br />
                <span className="text-white">Kontenih is the Answer.</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                Driving business growth with AI solutions and integrated digital transformation strategies for all types of businesses.
              </p>
            </div>

            {/* Try Kontenih AI Button */}
            <Button
              onClick={() => navigate('/auth')}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-white/10"
            >
              <Sparkles className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span>Try Kontenih AI - Free!</span>
            </Button>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className="relative overflow-hidden bg-gradient-to-r from-brand-blue-600/80 to-brand-blue-700/80 hover:from-brand-blue-700 hover:to-brand-blue-800 backdrop-blur-md text-white font-medium text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl shadow-lg hover:shadow-brand-blue-500/50 transition-all duration-300 hover:scale-105 group border border-brand-blue-400/30"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Get Started Now
                  <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-400/0 via-white/10 to-brand-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              <Button 
                className="relative overflow-hidden bg-black/30 backdrop-blur-md border border-brand-orange-500/50 text-brand-orange-400 hover:bg-brand-orange-500/90 hover:text-white hover:border-brand-orange-400 font-medium text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl shadow-lg hover:shadow-brand-orange-500/50 transition-all duration-300 hover:scale-105 group"
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Play className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                  View Portfolio
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange-400/0 via-white/10 to-brand-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>

            {/* About Kontenih */}
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-bold text-white">About Kontenih</h3>
                <div className="px-3 py-1 bg-gradient-to-r from-brand-blue-500 to-brand-orange-500 text-white text-xs font-semibold rounded-full">
                  AI Marketing Agency
                </div>
              </div>
              <p className="text-white/70 leading-relaxed mb-4">
                Driving business growth with AI solutions and integrated digital transformation strategies. 
                We combine cutting-edge technology with creativity to produce content that 
                is not only engaging, but also effective in increasing engagement and conversions.
              </p>
              
              {/* Tujuan Kontenih */}
              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-semibold text-white">Kontenih Goals:</h4>
                <div className="grid gap-2 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-blue-300 rounded-full"></div>
                    <span>Help brands reach maximum potential through quality content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-orange-300 rounded-full"></div>
                    <span>Integrate AI for content efficiency and consistency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-blue-300 rounded-full"></div>
                    <span>Create measurable and sustainable digital strategies</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-blue-300">3+</div>
                  <div className="text-xs text-white/60">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-orange-300">50+</div>
                  <div className="text-xs text-white/60">Projects Completed</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center group">
                <div className="relative">
                  <div className="text-3xl font-bold text-brand-blue-300 group-hover:scale-110 transition-transform">100+</div>
                  <div className="absolute -inset-2 bg-brand-blue-500/20 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                </div>
                <div className="text-sm text-white/70 mt-1">Happy Clients</div>
              </div>
              <div className="text-center group">
                <div className="relative">
                  <div className="text-3xl font-bold text-brand-orange-300 group-hover:scale-110 transition-transform">500+</div>
                  <div className="absolute -inset-2 bg-brand-orange-500/20 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                </div>
                <div className="text-sm text-white/70 mt-1">Content Created</div>
              </div>
              <div className="text-center group">
                <div className="relative">
                  <div className="text-3xl font-bold text-brand-blue-300 group-hover:scale-110 transition-transform">95%</div>
                  <div className="absolute -inset-2 bg-brand-blue-500/20 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                </div>
                <div className="text-sm text-white/70 mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative animate-scale-in pr-4 lg:pr-0">
            <div className="relative">
              {/* Main Card */}
              <div className="aspect-square bg-gradient-to-br from-black/20 via-black/10 to-black/20 rounded-3xl p-8 shadow-2xl backdrop-blur-md border border-white/10">
                <div className="w-full h-full bg-gradient-to-br from-brand-blue-500/20 to-brand-orange-500/20 rounded-2xl shadow-inner flex items-center justify-center relative overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 w-8 h-8 bg-brand-blue-300 rounded-full animate-bounce"></div>
                    <div className="absolute top-8 right-8 w-6 h-6 bg-brand-orange-300 rounded-full animate-bounce delay-300"></div>
                    <div className="absolute bottom-8 left-8 w-4 h-4 bg-brand-blue-300 rounded-full animate-bounce delay-700"></div>
                    <div className="absolute bottom-4 right-4 w-5 h-5 bg-brand-orange-300 rounded-full animate-bounce delay-1000"></div>
                  </div>
                  
                  <div className="text-center space-y-6 relative z-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-brand-blue-500 to-brand-orange-500 rounded-2xl mx-auto flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-3">
                      <span className="text-3xl font-bold text-white">K</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-bold text-xl text-white">Kontenih Agency</h3>
                      <p className="text-sm text-white/70 font-medium">Your Digital Growth Partner</p>
                      <div className="flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-brand-blue-300 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-brand-orange-300 rounded-full animate-pulse delay-300"></div>
                        <div className="w-2 h-2 bg-brand-blue-300 rounded-full animate-pulse delay-600"></div>
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
      </div>
    </section>
  );
};

export default Hero;
