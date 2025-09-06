import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Users, Target, TrendingUp, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const LeadGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    location: '',
    employeeSize: '',
    emailStatus: '',
    industry: '',
    numberOfLeads: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateLeads = async () => {
    setIsLoading(true);
    
    try {
      console.log('Sending lead generation data to n8n webhook:', formData);
      
      const webhookUrl = 'https://n8n-rphgibnj.us-east-1.clawcloudrun.com/webhook-test/ff28eb36-c32d-4989-954c-b932bee7b495';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'AI Lead Generator',
          triggered_from: window.location.origin,
        }),
      });

      toast({
        title: "Lead Generation Started",
        description: "Your lead generation request has been sent successfully. Check your n8n workflow for results.",
      });
      
    } catch (error) {
      console.error('Error sending data to webhook:', error);
      toast({
        title: "Error",
        description: "Failed to start lead generation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-50 to-brand-orange-50">
      {/* Header */}
      <header className="pt-8 pb-4 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 hover:bg-white/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">
              <span className="gradient-text">AI Lead Generator</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Generate qualified leads for your business using our AI-powered lead generation tool
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Lead Generation Form */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-brand-blue-600" />
                  Lead Generation Setup
                </CardTitle>
                <CardDescription>
                  Fill in your business details to generate targeted leads
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-gray-800 font-semibold">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., CEO, Marketing Manager, Sales Director"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    className="bg-white/90 border-gray-200 focus:border-brand-blue-500 focus:ring-brand-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-800 font-semibold">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., New York, USA or Global"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-white/90 border-gray-200 focus:border-brand-blue-500 focus:ring-brand-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeSize" className="text-gray-800 font-semibold">Employee Size</Label>
                  <Select onValueChange={(value) => handleInputChange('employeeSize', value)}>
                    <SelectTrigger className="bg-white/90 border-gray-200 focus:border-brand-blue-500">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501-1000">501-1,000 employees</SelectItem>
                      <SelectItem value="1000+">1,000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailStatus" className="text-gray-800 font-semibold">Email Status</Label>
                  <Select onValueChange={(value) => handleInputChange('emailStatus', value)}>
                    <SelectTrigger className="bg-white/90 border-gray-200 focus:border-brand-blue-500">
                      <SelectValue placeholder="Select email preference" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="verified">Verified emails only</SelectItem>
                      <SelectItem value="all">All email types</SelectItem>
                      <SelectItem value="business">Business emails only</SelectItem>
                      <SelectItem value="personal">Personal emails included</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-gray-800 font-semibold">Industry</Label>
                  <Select onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger className="bg-white/90 border-gray-200 focus:border-brand-blue-500">
                      <SelectValue placeholder="Select target industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfLeads" className="text-gray-800 font-semibold">Number of Leads</Label>
                  <Select onValueChange={(value) => handleInputChange('numberOfLeads', value)}>
                    <SelectTrigger className="bg-white/90 border-gray-200 focus:border-brand-blue-500">
                      <SelectValue placeholder="How many leads do you need?" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="50">50 leads</SelectItem>
                      <SelectItem value="100">100 leads</SelectItem>
                      <SelectItem value="250">250 leads</SelectItem>
                      <SelectItem value="500">500 leads</SelectItem>
                      <SelectItem value="1000">1,000 leads</SelectItem>
                      <SelectItem value="custom">Custom amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={generateLeads}
                  className="w-full relative bg-gradient-to-r from-brand-blue-600 via-brand-orange-500 to-brand-blue-600 hover:from-brand-blue-700 hover:via-brand-orange-600 hover:to-brand-blue-700 text-white font-bold py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1 group overflow-hidden"
                  disabled={!formData.jobTitle || !formData.industry || !formData.numberOfLeads || isLoading}
                  size="lg"
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <span className="relative z-10 flex items-center justify-center text-lg">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Processing Request...
                      </>
                    ) : (
                      <>
                        <Users className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                        Generate AI-Powered Leads
                        <div className="ml-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </>
                    )}
                  </span>
                </Button>
              </CardContent>
            </Card>

            {/* Features & Benefits */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-brand-orange-500" />
                    AI-Powered Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-brand-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Smart Targeting</h4>
                      <p className="text-sm text-gray-600">AI analyzes your business to find ideal prospects</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-brand-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Real-time Data</h4>
                      <p className="text-sm text-gray-600">Access to fresh, verified contact information</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-brand-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Quality Scoring</h4>
                      <p className="text-sm text-gray-600">Each lead rated for conversion probability</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-brand-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Export Ready</h4>
                      <p className="text-sm text-gray-600">Download leads in CSV, Excel, or CRM formats</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-brand-blue-600 to-brand-orange-500 text-white shadow-xl">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold">{formData.jobTitle ? `${formData.jobTitle} Prospects` : 'Lead Generation'}</h3>
                    <p className="text-blue-100">AI-powered prospect generation ready to launch</p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{formData.numberOfLeads || '500'}+</div>
                        <div className="text-xs text-blue-100">Target leads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">95%</div>
                        <div className="text-xs text-blue-100">Data accuracy</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeadGenerator;