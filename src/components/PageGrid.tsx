
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, MoreVertical, ExternalLink, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageGrid = () => {
  // Mock data - em produção viria de uma API
  const pages = [
    {
      id: 1,
      name: 'Minha Loja Online',
      url: 'minha-loja',
      template: 'Produto Digital',
      views: 156,
      clicks: 23,
      status: 'published',
      lastEdited: '2 horas atrás',
      domain: 'meuslinks.app'
    },
    {
      id: 2,
      name: 'Dr. Silva - Dentista',
      url: 'dr-silva',
      template: 'Profissional da Saúde',
      views: 89,
      clicks: 12,
      status: 'published',
      lastEdited: '1 dia atrás',
      domain: 'entreemcontato.app'
    },
    {
      id: 3,
      name: 'Evento Lançamento',
      url: 'evento-lancamento',
      template: 'Evento',
      views: 234,
      clicks: 45,
      status: 'draft',
      lastEdited: '3 dias atrás',
      domain: 'faleconosco.app'
    }
  ];

  const copyToClipboard = (url: string, domain: string) => {
    navigator.clipboard.writeText(`https://${domain}/${url}`);
    // Aqui poderia adicionar um toast de sucesso
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Suas Páginas</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{pages.length} páginas</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Card key={page.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 truncate">
                    {page.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    {page.domain}/{page.url}
                  </p>
                </div>
                <Badge 
                  variant={page.status === 'published' ? 'default' : 'secondary'}
                  className="ml-2"
                >
                  {page.status === 'published' ? 'Publicado' : 'Rascunho'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Template: {page.template}</span>
                  <span>{page.lastEdited}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1 text-blue-600" />
                      {page.views}
                    </span>
                    <span className="flex items-center">
                      <ExternalLink className="w-4 h-4 mr-1 text-green-600" />
                      {page.clicks}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Link to={`/edit/${page.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(page.url, page.domain)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`https://${page.domain}/${page.url}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PageGrid;
