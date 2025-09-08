
import { Instagram, Video, Camera, Palette, Bot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: 'AI System Creation',
      subtitle: 'AI Marketing Agent',
      description: 'Complete AI marketing agent workflow that effectively replaces a full content team at a fraction of the cost through intelligent automation.',
      features: [
        'Daily AI Industry Newsletter Writing',
        'Custom Brand-Aligned Image Generation',
        'Twitter Thread Content Repurposing',
        'Viral Short-Form Video Script Creation',
        'Avatar-Style Talking Head Video Production',
        'Deep Content Research & Email Reports'
      ],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      subtitle: 'Visual Identity',
      description: 'Logo, feed templates, packaging, and visual identity for products/services to build a strong and memorable brand.',
      features: [
        'Logo Design',
        'Feed Template',
        'Packaging Design',
        'Product/Service Visual Identity'
      ],
      color: 'from-brand-blue-500 to-brand-blue-600',
      bgColor: 'from-brand-blue-50 to-brand-blue-100'
    },
    {
      icon: Video,
      title: 'Content Creation',
      subtitle: 'Visual Storytelling',
      description: 'Video reels, product cinematography, catalog photography, behind-the-scenes, and high-quality visual storytelling.',
      features: [
        'Video Reels',
        'Product Cinematography',
        'Catalog Photography',
        'Behind-the-scenes & Storytelling'
      ],
      color: 'from-brand-orange-500 to-brand-orange-600',
      bgColor: 'from-brand-orange-50 to-brand-orange-100'
    },
    {
      icon: Instagram,
      title: 'Endorsement/Influencer Marketing',
      subtitle: 'Strategic Partnership',
      description: 'Partnership strategies with micro and nano influencers for natural and effective SME promotion.',
      features: [
        'Micro Influencer Partnership',
        'Nano Influencer Strategy',
        'Natural Promotion Campaign',
        'UMKM-focused Marketing'
      ],
      color: 'from-brand-blue-500 to-brand-orange-500',
      bgColor: 'from-purple-50 to-pink-50'
    }
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-brand-blue-50/30"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-orange-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
            <span className="text-brand-blue-600 font-semibold">🎯 Professional Services</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Our <span className="gradient-text bg-gradient-to-r from-brand-blue-600 to-brand-orange-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete solutions for digital business transformation with trusted professional services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 bg-white/90 backdrop-blur-sm hover:bg-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <CardHeader className="text-center pb-6">
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <service.icon className="h-10 w-10 text-white" />
                    </div>
                    {/* Decorative rings */}
                    <div className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl border-2 border-gray-200 group-hover:scale-125 group-hover:border-transparent transition-all duration-500"></div>
                    <div className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl border border-gray-100 group-hover:scale-150 group-hover:border-transparent transition-all duration-700"></div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-brand-orange-500 font-semibold text-sm">
                    {service.subtitle}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                        <div className="w-2 h-2 bg-brand-blue-500 rounded-full mr-3 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Hover effect button */}
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-1 bg-gradient-to-r from-brand-blue-500 to-brand-orange-500 rounded-full"></div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
