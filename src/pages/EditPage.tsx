
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Eye, Settings } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import PageEditor from '@/components/PageEditor';

const EditPage = () => {
  const { id } = useParams();

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
              <h1 className="text-2xl font-bold text-gray-900">Editando: Minha Loja Online</h1>
              <p className="text-gray-600">meuslinks.app/minha-loja</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Visualizar
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar & Publicar
            </Button>
          </div>
        </div>

        {/* Editor */}
        <PageEditor pageId={id} />
      </div>
    </DashboardLayout>
  );
};

export default EditPage;
