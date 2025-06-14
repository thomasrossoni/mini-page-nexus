
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
    profileImage?: string;
    images?: string[];
    services?: Array<{
      title: string;
      description: string;
      price?: string;
      icon?: string;
      image?: string;
    }>;
    testimonials?: Array<{
      name: string;
      role: string;
      content: string;
      avatar?: string;
    }>;
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
  forceReset: () => void;
}

const PagesContext = createContext<PagesContextType | undefined>(undefined);

export const usePagesContext = () => {
  const context = useContext(PagesContext);
  if (!context) {
    throw new Error('usePagesContext must be used within a PagesProvider');
  }
  return context;
};

const STORAGE_KEY = 'linkLandingPages';

const forceResetStorage = () => {
  try {
    localStorage.clear();
    console.log('LocalStorage completamente limpo');
  } catch (error) {
    console.error('Erro durante o reset:', error);
  }
};

const loadPagesFromStorage = (): Page[] => {
  try {
    const savedPages = localStorage.getItem(STORAGE_KEY);
    console.log('Carregando do localStorage:', savedPages);
    
    if (savedPages) {
      const parsedPages = JSON.parse(savedPages);
      
      const processedPages = parsedPages.map((page: any) => ({
        ...page,
        createdAt: new Date(page.createdAt),
        lastEdited: new Date(page.lastEdited)
      }));
      
      console.log('Páginas carregadas:', processedPages.length);
      return processedPages;
    }
  } catch (error) {
    console.error('Erro ao carregar páginas:', error);
  }
  
  return [];
};

const savePagesToStorage = (pages: Page[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    console.log('Páginas salvas:', pages.length);
  } catch (error) {
    console.error('Erro ao salvar páginas:', error);
  }
};

export const PagesProvider = ({ children }: { children: ReactNode }) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('Inicializando PagesProvider...');
    const loadedPages = loadPagesFromStorage();
    setPages(loadedPages);
    setIsLoaded(true);
    console.log('PagesProvider inicializado com', loadedPages.length, 'páginas');
  }, []);

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
    
    console.log('Criando nova página:', newPage.name, newPage.url);
    setPages(prev => [...prev, newPage]);
    return newPage.id;
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    console.log('Atualizando página:', id);
    setPages(prev => 
      prev.map(page => 
        page.id === id ? { ...page, ...updates, lastEdited: new Date() } : page
      )
    );
  };

  const deletePage = (id: string) => {
    console.log('Deletando página:', id);
    setPages(prev => prev.filter(page => page.id !== id));
  };

  const getPage = (id: string) => {
    const page = pages.find(page => page.id === id);
    console.log('Buscando página:', id, page ? 'encontrada' : 'não encontrada');
    return page;
  };

  const clearAllPages = () => {
    console.log('Limpando todas as páginas');
    localStorage.removeItem(STORAGE_KEY);
    setPages([]);
  };

  const forceReset = () => {
    console.log('Reset forçado iniciado');
    forceResetStorage();
    setPages([]);
    setIsLoaded(false);
    setTimeout(() => {
      const loadedPages = loadPagesFromStorage();
      setPages(loadedPages);
      setIsLoaded(true);
      console.log('Reset forçado concluído');
    }, 100);
  };

  return (
    <PagesContext.Provider value={{
      pages,
      createPage,
      updatePage,
      deletePage,
      getPage,
      clearAllPages,
      forceReset
    }}>
      {children}
    </PagesContext.Provider>
  );
};
