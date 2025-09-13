import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Download, Users, Target, TrendingUp, Loader2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const LeadGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [plainText, setPlainText] = useState('');
  const [formData, setFormData] = useState({
    jobTitle: '',
    location: '',
    employeeSize: '',
    emailStatus: '',
    industry: '',
    numberOfLeads: ''
  });

  const parsePlainText = () => {
    if (!plainText.trim()) {
      toast({
        title: "No text to parse",
        description: "Please enter some text to parse lead criteria from.",
        variant: "destructive",
      });
      return;
    }

    const text = plainText.toLowerCase();
    const parsed = { ...formData };

    // Parse job titles
    const jobTitlePatterns = [
      /job title[:\s]+([^\n,]+)/i,
      /position[:\s]+([^\n,]+)/i,
      /role[:\s]+([^\n,]+)/i,
      /(ceo|cto|cfo|manager|director|lead|head|vp|president|founder|owner)/i
    ];
    
    for (const pattern of jobTitlePatterns) {
      const match = plainText.match(pattern);
      if (match) {
        parsed.jobTitle = match[1]?.trim() || match[0]?.trim();
        break;
      }
    }

    // Parse location
    const locationPatterns = [
      /location[:\s]+([^\n,]+)/i,
      /based in[:\s]+([^\n,]+)/i,
      /from[:\s]+([^\n,]+)/i
    ];
    
    for (const pattern of locationPatterns) {
      const match = plainText.match(pattern);
      if (match) {
        parsed.location = match[1]?.trim();
        break;
      }
    }

    // Parse employee size
    if (text.includes('1-10') || text.includes('startup') || text.includes('small')) {
      parsed.employeeSize = '1-10';
    } else if (text.includes('11-50') || text.includes('medium')) {
      parsed.employeeSize = '11-50';
    } else if (text.includes('51-200')) {
      parsed.employeeSize = '51-200';
    } else if (text.includes('201-500')) {
      parsed.employeeSize = '201-500';
    } else if (text.includes('501-1000') || text.includes('large')) {
      parsed.employeeSize = '501-1000';
    } else if (text.includes('1000+') || text.includes('enterprise')) {
      parsed.employeeSize = '1000+';
    }

    // Parse email status
    if (text.includes('verified email') || text.includes('verified only')) {
      parsed.emailStatus = 'verified';
    } else if (text.includes('business email')) {
      parsed.emailStatus = 'business';
    } else if (text.includes('personal email')) {
      parsed.emailStatus = 'personal';
    } else {
      parsed.emailStatus = 'all';
    }

    // Parse industry
    const industries = [
      'technology', 'healthcare', 'finance', 'education', 'ecommerce', 
      'manufacturing', 'real-estate', 'consulting', 'marketing', 'retail'
    ];
    
    for (const industry of industries) {
      if (text.includes(industry) || text.includes(industry.replace('-', ' '))) {
        parsed.industry = industry;
        break;
      }
    }

    // Parse number of leads
    const numberMatch = plainText.match(/(\d+)\s*(leads?|prospects?|contacts?)/i);
    if (numberMatch) {
      const number = numberMatch[1];
      if (number <= '50') parsed.numberOfLeads = '50';
      else if (number <= '100') parsed.numberOfLeads = '100';
      else if (number <= '250') parsed.numberOfLeads = '250';
      else if (number <= '500') parsed.numberOfLeads = '500';
      else if (number <= '1000') parsed.numberOfLeads = '1000';
      else parsed.numberOfLeads = 'custom';
    }

    setFormData(parsed);
    
    toast({
      title: "Text parsed successfully! 🎯",
      description: "Lead criteria have been extracted and filled in the form fields.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.jobTitle.trim()) {
      errors.push("Job Title is required");
    }
    
    if (!formData.location.trim()) {
      errors.push("Location is required");
    }
    
    if (!formData.numberOfLeads) {
      errors.push("Number of Leads is required");
    }
    
    return errors;
  };

  const generateLeads = async () => {
    // Validate required fields
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast({
        title: "Form Validation Error",
        description: validationErrors.join(", "),
        variant: "destructive",
      });
      return;
    }

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
          leadcriteria: {
            jobTitle: formData.jobTitle,
            location: formData.location,
            employeeSize: formData.employeeSize,
            emailStatus: formData.emailStatus,
            industryKeyword: formData.industry,
            numberOfLeads: formData.numberOfLeads,
          },
          timestamp: new Date().toISOString(),
          source: 'AI Lead Generator',
          triggered_from: window.location.origin,
        }),
      });

      // Success notification
      toast({
        title: "Lead Generation Started! 🚀",
        description: "Your lead generation request has been sent successfully. Processing your criteria now.",
      });

      // Reset form after successful submission
      setFormData({
        jobTitle: '',
        location: '',
        employeeSize: '',
        emailStatus: '',
        industry: '',
        numberOfLeads: ''
      });
      setPlainText('');
      
    } catch (error) {
      console.error('Error sending data to webhook:', error);
      toast({
        title: "Error occurred",
        description: "Failed to start lead generation. Please check your connection and try again.",
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
              Powerful lead magnet tool untuk menarik calon customer berkualitas tinggi menggunakan AI
            </p>
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl max-w-lg mx-auto">
              <p className="text-sm text-green-800 text-center font-medium">
                ✅ Ready to generate high-quality leads with AI targeting
              </p>
            </div>
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
                  Isi detail bisnis Anda untuk menghasilkan prospek yang tepat sasaran
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plain Text Parser */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <FileText className="h-4 w-4" />
                      Plain Text Parser
                    </CardTitle>
                    <CardDescription className="text-blue-600 text-sm">
                      Paste text containing lead criteria and let AI extract the information automatically
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Textarea
                      placeholder="Example: Looking for CEOs in technology companies with 50-200 employees based in New York. Need 500 verified business email leads..."
                      value={plainText}
                      onChange={(e) => setPlainText(e.target.value)}
                      className="min-h-[80px] bg-white/80 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                    <Button 
                      onClick={parsePlainText}
                      variant="outline"
                      className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                      disabled={!plainText.trim()}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Parse Lead Criteria
                    </Button>
                  </CardContent>
                </Card>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or fill manually</span>
                  </div>
                </div>
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
                  className="w-full relative bg-gradient-to-r from-brand-blue-600 via-brand-orange-500 to-brand-blue-600 hover:from-brand-blue-700 hover:via-brand-orange-600 hover:to-brand-blue-700 text-white font-bold py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1 group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  disabled={isLoading}
                  size="lg"
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <span className="relative z-10 flex items-center justify-center text-lg">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Processing lead generation...
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
                
                <p className="text-xs text-gray-500 text-center mt-2 font-medium">
                  🎯 AI-powered lead generation ready to launch
                </p>
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