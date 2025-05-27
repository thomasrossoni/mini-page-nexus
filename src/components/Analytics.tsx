
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, MousePointer, Clock, Globe } from 'lucide-react';

const Analytics = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Analytics
            <span className="text-blue-600"> Profissionais</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe o desempenho das suas landing pages com métricas detalhadas e insights acionáveis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Dashboard Preview */}
          <div className="order-2 lg:order-1">
            <Card className="shadow-2xl border-0 bg-white">
              <CardContent className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 text-sm font-medium">Visualizações</p>
                        <p className="text-2xl font-bold text-gray-900">2,847</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-600 text-sm">+12%</span>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 text-sm font-medium">Cliques</p>
                        <p className="text-2xl font-bold text-gray-900">1,234</p>
                      </div>
                      <MousePointer className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-600 text-sm">+8%</span>
                    </div>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Cliques por Botão</h4>
                    <BarChart3 className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span className="text-sm text-gray-600">WhatsApp</span>
                      </div>
                      <span className="text-sm font-medium">523 cliques</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-pink-500 rounded"></div>
                        <span className="text-sm text-gray-600">Instagram</span>
                      </div>
                      <span className="text-sm font-medium">402 cliques</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span className="text-sm text-gray-600">Website</span>
                      </div>
                      <span className="text-sm font-medium">309 cliques</span>
                    </div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <Clock className="w-6 h-6 text-gray-500 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Tempo Médio</p>
                    <p className="font-bold text-gray-900">2m 34s</p>
                  </div>
                  <div>
                    <Globe className="w-6 h-6 text-gray-500 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Origens</p>
                    <p className="font-bold text-gray-900">12 fontes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features List */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Métricas que Importam</h3>
                <p className="text-gray-600 mb-8">
                  Dados em tempo real para otimizar suas conversões e entender melhor seu público.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Cliques por Botão</h4>
                    <p className="text-gray-600 text-sm">Descubra quais links geram mais engajamento</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Origem do Tráfego</h4>
                    <p className="text-gray-600 text-sm">Identifique suas melhores fontes de visitantes</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Tempo de Permanência</h4>
                    <p className="text-gray-600 text-sm">Meça o engajamento dos seus visitantes</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Pixels & Conversões</h4>
                    <p className="text-gray-600 text-sm">Integração com Meta Pixel e Google Analytics</p>
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

export default Analytics;
