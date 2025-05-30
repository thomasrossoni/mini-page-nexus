
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Eye, Edit, ExternalLink, Copy, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePagesContext } from '@/contexts/PagesContext';
import { toast } from 'sonner';

const PageGrid = () => {
  const { pages, deletePage } = usePagesContext();

  const copyToClipboard = (url: string, domain: string) => {
    navigator.clipboard.writeText(`https://${domain}/${url}`);
    toast.success('Link copiado para a área de transferência!');
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
        <Link to="/create">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Criar Primeira Página
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Suas Páginas</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{pages.length} página{pages.length !== 1 ? 's' : ''}</Badge>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PageGrid;
