
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

const loadPagesFromStorage = (): Page[] => {
  try {
    const savedPages = localStorage.getItem(STORAGE_KEY);
    
    if (savedPages) {
      const parsedPages = JSON.parse(savedPages);
      
      // Filtrar apenas páginas criadas pelo usuário (sem IDs hardcoded)
      const userPages = parsedPages.filter((page: any) => {
        // Se a página tem ID "1" ou "minha-arvore", é dados antigos
        return page.id !== "1" && page.url !== "minha-arvore";
      });
      
      const processedPages = userPages.map((page: any) => ({
        ...page,
        createdAt: new Date(page.createdAt),
        lastEdited: new Date(page.lastEdited)
      }));
      
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
  } catch (error) {
    console.error('Erro ao salvar páginas:', error);
  }
};

export const PagesProvider = ({ children }: { children: ReactNode }) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedPages = loadPagesFromStorage();
    setPages(loadedPages);
    setIsLoaded(true);
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
    localStorage.removeItem(STORAGE_KEY);
    setPages([]);
  };

  const forceReset = () => {
    localStorage.clear();
    setPages([]);
    setIsLoaded(false);
    setTimeout(() => {
      const loadedPages = loadPagesFromStorage();
      setPages(loadedPages);
      setIsLoaded(true);
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
