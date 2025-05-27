
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Templates = () => {
  const templates = [
    {
      name: "Influencer",
      description: "Perfeito para criadores de conteúdo",
      image: "bg-gradient-to-br from-pink-400 to-purple-500",
      badge: "Popular"
    },
    {
      name: "Restaurante",
      description: "Cardápio e delivery online",
      image: "bg-gradient-to-br from-orange-400 to-red-500",
      badge: "Novo"
    },
    {
      name: "Agência",
      description: "Serviços profissionais",
      image: "bg-gradient-to-br from-blue-400 to-indigo-500",
      badge: null
    },
    {
      name: "Produto Digital",
      description: "Vendas e lançamentos",
      image: "bg-gradient-to-br from-green-400 to-emerald-500",
      badge: "Premium"
    },
    {
      name: "Evento",
      description: "Divulgação e inscrições",
      image: "bg-gradient-to-br from-purple-400 to-pink-500",
      badge: null
    },
    {
      name: "Saúde",
      description: "Profissionais da área médica",
      image: "bg-gradient-to-br from-teal-400 to-cyan-500",
      badge: "Novo"
    }
  ];

  return (
    <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Templates Profissionais
            <span className="text-blue-600"> Prontos para Usar</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha entre nossos templates otimizados para diferentes nichos de mercado. 
            Cada um foi desenvolvido para maximizar conversões.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className={`${template.image} h-48 relative overflow-hidden rounded-t-lg`}>
                  {template.badge && (
                    <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                      {template.badge}
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  
                  {/* Template Preview */}
                  <div className="absolute inset-4 bg-white/90 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mb-3"></div>
                    <div className="w-24 h-2 bg-gray-300 rounded mb-2"></div>
                    <div className="w-16 h-1 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2 w-full">
                      <div className="w-full h-6 bg-gray-200 rounded"></div>
                      <div className="w-full h-6 bg-gray-200 rounded"></div>
                      <div className="w-full h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-gray-600">{template.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">+ de 20 templates premium disponíveis</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Ver todos os templates →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Templates;
