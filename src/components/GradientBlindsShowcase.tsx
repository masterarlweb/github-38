import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import GradientBlinds from './GradientBlinds';

const GradientBlindsShowcase = () => {
  const [config, setConfig] = useState<{
    gradientColors: string[];
    angle: number;
    noise: number;
    blindCount: number;
    animationPreset: 'none' | 'pulse' | 'wave' | 'rotate' | 'breathe';
    autoRotate: boolean;
    pulseEffect: boolean;
    performanceMode: boolean;
    mixBlendMode: string;
  }>({
    gradientColors: ['#FF9FFC', '#5227FF'],
    angle: 0,
    noise: 0.3,
    blindCount: 16,
    animationPreset: 'none',
    autoRotate: false,
    pulseEffect: false,
    performanceMode: false,
    mixBlendMode: 'lighten'
  });

  const presetConfigs = {
    aurora: {
      gradientColors: ['#00FFFF', '#FF00FF', '#FFFF00'],
      animationPreset: 'wave' as const,
      autoRotate: true,
      pulseEffect: true
    },
    ocean: {
      gradientColors: ['#0066FF', '#00CCFF', '#66FFFF'],
      animationPreset: 'breathe' as const,
      autoRotate: false,
      pulseEffect: false
    },
    sunset: {
      gradientColors: ['#FF6B35', '#F7931E', '#FFD23F'],
      animationPreset: 'pulse' as const,
      autoRotate: true,
      pulseEffect: true
    },
    neon: {
      gradientColors: ['#FF0080', '#8000FF', '#0080FF'],
      animationPreset: 'rotate' as const,
      autoRotate: true,
      pulseEffect: false
    }
  };

  const applyPreset = (presetName: keyof typeof presetConfigs) => {
    setConfig(prev => ({
      ...prev,
      ...presetConfigs[presetName]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enhanced GradientBlinds Showcase
          </h1>
          <p className="text-lg text-gray-600">
            Experience the optimized performance and new animation features
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Animation Presets</CardTitle>
                <CardDescription>Try these pre-configured effects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.keys(presetConfigs).map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    className="w-full"
                    onClick={() => applyPreset(preset as keyof typeof presetConfigs)}
                  >
                    {preset.charAt(0).toUpperCase() + preset.slice(1)}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Animation Controls</CardTitle>
                <CardDescription>Customize the animation effects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Animation Preset</label>
                  <Select 
                    value={config.animationPreset} 
                    onValueChange={(value: 'none' | 'pulse' | 'wave' | 'rotate' | 'breathe') => 
                      setConfig(prev => ({ ...prev, animationPreset: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="pulse">Pulse</SelectItem>
                      <SelectItem value="wave">Wave</SelectItem>
                      <SelectItem value="rotate">Rotate</SelectItem>
                      <SelectItem value="breathe">Breathe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Auto Rotate</label>
                  <Switch
                    checked={config.autoRotate}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, autoRotate: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Pulse Effect</label>
                  <Switch
                    checked={config.pulseEffect}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, pulseEffect: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Performance Mode</label>
                  <Switch
                    checked={config.performanceMode}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, performanceMode: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visual Controls</CardTitle>
                <CardDescription>Adjust visual parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Angle: {config.angle}°</label>
                  <Slider
                    value={[config.angle]}
                    onValueChange={([value]) => setConfig(prev => ({ ...prev, angle: value }))}
                    max={360}
                    step={15}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Noise: {config.noise}</label>
                  <Slider
                    value={[config.noise]}
                    onValueChange={([value]) => setConfig(prev => ({ ...prev, noise: value }))}
                    max={1}
                    step={0.1}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Blind Count: {config.blindCount}</label>
                  <Slider
                    value={[config.blindCount]}
                    onValueChange={([value]) => setConfig(prev => ({ ...prev, blindCount: value }))}
                    min={4}
                    max={32}
                    step={2}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Blend Mode</label>
                  <Select 
                    value={config.mixBlendMode} 
                    onValueChange={(value) => setConfig(prev => ({ ...prev, mixBlendMode: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="lighten">Lighten</SelectItem>
                      <SelectItem value="multiply">Multiply</SelectItem>
                      <SelectItem value="screen">Screen</SelectItem>
                      <SelectItem value="overlay">Overlay</SelectItem>
                      <SelectItem value="color-dodge">Color Dodge</SelectItem>
                      <SelectItem value="soft-light">Soft Light</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  {config.performanceMode ? '⚡ Performance Mode Active' : '✨ Full Quality Mode'}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full p-4">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <GradientBlinds
                    {...config}
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Feature List */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>✨ New Features & Optimizations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">🚀 Performance Optimizations</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• React.memo for component optimization</li>
                      <li>• Memoized color processing</li>
                      <li>• Debounced resize handlers</li>
                      <li>• Intersection Observer for visibility</li>
                      <li>• Conditional antialiasing</li>
                      <li>• TypeScript type safety</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">✨ New Animation Features</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Animation presets (pulse, wave, rotate, breathe)</li>
                      <li>• Auto-rotation capability</li>
                      <li>• Enhanced pulse effects</li>
                      <li>• Dynamic parameter updates</li>
                      <li>• Performance mode toggle</li>
                      <li>• Blend mode options</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientBlindsShowcase;