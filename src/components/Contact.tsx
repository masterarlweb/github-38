
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    package: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.package) {
      toast({
        title: "Form incomplete",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const subject = "Service Order Inquiry - Kontenih";
    const body = `Hello Kontenih! I'm interested in your services.

Name: ${formData.name}
Phone: ${formData.phone}
Package: ${formData.package}

Please provide more information. Thank you!`;

    const mailtoLink = `mailto:hellokontenih@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    
    toast({
      title: "Email client opened!",
      description: "Please send the email to complete your order inquiry"
    });

    setFormData({ name: '', phone: '', package: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'WhatsApp',
      details: '+62 895-3294-75989',
      action: () => window.open('https://wa.me/62895329475989', '_blank'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      details: '@kontenih',
      action: () => window.open('https://instagram.com/kontenih', '_blank'),
      color: 'from-pink-500 to-purple-600'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Surabaya, Indonesia',
      action: () => {},
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <section id="contact" className="section-padding bg-black relative overflow-hidden">
      {/* Shader Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.3),transparent_70%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3),transparent_70%)]"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
            <MessageCircle className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-blue-400 font-semibold">Contact Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Contact <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to start your SME digital transformation? Get free consultation now!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-2xl border border-white/10 bg-black/50 backdrop-blur-sm hover:shadow-3xl hover:shadow-purple-500/20 transition-all duration-500 relative overflow-hidden">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
            />
            <CardHeader className="pb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">Order Form</CardTitle>
                  <CardDescription className="text-gray-300 mt-1">
                    Fill out the form below and we will contact you immediately
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-300">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="h-14 rounded-xl border-2 border-white/20 bg-black/20 text-white placeholder:text-gray-400 focus:border-blue-500 transition-all duration-300 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-300">WhatsApp Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="h-14 rounded-xl border-2 border-white/20 bg-black/20 text-white placeholder:text-gray-400 focus:border-blue-500 transition-all duration-300 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="package" className="text-sm font-semibold text-gray-300">Select Package *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, package: value }))}>
                    <SelectTrigger className="h-14 rounded-xl border-2 border-white/20 bg-black/20 text-white focus:border-blue-500 transition-all duration-300 text-base">
                      <SelectValue placeholder="Choose desired package" className="text-gray-400" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl bg-black/90 border-white/20 text-white">
                      <SelectItem value="basic">Basic - Rp 1.5 Million/month</SelectItem>
                      <SelectItem value="pro">Pro - Rp 2.8 Million/month</SelectItem>
                      <SelectItem value="ultimate">Ultimate - Rp 4.5 Million/month</SelectItem>
                      <SelectItem value="custom">Custom Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold h-14 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className="group relative overflow-hidden p-6 bg-black/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-white/10"
                    onClick={info.action}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <info.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-lg group-hover:text-gray-100 transition-colors">{info.title}</div>
                        <div className="text-gray-300 group-hover:text-gray-200 transition-colors">{info.details}</div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    {/* Hover background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp Button */}
            <Card className="relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-3">Need Quick Consultation?</h4>
                <p className="mb-6 opacity-90 text-lg">
                  Chat directly via WhatsApp for free consultation!
                </p>
                <Button 
                  className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onClick={() => window.open('https://wa.me/62895329475989?text=Hello%20Kontenih%2C%20I%20want%20free%20consultation!', '_blank')}
                >
                  💬 Chat WhatsApp Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
