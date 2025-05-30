
import { PageElement } from '@/contexts/PagesContext';

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  type: 'landing-page' | 'link-tree';
  content: {
    title: string;
    description: string;
    backgroundColor: string;
    textColor: string;
    elements: PageElement[];
  };
}

export const templates: Template[] = [
  // LANDING PAGES
  {
    id: 'influencer',
    name: 'Influencer',
    description: 'Landing page completa para criadores de conteúdo',
    preview: 'bg-gradient-to-br from-pink-400 to-purple-500',
    type: 'landing-page',
    content: {
      title: 'Criador de Conteúdo',
      description: 'Transformando vidas através do conteúdo',
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      elements: [
        { 
          id: '1', 
          type: 'headline', 
          content: 'Transformando Vidas Através do Conteúdo Digital', 
          visible: true,
          style: { fontSize: '48px', fontWeight: 'bold', textColor: '#1a1a1a' }
        },
        { 
          id: '2', 
          type: 'hero-media', 
          content: 'Vídeo de apresentação ou foto principal', 
          visible: true 
        },
        { 
          id: '3', 
          type: 'about-section', 
          content: 'Olá! Sou um criador de conteúdo apaixonado por compartilhar conhecimento e inspirar pessoas. Com mais de 100k seguidores, minha missão é ajudar você a alcançar seus objetivos através de conteúdo de qualidade.', 
          visible: true 
        },
        { 
          id: '4', 
          type: 'gallery-carousel', 
          visible: true,
          data: {
            images: [
              'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
              'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
              'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400'
            ]
          }
        },
        { 
          id: '5', 
          type: 'services-section', 
          visible: true,
          data: {
            services: [
              { title: 'Consultoria 1:1', description: 'Mentoria personalizada para crescimento', price: 'R$ 297' },
              { title: 'Curso Online', description: 'Aprenda as estratégias que funcionam', price: 'R$ 197' },
              { title: 'Ebook Gratuito', description: 'Guia completo para iniciantes', price: 'Grátis' }
            ]
          }
        },
        { 
          id: '6', 
          type: 'testimonials', 
          visible: true,
          data: {
            testimonials: [
              { name: 'Maria Silva', role: 'Empreendedora', content: 'Mudou completamente minha visão sobre negócios digitais!' },
              { name: 'João Santos', role: 'Freelancer', content: 'Consegui triplicar minha renda em 6 meses.' }
            ]
          }
        },
        { 
          id: '7', 
          type: 'contact-section', 
          visible: true,
          data: {
            contact: {
              phone: '+55 11 99999-9999',
              email: 'contato@influencer.com',
              social: [
                { platform: 'Instagram', url: 'https://instagram.com/influencer' },
                { platform: 'YouTube', url: 'https://youtube.com/influencer' }
              ]
            }
          }
        }
      ]
    }
  },
  {
    id: 'restaurant',
    name: 'Restaurante',
    description: 'Landing page para restaurantes e estabelecimentos',
    preview: 'bg-gradient-to-br from-orange-400 to-red-500',
    type: 'landing-page',
    content: {
      title: 'Restaurante Sabor & Arte',
      description: 'Comida caseira com o sabor que você ama',
      backgroundColor: '#fff8f0',
      textColor: '#2d1810',
      elements: [
        { 
          id: '1', 
          type: 'headline', 
          content: 'Sabores Únicos que Despertam Emoções', 
          visible: true,
          style: { fontSize: '42px', fontWeight: 'bold', textColor: '#2d1810' }
        },
        { 
          id: '2', 
          type: 'hero-media', 
          content: 'Foto do prato principal ou ambiente', 
          visible: true 
        },
        { 
          id: '3', 
          type: 'about-section', 
          content: 'Há mais de 15 anos servindo pratos que aquecem o coração. Nossa culinária combina receitas tradicionais com um toque moderno, usando apenas ingredientes frescos e selecionados.', 
          visible: true 
        },
        { 
          id: '4', 
          type: 'gallery-carousel', 
          visible: true,
          data: {
            images: [
              'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
              'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
              'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400'
            ]
          }
        },
        { 
          id: '5', 
          type: 'services-section', 
          visible: true,
          data: {
            services: [
              { title: 'Pratos Executivos', description: 'Refeições completas e balanceadas', price: 'A partir de R$ 25' },
              { title: 'Delivery', description: 'Entrega rápida na sua casa', price: 'Taxa grátis' },
              { title: 'Eventos', description: 'Buffet para ocasiões especiais', price: 'Sob consulta' }
            ]
          }
        },
        { 
          id: '6', 
          type: 'testimonials', 
          visible: true,
          data: {
            testimonials: [
              { name: 'Ana Costa', role: 'Cliente fiel', content: 'A melhor comida caseira da região!' },
              { name: 'Carlos Lima', role: 'Empresário', content: 'Sempre peço para meus almoços de trabalho.' }
            ]
          }
        },
        { 
          id: '7', 
          type: 'contact-section', 
          visible: true,
          data: {
            contact: {
              phone: '+55 11 3333-4444',
              email: 'contato@saborarte.com',
              address: 'Rua das Flores, 123 - Centro',
              social: [
                { platform: 'Instagram', url: 'https://instagram.com/saborarte' },
                { platform: 'WhatsApp', url: 'https://wa.me/5511333344444' }
              ]
            }
          }
        }
      ]
    }
  },
  {
    id: 'agency',
    name: 'Agência Digital',
    description: 'Landing page para agências e empresas de serviços',
    preview: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    type: 'landing-page',
    content: {
      title: 'Digital Solutions',
      description: 'Transformamos sua visão em realidade digital',
      backgroundColor: '#f8fafc',
      textColor: '#1e293b',
      elements: [
        { 
          id: '1', 
          type: 'headline', 
          content: 'Transformamos Sua Visão em Realidade Digital', 
          visible: true,
          style: { fontSize: '46px', fontWeight: 'bold', textColor: '#1e293b' }
        },
        { 
          id: '2', 
          type: 'hero-media', 
          content: 'Vídeo institucional ou imagem da equipe', 
          visible: true 
        },
        { 
          id: '3', 
          type: 'about-section', 
          content: 'Somos uma agência digital especializada em criar soluções inovadoras para empresas que querem se destacar no mercado. Com mais de 200 projetos entregues, nossa equipe combina criatividade e tecnologia.', 
          visible: true 
        },
        { 
          id: '4', 
          type: 'gallery-carousel', 
          visible: true,
          data: {
            images: [
              'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
              'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
              'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400'
            ]
          }
        },
        { 
          id: '5', 
          type: 'services-section', 
          visible: true,
          data: {
            services: [
              { title: 'Sites Profissionais', description: 'Desenvolvimento web responsivo', price: 'A partir de R$ 2.997' },
              { title: 'Marketing Digital', description: 'Estratégias completas de crescimento', price: 'A partir de R$ 1.500/mês' },
              { title: 'Identidade Visual', description: 'Branding completo para sua marca', price: 'A partir de R$ 997' }
            ]
          }
        },
        { 
          id: '6', 
          type: 'testimonials', 
          visible: true,
          data: {
            testimonials: [
              { name: 'Ricardo Almeida', role: 'CEO TechStart', content: 'Aumentamos 300% nosso faturamento em 6 meses!' },
              { name: 'Fernanda Torres', role: 'Diretora Marketing', content: 'Equipe muito profissional e resultados incríveis.' }
            ]
          }
        },
        { 
          id: '7', 
          type: 'contact-section', 
          visible: true,
          data: {
            contact: {
              phone: '+55 11 5555-6666',
              email: 'contato@digitalsolutions.com',
              address: 'Av. Paulista, 1000 - São Paulo',
              social: [
                { platform: 'LinkedIn', url: 'https://linkedin.com/company/digitalsolutions' },
                { platform: 'Instagram', url: 'https://instagram.com/digitalsolutions' }
              ]
            }
          }
        }
      ]
    }
  },
  {
    id: 'digital-product',
    name: 'Produto Digital',
    description: 'Landing page para vendas de cursos e infoprodutos',
    preview: 'bg-gradient-to-br from-green-400 to-emerald-500',
    type: 'landing-page',
    content: {
      title: 'Curso Completo de Marketing Digital',
      description: 'Aprenda as estratégias que realmente funcionam',
      backgroundColor: '#f0fdf4',
      textColor: '#14532d',
      elements: [
        { 
          id: '1', 
          type: 'headline', 
          content: 'Domine o Marketing Digital em 30 Dias', 
          visible: true,
          style: { fontSize: '44px', fontWeight: 'bold', textColor: '#14532d' }
        },
        { 
          id: '2', 
          type: 'hero-media', 
          content: 'Vídeo de vendas ou preview do curso', 
          visible: true 
        },
        { 
          id: '3', 
          type: 'about-section', 
          content: 'Este curso foi desenvolvido para quem quer dominar o marketing digital do zero ao avançado. Mais de 50 horas de conteúdo prático com estratégias testadas e aprovadas por milhares de alunos.', 
          visible: true 
        },
        { 
          id: '4', 
          type: 'gallery-carousel', 
          visible: true,
          data: {
            images: [
              'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
              'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
              'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400'
            ]
          }
        },
        { 
          id: '5', 
          type: 'services-section', 
          visible: true,
          data: {
            services: [
              { title: 'Módulo 1: Fundamentos', description: '10 aulas sobre bases do marketing', price: 'Incluído' },
              { title: 'Módulo 2: Tráfego Pago', description: 'Estratégias de anúncios que convertem', price: 'Incluído' },
              { title: 'Bônus: Templates', description: 'Materiais prontos para usar', price: 'Grátis' }
            ]
          }
        },
        { 
          id: '6', 
          type: 'testimonials', 
          visible: true,
          data: {
            testimonials: [
              { name: 'Paulo Mendes', role: 'Empreendedor', content: 'Faturei R$ 50k no primeiro mês aplicando o método!' },
              { name: 'Laura Santos', role: 'Freelancer', content: 'Curso mais completo que já fiz na área.' }
            ]
          }
        },
        { 
          id: '7', 
          type: 'contact-section', 
          visible: true,
          data: {
            contact: {
              phone: '+55 11 7777-8888',
              email: 'suporte@marketingcourse.com',
              social: [
                { platform: 'Instagram', url: 'https://instagram.com/marketingcourse' },
                { platform: 'WhatsApp', url: 'https://wa.me/5511777788888' }
              ]
            }
          }
        }
      ]
    }
  },
  {
    id: 'event',
    name: 'Evento',
    description: 'Landing page para eventos, workshops e palestras',
    preview: 'bg-gradient-to-br from-purple-400 to-pink-500',
    type: 'landing-page',
    content: {
      title: 'Summit de Inovação 2024',
      description: 'O maior evento de tecnologia e inovação do país',
      backgroundColor: '#fdf4ff',
      textColor: '#581c87',
      elements: [
        { 
          id: '1', 
          type: 'headline', 
          content: 'Summit de Inovação 2024: O Futuro Começa Aqui', 
          visible: true,
          style: { fontSize: '40px', fontWeight: 'bold', textColor: '#581c87' }
        },
        { 
          id: '2', 
          type: 'hero-media', 
          content: 'Vídeo promocional do evento', 
          visible: true 
        },
        { 
          id: '3', 
          type: 'about-section', 
          content: 'Dois dias intensos de palestras, workshops e networking com os maiores nomes da tecnologia nacional e internacional. Mais de 50 palestrantes e 3000 participantes esperados.', 
          visible: true 
        },
        { 
          id: '4', 
          type: 'gallery-carousel', 
          visible: true,
          data: {
            images: [
              'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400',
              'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
              'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400'
            ]
          }
        },
        { 
          id: '5', 
          type: 'services-section', 
          visible: true,
          data: {
            services: [
              { title: 'Ingresso Individual', description: 'Acesso completo aos 2 dias', price: 'R$ 297' },
              { title: 'Ingresso Premium', description: 'Acesso + networking VIP', price: 'R$ 497' },
              { title: 'Ingresso Corporativo', description: 'Para equipes (5+ pessoas)', price: 'R$ 197/pessoa' }
            ]
          }
        },
        { 
          id: '6', 
          type: 'testimonials', 
          visible: true,
          data: {
            testimonials: [
              { name: 'Roberto Silva', role: 'CTO inovaTech', content: 'Evento transformador! Networking incrível.' },
              { name: 'Marina Costa', role: 'Founder StartupX', content: 'Conhecimento de altíssimo nível, vale cada centavo.' }
            ]
          }
        },
        { 
          id: '7', 
          type: 'contact-section', 
          visible: true,
          data: {
            contact: {
              phone: '+55 11 9999-0000',
              email: 'contato@summitinovacao.com',
              address: 'Centro de Convenções - São Paulo',
              social: [
                { platform: 'LinkedIn', url: 'https://linkedin.com/summitinovacao' },
                { platform: 'Instagram', url: 'https://instagram.com/summitinovacao' }
              ]
            }
          }
        }
      ]
    }
  },
  {
    id: 'health',
    name: 'Profissional da Saúde',
    description: 'Landing page para médicos, dentistas e especialistas',
    preview: 'bg-gradient-to-br from-teal-400 to-cyan-500',
    type: 'landing-page',
    content: {
      title: 'Dra. Ana Silva - Dermatologista',
      description: 'Cuidando da sua pele com excelência e dedicação',
      backgroundColor: '#f0fdfa',
      textColor: '#134e4a',
      elements: [
        { 
          id: '1', 
          type: 'headline', 
          content: 'Sua Pele Merece o Melhor Cuidado', 
          visible: true,
          style: { fontSize: '42px', fontWeight: 'bold', textColor: '#134e4a' }
        },
        { 
          id: '2', 
          type: 'hero-media', 
          content: 'Foto da doutora ou do consultório', 
          visible: true 
        },
        { 
          id: '3', 
          type: 'about-section', 
          content: 'Dra. Ana Silva é dermatologista formada pela USP com especialização em dermatologia estética. Mais de 10 anos de experiência no tratamento de problemas de pele e procedimentos estéticos avançados.', 
          visible: true 
        },
        { 
          id: '4', 
          type: 'gallery-carousel', 
          visible: true,
          data: {
            images: [
              'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400',
              'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400',
              'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400'
            ]
          }
        },
        { 
          id: '5', 
          type: 'services-section', 
          visible: true,
          data: {
            services: [
              { title: 'Consulta Dermatológica', description: 'Avaliação completa da pele', price: 'R$ 200' },
              { title: 'Botox', description: 'Tratamento de rugas e linhas', price: 'A partir de R$ 400' },
              { title: 'Limpeza de Pele', description: 'Tratamento profissional completo', price: 'R$ 150' }
            ]
          }
        },
        { 
          id: '6', 
          type: 'testimonials', 
          visible: true,
          data: {
            testimonials: [
              { name: 'Julia Oliveira', role: 'Paciente', content: 'Profissional excepcional! Minha pele nunca esteve tão bonita.' },
              { name: 'Marcos Pereira', role: 'Paciente', content: 'Atendimento humanizado e resultados incríveis.' }
            ]
          }
        },
        { 
          id: '7', 
          type: 'contact-section', 
          visible: true,
          data: {
            contact: {
              phone: '+55 11 2222-3333',
              email: 'contato@draanasilva.com',
              address: 'Av. Faria Lima, 500 - Sala 1205',
              social: [
                { platform: 'Instagram', url: 'https://instagram.com/draanasilva' },
                { platform: 'WhatsApp', url: 'https://wa.me/5511222233333' }
              ]
            }
          }
        }
      ]
    }
  },
  {
    id: 'lawyer',
    name: 'Advogado',
    description: 'Landing page para advogados e escritórios jurídicos',
    preview: 'bg-gradient-to-br from-slate-600 to-blue-800',
    type: 'landing-page',
    content: {
      title: 'Dr. João Quadros - Advogado Trabalhista',
      description: 'O Trabalhador bem Informado, tem seu Poder!',
      backgroundColor: '#1e293b',
      textColor: '#f8fafc',
      elements: [
        { 
          id: '1', 
          type: 'headline', 
          content: 'O Trabalhador bem Informado, tem seu Poder!', 
          visible: true,
          style: { fontSize: '44px', fontWeight: 'bold', textColor: '#f8fafc' }
        },
        { 
          id: '2', 
          type: 'hero-media', 
          content: 'Foto do advogado ou vídeo de apresentação', 
          visible: true 
        },
        { 
          id: '3', 
          type: 'about-section', 
          content: 'O Escritório foi fundado pelo Sócio Proprietário João Felipe Quadros da Silva, Advogado Inscrito sob a OAB/PE 45.476, formado pela Universidade São Judas Tadeu, com o propósito de ajudar os trabalhadores para além do óbvio defendendo seus direitos.', 
          visible: true,
          style: { textColor: '#f8fafc' }
        },
        { 
          id: '4', 
          type: 'gallery-carousel', 
          visible: true,
          data: {
            images: [
              'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
              'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400',
              'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400'
            ]
          }
        },
        { 
          id: '5', 
          type: 'services-section', 
          visible: true,
          data: {
            services: [
              { 
                title: 'Para trabalhadores', 
                description: 'Consultoria e defesa especializada para trabalhadores. Defendemos todos os trabalhos além da parcela através em Consultoria Cordata', 
                price: 'Consulta gratuita' 
              },
              { 
                title: 'Atendimento rápido', 
                description: 'Você será atendido de segunda a sábado das 08h às 17h, seja desde a primeira consulta grátis nas terças e quartas ou até falar com um profissional', 
                price: '48h resposta' 
              },
              { 
                title: 'Acompanhamento integral', 
                description: 'Não deixamos nossos clientes sozinhos: Acompanhamos o processo do início ao fim de forma integrada', 
                price: 'Total suporte' 
              },
              { 
                title: 'Sua causa é a nossa!', 
                description: 'Comprometemos você e sua empresa por você, conhecemos todas as suas causas possíveis e até atuamos todos os outros em atuação', 
                price: 'Compromisso total' 
              }
            ]
          }
        },
        { 
          id: '6', 
          type: 'testimonials', 
          visible: true,
          data: {
            testimonials: [
              { name: 'Maria Santos', role: 'Trabalhadora', content: 'Excelente advogado, consegui todos os meus direitos!' },
              { name: 'Pedro Silva', role: 'Funcionário Público', content: 'Profissional muito competente, recomendo a todos.' },
              { name: 'Ana Costa', role: 'Ex-funcionária', content: 'Me ajudou muito no meu processo trabalhista, muito obrigada!' },
              { name: 'Carlos Oliveira', role: 'Aposentado', content: 'Dr. João é um excelente profissional, muito dedicado.' }
            ]
          }
        },
        { 
          id: '7', 
          type: 'contact-section', 
          visible: true,
          data: {
            contact: {
              phone: '+55 11 99343-5259',
              email: 'contato@joaoquadros.adv.br',
              address: 'Av. Paulista, 1439 - 12º Andar, Cj. 12, São Paulo - SP',
              social: [
                { platform: 'Instagram', url: 'https://instagram.com/joaoquadrosadv' },
                { platform: 'WhatsApp', url: 'https://wa.me/5511993435259' }
              ]
            }
          }
        }
      ]
    }
  },
  // ÁRVORE DE LINKS
  {
    id: 'link-tree-classic',
    name: 'Árvore de Links Clássica',
    description: 'Página simples estilo Linktree tradicional',
    preview: 'bg-gradient-to-br from-green-400 to-blue-500',
    type: 'link-tree',
    content: {
      title: 'Meus Links',
      description: 'Todos os meus links em um só lugar',
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      elements: [
        { id: '1', type: 'profile', visible: true },
        { id: '2', type: 'title', content: 'Meus Links', visible: true },
        { id: '3', type: 'description', content: 'Todos os meus links em um só lugar', visible: true },
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
          content: '💼 LinkedIn', 
          url: 'https://linkedin.com/in/seuusuario', 
          visible: true,
          style: { backgroundColor: '#0077B5', textColor: '#ffffff' }
        },
        { 
          id: '6', 
          type: 'button', 
          content: '🎵 Spotify', 
          url: 'https://open.spotify.com/user/seuusuario', 
          visible: true,
          style: { backgroundColor: '#1DB954', textColor: '#ffffff' }
        },
        { 
          id: '7', 
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
    id: 'link-tree-premium',
    name: 'Árvore de Links Premium',
    description: 'Design elegante com elementos visuais e layout sofisticado',
    preview: 'bg-gradient-to-br from-indigo-400 to-purple-500',
    type: 'link-tree',
    content: {
      title: 'Crescent Moon',
      description: 'Delicate, unique and inspiring silver jewellery with Spirit, handmade.',
      backgroundColor: '#f8fafc',
      textColor: '#1e293b',
      elements: [
        { 
          id: '1', 
          type: 'profile', 
          visible: true,
          style: { borderRadius: '50%', padding: '4px' }
        },
        { 
          id: '2', 
          type: 'title', 
          content: 'Crescent Moon', 
          visible: true,
          style: { fontSize: '32px', fontWeight: '400', textColor: '#1e293b', margin: '16px 0' }
        },
        { 
          id: '3', 
          type: 'description', 
          content: 'Delicate, unique and inspiring silver jewellery with Spirit, handmade.', 
          visible: true,
          style: { fontSize: '16px', textColor: '#64748b', margin: '8px 0 24px 0' }
        },
        {
          id: '4',
          type: 'gallery-carousel',
          visible: true,
          data: {
            images: [
              'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300',
              'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300',
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300'
            ]
          }
        },
        { 
          id: '5', 
          type: 'button', 
          content: 'ONLINE STORE', 
          url: 'https://store.crescentmoon.com', 
          visible: true,
          style: { 
            backgroundColor: '#94a3b8', 
            textColor: '#ffffff',
            borderRadius: '0px',
            padding: '16px',
            margin: '8px 0',
            fontSize: '14px',
            fontWeight: '500'
          }
        },
        { 
          id: '6', 
          type: 'button', 
          content: 'GEMSTONES', 
          url: 'https://gems.crescentmoon.com', 
          visible: true,
          style: { 
            backgroundColor: '#94a3b8', 
            textColor: '#ffffff',
            borderRadius: '0px',
            padding: '16px',
            margin: '8px 0',
            fontSize: '14px',
            fontWeight: '500'
          }
        },
        { 
          id: '7', 
          type: 'button', 
          content: 'ABOUT US', 
          url: 'https://about.crescentmoon.com', 
          visible: true,
          style: { 
            backgroundColor: '#94a3b8', 
            textColor: '#ffffff',
            borderRadius: '0px',
            padding: '16px',
            margin: '8px 0',
            fontSize: '14px',
            fontWeight: '500'
          }
        }
      ]
    }
  }
];

export const getTemplate = (id: string): Template | undefined => {
  return templates.find(template => template.id === id);
};
