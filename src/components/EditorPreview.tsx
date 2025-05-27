
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Move, Type, Palette, Image, Link } from 'lucide-react';

const EditorPreview = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Editor Visual
            <span className="text-blue-600"> Drag & Drop</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Crie e personalize sua landing page de forma visual e intuitiva. 
            Sem código, sem complicação.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Editor Interface */}
          <div className="order-2 lg:order-1">
            <Card className="shadow-2xl border-0">
              <CardContent className="p-0">
                {/* Toolbar */}
                <div className="bg-gray-50 border-b border-gray-200 p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Move className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Mover</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Type className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Texto</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Palette className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Cores</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Image className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Imagem</span>
                    </div>
                  </div>
                </div>

                {/* Canvas */}
                <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-96">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
                    <div className="text-center">
                      {/* Profile Image */}
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4 relative">
                        <div className="absolute inset-0 border-2 border-dashed border-blue-300 rounded-full animate-pulse"></div>
                      </div>
                      
                      {/* Name */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Seu Nome
                        <div className="absolute ml-2 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                      </h3>
                      
                      {/* Bio */}
                      <p className="text-gray-600 text-sm mb-6">
                        Sua bio personalizada aqui
                      </p>
                      
                      {/* Buttons */}
                      <div className="space-y-3">
                        <div className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium relative overflow-hidden">
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          📱 WhatsApp
                        </div>
                        <div className="bg-pink-500 text-white py-2 px-4 rounded-lg text-sm font-medium">
                          📷 Instagram
                        </div>
                        <div className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium">
                          🌐 Website
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features List */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Move className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Arrastar e Soltar</h3>
                  <p className="text-gray-600">Reorganize elementos simplesmente arrastando. Interface visual e intuitiva.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Palette className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Personalização Total</h3>
                  <p className="text-gray-600">Cores, fontes, espaçamentos, bordas e muito mais. Sua marca, seu estilo.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Link className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Links Inteligentes</h3>
                  <p className="text-gray-600">Botões com ícones, cores personalizadas e rastreamento de cliques automático.</p>
                </div>
              </div>

              <div className="pt-6">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Experimentar Editor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorPreview;
