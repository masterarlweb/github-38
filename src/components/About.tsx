
import { Target, Users, TrendingUp, Award } from 'lucide-react';

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
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                About <span className="gradient-text">Kontenih</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Kontenih is a creative team that helps small businesses stand out through content strategy, visual design, product photography, and social media videos.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our focus is on businesses that want to maximize their potential on Instagram and TikTok. We believe every business has great potential to grow with the right digital strategy.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-brand-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-brand-blue-50 to-brand-orange-50 rounded-2xl p-8 shadow-xl">
              <div className="w-full h-full bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-blue-500 to-brand-orange-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                <p className="text-center text-gray-600 text-sm leading-relaxed">
                  To become a trusted partner in digital business transformation towards sustainable success
                </p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-brand-orange-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-brand-blue-200 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
