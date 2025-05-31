import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { PageElement } from '@/contexts/PagesContext';
import ImageUpload from './ImageUpload';

interface ElementPropertiesProps {
  element: PageElement | null;
  onUpdate: (updates: Partial<PageElement>) => void;
}

const ElementProperties = ({ element, onUpdate }: ElementPropertiesProps) => {
  if (!element) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-gray-500 text-center">Selecione um elemento para editar suas propriedades</p>
        </CardContent>
      </Card>
    );
  }

  const handleContentChange = (value: string) => {
    onUpdate({ content: value });
  };

  const handleUrlChange = (value: string) => {
    onUpdate({ url: value });
  };

  const handleStyleChange = (property: string, value: string) => {
    onUpdate({
      style: {
        ...element.style,
        [property]: value
      }
    });
  };

  const handleDataChange = (field: string, value: any) => {
    onUpdate({
      data: {
        ...element.data,
        [field]: value
      }
    });
  };

  const handleImageChange = (imageUrl: string) => {
    onUpdate({
      data: {
        ...element.data,
        profileImage: imageUrl
      }
    });
  };

  const updateServiceImage = (index: number, imageUrl: string) => {
    const currentServices = element.data?.services || [];
    const updatedServices = currentServices.map((service, i) => 
      i === index ? { ...service, image: imageUrl } : service
    );
    handleDataChange('services', updatedServices);
  };

  const updateTestimonialAvatar = (index: number, imageUrl: string) => {
    const currentTestimonials = element.data?.testimonials || [];
    const updatedTestimonials = currentTestimonials.map((testimonial, i) => 
      i === index ? { ...testimonial, avatar: imageUrl } : testimonial
    );
    handleDataChange('testimonials', updatedTestimonials);
  };

  const addService = () => {
    const currentServices = element.data?.services || [];
    const newService = { title: 'Novo Serviço', description: 'Descrição do serviço', price: 'R$ 100' };
    handleDataChange('services', [...currentServices, newService]);
  };

  const updateService = (index: number, field: string, value: string) => {
    const currentServices = element.data?.services || [];
    const updatedServices = currentServices.map((service, i) => 
      i === index ? { ...service, [field]: value } : service
    );
    handleDataChange('services', updatedServices);
  };

  const removeService = (index: number) => {
    const currentServices = element.data?.services || [];
    const updatedServices = currentServices.filter((_, i) => i !== index);
    handleDataChange('services', updatedServices);
  };

  const addTestimonial = () => {
    const currentTestimonials = element.data?.testimonials || [];
    const newTestimonial = { name: 'Nome', role: 'Cargo', content: 'Depoimento aqui...' };
    handleDataChange('testimonials', [...currentTestimonials, newTestimonial]);
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    const currentTestimonials = element.data?.testimonials || [];
    const updatedTestimonials = currentTestimonials.map((testimonial, i) => 
      i === index ? { ...testimonial, [field]: value } : testimonial
    );
    handleDataChange('testimonials', updatedTestimonials);
  };

  const removeTestimonial = (index: number) => {
    const currentTestimonials = element.data?.testimonials || [];
    const updatedTestimonials = currentTestimonials.filter((_, i) => i !== index);
    handleDataChange('testimonials', updatedTestimonials);
  };

  const updateContact = (field: string, value: string) => {
    handleDataChange('contact', {
      ...element.data?.contact,
      [field]: value
    });
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <h3 className="font-semibold">Propriedades do Elemento</h3>
        
        {/* Upload de imagem para perfil */}
        {(element.type === 'profile' || element.type === 'hero-media') && (
          <ImageUpload
            currentImage={element.data?.profileImage}
            onImageChange={handleImageChange}
            label={element.type === 'profile' ? 'Foto de Perfil' : 'Imagem/Vídeo Principal'}
          />
        )}

        {/* Conteúdo básico */}
        {(element.type === 'button' || element.type === 'text' || element.type === 'headline' || element.type === 'about-section') && (
          <div>
            <Label htmlFor="content">Conteúdo</Label>
            {element.type === 'about-section' ? (
              <Textarea
                id="content"
                value={element.content || ''}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Digite o conteúdo aqui..."
                rows={4}
              />
            ) : (
              <Input
                id="content"
                value={element.content || ''}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Digite o conteúdo aqui..."
              />
            )}
          </div>
        )}

        {/* URL para botões */}
        {element.type === 'button' && (
          <div>
            <Label htmlFor="url">URL/Link</Label>
            <Input
              id="url"
              value={element.url || ''}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://exemplo.com"
            />
          </div>
        )}

        {/* Estilo para botões */}
        {element.type === 'button' && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="bgColor">Cor de Fundo do Botão</Label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  value={element.style?.backgroundColor || '#3b82f6'}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  type="text"
                  value={element.style?.backgroundColor || '#3b82f6'}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="textColor">Cor do Texto</Label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  value={element.style?.textColor || '#ffffff'}
                  onChange={(e) => handleStyleChange('textColor', e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  type="text"
                  value={element.style?.textColor || '#ffffff'}
                  onChange={(e) => handleStyleChange('textColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Serviços */}
        {element.type === 'services-section' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Serviços</Label>
              <Button size="sm" onClick={addService}>
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>
            
            {element.data?.services?.map((service, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Serviço {index + 1}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => removeService(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <ImageUpload
                  currentImage={service.image}
                  onImageChange={(imageUrl) => updateServiceImage(index, imageUrl)}
                  label="Imagem do Serviço"
                />
                
                <Input
                  placeholder="Título do serviço"
                  value={service.title}
                  onChange={(e) => updateService(index, 'title', e.target.value)}
                />
                <Textarea
                  placeholder="Descrição do serviço"
                  value={service.description}
                  onChange={(e) => updateService(index, 'description', e.target.value)}
                  rows={2}
                />
                <Input
                  placeholder="Preço (ex: R$ 100)"
                  value={service.price || ''}
                  onChange={(e) => updateService(index, 'price', e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Depoimentos */}
        {element.type === 'testimonials' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Depoimentos</Label>
              <Button size="sm" onClick={addTestimonial}>
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>
            
            {element.data?.testimonials?.map((testimonial, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Depoimento {index + 1}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => removeTestimonial(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <ImageUpload
                  currentImage={testimonial.avatar}
                  onImageChange={(imageUrl) => updateTestimonialAvatar(index, imageUrl)}
                  label="Avatar"
                />
                
                <Input
                  placeholder="Nome da pessoa"
                  value={testimonial.name}
                  onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                />
                <Input
                  placeholder="Cargo/Função"
                  value={testimonial.role}
                  onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                />
                <Textarea
                  placeholder="Conteúdo do depoimento"
                  value={testimonial.content}
                  onChange={(e) => updateTestimonial(index, 'content', e.target.value)}
                  rows={3}
                />
              </div>
            ))}
          </div>
        )}

        {/* Contato */}
        {element.type === 'contact-section' && (
          <div className="space-y-3">
            <Label>Informações de Contato</Label>
            
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="+55 11 99999-9999"
                value={element.data?.contact?.phone || ''}
                onChange={(e) => updateContact('phone', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="contato@exemplo.com"
                value={element.data?.contact?.email || ''}
                onChange={(e) => updateContact('email', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                placeholder="Rua Example, 123"
                value={element.data?.contact?.address || ''}
                onChange={(e) => updateContact('address', e.target.value)}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ElementProperties;
