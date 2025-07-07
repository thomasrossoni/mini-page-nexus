
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
  tracking?: {
    metaPixel?: string;
    metaApiToken?: string;
    customHeadCode?: string;
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
  isLoading: boolean;
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

const loadPagesFromStorage = (): Page[] => {
  try {
    const savedPages = localStorage.getItem(STORAGE_KEY);
    console.log('=== DEBUG CARREGAMENTO ===');
    console.log('Raw localStorage data:', savedPages);
    
    if (savedPages) {
      const parsedPages = JSON.parse(savedPages);
      console.log('Parsed pages:', parsedPages);
      console.log('Total pages found:', parsedPages.length);
      
      // Log cada página antes do filtro
      parsedPages.forEach((page: any, index: number) => {
        console.log(`Página ${index + 1}:`, {
          id: page.id,
          name: page.name,
          url: page.url,
          isOldHardcoded: page.id === "1" || page.url === "minha-arvore"
        });
      });
      
      // Filtrar apenas páginas com IDs e URLs específicos antigos
      const userPages = parsedPages.filter((page: any) => {
        const isOldPage = page.id === "1" || page.url === "minha-arvore";
        console.log(`Página ${page.name} (${page.id}): ${isOldPage ? 'REMOVIDA' : 'MANTIDA'}`);
        return !isOldPage;
      });
      
      console.log('Páginas após filtro:', userPages.length);
      
      const processedPages = userPages.map((page: any) => ({
        ...page,
        createdAt: new Date(page.createdAt),
        lastEdited: new Date(page.lastEdited)
      }));
      
      console.log('Páginas processadas finais:', processedPages.length);
      console.log('=== END DEBUG CARREGAMENTO ===');
      
      return processedPages;
    }
    
    console.log('Nenhum dado no localStorage');
    console.log('=== END DEBUG CARREGAMENTO ===');
  } catch (error) {
    console.error('Erro ao carregar páginas:', error);
  }
  
  return [];
};

const savePagesToStorage = (pages: Page[]) => {
  try {
    console.log('=== SALVANDO PÁGINAS ===');
    console.log('Páginas para salvar:', pages.length);
    pages.forEach((page, index) => {
      console.log(`Salvando página ${index + 1}:`, {
        id: page.id,
        name: page.name,
        url: page.url
      });
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    console.log('Páginas salvas com sucesso');
    console.log('=== END SALVANDO PÁGINAS ===');
  } catch (error) {
    console.error('Erro ao salvar páginas:', error);
  }
};

export const PagesProvider = ({ children }: { children: ReactNode }) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('PagesProvider: Iniciando carregamento...');
    const loadedPages = loadPagesFromStorage();
    console.log('PagesProvider: Páginas carregadas:', loadedPages.length);
    setPages(loadedPages);
    setIsLoading(false);
    console.log('PagesProvider: Carregamento concluído');
  }, []);

  useEffect(() => {
    if (!isLoading) {
      console.log('PagesProvider: Salvando alterações...');
      savePagesToStorage(pages);
    }
  }, [pages, isLoading]);

  const createPage = (pageData: Omit<Page, 'id' | 'createdAt' | 'lastEdited' | 'views' | 'clicks'>) => {
    const newPage: Page = {
      ...pageData,
      id: Date.now().toString(),
      createdAt: new Date(),
      lastEdited: new Date(),
      views: 0,
      clicks: 0,
    };
    
    console.log('Criando nova página:', {
      id: newPage.id,
      name: newPage.name,
      url: newPage.url
    });
    
    setPages(prev => [...prev, newPage]);
    return newPage.id;
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    setPages(prev => 
      prev.map(page => 
        page.id === id ? { ...page, ...updates, lastEdited: new Date() } : page
      )
    );
  };

  const deletePage = (id: string) => {
    setPages(prev => prev.filter(page => page.id !== id));
  };

  const getPage = (id: string) => {
    return pages.find(page => page.id === id);
  };

  const clearAllPages = () => {
    console.log('=== LIMPANDO TODAS AS PÁGINAS ===');
    localStorage.removeItem(STORAGE_KEY);
    setPages([]);
    console.log('Todas as páginas foram removidas');
  };

  const forceReset = () => {
    console.log('=== RESET FORÇADO ===');
    localStorage.clear();
    setPages([]);
    setIsLoading(true);
    setTimeout(() => {
      const loadedPages = loadPagesFromStorage();
      setPages(loadedPages);
      setIsLoading(false);
      console.log('Reset concluído');
    }, 100);
  };

  return (
    <PagesContext.Provider value={{
      pages,
      isLoading,
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
