import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NeonOrbs } from "@/components/ui/neon-orbs";
import Index from "./pages/Index";
import OrderAgent from "./pages/OrderAgent";
import KontenihAI from "./pages/KontenihAI";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Scheduler from "./pages/Scheduler";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="kontenih-theme">
      <TooltipProvider>
        <div className="min-h-screen bg-slate-100 dark:bg-[#050a18] transition-colors duration-500">
          <NeonOrbs />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/order-agent" element={<OrderAgent />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/kontenih-ai" element={<KontenihAI />} />
              <Route path="/scheduler" element={<Scheduler />} />
              <Route path="/analytics" element={<Analytics />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
