
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Download } from 'lucide-react';
import { useImageStorage } from '@/hooks/useImageStorage';
import { toast } from 'sonner';

interface ImageGalleryProps {
  onSelectImage?: (imageUrl: string) => void;
  showSelectButton?: boolean;
}

const ImageGallery = ({ onSelectImage, showSelectButton = false }: ImageGalleryProps) => {
  const { images, deleteImage } = useImageStorage();

  const handleDelete = (id: string, imageName: string) => {
    deleteImage(id);
    toast.success(`Imagem "${imageName}" foi removida`);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (images.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">Nenhuma imagem carregada ainda</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Galeria de Imagens ({images.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="group relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <div className="flex space-x-2">
                  {showSelectButton && onSelectImage && (
                    <Button
                      size="sm"
                      onClick={() => onSelectImage(image.url)}
                      className="bg-white text-black hover:bg-gray-100"
                    >
                      Usar
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(image.id, image.name)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-xs text-gray-600 truncate" title={image.name}>
                  {image.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(image.size)}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(image.uploadedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageGallery;
