
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Video, Instagram } from 'lucide-react';
import GradientBlinds from '@/components/GradientBlinds';

const Gallery = () => {
  const graphicDesignPortfolio = [
    // Placeholder items - user will add real content
    {
      title: 'Coming Soon',
      category: 'Logo Design',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      description: 'Graphic design portfolio will be added soon'
    }
  ];

  const contentCreationPortfolio = [
    // Placeholder items - user will add real content
    {
      title: 'Coming Soon',
      category: 'Video Content',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
      description: 'Content creation portfolio will be added soon'
    }
  ];

  const endorsementPortfolio = [
    {
      title: 'Endorsement Rate Card',
      category: 'Rate Card Professional',
      image: '/lovable-uploads/7363e89c-9acb-4aa0-a03e-599d2fbd5a5d.png',
      description: 'Professional rate card for endorsement services with experienced talent Gabrielle Rora'
    },
    {
      title: 'Instagram Insights & Analytics',
      category: 'Social Media Performance',
      image: '/lovable-uploads/383a3c2f-7973-4169-9848-5227567fd945.png',
      description: 'Instagram performance with 64.8K account reached, 459 account engaged, and 3.3K total followers'
    },
    {
      title: 'Food Review & Endorsement Portfolio',
      category: 'Culinary Content',
      image: '/lovable-uploads/e67cb47d-660e-44fa-a92a-b1f6a99ba625.png',
      description: 'Culinary review and endorsement portfolio as KulinerGresik talent with various food content and restaurant reviews'
    }
  ];

  const testimonials = [
    {
      name: 'Mrs. Sari',
      business: 'Mrs. Sari Rice Stall',
      content: 'Since using Kontenih services, my stall sales have increased 3x! Their team is very professional and understands SME needs.',
      rating: 5
    },
    {
      name: 'Andi Pratama',
      business: 'Local Coffee Shop',
      content: 'The TikTok video created by Kontenih went viral and made my coffee shop busy with visitors. Highly recommended!',
      rating: 5
    },
    {
      name: 'Maya Sinta',
      business: 'Natural Skincare',
      content: 'My Instagram feed now looks very professional. Many customers say they are interested because of the attractive visuals.',
      rating: 5
    }
  ];

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      {/* GradientBlinds Background */}
      <div className="absolute inset-0">
        <GradientBlinds
          className=""
          dpr={undefined}
          gradientColors={['#5227FF', '#FF9FFC']}
          angle={120}
          noise={0.25}
          blindCount={10}
          blindMinWidth={60}
          spotlightRadius={0.6}
          spotlightSoftness={1.2}
          spotlightOpacity={0.7}
          mouseDampening={0.3}
          distortAmount={0.02}
          shineDirection="left"
          mixBlendMode="color-dodge"
        />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Portfolio Section */}
        <div className="mb-20">
          <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View various projects we have worked on for various clients
          </p>
          </div>

          <Tabs defaultValue="graphic-design" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg">
              <TabsTrigger 
                value="graphic-design" 
                className="flex items-center gap-2 rounded-xl py-3 px-6 text-sm font-medium transition-all data-[state=active]:bg-brand-blue-500 data-[state=active]:text-white"
              >
                <Palette className="w-4 h-4" />
                Graphic Design
              </TabsTrigger>
              <TabsTrigger 
                value="content-creation"
                className="flex items-center gap-2 rounded-xl py-3 px-6 text-sm font-medium transition-all data-[state=active]:bg-brand-orange-500 data-[state=active]:text-white"
              >
                <Video className="w-4 h-4" />
                Content Creation
              </TabsTrigger>
              <TabsTrigger 
                value="endorsement"
                className="flex items-center gap-2 rounded-xl py-3 px-6 text-sm font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-blue-500 data-[state=active]:to-brand-orange-500 data-[state=active]:text-white"
              >
                <Instagram className="w-4 h-4" />
                Endorsement
              </TabsTrigger>
            </TabsList>

            <TabsContent value="graphic-design" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {graphicDesignPortfolio.map((item, index) => (
                  <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <span className="text-xs font-medium text-brand-blue-500 uppercase tracking-wide">
                          {item.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="content-creation" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {contentCreationPortfolio.map((item, index) => (
                  <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <span className="text-xs font-medium text-brand-orange-500 uppercase tracking-wide">
                          {item.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="endorsement" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {endorsementPortfolio.map((item, index) => (
                  <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <span className="text-xs font-medium text-purple-500 uppercase tracking-wide">
                          {item.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Testimonials Section */}
        <div>
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Client <span className="gradient-text">Testimonials</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What clients say who have experienced the positive impact of our services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-brand-blue-600">{testimonial.business}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
