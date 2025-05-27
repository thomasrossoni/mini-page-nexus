
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Monitor, Plus, GripVertical, Eye, EyeOff } from 'lucide-react';

interface PageEditorProps {
  pageId?: string;
}

const PageEditor = ({ pageId }: PageEditorProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [elements, setElements] = useState([
    { id: 1, type: 'profile', visible: true },
    { id: 2, type: 'title', content: 'Minha Loja Online', visible: true },
    { id: 3, type: 'description', content: 'Os melhores produtos com entrega rápida', visible: true },
    { id: 4, type: 'button', content: 'WhatsApp', url: 'https://wa.me/5511999999999', visible: true },
    { id: 5, type: 'button', content: 'Instagram', url: 'https://instagram.com/minhaloja', visible: true },
  ]);

  const addElement = (type: string) => {
    const newElement = {
      id: Date.now(),
      type,
      content: type === 'button' ? 'Novo Botão' : 'Novo Texto',
      url: type === 'button' ? 'https://' : undefined,
      visible: true
    };
    setElements([...elements, newElement]);
  };

  const toggleElementVisibility = (id: number) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, visible: !el.visible } : el
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Left Panel - Elements & Properties */}
      <div className="space-y-4 overflow-y-auto">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Adicionar Elementos</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addElement('button')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Botão
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addElement('text')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Texto
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addElement('image')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Imagem
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addElement('divider')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Divisor
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Elementos da Página</h3>
            <div className="space-y-2">
              {elements.map((element) => (
                <div key={element.id} className="flex items-center p-2 border rounded-lg">
                  <GripVertical className="w-4 h-4 text-gray-400 mr-2 cursor-move" />
                  <div className="flex-1">
                    <span className="text-sm font-medium capitalize">{element.type}</span>
                    {element.content && (
                      <p className="text-xs text-gray-600 truncate">{element.content}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleElementVisibility(element.id)}
                  >
                    {element.visible ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Propriedades</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="bgColor">Cor de Fundo</Label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    id="bgColor"
                    defaultValue="#ffffff"
                    className="w-12 h-8 p-0 border-0"
                  />
                  <Input
                    type="text"
                    defaultValue="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="textColor">Cor do Texto</Label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    id="textColor"
                    defaultValue="#000000"
                    className="w-12 h-8 p-0 border-0"
                  />
                  <Input
                    type="text"
                    defaultValue="#000000"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Center Panel - Preview */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardContent className="p-4 h-full">
            {/* Preview Controls */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Preview</h3>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Desktop
                </Button>
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile
                </Button>
              </div>
            </div>

            {/* Preview Area */}
            <div className="h-full bg-gray-50 rounded-lg flex items-center justify-center">
              <div 
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  viewMode === 'mobile' ? 'w-80 h-[600px]' : 'w-full h-full max-w-md'
                }`}
              >
                <div className="p-6 text-center space-y-4">
                  {/* Profile Image */}
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
                  
                  {/* Title */}
                  <h2 className="text-2xl font-bold">Minha Loja Online</h2>
                  
                  {/* Description */}
                  <p className="text-gray-600">Os melhores produtos com entrega rápida</p>
                  
                  {/* Buttons */}
                  <div className="space-y-3 pt-4">
                    <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
                      WhatsApp
                    </button>
                    <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors">
                      Instagram
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PageEditor;
