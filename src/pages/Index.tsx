
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Palette, BarChart3, Globe, Shield, Smartphone } from 'lucide-react';
import Hero from '@/components/Hero';
import Templates from '@/components/Templates';
import Features from '@/components/Features';
import EditorPreview from '@/components/EditorPreview';
import Pricing from '@/components/Pricing';
import Analytics from '@/components/Analytics';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LinkLanding
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#templates" className="text-gray-600 hover:text-gray-900 transition-colors">Templates</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Funcionalidades</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Preços</a>
              <Button variant="outline" className="mr-2">Entrar</Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Começar Grátis
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Templates Section */}
      <Templates />

      {/* Features Section */}
      <Features />

      {/* Editor Preview */}
      <EditorPreview />

      {/* Analytics Section */}
      <Analytics />

      {/* Pricing Section */}
      <Pricing />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
