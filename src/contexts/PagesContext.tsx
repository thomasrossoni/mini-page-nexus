
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Page {
  id: string;
  name: string;
  url: string;
  domain: string;
  template: string;
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

interface PageElement {
  id: string;
  type: 'profile' | 'title' | 'description' | 'button' | 'text' | 'image' | 'divider';
  content?: string;
  url?: string;
  visible: boolean;
  style?: {
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
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

export const PagesProvider = ({ children }: { children: ReactNode }) => {
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      name: 'Minha Loja Online',
      url: 'minha-loja',
      domain: 'meuslinks.app',
      template: 'Produto Digital',
      status: 'published',
      createdAt: new Date('2024-01-15'),
      lastEdited: new Date(),
      views: 156,
      clicks: 23,
      content: {
        title: 'Minha Loja Online',
        description: 'Os melhores produtos com entrega rápida',
        backgroundColor: '#ffffff',
        textColor: '#000000',
        elements: [
          { id: '1', type: 'profile', visible: true },
          { id: '2', type: 'title', content: 'Minha Loja Online', visible: true },
          { id: '3', type: 'description', content: 'Os melhores produtos com entrega rápida', visible: true },
          { id: '4', type: 'button', content: 'WhatsApp', url: 'https://wa.me/5511999999999', visible: true, style: { backgroundColor: '#25D366' } },
          { id: '5', type: 'button', content: 'Instagram', url: 'https://instagram.com/minhaloja', visible: true, style: { backgroundColor: '#E4405F' } },
        ]
      }
    }
  ]);

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
    setPages(prev => prev.map(page => 
      page.id === id ? { ...page, ...updates, lastEdited: new Date() } : page
    ));
  };

  const deletePage = (id: string) => {
    setPages(prev => prev.filter(page => page.id !== id));
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
