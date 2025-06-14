
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
  clearAllPages: () => void;
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
    console.log('=== LOADING FROM STORAGE ===');
    console.log('Raw localStorage data:', savedPages);
    
    if (savedPages) {
      const parsedPages = JSON.parse(savedPages);
      console.log('Parsed pages:', parsedPages);
      console.log('Número de páginas encontradas:', parsedPages.length);
      
      // Log detalhado de cada página
      parsedPages.forEach((page: any, index: number) => {
        console.log(`Página ${index + 1} no localStorage:`, {
          id: page.id,
          name: page.name,
          url: page.url,
          status: page.status,
          templateType: page.templateType
        });
      });
      
      // Converter strings de data de volta para objetos Date
      const processedPages = parsedPages.map((page: any) => ({
        ...page,
        createdAt: new Date(page.createdAt),
        lastEdited: new Date(page.lastEdited)
      }));
      
      console.log('Processed pages:', processedPages.length);
      console.log('URLs encontradas:', processedPages.map((p: any) => p.url));
      return processedPages;
    }
  } catch (error) {
    console.error('Erro ao carregar páginas do localStorage:', error);
  }
  
  console.log('Retornando array vazio - sem dados salvos');
  return [];
};

// Função para salvar páginas no localStorage
const savePagesToStorage = (pages: Page[]) => {
  try {
    localStorage.setItem('linkLandingPages', JSON.stringify(pages));
    console.log('=== SAVING TO STORAGE ===');
    console.log('Páginas salvas no localStorage:', pages.length);
    console.log('URLs salvas:', pages.map(p => p.url));
  } catch (error) {
    console.error('Erro ao salvar páginas no localStorage:', error);
  }
};

// Função para limpar todas as páginas
const clearAllPagesFromStorage = () => {
  try {
    localStorage.removeItem('linkLandingPages');
    console.log('=== CLEARED ALL PAGES FROM STORAGE ===');
  } catch (error) {
    console.error('Erro ao limpar páginas do localStorage:', error);
  }
};

export const PagesProvider = ({ children }: { children: ReactNode }) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar páginas do localStorage na inicialização
  useEffect(() => {
    console.log('=== INICIALIZANDO CONTEXT ===');
    const loadedPages = loadPagesFromStorage();
    setPages(loadedPages);
    setIsLoaded(true);
    console.log('Context inicializado com', loadedPages.length, 'páginas');
  }, []);

  // Salvar páginas no localStorage sempre que o estado mudar
  useEffect(() => {
    if (isLoaded) {
      savePagesToStorage(pages);
    }
  }, [pages, isLoaded]);

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

  const clearAllPages = () => {
    console.log('Limpando todas as páginas');
    clearAllPagesFromStorage();
    setPages([]);
  };

  return (
    <PagesContext.Provider value={{
      pages,
      createPage,
      updatePage,
      deletePage,
      getPage,
      clearAllPages
    }}>
      {children}
    </PagesContext.Provider>
  );
};
