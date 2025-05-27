
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Perfeito para começar",
      badge: null,
      features: [
        "1 página personalizada",
        "Templates básicos",
        "Editor drag & drop",
        "Links ilimitados",
        "Domínio: meuslinks.app",
        "Analytics básico",
        "Suporte por email"
      ],
      cta: "Começar Grátis",
      popular: false
    },
    {
      name: "Pro",
      price: "R$ 29",
      period: "/mês",
      description: "Para profissionais e empresas",
      badge: "Mais Popular",
      features: [
        "5 páginas personalizadas",
        "Todos os templates",
        "Editor avançado",
        "Analytics completo",
        "Meta Pixel & GTM",
        "Captura de leads",
        "4 domínios premium",
        "Remoção da marca",
        "Suporte prioritário"
      ],
      cta: "Começar Pro",
      popular: true
    },
    {
      name: "Business",
      price: "R$ 79",
      period: "/mês",
      description: "Para agências e times",
      badge: "Mais Completo",
      features: [
        "20 páginas personalizadas",
        "Templates premium",
        "White label completo",
        "Analytics avançado",
        "Pixels ilimitados",
        "Integração Zapier",
        "API personalizada",
        "Domínio personalizado",
        "Suporte 24/7",
        "Gerente de conta"
      ],
      cta: "Começar Business",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Planos para
            <span className="text-blue-600"> Cada Necessidade</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comece grátis e escale conforme seu negócio cresce. 
            Sem taxas ocultas, sem pegadinhas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-500 shadow-2xl scale-105' : 'shadow-lg'} border-0 transition-all duration-300 hover:shadow-xl`}>
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {plan.badge}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <Button 
                  className={`w-full mb-6 ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                  size="lg"
                >
                  {plan.cta}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            💳 Aceitamos cartão de crédito, PIX e boleto • 🔒 Pagamento 100% seguro
          </p>
          <p className="text-sm text-gray-500">
            Cancele a qualquer momento. Sem fidelidade.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
