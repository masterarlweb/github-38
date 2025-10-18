
import { Target, Users, TrendingUp, Award } from 'lucide-react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

const About = () => {
  const features = [
    {
      icon: Target,
      title: 'SME Focus',
      description: 'Specializing in helping small and medium businesses appear professional on digital platforms'
    },
    {
      icon: Users,
      title: 'Creative Team',
      description: 'Expert team with extensive experience in content strategy and engaging visual design'
    },
    {
      icon: TrendingUp,
      title: 'Measurable Results',
      description: 'Data-driven strategies to increase engagement and sales conversions'
    },
    {
      icon: Award,
      title: 'Guaranteed Quality',
      description: 'Commitment to providing high-quality services with 95% client satisfaction'
    }
  ];

  return (
    <section id="about" className="bg-black relative overflow-hidden">
      {/* Shader background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <ContainerScroll
        titleComponent={
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              About <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Kontenih</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Creative team helping small businesses shine through content strategy and visual design
            </p>
          </div>
        }
      >
        <div className="w-full h-full overflow-auto p-4 md:p-8 bg-black">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed">
                Kontenih is a creative team that helps small businesses stand out through content strategy, visual design, product photography, and social media videos.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our focus is on businesses that want to maximize their potential on Instagram and TikTok. We believe every business has great potential to grow with the right digital strategy.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-black/50 to-purple-900/30 border border-purple-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
              <div className="w-full h-full bg-black/40 border border-blue-400/30 rounded-xl shadow-lg p-6 flex flex-col justify-center items-center backdrop-blur-sm">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-500/50">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
                <p className="text-center text-gray-300 text-sm leading-relaxed">
                  To become a trusted partner in digital business transformation towards sustainable success
                </p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>
          </div>
        </div>
        </div>
      </ContainerScroll>
    </section>
  );
};

export default About;
