
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Eye, Settings, Globe, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { usePagesContext } from '@/contexts/PagesContext';
import { toast } from 'sonner';
import DashboardLayout from '@/components/DashboardLayout';
import PageEditor from '@/components/PageEditor';

const EditPage = () => {
  const { id } = useParams();
  const { getPage, updatePage } = usePagesContext();
  const page = id ? getPage(id) : null;

  if (!page) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Página não encontrada</h1>
          <p className="text-gray-600">A página que você está procurando não existe.</p>
          <Link to="/dashboard">
            <Button className="mt-4">Voltar ao Dashboard</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const getPublicUrl = () => {
    return `${window.location.origin}/p/${page.url}`;
  };

  const togglePublishStatus = () => {
    const newStatus = page.status === 'published' ? 'draft' : 'published';
    updatePage(page.id, { status: newStatus });
    
    if (newStatus === 'published') {
      toast.success(`Página publicada! Agora está acessível em: ${getPublicUrl()}`);
    } else {
      toast.success('Página despublicada com sucesso!');
    }
  };

  const openPublicPage = () => {
    if (page.status === 'published') {
      window.open(getPublicUrl(), '_blank');
    } else {
      toast.error('Publique a página primeiro para visualizá-la.');
    }
  };

  const copyPublicUrl = () => {
    if (page.status === 'published') {
      navigator.clipboard.writeText(getPublicUrl());
      toast.success('Link público copiado!');
    } else {
      toast.error('Publique a página primeiro para obter o link.');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="ml-4">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">Editando: {page.name}</h1>
                <Badge 
                  variant={page.status === 'published' ? 'default' : 'secondary'}
                >
                  {page.status === 'published' ? 'Publicado' : 'Rascunho'}
                </Badge>
              </div>
              <p className="text-gray-600">
                {page.status === 'published' ? getPublicUrl() : `${page.domain}/${page.url} (não publicado)`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline"
              onClick={openPublicPage}
              disabled={page.status !== 'published'}
            >
              <Eye className="w-4 h-4 mr-2" />
              Visualizar
            </Button>
            
            <Button 
              variant="outline"
              onClick={copyPublicUrl}
              disabled={page.status !== 'published'}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Copiar Link
            </Button>
            
            <Button 
              variant={page.status === 'published' ? 'destructive' : 'default'}
              onClick={togglePublishStatus}
            >
              <Globe className="w-4 h-4 mr-2" />
              {page.status === 'published' ? 'Despublicar' : 'Publicar'}
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => toast.success('Alterações salvas automaticamente!')}
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Status da publicação */}
        {page.status === 'published' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-green-600 mr-2" />
              <div>
                <p className="text-green-800 font-medium">Página publicada com sucesso!</p>
                <p className="text-green-600 text-sm">
                  Sua página está acessível publicamente em: 
                  <button 
                    onClick={copyPublicUrl}
                    className="ml-1 underline hover:no-underline"
                  >
                    {getPublicUrl()}
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Editor */}
        <PageEditor pageId={id} />
      </div>
    </DashboardLayout>
  );
};

export default EditPage;
