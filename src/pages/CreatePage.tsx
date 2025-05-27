
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Palette, Smartphone, Globe, Shield, Zap, BarChart3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { usePagesContext } from '@/contexts/PagesContext';
import { templates, getTemplate } from '@/utils/templates';
import { toast } from 'sonner';
import DashboardLayout from '@/components/DashboardLayout';

const CreatePage = () => {
  const navigate = useNavigate();
  const { createPage } = usePagesContext();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [pageName, setPageName] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('meuslinks.app');

  const domains = [
    'meuslinks.app',
    'entreemcontato.app',
    'faleconosco.app',
    'contatoexpress.app'
  ];

  const iconMap: { [key: string]: React.ReactNode } = {
    'influencer': <Palette className="w-8 h-8" />,
    'restaurant': <Smartphone className="w-8 h-8" />,
    'agency': <Globe className="w-8 h-8" />,
    'digital-product': <BarChart3 className="w-8 h-8" />,
    'event': <Zap className="w-8 h-8" />,
    'health': <Shield className="w-8 h-8" />
  };

  const handleCreate = () => {
    if (!selectedTemplate || !pageName || !pageUrl) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const template = getTemplate(selectedTemplate);
    if (!template) {
      toast.error('Template não encontrado');
      return;
    }

    try {
      const pageId = createPage({
        name: pageName,
        url: pageUrl,
        domain: selectedDomain,
        template: template.name,
        status: 'draft',
        content: {
          ...template.content,
          title: pageName
        }
      });

      toast.success('Página criada com sucesso!');
      navigate(`/edit/${pageId}`);
    } catch (error) {
      toast.error('Erro ao criar página');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-gray-900">Criar Nova Página</h1>
            <p className="text-gray-600 mt-2">Escolha um template e configure sua nova landing page</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Escolha um Template</CardTitle>
                <CardDescription>
                  Selecione o modelo que melhor se adapta ao seu negócio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                          {iconMap[template.id]}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
                <CardDescription>
                  Configure os detalhes da sua página
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pageName">Nome da Página *</Label>
                  <Input
                    id="pageName"
                    placeholder="Ex: Minha Loja Online"
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="pageUrl">URL Personalizada *</Label>
                  <div className="flex">
                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value)}
                      className="px-3 py-2 border border-r-0 rounded-l-md bg-gray-50 text-sm"
                    >
                      {domains.map((domain) => (
                        <option key={domain} value={domain}>{domain}/</option>
                      ))}
                    </select>
                    <Input
                      id="pageUrl"
                      placeholder="minha-pagina"
                      value={pageUrl}
                      onChange={(e) => setPageUrl(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      className="rounded-l-none"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Sua página ficará em: {selectedDomain}/{pageUrl || 'sua-url'}
                  </p>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={handleCreate}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={!selectedTemplate || !pageName || !pageUrl}
                  >
                    Criar Página
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            {selectedTemplate && (
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {(() => {
                      const template = getTemplate(selectedTemplate);
                      if (!template) return <span className="text-gray-500">Template não encontrado</span>;
                      
                      return (
                        <div className="w-full h-full p-4 flex flex-col items-center justify-start bg-white">
                          <div className="w-16 h-16 bg-gray-300 rounded-full mb-3"></div>
                          <h3 className="font-bold text-lg mb-2 text-center">{pageName || template.content.title}</h3>
                          <p className="text-sm text-gray-600 mb-4 text-center">{template.content.description}</p>
                          <div className="space-y-2 w-full max-w-xs">
                            {template.content.elements.filter(el => el.type === 'button').slice(0, 3).map((button, index) => (
                              <div 
                                key={index}
                                className="w-full h-8 rounded text-xs flex items-center justify-center text-white"
                                style={{ backgroundColor: button.style?.backgroundColor || '#3b82f6' }}
                              >
                                {button.content}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreatePage;
