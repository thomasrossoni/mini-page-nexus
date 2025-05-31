
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Monitor, Plus, GripVertical, Eye, EyeOff } from 'lucide-react';
import { usePagesContext } from '@/contexts/PagesContext';
import { PageElement } from '@/contexts/PagesContext';
import ElementProperties from './ElementProperties';

interface PageEditorProps {
  pageId?: string;
}

const PageEditor = ({ pageId }: PageEditorProps) => {
  const { getPage, updatePage } = usePagesContext();
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [page, setPage] = useState(pageId ? getPage(pageId) : null);
  const [elements, setElements] = useState<PageElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<PageElement | null>(null);

  useEffect(() => {
    if (pageId) {
      const pageData = getPage(pageId);
      if (pageData) {
        setPage(pageData);
        setElements(pageData.content.elements);
      }
    }
  }, [pageId, getPage]);

  const addElement = (type: string) => {
    const newElement: PageElement = {
      id: Date.now().toString(),
      type: type as any,
      content: type === 'button' ? 'Novo Botão' : 'Novo Texto',
      url: type === 'button' ? 'https://' : undefined,
      visible: true
    };
    const updatedElements = [...elements, newElement];
    setElements(updatedElements);
    
    if (pageId && page) {
      updatePage(pageId, {
        content: {
          ...page.content,
          elements: updatedElements
        }
      });
    }
  };

  const toggleElementVisibility = (id: string) => {
    const updatedElements = elements.map(el => 
      el.id === id ? { ...el, visible: !el.visible } : el
    );
    setElements(updatedElements);
    
    if (pageId && page) {
      updatePage(pageId, {
        content: {
          ...page.content,
          elements: updatedElements
        }
      });
    }
  };

  const updateElement = (id: string, updates: Partial<PageElement>) => {
    const updatedElements = elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(updatedElements);
    
    if (pageId && page) {
      updatePage(pageId, {
        content: {
          ...page.content,
          elements: updatedElements
        }
      });
    }

    // Atualizar elemento selecionado se for o mesmo
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement({ ...selectedElement, ...updates });
    }
  };

  const selectElement = (element: PageElement) => {
    setSelectedElement(element);
  };

  const renderLandingPagePreview = () => {
    const visibleElements = elements.filter(el => el.visible);
    
    return (
      <div className="w-full h-full bg-white overflow-y-auto">
        {visibleElements.map((element, index) => {
          const isSelected = selectedElement?.id === element.id;
          const containerClass = `cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'}`;
          
          switch (element.type) {
            case 'headline':
              return (
                <div 
                  key={element.id} 
                  className={`text-center py-8 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white ${containerClass}`}
                  onClick={() => selectElement(element)}
                >
                  <h1 className="text-4xl font-bold mb-4">{element.content || 'Seu Headline Aqui'}</h1>
                  <p className="text-xl opacity-90">{page?.content.description}</p>
                </div>
              );
            case 'hero-media':
              return (
                <div 
                  key={element.id} 
                  className={`w-full h-64 bg-gray-200 flex items-center justify-center ${containerClass}`}
                  onClick={() => selectElement(element)}
                >
                  {element.data?.profileImage ? (
                    <img 
                      src={element.data.profileImage} 
                      alt="Hero media" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">Área de Mídia (Vídeo/Foto)</span>
                  )}
                </div>
              );
            case 'about-section':
              return (
                <div 
                  key={element.id} 
                  className={`py-16 px-6 ${containerClass}`}
                  onClick={() => selectElement(element)}
                >
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">Sobre Nós</h2>
                    <p className="text-lg text-gray-600 text-center">
                      {element.content || 'Conte sua história e mostre seus diferenciais.'}
                    </p>
                  </div>
                </div>
              );
            case 'gallery-carousel':
              return (
                <div 
                  key={element.id} 
                  className={`py-16 px-6 bg-gray-50 ${containerClass}`}
                  onClick={() => selectElement(element)}
                >
                  <h2 className="text-3xl font-bold text-center mb-8">Galeria</h2>
                  <div className="flex space-x-4 justify-center">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-48 h-32 bg-gray-300 rounded"></div>
                    ))}
                  </div>
                </div>
              );
            case 'services-section':
              return (
                <div 
                  key={element.id} 
                  className={`py-16 px-6 ${containerClass}`}
                  onClick={() => selectElement(element)}
                >
                  <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {element.data?.services?.map((service, idx) => (
                      <div key={idx} className="text-center p-6 border rounded-lg">
                        {service.image && (
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-16 h-16 object-cover rounded mx-auto mb-4"
                          />
                        )}
                        <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        {service.price && (
                          <p className="text-lg font-bold text-blue-600">{service.price}</p>
                        )}
                      </div>
                    )) || (
                      <div className="col-span-3 text-center text-gray-500">
                        Configure seus serviços no painel lateral
                      </div>
                    )}
                  </div>
                </div>
              );
            case 'testimonials':
              return (
                <div 
                  key={element.id} 
                  className={`py-16 px-6 bg-gray-50 ${containerClass}`}
                  onClick={() => selectElement(element)}
                >
                  <h2 className="text-3xl font-bold text-center mb-12">Depoimentos</h2>
                  <div className="max-w-4xl mx-auto">
                    {element.data?.testimonials?.map((testimonial, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-lg shadow mb-6">
                        <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                            {testimonial.avatar ? (
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300"></div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    )) || (
                      <div className="text-center text-gray-500">
                        Adicione depoimentos no painel lateral
                      </div>
                    )}
                  </div>
                </div>
              );
            case 'contact-section':
              return (
                <div 
                  key={element.id} 
                  className={`py-16 px-6 bg-blue-600 text-white ${containerClass}`}
                  onClick={() => selectElement(element)}
                >
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Entre em Contato</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <h3 className="font-semibold mb-2">Telefone</h3>
                        <p>{element.data?.contact?.phone || '(11) 99999-9999'}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <p>{element.data?.contact?.email || 'contato@empresa.com'}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Endereço</h3>
                        <p>{element.data?.contact?.address || 'Rua Example, 123'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  const renderLinkTreePreview = () => {
    const visibleElements = elements.filter(el => el.visible);
    const isClassic = page?.template === 'Árvore de Links Clássica';
    const profileElement = visibleElements.find(el => el.type === 'profile');
    
    return (
      <div className={`w-full h-full p-6 text-center space-y-4 ${isClassic ? 'bg-white' : 'bg-gray-50'}`}>
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full mx-auto overflow-hidden">
          {profileElement?.data?.profileImage ? (
            <img 
              src={profileElement.data.profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200"></div>
          )}
        </div>
        
        {/* Title */}
        <h2 className={`text-2xl font-bold ${isClassic ? 'text-black' : 'text-gray-800'}`}>
          {page?.content.title || 'Título'}
        </h2>
        
        {/* Description */}
        <p className={`${isClassic ? 'text-gray-600' : 'text-gray-600'}`}>
          {page?.content.description || 'Descrição'}
        </p>
        
        {!isClassic && (
          <div className="grid grid-cols-3 gap-2 mb-4 max-w-32 mx-auto">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          </div>
        )}
        
        {/* Buttons */}
        <div className="space-y-3 pt-4 max-w-xs mx-auto">
          {visibleElements.filter(el => el.type === 'button').map((button) => {
            const isSelected = selectedElement?.id === button.id;
            return (
              <button 
                key={button.id}
                className={`w-full py-3 rounded-lg font-medium text-white transition-colors cursor-pointer ${
                  isClassic ? 'rounded-lg' : 'rounded-none'
                } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                style={{ 
                  backgroundColor: button.style?.backgroundColor || '#3b82f6',
                  borderRadius: isClassic ? '8px' : '0px'
                }}
                onClick={() => selectElement(button)}
              >
                {button.content}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  if (!page) {
    return <div>Página não encontrada</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {/* Left Panel - Elements & Add Elements */}
      <div className="space-y-4 overflow-y-auto">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Adicionar Elementos</h3>
            <div className="grid grid-cols-1 gap-2">
              {page.templateType === 'landing-page' ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => addElement('headline')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Headline
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addElement('hero-media')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Mídia
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addElement('about-section')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Sobre
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addElement('gallery-carousel')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Galeria
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addElement('services-section')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Serviços
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addElement('testimonials')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Depoimentos
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addElement('contact-section')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Contato
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => addElement('button')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Botão
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addElement('text')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Texto
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Elementos da Página</h3>
            <div className="space-y-2">
              {elements.map((element) => {
                const isSelected = selectedElement?.id === element.id;
                return (
                  <div 
                    key={element.id} 
                    className={`flex items-center p-2 border rounded-lg cursor-pointer transition-colors ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => selectElement(element)}
                  >
                    <GripVertical className="w-4 h-4 text-gray-400 mr-2 cursor-move" />
                    <div className="flex-1">
                      <span className="text-sm font-medium capitalize">{element.type.replace('-', ' ')}</span>
                      {element.content && (
                        <p className="text-xs text-gray-600 truncate">{element.content}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleElementVisibility(element.id);
                      }}
                    >
                      {element.visible ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Configurações da Página</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="pageTitle">Título da Página</Label>
                <Input
                  id="pageTitle"
                  value={page.content.title}
                  onChange={(e) => updatePage(pageId!, {
                    content: { ...page.content, title: e.target.value }
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="pageDescription">Descrição</Label>
                <Input
                  id="pageDescription"
                  value={page.content.description}
                  onChange={(e) => updatePage(pageId!, {
                    content: { ...page.content, description: e.target.value }
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="bgColor">Cor de Fundo</Label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    id="bgColor"
                    value={page.content.backgroundColor}
                    onChange={(e) => updatePage(pageId!, {
                      content: { ...page.content, backgroundColor: e.target.value }
                    })}
                    className="w-12 h-8 p-0 border-0"
                  />
                  <Input
                    type="text"
                    value={page.content.backgroundColor}
                    onChange={(e) => updatePage(pageId!, {
                      content: { ...page.content, backgroundColor: e.target.value }
                    })}
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
                    value={page.content.textColor}
                    onChange={(e) => updatePage(pageId!, {
                      content: { ...page.content, textColor: e.target.value }
                    })}
                    className="w-12 h-8 p-0 border-0"
                  />
                  <Input
                    type="text"
                    value={page.content.textColor}
                    onChange={(e) => updatePage(pageId!, {
                      content: { ...page.content, textColor: e.target.value }
                    })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Center Panel - Properties */}
      <div className="overflow-y-auto">
        <ElementProperties
          element={selectedElement}
          onUpdate={(updates) => {
            if (selectedElement) {
              updateElement(selectedElement.id, updates);
            }
          }}
        />
      </div>

      {/* Right Panel - Preview */}
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
                  viewMode === 'mobile' ? 'w-80 h-[600px]' : 'w-full h-full'
                }`}
              >
                {page.templateType === 'landing-page' ? renderLandingPagePreview() : renderLinkTreePreview()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PageEditor;
