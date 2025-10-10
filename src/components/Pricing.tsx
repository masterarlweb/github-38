
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const Pricing = () => {
  const servicePackages = [
    {
      name: 'AI System Creation',
      description: 'AI solutions and automation for digital transformation',
      services: [
        { item: 'Create AI System', price: '100rb' },
        { item: 'AI Consultant', price: '300rb/bulan' },
        { item: 'Custom Automation', price: 'Custom quote' },
        { item: 'Bot Development', price: 'Custom quote' },
        { item: 'AI Integration', price: 'Custom quote' },
        { item: 'Training & Support', price: 'Custom quote' }
      ],
      color: 'border-purple-500',
      headerColor: 'bg-purple-500',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      name: 'Graphic Design',
      description: 'Visual solutions for SME brand identity',
      services: [
        { item: 'Logo Design', price: '-' },
        { item: 'Feed Template (10 design)', price: '-' },
        { item: 'Packaging Design', price: '-' },
        { item: 'Brand Identity Package', price: '-' },
        { item: 'Menu/Katalog Design', price: '-' },
        { item: 'Banner/Poster Design', price: '-' }
      ],
      color: 'border-brand-blue-500',
      headerColor: 'bg-brand-blue-500',
      buttonColor: 'bg-brand-blue-600 hover:bg-brand-blue-700'
    },
    {
      name: 'Content Creation',
      description: 'Visual content and videos for social media',
      services: [
        { item: 'Reels/Feed Post', price: '300rb/post' },
        { item: 'Instagram Story', price: '150rb/story' },
        { item: 'Fee Visit/Review', price: '150rb/visit' },
        { item: 'Talent Fee (Shooting)', price: '250rb/3 jam' },
        { item: 'Package Content Creation', price: 'Starting from 500k' },
        { item: 'Campaign Management', price: 'Custom quote' }
      ],
      color: 'border-brand-orange-500',
      headerColor: 'bg-brand-orange-500',
      buttonColor: 'bg-brand-orange-500 hover:bg-brand-orange-600',
      popular: true
    },
    {
      name: 'Endorsement',
      description: 'Influencer marketing rate card with experienced talent',
      services: [
        { item: 'Reels/Feed Post', price: '300rb/post' },
        { item: 'Instagram Story', price: '150rb/story' },
        { item: 'Fee Visit/Review', price: '150rb/visit' },
        { item: 'Talent Fee (Shooting)', price: '250rb/3 jam' },
        { item: 'Package Endorsement', price: 'Starting from 500k' },
        { item: 'Campaign Management', price: 'Custom quote' }
      ],
      color: 'border-green-500',
      headerColor: 'bg-green-500',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    }
  ];

  return (
    <section id="pricing" className="section-padding bg-black relative overflow-hidden">
      {/* Shader effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Pricing</span> Packages
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose the package that suits your SME needs and budget. All packages include free consultation!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto pt-6">
          {servicePackages.map((servicePackage, index) => (
            <Card 
              key={index} 
              className={`relative border bg-black/50 backdrop-blur-sm ${servicePackage.popular ? 'ring-2 ring-purple-500 scale-105' : 'border-white/10'} hover:border-purple-500/40 transition-all duration-300`}
            >
              <GlowingEffect
                spread={35}
                glow={true}
                disabled={false}
                proximity={60}
                inactiveZone={0.01}
                borderWidth={servicePackage.popular ? 3 : 2}
              />
              {servicePackage.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center shadow-lg">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className={`text-center pb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg`}>
                <CardTitle className="text-2xl font-bold">{servicePackage.name}</CardTitle>
                <CardDescription className="text-white/90">{servicePackage.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 p-6 bg-black/30 backdrop-blur-sm">
                <ul className="space-y-4">
                  {servicePackage.services.map((service, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm flex-1">{service.item}</span>
                      <span className="text-white font-semibold text-sm ml-2">{service.price}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 hover-scale border-0`}
                  onClick={() => window.open(`https://wa.me/6281234567890?text=Halo%20Kontenih%2C%20saya%20tertarik%20dengan%20layanan%20${servicePackage.name}%20dan%20ingin%20konsultasi%20lebih%20lanjut`, '_blank')}
                >
                  Consult {servicePackage.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">Need a custom package? We're ready to help!</p>
          <Button 
            variant="outline" 
            className="border-blue-400 text-blue-400 hover:bg-blue-400/10 bg-transparent"
            onClick={() => window.open('https://wa.me/6281336135036?text=Halo%20Kontenih%2C%20saya%20ingin%20diskusi%20tentang%20paket%20custom', '_blank')}
          >
            Consult Custom Package
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
