import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Eye, Edit, ExternalLink, Copy, Trash2, Globe, Share, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePagesContext } from '@/contexts/PagesContext';
import { toast } from 'sonner';

const PageGrid = () => {
  const { pages, deletePage, updatePage, forceReset } = usePagesContext();

  const handleForceReset = () => {
    forceReset();
    toast.success('Sistema resetado! Todos os dados antigos foram limpos.');
  };

  const getPublicUrl = (page: any) => {
    return `${window.location.origin}/p/${page.url}`;
  };

  const copyToClipboard = (page: any) => {
    const url = getPublicUrl(page);
    navigator.clipboard.writeText(url);
    toast.success('Link público copiado para a área de transferência!');
  };

  const togglePublishStatus = (page: any) => {
    const newStatus = page.status === 'published' ? 'draft' : 'published';
    updatePage(page.id, { status: newStatus });
    
    if (newStatus === 'published') {
      toast.success(`Página "${page.name}" foi publicada! Agora está acessível publicamente.`);
    } else {
      toast.success(`Página "${page.name}" foi despublicada e não está mais acessível publicamente.`);
    }
  };

  const openPublicPage = (page: any) => {
    if (page.status === 'published') {
      window.open(getPublicUrl(page), '_blank');
    } else {
      toast.error('Esta página precisa estar publicada para ser visualizada publicamente.');
    }
  };

  const handleDeletePage = (pageId: string, pageName: string) => {
    deletePage(pageId);
    toast.success(`Página "${pageName}" foi deletada com sucesso!`);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours} hora${diffInHours > 1 ? 's' : ''} atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} dia${diffInDays > 1 ? 's' : ''} atrás`;
    
    return date.toLocaleDateString('pt-BR');
  };

  if (pages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma página criada ainda</h3>
        <p className="text-gray-600 mb-6">Crie sua primeira landing page e comece a compartilhar seus links</p>
        
        <div className="space-y-4">
          <Link to="/create">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Criar Primeira Página
            </Button>
          </Link>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Problemas com dados antigos?</p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Completo
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset Completo do Sistema</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação irá limpar TODOS os dados salvos no navegador e reiniciar o sistema. 
                    Use apenas se estiver enfrentando problemas com dados antigos ou corrompidos.
                    Todas as páginas serão permanentemente removidas.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleForceReset}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Reset Completo
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Suas Páginas</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{pages.length} página{pages.length !== 1 ? 's' : ''}</Badge>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Completo do Sistema</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação irá limpar TODOS os dados e reiniciar o sistema. Use apenas se estiver com problemas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleForceReset}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Reset Completo
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
                    {page.status === 'published' ? getPublicUrl(page) : `${page.domain}/${page.url} (rascunho)`}
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
                  <span>{formatDate(page.lastEdited)}</span>
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
                
                <div className="flex flex-col space-y-2 pt-2">
                  <div className="flex space-x-2">
                    <Link to={`/edit/${page.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(page)}
                      disabled={page.status !== 'published'}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openPublicPage(page)}
                      disabled={page.status !== 'published'}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant={page.status === 'published' ? 'destructive' : 'default'}
                      size="sm"
                      onClick={() => togglePublishStatus(page)}
                      className="flex-1"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      {page.status === 'published' ? 'Despublicar' : 'Publicar'}
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Deletar Página</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja deletar a página "{page.name}"? 
                            Esta ação não pode ser desfeita e todos os dados da página serão perdidos permanentemente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeletePage(page.id, page.name)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Deletar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
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
