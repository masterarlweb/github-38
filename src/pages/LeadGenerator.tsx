import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Users, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeadGenerator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    targetAudience: '',
    budget: '',
    goals: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateLeads = () => {
    // Lead generation logic would go here
    console.log('Generating leads with:', formData);
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
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="bg-white/80"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    placeholder="e.g., Small business owners, millennials, etc."
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    className="bg-white/80"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Monthly Budget (USD)</Label>
                  <Select onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25000+">$25,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Primary Goals</Label>
                  <Input
                    id="goals"
                    placeholder="e.g., Increase sales, brand awareness, etc."
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    className="bg-white/80"
                  />
                </div>

                <Button 
                  onClick={generateLeads}
                  className="w-full bg-gradient-to-r from-brand-blue-600 to-brand-blue-700 hover:from-brand-blue-700 hover:to-brand-blue-800 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={!formData.businessName || !formData.industry}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Generate AI-Powered Leads
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
                    <h3 className="text-2xl font-bold">{formData.businessName || 'Your Business'}</h3>
                    <p className="text-blue-100">Ready to scale with AI-generated leads</p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">500+</div>
                        <div className="text-xs text-blue-100">Leads per month</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">85%</div>
                        <div className="text-xs text-blue-100">Accuracy rate</div>
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