
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Publique sua landing page em 2 minutos
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Crie
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Mini Landing Pages </span>
            que Convertem
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Plataforma completa para criar páginas de links personalizadas com editor drag-and-drop, 
            templates profissionais, analytics avançado e integração com ferramentas de marketing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto"
            >
              Começar Grátis Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
              Ver Demo
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="ml-4 bg-gray-200 rounded-lg px-4 py-1 text-sm text-gray-600">
                    seunome.entreemcontato.app
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-purple-100 to-blue-100">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Sua Empresa</h3>
                  <p className="text-gray-600 mb-6">Conecte-se conosco através dos nossos canais</p>
                  <div className="space-y-3 max-w-xs mx-auto">
                    <div className="bg-green-500 text-white py-3 px-6 rounded-lg font-medium">
                      📱 WhatsApp
                    </div>
                    <div className="bg-pink-500 text-white py-3 px-6 rounded-lg font-medium">
                      📷 Instagram
                    </div>
                    <div className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium">
                      🌐 Site Oficial
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
