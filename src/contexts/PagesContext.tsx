import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Page {
  id: string;
  name: string;
  url: string;
  domain: string;
  template: string;
  templateType: 'landing-page' | 'link-tree';
  status: 'published' | 'draft';
  createdAt: Date;
  lastEdited: Date;
  views: number;
  clicks: number;
  content: {
    profileImage?: string;
    title: string;
    description: string;
    backgroundColor: string;
    textColor: string;
    elements: PageElement[];
  };
}

export interface PageElement {
  id: string;
  type: 'profile' | 'title' | 'description' | 'button' | 'text' | 'image' | 'divider' | 
        'headline' | 'hero-media' | 'about-section' | 'gallery-carousel' | 'services-section' | 
        'testimonials' | 'contact-section';
  content?: string;
  url?: string;
  visible: boolean;
  style?: {
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeight?: string;
    padding?: string;
    margin?: string;
  };
  data?: {
    // Para imagens gerais
    profileImage?: string;
    // Para carrossel de imagens
    images?: string[];
    // Para seção de serviços
    services?: Array<{
      title: string;
      description: string;
      price?: string;
      icon?: string;
      image?: string;
    }>;
    // Para depoimentos
    testimonials?: Array<{
      name: string;
      role: string;
      content: string;
      avatar?: string;
    }>;
    // Para informações de contato
    contact?: {
      phone?: string;
      email?: string;
      address?: string;
      social?: Array<{
        platform: string;
        url: string;
      }>;
    };
  };
}

interface PagesContextType {
  pages: Page[];
  createPage: (pageData: Omit<Page, 'id' | 'createdAt' | 'lastEdited' | 'views' | 'clicks'>) => string;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  getPage: (id: string) => Page | undefined;
}

const PagesContext = createContext<PagesContextType | undefined>(undefined);

export const usePagesContext = () => {
  const context = useContext(PagesContext);
  if (!context) {
    throw new Error('usePagesContext must be used within a PagesProvider');
  }
  return context;
};

// Função para carregar páginas do localStorage
const loadPagesFromStorage = (): Page[] => {
  try {
    const savedPages = localStorage.getItem('linkLandingPages');
    if (savedPages) {
      const parsedPages = JSON.parse(savedPages);
      // Converter strings de data de volta para objetos Date
      return parsedPages.map((page: any) => ({
        ...page,
        createdAt: new Date(page.createdAt),
        lastEdited: new Date(page.lastEdited)
      }));
    }
  } catch (error) {
    console.error('Erro ao carregar páginas do localStorage:', error);
  }
  
  // Retornar página padrão se não houver dados salvos
  return [
    {
      id: '1',
      name: 'Minha Árvore de Links',
      url: 'minha-arvore',
      domain: 'meuslinks.app',
      template: 'Árvore de Links',
      templateType: 'link-tree',
      status: 'published',
      createdAt: new Date('2024-01-15'),
      lastEdited: new Date(),
      views: 156,
      clicks: 23,
      content: {
        title: 'Minha Árvore de Links',
        description: 'Todos os meus links em um só lugar',
        backgroundColor: '#ffffff',
        textColor: '#000000',
        elements: [
          { id: '1', type: 'profile', visible: true, data: { profileImage: '' } },
          { id: '2', type: 'title', content: 'Minha Árvore de Links', visible: true },
          { id: '3', type: 'description', content: 'Todos os meus links em um só lugar', visible: true },
          { id: '4', type: 'button', content: 'WhatsApp', url: 'https://wa.me/5511999999999', visible: true, style: { backgroundColor: '#25D366' } },
          { id: '5', type: 'button', content: 'Instagram', url: 'https://instagram.com/minhaloja', visible: true, style: { backgroundColor: '#E4405F' } },
        ]
      }
    }
  ];
};

// Função para salvar páginas no localStorage
const savePagesToStorage = (pages: Page[]) => {
  try {
    localStorage.setItem('linkLandingPages', JSON.stringify(pages));
    console.log('Páginas salvas no localStorage:', pages.length);
  } catch (error) {
    console.error('Erro ao salvar páginas no localStorage:', error);
  }
};

export const PagesProvider = ({ children }: { children: ReactNode }) => {
  const [pages, setPages] = useState<Page[]>([]);

  // Carregar páginas do localStorage na inicialização
  useEffect(() => {
    const loadedPages = loadPagesFromStorage();
    setPages(loadedPages);
    console.log('Páginas carregadas do localStorage:', loadedPages.length);
  }, []);

  // Salvar páginas no localStorage sempre que o estado mudar
  useEffect(() => {
    if (pages.length > 0) {
      savePagesToStorage(pages);
    }
  }, [pages]);

  const createPage = (pageData: Omit<Page, 'id' | 'createdAt' | 'lastEdited' | 'views' | 'clicks'>) => {
    const newPage: Page = {
      ...pageData,
      id: Date.now().toString(),
      createdAt: new Date(),
      lastEdited: new Date(),
      views: 0,
      clicks: 0,
    };
    
    console.log('Criando nova página:', newPage);
    setPages(prev => {
      const updated = [...prev, newPage];
      console.log('Total de páginas após criação:', updated.length);
      return updated;
    });
    return newPage.id;
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    console.log('Atualizando página ID:', id, 'com updates:', updates);
    setPages(prev => {
      const updated = prev.map(page => 
        page.id === id ? { ...page, ...updates, lastEdited: new Date() } : page
      );
      console.log('Total de páginas após atualização:', updated.length);
      return updated;
    });
  };

  const deletePage = (id: string) => {
    console.log('Deletando página ID:', id);
    setPages(prev => {
      const updated = prev.filter(page => page.id !== id);
      console.log('Total de páginas após deleção:', updated.length);
      return updated;
    });
  };

  const getPage = (id: string) => {
    return pages.find(page => page.id === id);
  };

  return (
    <PagesContext.Provider value={{
      pages,
      createPage,
      updatePage,
      deletePage,
      getPage
    }}>
      {children}
    </PagesContext.Provider>
  );
};
