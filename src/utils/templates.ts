
import { PageElement } from '@/contexts/PagesContext';

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  content: {
    title: string;
    description: string;
    backgroundColor: string;
    textColor: string;
    elements: PageElement[];
  };
}

export const templates: Template[] = [
  {
    id: 'influencer',
    name: 'Influencer',
    description: 'Perfeito para criadores de conteúdo e influenciadores digitais',
    preview: 'bg-gradient-to-br from-pink-400 to-purple-500',
    content: {
      title: 'Seu Nome Aqui',
      description: 'Criador de conteúdo | Lifestyle | Viagens',
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      elements: [
        { id: '1', type: 'profile', visible: true },
        { id: '2', type: 'title', content: 'Seu Nome Aqui', visible: true },
        { id: '3', type: 'description', content: 'Criador de conteúdo | Lifestyle | Viagens', visible: true },
        { 
          id: '4', 
          type: 'button', 
          content: '📸 Instagram', 
          url: 'https://instagram.com/seuusuario', 
          visible: true,
          style: { backgroundColor: '#E4405F', textColor: '#ffffff' }
        },
        { 
          id: '5', 
          type: 'button', 
          content: '🎵 TikTok', 
          url: 'https://tiktok.com/@seuusuario', 
          visible: true,
          style: { backgroundColor: '#000000', textColor: '#ffffff' }
        },
        { 
          id: '6', 
          type: 'button', 
          content: '💬 WhatsApp', 
          url: 'https://wa.me/5511999999999', 
          visible: true,
          style: { backgroundColor: '#25D366', textColor: '#ffffff' }
        }
      ]
    }
  },
  {
    id: 'restaurant',
    name: 'Restaurante',
    description: 'Ideal para restaurantes, cafés e estabelecimentos alimentícios',
    preview: 'bg-gradient-to-br from-orange-400 to-red-500',
    content: {
      title: 'Restaurante Sabor & Arte',
      description: 'Comida caseira com o sabor que você ama 🍽️',
      backgroundColor: '#fff8f0',
      textColor: '#2d1810',
      elements: [
        { id: '1', type: 'profile', visible: true },
        { id: '2', type: 'title', content: 'Restaurante Sabor & Arte', visible: true },
        { id: '3', type: 'description', content: 'Comida caseira com o sabor que você ama 🍽️', visible: true },
        { 
          id: '4', 
          type: 'button', 
          content: '📱 Fazer Pedido - WhatsApp', 
          url: 'https://wa.me/5511999999999', 
          visible: true,
          style: { backgroundColor: '#25D366', textColor: '#ffffff' }
        },
        { 
          id: '5', 
          type: 'button', 
          content: '🍕 Cardápio Completo', 
          url: 'https://cardapio.com', 
          visible: true,
          style: { backgroundColor: '#ff6b35', textColor: '#ffffff' }
        },
        { 
          id: '6', 
          type: 'button', 
          content: '📍 Nossa Localização', 
          url: 'https://maps.google.com', 
          visible: true,
          style: { backgroundColor: '#4285f4', textColor: '#ffffff' }
        }
      ]
    }
  },
  {
    id: 'agency',
    name: 'Agência',
    description: 'Para agências digitais e empresas de serviços',
    preview: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    content: {
      title: 'Digital Solutions',
      description: 'Transformamos sua visão em realidade digital',
      backgroundColor: '#f8fafc',
      textColor: '#1e293b',
      elements: [
        { id: '1', type: 'profile', visible: true },
        { id: '2', type: 'title', content: 'Digital Solutions', visible: true },
        { id: '3', type: 'description', content: 'Transformamos sua visão em realidade digital', visible: true },
        { 
          id: '4', 
          type: 'button', 
          content: '💼 Nossos Serviços', 
          url: 'https://servicos.com', 
          visible: true,
          style: { backgroundColor: '#3b82f6', textColor: '#ffffff' }
        },
        { 
          id: '5', 
          type: 'button', 
          content: '📊 Portfólio', 
          url: 'https://portfolio.com', 
          visible: true,
          style: { backgroundColor: '#6366f1', textColor: '#ffffff' }
        },
        { 
          id: '6', 
          type: 'button', 
          content: '📞 Orçamento Gratuito', 
          url: 'https://wa.me/5511999999999', 
          visible: true,
          style: { backgroundColor: '#25D366', textColor: '#ffffff' }
        }
      ]
    }
  },
  {
    id: 'digital-product',
    name: 'Produto Digital',
    description: 'Vendas de cursos, ebooks e produtos digitais',
    preview: 'bg-gradient-to-br from-green-400 to-emerald-500',
    content: {
      title: 'Curso Completo de Marketing',
      description: 'Aprenda as estratégias que realmente funcionam 🚀',
      backgroundColor: '#f0fdf4',
      textColor: '#14532d',
      elements: [
        { id: '1', type: 'profile', visible: true },
        { id: '2', type: 'title', content: 'Curso Completo de Marketing', visible: true },
        { id: '3', type: 'description', content: 'Aprenda as estratégias que realmente funcionam 🚀', visible: true },
        { 
          id: '4', 
          type: 'button', 
          content: '🎯 Comprar Agora - 50% OFF', 
          url: 'https://checkout.com', 
          visible: true,
          style: { backgroundColor: '#dc2626', textColor: '#ffffff' }
        },
        { 
          id: '5', 
          type: 'button', 
          content: '📹 Assistir Preview', 
          url: 'https://youtube.com/preview', 
          visible: true,
          style: { backgroundColor: '#16a34a', textColor: '#ffffff' }
        },
        { 
          id: '6', 
          type: 'button', 
          content: '💬 Tirar Dúvidas', 
          url: 'https://wa.me/5511999999999', 
          visible: true,
          style: { backgroundColor: '#25D366', textColor: '#ffffff' }
        }
      ]
    }
  },
  {
    id: 'event',
    name: 'Evento',
    description: 'Divulgação de eventos, workshops e palestras',
    preview: 'bg-gradient-to-br from-purple-400 to-pink-500',
    content: {
      title: 'Workshop de Inovação 2024',
      description: 'O futuro dos negócios começa aqui! 🚀',
      backgroundColor: '#fdf4ff',
      textColor: '#581c87',
      elements: [
        { id: '1', type: 'profile', visible: true },
        { id: '2', type: 'title', content: 'Workshop de Inovação 2024', visible: true },
        { id: '3', type: 'description', content: 'O futuro dos negócios começa aqui! 🚀', visible: true },
        { 
          id: '4', 
          type: 'button', 
          content: '🎟️ Garantir Minha Vaga', 
          url: 'https://inscricoes.com', 
          visible: true,
          style: { backgroundColor: '#a855f7', textColor: '#ffffff' }
        },
        { 
          id: '5', 
          type: 'button', 
          content: '📅 Programação Completa', 
          url: 'https://programacao.com', 
          visible: true,
          style: { backgroundColor: '#ec4899', textColor: '#ffffff' }
        },
        { 
          id: '6', 
          type: 'button', 
          content: '📍 Local do Evento', 
          url: 'https://maps.google.com', 
          visible: true,
          style: { backgroundColor: '#4285f4', textColor: '#ffffff' }
        }
      ]
    }
  },
  {
    id: 'health',
    name: 'Profissional da Saúde',
    description: 'Médicos, dentistas, fisioterapeutas e estética',
    preview: 'bg-gradient-to-br from-teal-400 to-cyan-500',
    content: {
      title: 'Dr. Ana Silva',
      description: 'Dermatologista | CRM 12345 | Cuidando da sua pele ✨',
      backgroundColor: '#f0fdfa',
      textColor: '#134e4a',
      elements: [
        { id: '1', type: 'profile', visible: true },
        { id: '2', type: 'title', content: 'Dr. Ana Silva', visible: true },
        { id: '3', type: 'description', content: 'Dermatologista | CRM 12345 | Cuidando da sua pele ✨', visible: true },
        { 
          id: '4', 
          type: 'button', 
          content: '📅 Agendar Consulta', 
          url: 'https://agendamento.com', 
          visible: true,
          style: { backgroundColor: '#0d9488', textColor: '#ffffff' }
        },
        { 
          id: '5', 
          type: 'button', 
          content: '💬 WhatsApp Consultório', 
          url: 'https://wa.me/5511999999999', 
          visible: true,
          style: { backgroundColor: '#25D366', textColor: '#ffffff' }
        },
        { 
          id: '6', 
          type: 'button', 
          content: '📍 Como Chegar', 
          url: 'https://maps.google.com', 
          visible: true,
          style: { backgroundColor: '#06b6d4', textColor: '#ffffff' }
        }
      ]
    }
  }
];

export const getTemplate = (id: string): Template | undefined => {
  return templates.find(template => template.id === id);
};
