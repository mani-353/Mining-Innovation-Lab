
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Teams from "./pages/Teams";
import Products from "./pages/Products";
import MiningAccidentAnalysis from "./pages/products/MiningAccidentAnalysis";
import RiskAssessmentMain from "./pages/products/RiskAssessmentMain";
import DGMSRiskAssessment from "./pages/products/DGMSRiskAssessment";
import TRAMRiskAssessment from "./pages/products/TRAMRiskAssessment";
import AirMonitoring from "./pages/products/AirMonitoring";
import LandslideDetection from "./pages/products/LandslideDetection";
import Publications from "./pages/Publications";
import Openings from "./pages/Openings";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Copyright from "./pages/Copyright";
import Feedback from "./pages/Feedback";
import Help from "./pages/Help";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Set modern lab theme on initial load
    const root = document.documentElement;
    const body = document.body;
    body.classList.add('theme-lab');
    
    // Apply modern lab theme colors
    root.style.setProperty('--theme-primary', '#2563eb');
    root.style.setProperty('--theme-secondary', '#f1f5f9');
    root.style.setProperty('--accent-color', '#7c3aed');
    root.style.setProperty('--gradient-start', '#2563eb');
    root.style.setProperty('--gradient-end', '#7c3aed');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/mining-accident-analysis" element={<MiningAccidentAnalysis />} />
            <Route path="/products/risk-assessment" element={<RiskAssessmentMain />} />
            <Route path="/products/risk-assessment/dgms" element={<DGMSRiskAssessment />} />
            <Route path="/products/risk-assessment/tram" element={<TRAMRiskAssessment />} />
            <Route path="/products/air-monitoring" element={<AirMonitoring />} />
            <Route path="/products/landslide-detection" element={<LandslideDetection />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/openings" element={<Openings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/copyright" element={<Copyright />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/help" element={<Help />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
