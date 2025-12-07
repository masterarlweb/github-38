"use client";

import { Palette, Video, Instagram, Bot } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export function GlowingEffectDemo() {
  return (
    <div className="container-custom py-20">
      <div className="text-center space-y-6 mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
          Interactive <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Services</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Hover over our service cards to see the interactive glowing effects
        </p>
      </div>
      
      <ul className="grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-2 lg:grid-cols-4">
        <GridItem
          area="col-span-1"
          icon={<Bot className="h-6 w-6" />}
          title="AI System Creation"
          description="Complete AI marketing agent workflow that effectively replaces a full content team through intelligent automation."
        />
        <GridItem
          area="col-span-1"
          icon={<Palette className="h-6 w-6" />}
          title="Graphic Design"
          description="Logo, feed templates, packaging, and visual identity for products/services to build strong and memorable brands."
        />
        <GridItem
          area="col-span-1"
          icon={<Video className="h-6 w-6" />}
          title="Content Creation"
          description="Video reels, product cinematography, catalog photography, behind-the-scenes, and high-quality visual storytelling."
        />
        <GridItem
          area="col-span-1"
          icon={<Instagram className="h-6 w-6" />}
          title="Endorsement Marketing"
          description="Strategic partnerships with micro and nano influencers for natural and effective SME promotion."
        />
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[20rem] list-none", area)}>
      <div className="relative h-full rounded-2xl border border-border p-1">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-white/60 dark:bg-black/50 backdrop-blur-sm p-6 shadow-2xl">
          <div className="relative flex flex-1 flex-col justify-between gap-4">
            <div className="w-fit rounded-lg border border-border bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3 backdrop-blur-sm text-foreground">
              {icon}
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground leading-tight">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
