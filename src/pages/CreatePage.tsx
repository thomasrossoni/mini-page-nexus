
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Palette, Smartphone, Globe, Shield, Zap, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';

const CreatePage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [pageName, setPageName] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('meuslinks.app');

  const templates = [
    {
      id: 'influencer',
      name: 'Influencer',
      description: 'Perfeito para criadores de conteúdo e influenciadores digitais',
      icon: <Palette className="w-8 h-8" />,
      preview: '/api/placeholder/300/400'
    },
    {
      id: 'restaurant',
      name: 'Restaurante',
      description: 'Ideal para restaurantes, cafés e estabelecimentos alimentícios',
      icon: <Smartphone className="w-8 h-8" />,
      preview: '/api/placeholder/300/400'
    },
    {
      id: 'agency',
      name: 'Agência',
      description: 'Para agências digitais e empresas de serviços',
      icon: <Globe className="w-8 h-8" />,
      preview: '/api/placeholder/300/400'
    },
    {
      id: 'digital-product',
      name: 'Produto Digital',
      description: 'Vendas de cursos, ebooks e produtos digitais',
      icon: <BarChart3 className="w-8 h-8" />,
      preview: '/api/placeholder/300/400'
    },
    {
      id: 'event',
      name: 'Evento',
      description: 'Divulgação de eventos, workshops e palestras',
      icon: <Zap className="w-8 h-8" />,
      preview: '/api/placeholder/300/400'
    },
    {
      id: 'health',
      name: 'Profissional da Saúde',
      description: 'Médicos, dentistas, fisioterapeutas e estética',
      icon: <Shield className="w-8 h-8" />,
      preview: '/api/placeholder/300/400'
    }
  ];

  const domains = [
    'meuslinks.app',
    'entreemcontato.app',
    'faleconosco.app',
    'contatoexpress.app'
  ];

  const handleCreate = () => {
    if (!selectedTemplate || !pageName || !pageUrl) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    
    // Aqui implementaria a lógica de criação
    console.log('Criando página:', {
      template: selectedTemplate,
      name: pageName,
      url: pageUrl,
      domain: selectedDomain
    });
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
                          {template.icon}
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
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Preview do Template</span>
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
