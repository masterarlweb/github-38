import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Image, MessageSquare, Video, Sparkles, Zap, Wand2, PenTool } from 'lucide-react';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { useNavigate } from 'react-router-dom';

const KontenihAI = () => {
  const navigate = useNavigate();
  
  const aiFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Content Generator",
      description: "Generate high-quality content for social media, blogs, and marketing campaigns instantly",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "AI Image Creation",
      description: "Create stunning visuals and graphics with advanced AI image generation technology",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Smart Copywriting",
      description: "Craft compelling copy that converts with AI-powered writing assistance",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Script AI",
      description: "Generate engaging video scripts and storyboards for your content",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: "AI Design Assistant",
      description: "Get design suggestions and optimize your visual content with AI",
      gradient: "from-indigo-500/20 to-purple-500/20"
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Brand Voice AI",
      description: "Maintain consistent brand voice across all your content with AI analysis",
      gradient: "from-pink-500/20 to-rose-500/20"
    }
  ];

  return (
    <section id="kontenih-ai" className="section-padding relative overflow-hidden">
      {/* WebGL Shader Background */}
      <div className="absolute inset-0 z-0">
        <WebGLShader />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Powered by Advanced AI</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Kontenih <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI Suite</span>
          </h2>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Leverage cutting-edge artificial intelligence to transform your content creation process. 
            From ideation to execution, our AI tools work seamlessly to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {aiFeatures.map((feature, index) => (
            <Card 
              key={index}
              onClick={() => navigate('/kontenih-ai')}
              className="group bg-black/40 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/60">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-sm text-white/40">
            <Zap className="w-4 h-4" />
            <span>Integrated with GPT-4, DALL-E, Stable Diffusion, and more</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => navigate('/kontenih-ai')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/30"
            >
              Try Kontenih AI Free
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/kontenih-ai')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              See AI in Action
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-white/60 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span>100+ AI Models</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KontenihAI;