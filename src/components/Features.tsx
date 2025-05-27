
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Smartphone, Globe, Shield, Zap, BarChart3 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Editor Drag & Drop",
      description: "Interface intuitiva para personalizar sua página sem conhecimento técnico. Arraste, solte e publique."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Design Responsivo",
      description: "Suas páginas ficam perfeitas em qualquer dispositivo. Visualização mobile em tempo real."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Domínios Personalizados",
      description: "Escolha entre nossos domínios premium: entreemcontato.app, meuslinks.app e mais."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Avançado",
      description: "Acompanhe cliques, visualizações, origem do tráfego e tempo de permanência em dashboards intuitivos."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Pixels & Tags",
      description: "Integre facilmente Meta Pixel, Google Tag Manager e scripts personalizados para remarketing."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Publicação Instantânea",
      description: "Publique em segundos. Edições são aplicadas em tempo real sem necessidade de rebuild."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tudo que Você Precisa
            <span className="text-blue-600"> em um Só Lugar</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Funcionalidades profissionais para criar landing pages que realmente convertem. 
            Simples para iniciantes, poderoso para especialistas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
