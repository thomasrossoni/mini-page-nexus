
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePagesContext } from '@/contexts/PagesContext';
import { PageElement } from '@/contexts/PagesContext';

const PublicPage = () => {
  const { url } = useParams();
  const { pages, updatePage } = usePagesContext();
  const [page, setPage] = useState(pages.find(p => p.url === url && p.status === 'published'));

  useEffect(() => {
    console.log('=== DEBUG PublicPage ===');
    console.log('URL from params:', url);
    console.log('Total pages in context:', pages.length);
    console.log('All pages details:', pages.map(p => ({ 
      id: p.id, 
      name: p.name, 
      url: p.url, 
      status: p.status,
      templateType: p.templateType,
      template: p.template
    })));
    
    console.log('Published pages:', pages.filter(p => p.status === 'published').map(p => ({ 
      id: p.id, 
      name: p.name, 
      url: p.url 
    })));
    
    console.log('Pages with matching URL (any status):', pages.filter(p => p.url === url).map(p => ({ 
      id: p.id, 
      name: p.name, 
      url: p.url, 
      status: p.status 
    })));
    
    const foundPage = pages.find(p => p.url === url && p.status === 'published');
    console.log('Final found page:', foundPage);
    console.log('=== END DEBUG ===');
    
    setPage(foundPage);
    
    // Incrementar views apenas uma vez por sessão
    if (foundPage && !sessionStorage.getItem(`viewed_${foundPage.id}`)) {
      updatePage(foundPage.id, {
        views: foundPage.views + 1
      });
      sessionStorage.setItem(`viewed_${foundPage.id}`, 'true');
    }
  }, [url, pages, updatePage]);

  if (!page) {
    const unpublishedPage = pages.find(p => p.url === url && p.status === 'draft');
    
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Página não encontrada</h1>
          
          {unpublishedPage ? (
            <div className="space-y-4">
              <p className="text-gray-600">Esta página existe mas não está publicada.</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium">Página encontrada como rascunho:</p>
                <p className="text-yellow-700">Nome: {unpublishedPage.name}</p>
                <p className="text-yellow-700">Status: {unpublishedPage.status}</p>
                <p className="text-yellow-700 text-sm mt-2">
                  Para visualizar esta página, publique-a no editor.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Esta página não existe ou não está publicada.</p>
          )}
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
            <p className="text-sm font-medium text-gray-700 mb-2">Informações de debug:</p>
            <p className="text-xs text-gray-600">URL procurada: <code className="bg-gray-200 px-1 rounded">{url}</code></p>
            <p className="text-xs text-gray-600">Total de páginas: {pages.length}</p>
            <p className="text-xs text-gray-600">
              Páginas publicadas: {pages.filter(p => p.status === 'published').map(p => p.url).join(', ') || 'nenhuma'}
            </p>
            <p className="text-xs text-gray-600">
              Páginas rascunho: {pages.filter(p => p.status === 'draft').map(p => `${p.url} (${p.name})`).join(', ') || 'nenhuma'}
            </p>
          </div>
          
          <div className="mt-4">
            <a 
              href="/dashboard" 
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Voltar ao Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleElementClick = (element: PageElement) => {
    if (element.url && element.type === 'button') {
      // Incrementar clicks
      updatePage(page.id, {
        clicks: page.clicks + 1
      });
      
      // Abrir link
      window.open(element.url, '_blank');
    }
  };

  const renderLandingPage = () => {
    const visibleElements = page.content.elements.filter(el => el.visible);
    
    return (
      <div className="min-h-screen" style={{ backgroundColor: page.content.backgroundColor }}>
        {visibleElements.map((element) => {
          switch (element.type) {
            case 'headline':
              return (
                <div 
                  key={element.id} 
                  className="text-center py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
                  <h1 className="text-5xl font-bold mb-6">{element.content || 'Seu Headline Aqui'}</h1>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto">{page.content.description}</p>
                </div>
              );
            case 'hero-media':
              return (
                <div key={element.id} className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  {element.data?.profileImage ? (
                    <img 
                      src={element.data.profileImage} 
                      alt="Hero media" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-lg">Área de Mídia</span>
                  )}
                </div>
              );
            case 'about-section':
              return (
                <div key={element.id} className="py-20 px-6">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8" style={{ color: page.content.textColor }}>
                      Sobre Nós
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {element.content || 'Conte sua história e mostre seus diferenciais.'}
                    </p>
                  </div>
                </div>
              );
            case 'services-section':
              return (
                <div key={element.id} className="py-20 px-6 bg-gray-50">
                  <h2 className="text-4xl font-bold text-center mb-16" style={{ color: page.content.textColor }}>
                    Nossos Serviços
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {element.data?.services?.map((service, idx) => (
                      <div key={idx} className="text-center p-8 bg-white rounded-lg shadow-lg">
                        {service.image && (
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-20 h-20 object-cover rounded-full mx-auto mb-6"
                          />
                        )}
                        <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                        <p className="text-gray-600 mb-6">{service.description}</p>
                        {service.price && (
                          <p className="text-2xl font-bold text-blue-600">{service.price}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            case 'testimonials':
              return (
                <div key={element.id} className="py-20 px-6">
                  <h2 className="text-4xl font-bold text-center mb-16" style={{ color: page.content.textColor }}>
                    Depoimentos
                  </h2>
                  <div className="max-w-4xl mx-auto space-y-8">
                    {element.data?.testimonials?.map((testimonial, idx) => (
                      <div key={idx} className="bg-white p-8 rounded-lg shadow-lg">
                        <p className="text-gray-600 mb-6 text-lg italic">"{testimonial.content}"</p>
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full mr-6 overflow-hidden">
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
                            <p className="font-bold text-lg">{testimonial.name}</p>
                            <p className="text-gray-500">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            case 'contact-section':
              return (
                <div key={element.id} className="py-20 px-6 bg-blue-600 text-white">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-12">Entre em Contato</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <h3 className="font-bold text-xl mb-4">Telefone</h3>
                        <p className="text-lg">{element.data?.contact?.phone || '(11) 99999-9999'}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-4">Email</h3>
                        <p className="text-lg">{element.data?.contact?.email || 'contato@empresa.com'}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-4">Endereço</h3>
                        <p className="text-lg">{element.data?.contact?.address || 'Rua Example, 123'}</p>
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

  const renderLinkTree = () => {
    // Garantir que elementos existem
    const elements = page.content?.elements || [];
    const visibleElements = elements.filter(el => el.visible);
    
    const isClassic = page.template === 'Árvore de Links Clássica';
    const profileElement = visibleElements.find(el => el.type === 'profile');
    
    // Se não há elementos visíveis, mostrar estrutura básica
    const hasButtons = visibleElements.some(el => el.type === 'button');
    
    return (
      <div 
        className={`min-h-screen p-8 text-center ${isClassic ? 'bg-white' : 'bg-gray-50'}`}
        style={{ backgroundColor: page.content?.backgroundColor || (isClassic ? '#ffffff' : '#f9fafb') }}
      >
        <div className="max-w-md mx-auto">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full mx-auto overflow-hidden mb-6 shadow-lg bg-gray-200">
            {profileElement?.data?.profileImage ? (
              <img 
                src={profileElement.data.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">
                  {(page.content?.title || page.name || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          {/* Title */}
          <h1 
            className="text-3xl font-bold mb-4" 
            style={{ color: page.content?.textColor || '#000000' }}
          >
            {page.content?.title || profileElement?.content || page.name}
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 mb-8 text-lg">
            {page.content?.description || 'Meus links importantes'}
          </p>
          
          {/* Social Icons placeholder para template moderno */}
          {!isClassic && (
            <div className="flex justify-center space-x-4 mb-8">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-xs">IG</span>
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-xs">TW</span>
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-xs">LI</span>
              </div>
            </div>
          )}
          
          {/* Buttons */}
          <div className="space-y-4">
            {hasButtons ? (
              visibleElements.filter(el => el.type === 'button').map((button) => (
                <button 
                  key={button.id}
                  className={`w-full py-4 px-6 font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                    isClassic ? 'rounded-lg' : 'rounded-none'
                  }`}
                  style={{ 
                    backgroundColor: button.style?.backgroundColor || '#3b82f6',
                    borderRadius: isClassic ? '12px' : '0px'
                  }}
                  onClick={() => handleElementClick(button)}
                >
                  {button.content || 'Link'}
                </button>
              ))
            ) : (
              <div className="text-gray-500 py-8">
                <p>Esta página ainda não possui links configurados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Determinar o tipo de template - garantir compatibilidade
  const templateType = page.templateType || (page.template?.includes('Landing') ? 'landing-page' : 'link-tree');
  
  return templateType === 'landing-page' ? renderLandingPage() : renderLinkTree();
};

export default PublicPage;
