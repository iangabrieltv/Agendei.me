import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  Calendar, 
  Bell, 
  BarChart3, 
  Smartphone, 
  Instagram, 
  ChevronDown, 
  ChevronRight,
  ChevronLeft,
  MessageCircle, 
  Clock, 
  ShieldCheck,
  Menu,
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Star,
  Play,
  Lock,
  LayoutDashboard,
  LogOut,
  AlertCircle,
  MoreVertical,
  Plus,
  Search,
  Copy,
  Palette,
  Scissors,
  Camera,
  Trash2,
  ExternalLink,
  Sun,
  Moon,
  Save,
  Mail,
  Settings,
  CreditCard,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const BackgroundAnimation = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/20 rounded-full blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-cyan/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
    <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px] animate-bounce" style={{ animationDuration: '10s' }}></div>
    <div className="mesh-gradient absolute inset-0 opacity-50"></div>
  </div>
);

const Navbar = ({ onLogin }: { onLogin: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Como funciona', href: '#como-funciona' },
    { name: 'Preços', href: '#precos' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || mobileMenuOpen ? 'py-4 bg-grafite/80 backdrop-blur-xl border-b border-white/10' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-blue to-brand-cyan rounded-2xl flex items-center justify-center shadow-lg shadow-brand-blue/20 group-hover:rotate-12 transition-transform">
              <Calendar className="text-white w-6 h-6 md:w-7 md:h-7" />
            </div>
            <span className="text-2xl md:text-3xl font-bold font-display tracking-tighter">Agendei<span className="text-brand-blue">.me</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold uppercase tracking-widest">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-white/70 hover:text-brand-blue transition-colors">{link.name}</a>
            ))}
            <button onClick={onLogin} className="glass-btn !py-3 !px-8 !text-xs">Entrar</button>
            <a href="#precos" className="blue-gradient-btn !py-3 !px-8 !text-xs text-center">Testar Grátis</a>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white/5 rounded-xl border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-grafite/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-6 flex flex-col items-center">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-bold text-white/70 hover:text-brand-blue transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="w-full pt-6 flex flex-col gap-4">
                <button 
                  onClick={() => { setMobileMenuOpen(false); onLogin(); }} 
                  className="glass-btn w-full py-4 text-sm"
                >
                  Entrar
                </button>
                <a 
                  href="#precos"
                  onClick={() => setMobileMenuOpen(false)} 
                  className="blue-gradient-btn w-full py-4 text-sm text-center"
                >
                  Testar Grátis
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onStart }: { onStart: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-6 sm:mb-8">
              <Zap className="w-4 h-4 fill-brand-cyan" />
              O Fim das Agendas de Papel e do Caos no WhatsApp
            </div>
            <h1 className="text-4xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] lg:leading-[0.9] mb-6 sm:mb-8 tracking-tighter">
              Sua Agenda Cheia. <br className="hidden sm:block" />
              <span className="text-gradient">Sem Perder um Segundo.</span>
            </h1>
            <p className="text-lg lg:text-2xl text-white/60 mb-8 sm:mb-12 max-w-2xl leading-relaxed font-light">
              Recupere até <span className="text-white font-medium">80% das faltas</span> com lembretes automáticos e profissionalize seu negócio com o sistema de agendamento mais rápido do Brasil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
              <a href="#precos" className="blue-gradient-btn text-lg sm:text-xl px-8 sm:px-12 py-5 sm:py-6 w-full sm:w-auto text-center group">
                Começar meu teste de 7 dias agora
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#como-funciona" className="glass-btn text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-6 w-full sm:w-auto flex items-center justify-center gap-3">
                <Play className="w-5 h-5 fill-white" />
                Ver como funciona
              </a>
            </div>
            <div className="mt-16 flex items-center gap-4 sm:gap-8">
              <div className="flex -space-x-3 sm:-space-x-4 shrink-0">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/200?img=${i+15}`} className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 sm:border-4 border-grafite shadow-xl" alt="User" referrerPolicy="no-referrer" />
                ))}
              </div>
              <div className="flex flex-col items-start gap-1 sm:gap-2">
                <div className="flex text-yellow-500 gap-0.5 sm:gap-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current" />)}
                </div>
                <p className="text-white/90 font-semibold text-[10px] sm:text-base lg:text-lg tracking-tight leading-tight">
                  <span className="text-brand-cyan">+500 profissionais</span> <span className="text-white/50 font-light block sm:inline">já escalaram seus ganhos este mês</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: y1 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="relative z-10 animate-float">
              <div className="w-full aspect-[9/19] max-w-[320px] mx-auto bg-grafite rounded-[3.5rem] border-[12px] border-white/5 shadow-[0_0_100px_rgba(59,130,246,0.2)] overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-grafite rounded-b-3xl z-20"></div>
                <div className="bg-[#0f0f0f] h-full p-6 pt-12">
                  <div className="h-40 bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20 rounded-3xl border border-white/10 p-6 mb-6">
                    <div className="h-4 w-24 bg-white/20 rounded-full mb-4"></div>
                    <div className="h-10 w-full bg-white/10 rounded-xl"></div>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-white/10"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-20 bg-white/20 rounded-full"></div>
                          <div className="h-2 w-32 bg-white/10 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-brand-blue rounded-2xl flex items-center justify-center shadow-lg shadow-brand-blue/30">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-emerald-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-20 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-grafite to-grafite"></div>
        <img 
          src="https://picsum.photos/seed/barber-shop/2560/1440?grayscale" 
          className="w-full h-full object-cover" 
          alt="Background" 
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
};

const Problem = () => (
  <section className="py-20 lg:py-32 relative overflow-hidden bg-grafite">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <h2 className="text-3xl sm:text-6xl font-bold mb-8 leading-tight">
            O Caos do WhatsApp <span className="text-red-500">Drena seu Lucro</span> e sua Saúde Mental.
          </h2>
          <div className="space-y-6 sm:space-y-8">
            <div className="flex gap-4 sm:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0">
                <X className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">O "Vácuo" que Mata Vendas</h4>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed">Clientes desistem de agendar porque você demora 2 horas para responder enquanto atende outro cliente.</p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0">
                <Clock className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Trabalho Não Remunerado</h4>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed">Você passa o domingo e as noites respondendo mensagens em vez de descansar com sua família.</p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0">
                <AlertCircle className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">O Prejuízo do "No-Show"</h4>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed">Cadeiras vazias porque o cliente esqueceu e você não teve tempo de cobrar a confirmação.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative mt-12 lg:mt-0">
          <div className="absolute inset-0 bg-brand-blue/20 blur-[100px] -z-10"></div>
          <img 
            src="https://picsum.photos/seed/stress/800/1000?grayscale" 
            className="rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full" 
            alt="Profissional Estressado" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -right-4 sm:-bottom-10 sm:-right-10 glass-card-light p-6 sm:p-8 max-w-[240px] sm:max-w-xs border-red-500/30">
            <p className="text-red-500 font-bold text-base sm:text-lg mb-1 sm:mb-2">Fato Real:</p>
            <p className="text-white/70 text-xs sm:text-sm">Profissionais autônomos perdem em média <span className="text-white font-bold">R$ 1.200,00/mês</span> apenas com faltas não confirmadas.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Pillars = () => (
  <section id="como-funciona" className="py-20 lg:py-32 relative overflow-hidden">
    <div id="recursos" className="absolute -top-32"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 sm:mb-24">
        <h2 className="text-3xl sm:text-6xl font-bold mb-6 sm:mb-8">Tecnologia que <span className="text-gradient">Trabalha por Você.</span></h2>
        <p className="text-lg sm:text-xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed">
          Desenvolvemos cada recurso com um único objetivo: liberar seu tempo para que você possa focar no seu talento e no crescimento do seu negócio.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
        {[
          {
            title: "Agendamento em 3 Cliques",
            desc: "Sem senhas, sem aplicativos pesados. Seu cliente escolhe o serviço e o horário em segundos. Experiência fluida que converte curiosos em clientes fiéis.",
            icon: <Smartphone className="w-12 h-12 text-brand-blue" />,
            image: "https://i.ibb.co/MkYfBnYZ/image.png"
          },
          {
            title: "Inteligência Anti-Falta",
            desc: "Lembretes automáticos via WhatsApp com confirmação em tempo real. Reduzimos o no-show em até 80% já no primeiro mês de uso.",
            icon: <Bell className="w-12 h-12 text-brand-cyan" />,
            image: "https://i.ibb.co/zV0DWVp4/image.png"
          },
          {
            title: "Gestão de Elite",
            desc: "Faturamento, comissões e controle de estoque em um painel intuitivo. Tome decisões baseadas em dados reais, não em achismos.",
            icon: <BarChart3 className="w-12 h-12 text-indigo-500" />,
            image: "https://i.ibb.co/Kcx9vZ3W/image.png"
          }
        ].map((pillar, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="space-y-8 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-brand-cyan rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <img src={pillar.image} alt={pillar.title} className="w-full aspect-[4/3] object-cover rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 transition-transform group-hover:scale-[1.02]" referrerPolicy="no-referrer" />
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/10 group-hover:border-brand-blue/30 transition-colors">
                {pillar.icon}
              </div>
              <h3 className="text-3xl font-bold">{pillar.title}</h3>
            </div>
            <p className="text-white/60 leading-relaxed text-xl font-light">
              {pillar.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = ({ onSelect }: { onSelect: () => void }) => (
  <section id="precos" className="py-20 lg:py-32 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16 sm:mb-24">
        <h2 className="text-4xl lg:text-7xl font-bold mb-6 sm:mb-8">Investimento <span className="text-gradient">Ridículo.</span></h2>
        <p className="text-lg sm:text-2xl text-white/60 font-light max-w-2xl mx-auto">O valor de um único corte/serviço recuperado paga o sistema pelo mês inteiro.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
        {/* Starter */}
        <div className="glass-card p-6 sm:p-8 md:p-12 flex flex-col border-white/5 hover:border-white/20 transition-colors opacity-80 hover:opacity-100">
          <div className="mb-8 sm:mb-10">
            <h3 className="text-lg sm:text-xl font-bold text-white/40 mb-3 sm:mb-4 uppercase tracking-widest">Teste Grátis</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-bold">R$ 0</span>
              <span className="text-white/40 text-lg sm:text-xl">/7 dias</span>
            </div>
            <p className="mt-4 sm:mt-6 text-white/60 text-base sm:text-lg">Experimente o poder total sem compromisso e sem cartão.</p>
          </div>
          <ul className="space-y-4 sm:space-y-6 mb-10 sm:mb-12 flex-1">
            {[
              "Todas as funções liberadas",
              "Lembretes via WhatsApp",
              "Link de Bio Ativo",
              "Suporte Prioritário"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0"><Check className="w-3 h-3 sm:w-4 sm:h-4 text-brand-blue" /></div>
                {item}
              </li>
            ))}
          </ul>
          <button onClick={onSelect} className="glass-btn !w-full text-lg sm:text-xl py-5 sm:py-6">
            Quero testar grátis
          </button>
        </div>

        {/* PRO */}
        <div className="bg-gradient-to-b from-brand-blue/20 to-transparent backdrop-blur-2xl p-6 sm:p-8 md:p-12 rounded-[2.5rem] sm:rounded-[3rem] border border-brand-blue/30 shadow-[0_0_50px_rgba(59,130,246,0.2)] flex flex-col relative w-full z-10 items-stretch transform lg:scale-105 mt-8 md:mt-0">
          <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-[10px] sm:text-sm font-bold px-6 sm:px-8 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-brand-blue/50 whitespace-nowrap">
            Mais Recomendado
          </div>
          <div className="mb-8 sm:mb-10">
            <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 sm:mb-4 uppercase tracking-widest">Plano PRO</h3>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-white/40 line-through text-lg sm:text-xl">R$ 89,90</span>
              <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-cyan">R$ 49,90</span>
              <span className="text-white/40 text-lg sm:text-xl">/mês</span>
            </div>
            <p className="mt-4 sm:mt-6 text-white/80 text-base sm:text-lg">O arsenal completo para o profissional autônomo.</p>
          </div>
          <ul className="space-y-4 sm:space-y-6 mb-10 sm:mb-12 flex-1">
            {[
              "Agenda Profissional Ilimitada",
              "Link Personalizado para Bio",
              "Lembretes via WhatsApp",
              "Relatórios de Faturamento",
              "Multi-agendas (Equipe)",
              "Cálculo de Comissões",
              "Gestão de Estoque",
              "Atendimento via WhatsApp (Link Direto)"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center shrink-0"><Check className="w-3 h-3 sm:w-4 sm:h-4 text-brand-cyan" /></div>
                {item}
              </li>
            ))}
          </ul>
          <button onClick={onSelect} className="blue-gradient-btn !w-full text-lg sm:text-xl py-5 sm:py-6">
            Assinar Plano PRO
          </button>
          <p className="text-center mt-6 text-white/30 text-[10px] sm:text-xs uppercase tracking-widest font-bold">
            <Lock className="inline-block w-3 h-3 mr-2" />
            Pagamento 100% Seguro
          </p>
        </div>
      </div>
      
      <div className="mt-12 sm:mt-20 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] sm:text-sm font-bold">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          Garantia Incondicional de 7 Dias
        </div>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  
  const questions = [
    { q: "Preciso instalar algum programa ou aplicativo?", a: "Não! O Agendei.me é 100% online. Você e seus clientes acessam direto pelo navegador de qualquer dispositivo (celular, tablet ou PC). Sem ocupar memória do celular e sem atualizações chatas." },
    { q: "Meus clientes precisam criar conta para marcar?", a: "Jamais! Sabemos que cada segundo conta. O cliente só precisa informar o nome e o WhatsApp para garantir o horário. Menos fricção significa mais agendamentos para você." },
    { q: "Como funcionam os lembretes de WhatsApp?", a: "O sistema envia automaticamente uma mensagem personalizada para o cliente antes do horário marcado, com um link para ele confirmar ou desmarcar. Tudo isso sem você precisar tocar no celular." },
    { q: "Posso cancelar minha assinatura quando quiser?", a: "Sim, com total liberdade. Não temos contratos de fidelidade ou multas de cancelamento. Você permanece conosco enquanto o sistema estiver gerando valor para o seu negócio." },
    { q: "O plano PRO de R$ 49,90 tem alguma taxa extra?", a: "Nenhuma taxa escondida. O valor é fixo mensal e inclui todos os recursos de agendamento, lembretes e gestão. Transparência total para você crescer com segurança." }
  ];

  return (
    <section id="faq" className="py-20 lg:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 sm:mb-20">Perguntas <span className="text-gradient">Frequentes</span></h2>
        <div className="space-y-4 sm:space-y-6">
          {questions.map((item, idx) => (
            <div key={idx} className="glass-card !rounded-2xl sm:!rounded-3xl overflow-hidden border-white/5 hover:border-white/10 transition-colors">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 sm:p-8 text-left flex justify-between items-center gap-4"
              >
                <span className="font-bold text-lg sm:text-xl">{item.q}</span>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform ${openIdx === idx ? 'rotate-180 bg-brand-blue/20' : ''}`}>
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 sm:p-8 pt-0 text-white/50 text-base sm:text-lg leading-relaxed border-t border-white/5 mt-2 sm:mt-4">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-grafite border-t border-white/5 pt-20 pb-12 lg:pt-32 lg:pb-16 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 lg:gap-16 mb-16 lg:mb-24">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-blue to-brand-cyan rounded-2xl flex items-center justify-center">
              <Calendar className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-display tracking-tighter">Agendei<span className="text-brand-blue">.me</span></span>
          </div>
          <p className="text-white/40 text-lg sm:text-xl max-w-sm mb-8 sm:mb-10 leading-relaxed">
            A plataforma definitiva para profissionais que buscam excelência, organização e escala.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/5 rounded-2xl border border-white/10">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">Dados Protegidos (LGPD)</span>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-bold text-white mb-6 sm:mb-8 uppercase tracking-widest text-xs sm:text-sm">Plataforma</h4>
          <ul className="space-y-4 sm:space-y-6 text-white/40 text-base sm:text-lg">
            <li><a href="#como-funciona" className="hover:text-brand-blue transition-colors">Como funciona</a></li>
            <li><a href="#precos" className="hover:text-brand-blue transition-colors">Preços</a></li>
            <li><a href="#faq" className="hover:text-brand-blue transition-colors">Dúvidas</a></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-bold text-white mb-6 sm:mb-8 uppercase tracking-widest text-xs sm:text-sm">Suporte</h4>
          <ul className="space-y-4 sm:space-y-6 text-white/40 text-base sm:text-lg">
            <li><a href="#" className="hover:text-brand-blue transition-colors">Central de Ajuda</a></li>
            <li><a href="#" className="hover:text-brand-blue transition-colors">Privacidade</a></li>
            <li><a href="#" className="hover:text-brand-blue transition-colors">Termos</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-bold text-white mb-6 sm:mb-8 uppercase tracking-widest text-xs sm:text-sm">Conecte-se</h4>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-all border border-white/10">
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-all border border-white/10">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="pt-8 sm:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 text-white/20 text-xs sm:text-sm text-center md:text-left">
        <p>© 2026 Agendei.me. Todos os direitos reservados.</p>
        <div className="flex items-center gap-4">
          <Lock className="w-4 h-4" />
          <span>Pagamento 100% Seguro</span>
        </div>
      </div>
    </div>
    
    {/* Decorative Footer Gradient */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-brand-blue/10 to-transparent -z-10"></div>
  </footer>
);

const AuthPage = ({ onBack, onSuccess, initialMode = 'login' }: { 
  onBack: () => void, 
  onSuccess: (user: any) => void,
  initialMode?: 'login' | 'register'
}) => {
  const [isRegistering, setIsRegistering] = useState(initialMode === 'register');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isMaintenance] = useState(false); // Set to true to block access
  
  const [formData, setFormData] = useState({
    identifier: '', // email or username for login
    email: '',      // for registration
    name: '',       // for registration
    password: '',
    confirmPassword: '', // for registration
  });

  if (isMaintenance) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <BackgroundAnimation />
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 glass-btn !py-2 !px-4 !text-xs flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Voltar para o site
        </button>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-light p-12 text-center max-w-md border-brand-blue/30"
        >
          <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-brand-blue" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Acesso Restrito</h2>
          <p className="text-white/40 mb-8">
            O sistema está passando por uma manutenção programada para melhorias na segurança. O acesso será restabelecido em breve.
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/20 uppercase tracking-widest font-bold">
            Status: Manutenção em Andamento
          </div>
        </motion.div>
      </div>
    );
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isRegistering) {
      if (!formData.email || !formData.name || !formData.password || !formData.confirmPassword) {
        setError('Preencha todos os campos');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }
    } else {
      if (!formData.identifier || !formData.password) {
        setError('Preencha todos os campos');
        return;
      }
    }

    setIsLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem('agendei_users') || '{}');
      
      if (isRegistering) {
        if (users[formData.email]) {
          throw new Error('E-mail já cadastrado');
        }
        
        const newUser = {
          id: Date.now().toString(),
          email: formData.email,
          name: formData.name,
          password: formData.password,
          onboarded: false
        };
        
        users[formData.email] = newUser;
        localStorage.setItem('agendei_users', JSON.stringify(users));
        
        setSuccess(true);
        setTimeout(() => {
          onSuccess(newUser);
        }, 2000);
      } else {
        const user = Object.values(users).find((u: any) => u.email === formData.identifier && u.password === formData.password);
        
        if (!user) {
          throw new Error('E-mail ou senha incorretos');
        }
        
        setSuccess(true);
        setTimeout(() => {
          onSuccess(user);
        }, 500);
      }
    } catch (err: any) {
      setError(err.message || 'Erro na autenticação');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dashboard flex justify-center overflow-x-hidden p-4">
      <div className="w-full max-w-md bg-dashboard relative flex flex-col min-h-screen">
        <BackgroundAnimation />
        
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 glass-btn !py-2 !px-4 !text-xs flex items-center gap-2 z-10"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Voltar
        </button>

        <div className="flex-1 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <div className="auth-card-border">
              <div className="glass-card-light">
                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-cyan rounded-3xl flex items-center justify-center shadow-lg shadow-brand-blue/20 mx-auto mb-6">
                    <Calendar className="text-white w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
                    {isRegistering ? 'Crie sua Conta' : 'Bem-vindo ao Painel'}
                  </h2>
                  <p className="text-white/40 font-light text-sm">
                    {isRegistering ? '7 dias grátis para testar' : 'Gerencie sua agenda com facilidade'}
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-5">
                  {isRegistering && (
                    <>
                      <div className="relative">
                        <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input 
                          type="text" 
                          placeholder="Nome Completo"
                          className="glass-input !pl-14"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input 
                          type="email" 
                          placeholder="E-mail"
                          className="glass-input !pl-14"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </>
                  )}

                  {!isRegistering && (
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input 
                        type="text" 
                        placeholder="E-mail ou Usuário"
                        className="glass-input !pl-14"
                        value={formData.identifier}
                        onChange={e => setFormData({...formData, identifier: e.target.value})}
                        required
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input 
                      type="password" 
                      placeholder="Senha"
                      className="glass-input !pl-14"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>

                  {isRegistering && (
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input 
                        type="password" 
                        placeholder="Confirmar Senha"
                        className="glass-input !pl-14"
                        value={formData.confirmPassword}
                        onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                  )}

                  {!isRegistering && (
                    <div className="text-right">
                      <button 
                        type="button"
                        onClick={() => alert('Recuperação de senha em breve!')}
                        className="text-[10px] text-white/40 hover:text-brand-blue uppercase font-bold tracking-widest"
                      >
                        Esqueceu a senha?
                      </button>
                    </div>
                  )}

                  {error && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="neon-red text-center text-sm"
                    >
                      {error}
                    </motion.p>
                  )}

                  <button 
                    type="submit" 
                    disabled={isLoading || success}
                    className="blue-gradient-btn w-full py-5 text-lg !rounded-2xl shadow-xl active:scale-95 transition-transform"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                    ) : success ? (
                      <Check className="w-6 h-6 mx-auto" />
                    ) : (
                      isRegistering ? 'Criar Conta' : 'Entrar'
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <button 
                    onClick={() => {
                      setIsRegistering(!isRegistering);
                      setError('');
                    }}
                    className="text-white/40 hover:text-brand-cyan transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    {isRegistering ? 'Já tem conta? Entrar' : 'Novo por aqui? Criar conta'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface Service {
  id: string;
  name: string;
  price: number;
  time: number;
}

interface Appointment {
  id: string;
  userId: string;
  clientName: string;
  clientPhone: string;
  clientPhoto: string;
  serviceId: string;
  time: string;
  date: string;
  status: 'Marcado' | 'Em Espera' | 'Presente' | 'Finalizado' | 'Atrasado' | 'Cancelado';
}

const getBrasiliaTime = () => {
  const now = new Date();
  // Brasília is UTC-3. AIS environment is usually UTC.
  // The provided local time in metadata is 2026-03-03T09:30:54-08:00 (PST/PDT)
  // But user wants Brasília time.
  return new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
};

const calculateSmartStatus = (app: Appointment): Appointment['status'] => {
  if (app.status === 'Finalizado' || app.status === 'Cancelado' || app.status === 'Presente' || app.status === 'Em Espera') {
    return app.status;
  }

  const now = getBrasiliaTime();
  const today = now.toISOString().split('T')[0];
  
  if (app.date !== today) return 'Marcado';

  const [hours, minutes] = app.time.split(':').map(Number);
  const appTime = new Date(now);
  appTime.setHours(hours, minutes, 0, 0);

  const diffMinutes = (now.getTime() - appTime.getTime()) / (1000 * 60);

  if (diffMinutes > 10) {
    return 'Atrasado';
  }
  
  return 'Marcado';
};

const Dashboard = ({ 
  onLogout, 
  userData, 
  services, 
  appointments, 
  setAppointments,
  setServices,
  setUserData,
  userId
}: { 
  onLogout: () => void, 
  userData: { 
    name: string, 
    establishmentName: string, 
    profilePic: string,
    banner: string,
    theme: string,
    buttonColor: string,
    bioEmail: string,
    bioWhatsapp: string,
    instagram: string
  },
  services: Service[],
  appointments: Appointment[],
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>,
  setServices: React.Dispatch<React.SetStateAction<Service[]>>,
  setUserData: React.Dispatch<React.SetStateAction<any>>,
  userId: string
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'agenda' | 'clientes' | 'site' | 'configuracoes'>('home');
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Persist site data in dashboard state so it doesn't reset when switching tabs
  const [siteData, setSiteData] = useState({
    bioEmail: userData.bioEmail || '',
    bioWhatsapp: userData.bioWhatsapp || '',
    instagram: userData.instagram || '',
    theme: userData.theme || 'dark',
    buttonColor: userData.buttonColor || '#3b82f6',
    banner: userData.banner || '',
    profilePic: userData.profilePic || ''
  });

  // Sync siteData with userData when userData changes (e.g. after initial load)
  useEffect(() => {
    setSiteData({
      bioEmail: userData.bioEmail || '',
      bioWhatsapp: userData.bioWhatsapp || '',
      instagram: userData.instagram || '',
      theme: userData.theme || 'dark',
      buttonColor: userData.buttonColor || '#3b82f6',
      banner: userData.banner || '',
      profilePic: userData.profilePic || ''
    });
  }, [userData]);

  const handleUpdateStatus = async (id: string, status: Appointment['status']) => {
    try {
      const allAppointments = JSON.parse(localStorage.getItem('agendei_appointments') || '{}');
      const userApps = allAppointments[userId] || [];
      const updatedApps = userApps.map((app: any) => app.id === id ? { ...app, status } : app);
      allAppointments[userId] = updatedApps;
      localStorage.setItem('agendei_appointments', JSON.stringify(allAppointments));
      
      setAppointments(prev => prev.map(app => app.id === id ? { ...app, status } : app));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    try {
      const allAppointments = JSON.parse(localStorage.getItem('agendei_appointments') || '{}');
      const userApps = allAppointments[userId] || [];
      const updatedApps = userApps.filter((app: any) => app.id !== id);
      allAppointments[userId] = updatedApps;
      localStorage.setItem('agendei_appointments', JSON.stringify(allAppointments));
      
      setAppointments(prev => prev.filter(app => app.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddAppointment = async (data: { clientName: string, clientPhone: string, clientPhoto: string, serviceId: string, time: string, date: string }) => {
    const newApp: Appointment = {
      id: Date.now().toString(),
      userId: userId,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      clientPhoto: data.clientPhoto,
      serviceId: data.serviceId,
      time: data.time,
      date: data.date,
      status: 'Marcado'
    };

    try {
      const allAppointments = JSON.parse(localStorage.getItem('agendei_appointments') || '{}');
      const userApps = allAppointments[userId] || [];
      const updatedApps = [...userApps, newApp];
      allAppointments[userId] = updatedApps;
      localStorage.setItem('agendei_appointments', JSON.stringify(allAppointments));
      
      setAppointments(prev => [...prev, newApp]);
      setIsAddingAppointment(false);
      setSelectedTime(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex justify-center overflow-x-hidden selection:bg-brand-blue selection:text-white">
      {/* Main Mobile Container (Smartphone Simulation) */}
      <div className="w-full max-w-[500px] flex flex-col min-h-screen relative bg-dashboard border-x border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.2)] overflow-x-hidden">
        
        <main className="flex-1 p-4 pb-32 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'home' && <HomeTab appointments={appointments} services={services} userData={userData} setActiveTab={setActiveTab} calculateSmartStatus={calculateSmartStatus} />}
              {activeTab === 'agenda' && (
                <AgendaTab 
                  appointments={appointments} 
                  services={services} 
                  selectedDate={selectedDate} 
                  setSelectedDate={setSelectedDate} 
                  setIsAddingAppointment={setIsAddingAppointment} 
                  setSelectedTime={setSelectedTime} 
                  handleDeleteAppointment={handleDeleteAppointment} 
                />
              )}
              {activeTab === 'clientes' && <ClientesTab appointments={appointments} services={services} />}
              {activeTab === 'site' && (
                <SiteTab 
                  siteData={siteData} 
                  setSiteData={setSiteData} 
                  userData={userData} 
                  setUserData={setUserData} 
                  userId={userId} 
                  services={services} 
                  setServices={setServices} 
                />
              )}
              {activeTab === 'configuracoes' && (
                <ConfiguracoesTab 
                  userData={userData} 
                  setUserData={setUserData} 
                  onLogout={onLogout} 
                  services={services}
                  setServices={setServices}
                  setTab={setActiveTab}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <NewAppointmentModal 
            isOpen={isAddingAppointment}
            onClose={() => {
              setIsAddingAppointment(false);
              setSelectedTime(null);
            }}
            onSave={handleAddAppointment}
            services={services}
            initialTime={selectedTime}
            initialDate={selectedDate}
          />
        </main>

        {/* Navigation Bar (Always visible in mobile-first simulation) */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] bg-grafite/80 backdrop-blur-2xl border-t border-white/10 flex justify-around items-center py-4 px-2 z-50 border-x border-white/5">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' ? 'text-brand-blue scale-110' : 'text-white/40 hover:text-white/60'}`}>
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
          </button>
          <button onClick={() => setActiveTab('agenda')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'agenda' ? 'text-brand-blue scale-110' : 'text-white/40 hover:text-white/60'}`}>
            <Clock className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Agenda</span>
          </button>
          <button onClick={() => setActiveTab('clientes')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'clientes' ? 'text-brand-blue scale-110' : 'text-white/40 hover:text-white/60'}`}>
            <Users className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Clientes</span>
          </button>
          <button onClick={() => setActiveTab('site')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'site' ? 'text-brand-blue scale-110' : 'text-white/40 hover:text-white/60'}`}>
            <Smartphone className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Site</span>
          </button>
          <button onClick={() => setActiveTab('configuracoes')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'configuracoes' ? 'text-brand-blue scale-110' : 'text-white/40 hover:text-white/60'}`}>
            <Settings className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Ajustes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components moved outside to prevent re-mounting on every parent render ---

// --- Sub-components moved outside to prevent re-mounting on every parent render ---

const NewAppointmentModal = ({ isOpen, onClose, onSave, services, initialTime, initialDate }: any) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    serviceId: services[0]?.id || '',
    time: initialTime || '08:00',
    date: initialDate || new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        clientName: '',
        clientPhone: '',
        serviceId: services[0]?.id || '',
        time: initialTime || '08:00',
        date: initialDate || new Date().toISOString().split('T')[0]
      });
    }
  }, [isOpen, initialTime, initialDate, services]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="w-full max-w-[500px] bg-grafite rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 overflow-y-auto max-h-[90vh] border-t border-white/10"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Novo Agendamento</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/40 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest ml-1">Nome do Cliente</label>
              <input 
                type="text" 
                placeholder="Ex: João Silva"
                className="glass-input w-full"
                value={formData.clientName}
                onChange={e => setFormData({ ...formData, clientName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest ml-1">WhatsApp</label>
              <input 
                type="text" 
                placeholder="(99) 99999-9999"
                className="glass-input w-full"
                value={formData.clientPhone}
                onChange={e => setFormData({ ...formData, clientPhone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest ml-1">Serviço</label>
              <select 
                className="glass-input w-full appearance-none"
                value={formData.serviceId}
                onChange={e => setFormData({ ...formData, serviceId: e.target.value })}
              >
                {services.map((s: any) => (
                  <option key={s.id} value={s.id} className="bg-grafite text-white">{s.name} - R$ {s.price}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest ml-1">Data</label>
                <input 
                  type="date" 
                  className="glass-input w-full"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest ml-1">Horário</label>
                <select 
                  className="glass-input w-full appearance-none"
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                >
                  {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'].map(t => (
                    <option key={t} value={t} className="bg-grafite text-white">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              onClick={() => onSave({ ...formData, clientPhoto: '' })}
              disabled={!formData.clientName || !formData.serviceId}
              className="w-full blue-gradient-btn py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand-blue/20 transition-all active:scale-95 mt-4 disabled:opacity-50 disabled:active:scale-100"
            >
              Salvar Agendamento
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const HomeTab = ({ appointments, services, userData, setActiveTab, calculateSmartStatus }: any) => {
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter((app: any) => app.date === today);
  const confirmedRevenue = appointments
    .filter((app: any) => app.status === 'Finalizado' || app.status === 'Presente')
    .reduce((acc: number, app: any) => {
      const service = services.find((s: any) => s.id === app.serviceId);
      return acc + (service?.price || 0);
    }, 0);

  const nextInLine = appointments
    .filter((app: any) => app.date === today && app.status !== 'Finalizado' && app.status !== 'Cancelado')
    .map((app: any) => ({ ...app, smartStatus: calculateSmartStatus(app) }));

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Olá, {userData.name.split(' ')[0]} 👋</h2>
          <p className="text-white/40">Sua agenda tem <span className="text-brand-cyan font-bold">{todayAppointments.length} agendamentos</span> hoje.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="glass-card-dashboard px-6 py-3 flex items-center gap-3 border-white/5 w-full md:w-auto justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm font-medium">Link Bio Ativo</span>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Agendamentos', value: todayAppointments.length.toString(), sub: 'Hoje', icon: Calendar, color: 'blue' },
          { label: 'Receita Confirmada', value: `R$ ${confirmedRevenue}`, sub: 'Hoje', icon: TrendingUp, color: 'green' },
          { label: 'Atrasos / Alertas', value: nextInLine.filter((a: any) => a.smartStatus === 'Atrasado').length.toString(), sub: 'Atenção', icon: AlertCircle, color: 'orange' },
          { label: 'Taxa de Ocupação', value: todayAppointments.length > 0 ? `${Math.min(100, (todayAppointments.length / 10) * 100)}%` : '0%', sub: 'Hoje', icon: Zap, color: 'cyan' },
        ].map((kpi, i) => (
          <div key={i} className={`glass-card-dashboard p-6 neon-border-${kpi.color}`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-${kpi.color}-500/10`}>
                <kpi.icon className={`w-6 h-6 text-${kpi.color}-500`} />
              </div>
              <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{kpi.sub}</span>
            </div>
            <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{kpi.label}</h3>
            <p className={`text-2xl md:text-3xl font-bold ${kpi.color === 'green' ? 'text-emerald-500' : kpi.color === 'orange' ? 'text-orange-500' : 'text-white'}`}>
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Próximos da Fila */}
      <div className="glass-card-dashboard p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold">Próximos da Fila</h3>
          <button onClick={() => setActiveTab('agenda')} className="text-brand-blue text-sm font-bold hover:underline">Ver todos</button>
        </div>
        
        {nextInLine.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-white/40 font-medium">Ninguém na fila por enquanto.</p>
            <button onClick={() => setActiveTab('agenda')} className="text-brand-blue text-sm font-bold mt-2 hover:underline">Adicionar agendamento</button>
          </div>
        ) : (
          <div className="space-y-4">
            {nextInLine.map((app: any) => {
              const service = services.find((s: any) => s.id === app.serviceId);
              const status = app.smartStatus;
              return (
                <div key={app.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group gap-4 overflow-hidden">
                  <div className="flex items-center gap-3 sm:gap-4 w-full overflow-hidden">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {app.clientPhoto ? (
                        <img src={app.clientPhoto} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="text-white font-bold text-lg sm:text-xl">{app.clientName.charAt(0)}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-white truncate">{app.clientName}</h4>
                      <p className="text-[10px] sm:text-xs text-white/40 truncate">{service?.name} • <span className="text-brand-cyan font-bold">{app.time}</span></p>
                      <p className="text-[9px] sm:text-[10px] text-white/20 truncate">{app.clientPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto gap-3 flex-wrap">
                    <span className={`status-badge ${status === 'Atrasado' ? 'status-delayed' : status === 'Presente' ? 'status-confirmed' : 'status-pending'}`}>
                      {status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const AgendaTab = ({ appointments, services, selectedDate, setSelectedDate, setIsAddingAppointment, setSelectedTime, handleDeleteAppointment, selectedTime }: any) => {
  const times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];
  const [showMonthView, setShowMonthView] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">Agenda</h2>
        <div className="flex gap-3 justify-center">
          <button 
            onClick={() => setShowMonthView(!showMonthView)}
            className="glass-btn !py-2.5 !px-5 !text-[10px] flex items-center gap-2 uppercase tracking-widest active:scale-95 transition-transform"
          >
            <Calendar className="w-4 h-4" />
            {showMonthView ? 'Ver Dia' : 'Ver Mês'}
          </button>
          <button 
            onClick={() => {
              setSelectedTime(null);
              setIsAddingAppointment(true);
            }}
            className="blue-gradient-btn !py-2.5 !px-7 !text-[10px] uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-brand-blue/20"
          >
            + Novo
          </button>
        </div>
      </div>

      {showMonthView ? (
        <div className="glass-card-dashboard p-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Calendário</h3>
            <button onClick={() => setShowMonthView(false)} className="text-brand-blue font-bold text-xs hover:underline">Voltar</button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-white/20 uppercase py-2">{d}</div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const d = new Date();
              d.setDate(i + 1);
              const dateStr = d.toISOString().split('T')[0];
              const hasApp = appointments.some((a: any) => a.date === dateStr);
              const isSelected = selectedDate === dateStr;
              return (
                <button 
                  key={i}
                  onClick={() => {
                    setSelectedDate(dateStr);
                    setShowMonthView(false);
                  }}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-all border ${isSelected ? 'bg-brand-blue border-brand-blue text-white' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'} ${hasApp && !isSelected ? 'border-brand-blue/40' : ''}`}
                >
                  <span className="text-xs font-bold">{i + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* Date Selector */}
          <div className="flex justify-center">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide max-w-full px-2">
              {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
                const d = new Date();
                d.setDate(d.getDate() + offset);
                const dateStr = d.toISOString().split('T')[0];
                const label = offset === 0 ? 'Hoje' : offset === 1 ? 'Amanhã' : d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
                const hasAppointment = appointments.some((a: any) => a.date === dateStr);
                return (
                  <button 
                    key={offset} 
                    onClick={() => setSelectedDate(dateStr)}
                    className={`flex-shrink-0 px-5 py-2.5 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-widest ${selectedDate === dateStr ? 'bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/30' : 'bg-white/5 border-white/10 text-white/40'} ${hasAppointment && selectedDate !== dateStr ? 'border-brand-blue/50' : ''}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Grid */}
          <div className="glass-card-dashboard overflow-hidden">
            <div className="divide-y divide-white/5">
              {times.map((time) => {
                const app = appointments.find((a: any) => a.time === time && a.date === selectedDate);
                const service = app ? services.find((s: any) => s.id === app.serviceId) : null;

                return (
                  <div 
                    key={time} 
                    className="flex items-center gap-4 min-h-[5.5rem] px-5 py-3 cursor-pointer active:bg-white/5 transition-colors group"
                    onClick={() => {
                      if (!app) {
                        setSelectedTime(time);
                        setIsAddingAppointment(true);
                      }
                    }}
                  >
                    <span className="text-xs font-bold text-white/40 w-10 flex-shrink-0">{time}</span>
                    <div className="flex-1 h-full flex items-center">
                      {app ? (
                        <div className={`w-full ${app.status === 'Finalizado' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-brand-blue/10 border-brand-blue/30'} border p-3.5 rounded-xl flex items-center justify-between gap-3`}>
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden flex items-center justify-center flex-shrink-0">
                              {app.clientPhoto ? (
                                <img src={app.clientPhoto} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                              ) : (
                                <span className="text-white/40 font-bold text-sm">{app.clientName.charAt(0)}</span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold text-white truncate">{app.clientName}</p>
                              <p className="text-[9px] text-white/40 truncate uppercase tracking-widest">{service?.name}</p>
                            </div>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAppointment(app.id);
                            }} 
                            className="p-2.5 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-14 border border-dashed border-white/10 rounded-xl flex items-center justify-between px-5 group-hover:border-brand-blue group-hover:bg-brand-blue/5 transition-all">
                          <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Disponível</span>
                          <Plus className="w-5 h-5 text-white/20 group-hover:text-brand-blue" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ClientesTab = ({ appointments, services }: any) => {
  const uniqueClients = Array.from(new Set(appointments.map((a: any) => a.clientName))).map(name => {
    const clientApps = appointments.filter((a: any) => a.clientName === name);
    const lastApp = clientApps[clientApps.length - 1];
    const service = services.find((s: any) => s.id === lastApp.serviceId);
    return {
      name: name as string,
      phone: lastApp.clientPhone,
      service: service?.name || 'N/A',
      date: lastApp.date,
      time: lastApp.time,
      status: lastApp.status
    };
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold">Meus Clientes</h2>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input type="text" placeholder="Buscar cliente..." className="glass-input !py-2 !pl-12 !pr-4 !text-sm w-full sm:!w-64" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueClients.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 glass-card-dashboard p-12 text-center">
            <Users className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/40">Nenhum cliente cadastrado ainda.</p>
          </div>
        ) : (
          uniqueClients.map((client, i) => (
            <div key={i} className="glass-card-dashboard p-6 border-white/5 hover:border-white/10 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-xl">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{client.name}</h3>
                    <p className="text-xs text-white/40">{client.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a 
                    href={`https://wa.me/${client.phone.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center hover:bg-emerald-500/20 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                  <button className="w-10 h-10 rounded-xl bg-white/5 text-white/40 flex items-center justify-center hover:bg-white/10 transition-all">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Último Serviço</span>
                  <span className="text-xs font-medium text-white/60">{client.service}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Data</span>
                  <span className="text-xs font-medium text-white/60">{client.date} às {client.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Status</span>
                  <span className={`status-badge ${client.status === 'Finalizado' ? 'status-confirmed' : client.status === 'Cancelado' ? 'status-delayed' : 'status-pending'}`}>{client.status}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Onboarding = ({ onComplete, userId }: { onComplete: (data: { id: string, name: string, establishmentName: string, profilePic: string, services: Service[], schedule: any }) => void, userId: string }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    profilePic: '',
    establishmentName: '',
    establishmentType: 'unissex',
    logo: '',
    services: [
      { id: '1', name: 'Corte Degradê', price: 45, time: 30 }
    ] as Service[],
    schedule: {
      seg: { open: true, start: '09:00', end: '18:00' },
      ter: { open: true, start: '09:00', end: '18:00' },
      qua: { open: true, start: '09:00', end: '18:00' },
      qui: { open: true, start: '09:00', end: '18:00' },
      sex: { open: true, start: '09:00', end: '18:00' },
      sab: { open: true, start: '09:00', end: '14:00' },
      dom: { open: false, start: '09:00', end: '18:00' },
    }
  });

  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const validateStep = () => {
    const newErrors: string[] = [];
    if (step === 1) {
      if (!formData.name) newErrors.push('name');
      if (!formData.whatsapp || formData.whatsapp.length < 14) newErrors.push('whatsapp');
    } else if (step === 2) {
      if (!formData.establishmentName) newErrors.push('establishmentName');
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = async () => {
    if (validateStep()) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        setIsProcessing(true);
        try {
          // Save profile to localStorage
          const profiles = JSON.parse(localStorage.getItem('agendei_profiles') || '{}');
          const newProfile = {
            user_id: userId,
            name: formData.name,
            establishment_name: formData.establishmentName,
            profile_pic: formData.profilePic || 'https://i.pravatar.cc/100?img=11',
            bio_whatsapp: formData.whatsapp,
            schedule: formData.schedule,
            theme: 'dark',
            button_color: '#3b82f6'
          };
          profiles[userId] = newProfile;
          localStorage.setItem('agendei_profiles', JSON.stringify(profiles));

          // Save services to localStorage
          const allServices = JSON.parse(localStorage.getItem('agendei_services') || '{}');
          allServices[userId] = formData.services;
          localStorage.setItem('agendei_services', JSON.stringify(allServices));

          // Update user onboarded status
          const users = JSON.parse(localStorage.getItem('agendei_users') || '{}');
          const userKey = Object.keys(users).find(k => users[k].id === userId);
          if (userKey) {
            users[userKey].onboarded = true;
            localStorage.setItem('agendei_users', JSON.stringify(users));
          }

          onComplete({
            id: userId,
            name: formData.name,
            establishmentName: formData.establishmentName,
            profilePic: formData.profilePic || 'https://i.pravatar.cc/100?img=11',
            services: formData.services,
            schedule: formData.schedule
          });
        } catch (err) {
          console.error(err);
        } finally {
          setIsProcessing(false);
        }
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { id: Date.now().toString(), name: '', price: 0, time: 30 }]
    });
  };

  const removeService = (id: string) => {
    setFormData({
      ...formData,
      services: formData.services.filter(s => s.id !== id)
    });
  };

  const updateService = (id: string, field: string, value: string | number) => {
    setFormData({
      ...formData,
      services: formData.services.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const toggleDay = (day: string) => {
    setFormData({
      ...formData,
      schedule: {
        ...formData.schedule,
        [day]: { ...formData.schedule[day as keyof typeof formData.schedule], open: !formData.schedule[day as keyof typeof formData.schedule].open }
      }
    });
  };

  const updateTime = (day: string, field: 'start' | 'end', value: string) => {
    setFormData({
      ...formData,
      schedule: {
        ...formData.schedule,
        [day]: { ...formData.schedule[day as keyof typeof formData.schedule], [field]: value }
      }
    });
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin mx-auto mb-8"></div>
          <h2 className="text-3xl font-bold text-white mb-2">Processando sua Agenda...</h2>
          <p className="text-white/40">Estamos configurando tudo para você começar.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard flex justify-center overflow-x-hidden p-4">
      <div className="w-full max-w-2xl bg-dashboard relative flex flex-col min-h-screen py-12 px-4">
        <BackgroundAnimation />
        
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-white/5 z-50">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 4) * 100}%` }}
            className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
        </div>

        <div className="w-full relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-[10px] font-bold uppercase tracking-widest mb-6">
              Etapa {step} de 4
            </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {step === 1 && 'Seu Perfil Profissional'}
            {step === 2 && 'Seu Estabelecimento'}
            {step === 3 && 'Seus Serviços'}
            {step === 4 && 'Sua Jornada de Trabalho'}
          </h1>
          <p className="text-white/40">
            {step === 1 && 'Como os clientes vão te identificar na plataforma.'}
            {step === 2 && 'Conte-nos um pouco sobre o seu espaço.'}
            {step === 3 && 'Quais serviços você oferece e quanto cobra por eles.'}
            {step === 4 && 'Defina os dias e horários que você atende.'}
          </p>
        </div>

        {/* Form Card */}
        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card-dashboard p-8 md:p-12 border-white/5"
        >
          {step === 1 && (
            <div className="space-y-8">
              <div className="flex flex-col items-center gap-6">
                <div className="relative group">
                  <div className={`w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden transition-all ${formData.profilePic ? 'border-brand-blue' : 'border-white/10 group-hover:border-brand-blue'}`}>
                    {formData.profilePic ? (
                      <img src={formData.profilePic} className="w-full h-full object-cover" alt="Preview" referrerPolicy="no-referrer" />
                    ) : (
                      <Camera className="w-8 h-8 text-white/20" />
                    )}
                  </div>
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFormData({...formData, profilePic: URL.createObjectURL(file)});
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center shadow-lg">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Foto de Perfil</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase font-bold tracking-widest">Seu Nome Completo</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Gabriel Silva"
                    className={`glass-input !py-4 ${errors.includes('name') ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : ''}`}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase font-bold tracking-widest">WhatsApp Profissional</label>
                  <input 
                    type="text" 
                    placeholder="(99) 99999-9999"
                    className={`glass-input !py-4 ${errors.includes('whatsapp') ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : ''}`}
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: maskPhone(e.target.value)})}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase font-bold tracking-widest">Nome da Barbearia/Salão</label>
                <input 
                  type="text" 
                  placeholder="Ex: Gabriel Barber Shop"
                  className={`glass-input !py-4 ${errors.includes('establishmentName') ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : ''}`}
                  value={formData.establishmentName}
                  onChange={(e) => setFormData({...formData, establishmentName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase font-bold tracking-widest">Tipo de Negócio</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Masculino', 'Feminino', 'Unissex'].map((type) => (
                    <button 
                      key={type}
                      onClick={() => setFormData({...formData, establishmentType: type.toLowerCase()})}
                      className={`py-4 rounded-2xl border transition-all text-sm font-bold ${formData.establishmentType === type.toLowerCase() ? 'bg-brand-blue border-brand-blue text-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase font-bold tracking-widest">Logo ou Foto de Capa</label>
                <div className="relative h-48 rounded-3xl border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden group hover:border-brand-blue transition-colors">
                  {formData.logo ? (
                    <img src={formData.logo} className="w-full h-full object-cover" alt="Logo" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="text-center">
                      <Camera className="w-10 h-10 text-white/20 mx-auto mb-2" />
                      <p className="text-xs text-white/20 font-bold uppercase">Clique para enviar</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFormData({...formData, logo: URL.createObjectURL(file)});
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest">Seus Serviços</h3>
                <button 
                  onClick={addService}
                  className="text-brand-blue text-xs font-bold flex items-center gap-2 hover:underline"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar outro
                </button>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                <AnimatePresence>
                  {formData.services.map((service, index) => (
                    <motion.div 
                      key={service.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 relative group"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-6 space-y-2">
                          <label className="text-[10px] text-white/20 uppercase font-bold">Nome do Serviço</label>
                          <input 
                            type="text" 
                            placeholder="Ex: Corte Degradê"
                            className="glass-input !py-3 !text-sm"
                            value={service.name}
                            onChange={(e) => updateService(service.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                          <label className="text-[10px] text-white/20 uppercase font-bold">Preço (R$)</label>
                          <input 
                            type="number" 
                            placeholder="0,00"
                            className="glass-input !py-3 !text-sm"
                            value={service.price}
                            onChange={(e) => updateService(service.id, 'price', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                          <label className="text-[10px] text-white/20 uppercase font-bold">Tempo</label>
                          <select 
                            className="glass-input !py-3 !text-sm appearance-none"
                            value={service.time}
                            onChange={(e) => updateService(service.id, 'time', e.target.value)}
                          >
                            {[15, 30, 45, 60, 75, 90, 120].map(t => (
                              <option key={t} value={t} className="bg-grafite">{t} min</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {formData.services.length > 1 && (
                        <button 
                          onClick={() => removeService(service.id)}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all z-20 scale-90 hover:scale-100"
                          title="Remover serviço"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="grid gap-3">
                {Object.entries(formData.schedule).map(([day, config]) => {
                  const dayConfig = config as { open: boolean; start: string; end: string };
                  return (
                    <div key={day} className={`p-4 rounded-2xl border transition-all ${dayConfig.open ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5 opacity-50'}`}>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => toggleDay(day)}
                            className={`w-12 h-6 rounded-full relative transition-colors ${dayConfig.open ? 'bg-brand-blue' : 'bg-white/10'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${dayConfig.open ? 'left-7' : 'left-1'}`}></div>
                          </button>
                          <span className="font-bold text-white uppercase tracking-widest text-sm w-12">{day}</span>
                        </div>
                        
                        {dayConfig.open && (
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            <input 
                              type="time" 
                              className="glass-input !py-2 !px-4 !text-xs !w-full sm:!w-32"
                              value={dayConfig.start}
                              onChange={(e) => updateTime(day, 'start', e.target.value)}
                            />
                            <span className="text-white/20">até</span>
                            <input 
                              type="time" 
                              className="glass-input !py-2 !px-4 !text-xs !w-full sm:!w-32"
                              value={dayConfig.end}
                              onChange={(e) => updateTime(day, 'end', e.target.value)}
                            />
                          </div>
                        )}
                        {!dayConfig.open && <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Fechado</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
            <button 
              onClick={handleBack}
              disabled={step === 1}
              className={`text-sm font-bold uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-white/40 hover:text-white'}`}
            >
              Voltar
            </button>
            <button 
              onClick={handleNext}
              className="blue-gradient-btn !py-4 !px-10 !text-sm flex items-center gap-3"
            >
              {step === 4 ? 'Finalizar e Ver meu Dashboard' : 'Próximo Passo'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
  );
};

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-white/5 rounded-xl ${className}`} />
);

const LinkBio = ({ userId }: { userId: string }) => {
  const [data, setData] = useState<any>(() => {
    const cached = localStorage.getItem(`agendei_bio_cache_${userId}`);
    return cached ? JSON.parse(cached) : null;
  });
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientInfo, setClientInfo] = useState({ name: '', phone: '' });
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        // Fetch profile from localStorage
        const profiles = JSON.parse(localStorage.getItem('agendei_profiles') || '{}');
        const profile = profiles[userId];
        
        if (!profile) throw new Error('Perfil não encontrado');

        // Fetch services from localStorage
        const allServices = JSON.parse(localStorage.getItem('agendei_services') || '{}');
        const servicesData = allServices[userId] || [];

        const json = { 
          user: {
            ...profile,
            establishmentName: profile.establishment_name,
            profilePic: profile.profile_pic,
            buttonColor: profile.button_color,
            bioWhatsapp: profile.bio_whatsapp,
            bioEmail: profile.bio_email
          }, 
          services: servicesData 
        };
        
        if (json.user) {
          setData(json);
          localStorage.setItem(`agendei_bio_cache_${userId}`, JSON.stringify(json));
        }
        
        const saved = localStorage.getItem(`agendei_my_apps_${userId}`);
        if (saved) {
          const ids = JSON.parse(saved);
          const allAppointments = JSON.parse(localStorage.getItem('agendei_appointments') || '{}');
          const userApps = allAppointments[userId] || [];
          const apps = userApps.filter((a: any) => ids.includes(a.id));
          
          setMyAppointments(apps);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsRefreshing(false);
      }
    };
    fetchBio();
  }, [userId]);

  const handleBook = async () => {
    if (!selectedService || !selectedTime || !clientInfo.name || !clientInfo.phone) return;

    const newApp: Appointment = {
      id: Date.now().toString(),
      userId: userId,
      clientName: clientInfo.name,
      clientPhone: clientInfo.phone,
      clientPhoto: '',
      serviceId: selectedService.id,
      time: selectedTime,
      date: selectedDate,
      status: 'Marcado'
    };

    try {
      const allAppointments = JSON.parse(localStorage.getItem('agendei_appointments') || '{}');
      const userApps = allAppointments[userId] || [];
      allAppointments[userId] = [...userApps, newApp];
      localStorage.setItem('agendei_appointments', JSON.stringify(allAppointments));
      
      const saved = JSON.parse(localStorage.getItem(`agendei_my_apps_${userId}`) || '[]');
      localStorage.setItem(`agendei_my_apps_${userId}`, JSON.stringify([...saved, newApp.id]));
      
      setMyAppointments(prev => [...prev, newApp]);
      setSelectedService(null);
      setSelectedTime(null);
      alert('Agendamento realizado com sucesso!');
    } catch (err) {
      alert('Erro ao agendar');
    }
  };

  const handleCancel = async (appId: string) => {
    if (confirm('Deseja realmente cancelar seu agendamento?')) {
      try {
        const allAppointments = JSON.parse(localStorage.getItem('agendei_appointments') || '{}');
        const userApps = allAppointments[userId] || [];
        allAppointments[userId] = userApps.filter((a: any) => a.id !== appId);
        localStorage.setItem('agendei_appointments', JSON.stringify(allAppointments));
        
        setMyAppointments(prev => prev.filter(a => a.id !== appId));
        const saved = JSON.parse(localStorage.getItem(`agendei_my_apps_${userId}`) || '[]');
        localStorage.setItem(`agendei_my_apps_${userId}`, JSON.stringify(saved.filter((id: string) => id !== appId)));
      } catch (err) {
        alert('Erro ao cancelar');
      }
    }
  };

  if (!data && isRefreshing) return (
    <div className={`min-h-screen bg-[#0f0f0f] text-white`}>
      <div className="h-48 md:h-64 w-full bg-white/5 animate-pulse" />
      <div className="max-w-xl mx-auto px-6 -mt-16 relative z-10 pb-20">
        <div className="text-center mb-10">
          <div className="w-32 h-32 rounded-full bg-white/5 mx-auto mb-6 animate-pulse" />
          <Skeleton className="h-8 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  );

  if (!data || !data.user) return (
    <div className="min-h-screen bg-grafite flex items-center justify-center text-white">
      Usuário não encontrado.
    </div>
  );

  const { user, services } = data;
  const theme = user.theme || 'dark';
  const buttonColor = user.buttonColor || '#3b82f6';
  const banner = user.banner;
  const profilePic = user.profilePic;
  const schedule = user.schedule ? JSON.parse(user.schedule) : null;

  const getAvailableTimes = () => {
    if (!schedule || !selectedDate) return ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
    
    const date = new Date(selectedDate + 'T00:00:00');
    const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
    const dayName = days[date.getDay()];
    const dayConfig = schedule[dayName];

    if (!dayConfig || !dayConfig.open) return [];

    const times = [];
    let current = new Date(`2000-01-01T${dayConfig.start}:00`);
    const end = new Date(`2000-01-01T${dayConfig.end}:00`);

    while (current < end) {
      times.push(current.toTimeString().slice(0, 5));
      current.setMinutes(current.getMinutes() + 30); // Intervalo de 30 min
    }
    return times;
  };

  const availableTimes = getAvailableTimes();

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-black' : 'bg-[#0f0f0f] text-white'}`}>
      {theme === 'dark' && <BackgroundAnimation />}
      {/* Banner */}
      <div className="h-48 md:h-64 w-full relative">
        {banner ? (
          <img 
            src={banner} 
            className="w-full h-full object-cover" 
            alt="" 
            referrerPolicy="no-referrer" 
            fetchPriority="high"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
      </div>

      <div className="max-w-xl mx-auto px-6 -mt-16 relative z-10 pb-20">
        <div className="text-center mb-10">
          <div 
            className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white/10 shadow-2xl relative"
            style={{ 
              backgroundColor: buttonColor,
              boxShadow: `0 0 40px ${buttonColor}66`
            }}
          >
            {profilePic ? (
              <img 
                src={profilePic} 
                className="w-full h-full object-cover" 
                alt="" 
                referrerPolicy="no-referrer" 
                fetchPriority="high"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/5">
                <Users className="w-12 h-12 text-white/20" />
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">{user.establishmentName}</h1>
          <p className="opacity-60">Agende seu horário com facilidade</p>
          
          {/* Social Links Header */}
          <div className="flex justify-center gap-4 mt-6">
            {user.bioWhatsapp && (
              <a href={`https://wa.me/${user.bioWhatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className={`p-2 rounded-xl border transition-colors ${theme === 'light' ? 'bg-black/5 border-black/10 hover:bg-black/10' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                <MessageCircle className="w-5 h-5" />
              </a>
            )}
            {user.instagram && (
              <a href={`https://instagram.com/${user.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className={`p-2 rounded-xl border transition-colors ${theme === 'light' ? 'bg-black/5 border-black/10 hover:bg-black/10' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {user.bioEmail && (
              <a href={`mailto:${user.bioEmail}`} className={`p-2 rounded-xl border transition-colors ${theme === 'light' ? 'bg-black/5 border-black/10 hover:bg-black/10' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-4 uppercase tracking-widest opacity-40 text-sm">Nossos Serviços</h3>
          {!data && isRefreshing ? (
            <>
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </>
          ) : (
            services.map((s: Service) => (
              <button 
                key={s.id}
                onClick={() => setSelectedService(s)}
                className={`w-full p-5 rounded-3xl border flex justify-between items-center transition-all hover:scale-[1.02] active:scale-[0.98] text-left shadow-sm`}
                style={{ 
                  backgroundColor: theme === 'light' ? '#f8f9fa' : 'rgba(255,255,255,0.05)',
                  borderColor: theme === 'light' ? '#e9ecef' : 'rgba(255,255,255,0.1)'
                }}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-lg mb-1">{s.name}</p>
                  <div className="flex items-center gap-2 opacity-40 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{s.time} min</span>
                  </div>
                </div>
                <span className="font-bold text-xl" style={{ color: buttonColor }}>R$ {s.price}</span>
              </button>
            ))
          )}
        </div>

        {/* Modal de Agendamento */}
        <AnimatePresence>
          {selectedService && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className={`w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 overflow-y-auto max-h-[90vh] ${theme === 'light' ? 'bg-white' : 'bg-grafite'}`}
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold">Agendar Horário</h2>
                    <p className="opacity-60 text-sm">{selectedService.name} • R$ {selectedService.price}</p>
                  </div>
                  <button onClick={() => setSelectedService(null)} className="p-2 hover:bg-white/10 rounded-full">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs uppercase font-bold opacity-40">Seu Nome</label>
                    <input 
                      type="text" 
                      className={`w-full px-6 py-4 rounded-2xl border bg-transparent focus:outline-none focus:ring-2`}
                      style={{ 
                        borderColor: theme === 'light' ? '#e9ecef' : 'rgba(255,255,255,0.1)',
                        '--tw-ring-color': buttonColor 
                      } as any}
                      placeholder="Como podemos te chamar?"
                      value={clientInfo.name}
                      onChange={e => setClientInfo({...clientInfo, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs uppercase font-bold opacity-40">Seu WhatsApp</label>
                    <input 
                      type="text" 
                      className={`w-full px-6 py-4 rounded-2xl border bg-transparent focus:outline-none focus:ring-2`}
                      style={{ 
                        borderColor: theme === 'light' ? '#e9ecef' : 'rgba(255,255,255,0.1)',
                        '--tw-ring-color': buttonColor 
                      } as any}
                      placeholder="(99) 99999-9999"
                      value={clientInfo.phone}
                      onChange={e => setClientInfo({...clientInfo, phone: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-xs uppercase font-bold opacity-40">Data</label>
                      <input 
                        type="date" 
                        className={`w-full px-4 py-4 rounded-2xl border bg-transparent focus:outline-none`}
                        style={{ borderColor: theme === 'light' ? '#e9ecef' : 'rgba(255,255,255,0.1)' }}
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs uppercase font-bold opacity-40">Horário</label>
                      <select 
                        className={`w-full px-4 py-4 rounded-2xl border bg-transparent focus:outline-none`}
                        style={{ borderColor: theme === 'light' ? '#e9ecef' : 'rgba(255,255,255,0.1)' }}
                        value={selectedTime || ''}
                        onChange={e => setSelectedTime(e.target.value)}
                      >
                        <option value="" disabled>Escolha</option>
                        {availableTimes.length > 0 ? (
                          availableTimes.map(t => (
                            <option key={t} value={t} className="text-black">{t}</option>
                          ))
                        ) : (
                          <option value="" disabled className="text-black">Fechado neste dia</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={handleBook}
                    className="w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-transform active:scale-95 mt-4"
                    style={{ backgroundColor: buttonColor, color: '#fff' }}
                  >
                    Confirmar Agendamento
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meus Agendamentos */}
        {myAppointments.length > 0 && (
          <div className="mt-12 space-y-4">
            <h3 className="text-lg font-bold mb-4 uppercase tracking-widest opacity-40 text-sm">Meus Agendamentos</h3>
            {myAppointments.map(app => (
              <div 
                key={app.id} 
                className={`p-4 rounded-2xl border flex justify-between items-center`}
                style={{ 
                  backgroundColor: theme === 'light' ? '#f8f9fa' : 'rgba(255,255,255,0.05)',
                  borderColor: theme === 'light' ? '#e9ecef' : 'rgba(255,255,255,0.1)'
                }}
              >
                <div>
                  <p className="font-bold">{services.find((s: any) => s.id === app.serviceId)?.name}</p>
                  <p className="text-xs opacity-40">{app.date} às {app.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${app.status === 'Marcado' ? 'bg-brand-blue/20 text-brand-blue' : 'bg-green-500/20 text-green-500'}`}>
                    {app.status}
                  </span>
                  <button onClick={() => handleCancel(app.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rodapé Bio */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <div className="flex justify-center gap-6 mb-8">
            {user.bioWhatsapp && (
              <a href={`https://wa.me/${user.bioWhatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className={`p-3 rounded-full transition-colors ${theme === 'light' ? 'bg-black/5 hover:bg-black/10' : 'bg-white/5 hover:bg-white/10'}`}>
                <MessageCircle className="w-6 h-6" />
              </a>
            )}
            {user.instagram && (
              <a href={`https://instagram.com/${user.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className={`p-3 rounded-full transition-colors ${theme === 'light' ? 'bg-black/5 hover:bg-black/10' : 'bg-white/5 hover:bg-white/10'}`}>
                <Instagram className="w-6 h-6" />
              </a>
            )}
            {user.bioEmail && (
              <a href={`mailto:${user.bioEmail}`} className={`p-3 rounded-full transition-colors ${theme === 'light' ? 'bg-black/5 hover:bg-black/10' : 'bg-white/5 hover:bg-white/10'}`}>
                <Mail className="w-6 h-6" />
              </a>
            )}
          </div>
          <p className="text-xs opacity-20">Desenvolvido por Agendei.me</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'landing' | 'auth' | 'onboarding' | 'dashboard'>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState({
    id: '',
    email: '',
    name: '',
    establishmentName: '',
    profilePic: '',
    banner: '',
    instagram: '',
    theme: 'dark',
    buttonColor: '#3b82f6',
    bioEmail: '',
    bioWhatsapp: '',
    schedule: null
  });

  const fetchDashboardData = async (userId: string) => {
    try {
      // Fetch profile from localStorage
      const profiles = JSON.parse(localStorage.getItem('agendei_profiles') || '{}');
      const profile = profiles[userId];

      if (profile) {
        setUserData({
          id: profile.user_id,
          email: user?.email || '',
          name: profile.name,
          establishmentName: profile.establishment_name,
          profilePic: profile.profile_pic,
          banner: profile.banner || '',
          theme: profile.theme || 'dark',
          buttonColor: profile.button_color || '#3b82f6',
          bioEmail: profile.bio_email || '',
          bioWhatsapp: profile.bio_whatsapp || '',
          instagram: profile.instagram || '',
          schedule: profile.schedule
        });
      }

      // Fetch services
      const allServices = JSON.parse(localStorage.getItem('agendei_services') || '{}');
      setServices(allServices[userId] || []);

      // Fetch appointments
      const allAppointments = JSON.parse(localStorage.getItem('agendei_appointments') || '{}');
      setAppointments(allAppointments[userId] || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const sessionUser = JSON.parse(localStorage.getItem('agendei_session') || 'null');
      if (sessionUser) {
        setUser(sessionUser);
        
        const profiles = JSON.parse(localStorage.getItem('agendei_profiles') || '{}');
        if (profiles[sessionUser.id]) {
          setView('dashboard');
          fetchDashboardData(sessionUser.id);
        } else {
          setView('onboarding');
        }
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/bio/')) {
      const bioId = path.split('/')[2];
      setView('bio' as any);
      setUser({ id: bioId } as any);
    } else if (user && view === 'dashboard') {
      fetchDashboardData(user.id);
    }
  }, [user, view]);

  if ((view as any) === 'bio' && user) {
    return <LinkBio userId={user.id} />;
  }

  if (view === 'dashboard' && user) {
    return (
      <Dashboard 
        onLogout={() => {
          localStorage.removeItem('agendei_session');
          setView('landing');
          setUser(null);
        }} 
        userData={userData} 
        services={services}
        appointments={appointments}
        setAppointments={setAppointments}
        setServices={setServices}
        setUserData={setUserData}
        userId={user.id}
      />
    );
  }

  if (view === 'onboarding' && user) {
    return (
      <Onboarding 
        userId={user.id} 
        onComplete={(data) => {
          setUserData({
            ...userData,
            id: data.id,
            name: data.name,
            establishmentName: data.establishmentName,
            profilePic: data.profilePic,
            schedule: data.schedule
          });
          setServices(data.services);
          setView('dashboard');
        }} 
      />
    );
  }

  if (view === 'auth') {
    return (
      <AuthPage 
        initialMode={authMode} 
        onBack={() => setView('landing')} 
        onSuccess={(loggedUser) => {
          setUser(loggedUser);
          localStorage.setItem('agendei_session', JSON.stringify(loggedUser));
          
          const profiles = JSON.parse(localStorage.getItem('agendei_profiles') || '{}');
          if (profiles[loggedUser.id]) {
            setView('dashboard');
          } else {
            setView('onboarding');
          }
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-dashboard overflow-x-hidden selection:bg-brand-blue selection:text-white">
      <div className="w-full relative flex flex-col min-h-screen">
        <BackgroundAnimation />
        <Navbar onLogin={() => { setAuthMode('login'); setView('auth'); }} />
        <Hero onStart={() => { setAuthMode('register'); setView('auth'); }} />
        <Problem />
        <Pillars />
        <Pricing onSelect={() => { setAuthMode('register'); setView('auth'); }} />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}

const SitePreview = ({ siteData, services, userData }: any) => {
  const theme = siteData.theme || 'dark';
  const buttonColor = siteData.buttonColor || '#3b82f6';
  
  return (
    <div className={`w-full rounded-[2.5rem] border-8 border-white/5 overflow-hidden relative shadow-2xl transition-all duration-500 ${theme === 'light' ? 'bg-white text-black' : 'bg-[#0f0f0f] text-white'}`} style={{ height: '500px' }}>
      <div className="h-full overflow-y-auto scrollbar-hide pb-20">
        {/* Banner */}
        <div className="h-32 w-full relative">
          {siteData.banner ? (
            <img src={siteData.banner} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="px-6 -mt-10 relative z-10">
          <div className="text-center mb-6">
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white/10 shadow-xl"
              style={{ 
                backgroundColor: buttonColor,
                boxShadow: `0 0 20px ${buttonColor}66`
              }}
            >
              {siteData.profilePic ? (
                <img src={siteData.profilePic} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5">
                  <Users className="w-8 h-8 text-white/20" />
                </div>
              )}
            </div>
            <h1 className="text-xl font-bold">{userData.establishmentName}</h1>
            <p className="opacity-60 text-[10px]">Agende seu horário com facilidade</p>
          </div>

          <div className="space-y-3">
            {services.slice(0, 3).map((s: any) => (
              <div 
                key={s.id}
                className="p-4 rounded-2xl border flex justify-between items-center"
                style={{ 
                  backgroundColor: theme === 'light' ? '#f8f9fa' : 'rgba(255,255,255,0.05)',
                  borderColor: theme === 'light' ? '#e9ecef' : 'rgba(255,255,255,0.1)'
                }}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm">{s.name}</p>
                  <p className="opacity-40 text-[9px]">{s.time} min</p>
                </div>
                <span className="font-bold text-sm" style={{ color: buttonColor }}>R$ {s.price}</span>
              </div>
            ))}
            {services.length > 3 && (
              <p className="text-center text-[9px] opacity-40">+{services.length - 3} outros serviços</p>
            )}
          </div>
          
          <button 
            className="w-full py-4 rounded-xl font-bold text-sm shadow-lg mt-6"
            style={{ backgroundColor: buttonColor, color: '#fff' }}
          >
            Agendar Agora
          </button>
        </div>
      </div>
      
      {/* Overlay indicating it's a preview */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 pointer-events-none">
        <span className="text-[9px] font-bold text-white uppercase tracking-widest">Preview</span>
      </div>
    </div>
  );
};

const SiteTab = ({ siteData, setSiteData, userData, setUserData, userId, services, setServices }: any) => {
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const slug = userData.establishmentName.toLowerCase().replace(/\s+/g, '-');
  const publicLink = `barber.app/${slug}`;
  const realLink = `${window.location.origin}/bio/${userId}`;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'banner' | 'profilePic') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSiteData((prev: any) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const profiles = JSON.parse(localStorage.getItem('agendei_profiles') || '{}');
      const updatedProfile = {
        user_id: userId,
        name: userData.name,
        establishment_name: userData.establishmentName,
        profile_pic: siteData.profilePic,
        banner: siteData.banner,
        theme: siteData.theme,
        button_color: siteData.buttonColor,
        bio_email: siteData.bioEmail,
        bio_whatsapp: siteData.bioWhatsapp,
        instagram: siteData.instagram,
        schedule: siteData.schedule
      };
      profiles[userId] = updatedProfile;
      localStorage.setItem('agendei_profiles', JSON.stringify(profiles));
      
      setUserData((prev: any) => ({ ...prev, ...siteData }));
      alert('Configurações salvas com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar alterações.');
    } finally {
      setIsSaving(false);
    }
  };

  const colors = [
    { name: 'Azul', value: '#3b82f6' },
    { name: 'Ciano', value: '#06b6d4' },
    { name: 'Verde', value: '#10b981' },
    { name: 'Laranja', value: '#f59e0b' },
    { name: 'Vermelho', value: '#ef4444' },
    { name: 'Rosa', value: '#ec4899' },
    { name: 'Roxo', value: '#8b5cf6' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(realLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Prefetch bio data when opening Site tab to speed up public link access
    const prefetchBio = async () => {
      try {
        const res = await fetch(`/api/bio/${userId}`);
        const json = await res.json();
        if (json.user) {
          localStorage.setItem(`agendei_bio_cache_${userId}`, JSON.stringify(json));
        }
      } catch (err) {
        console.error('Prefetch failed', err);
      }
    };
    prefetchBio();
  }, [userId]);

  return (
    <div className="space-y-6 pb-32 px-4">
      {/* Preview em Tempo Real */}
      <div className="space-y-3">
        <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest ml-1">Preview em Tempo Real</label>
        <SitePreview siteData={siteData} services={services} userData={userData} />
      </div>

      {/* Link na Bio */}
      <div className="glass-card-dashboard p-5">
        <h3 className="text-lg font-bold mb-4">Link na Bio</h3>
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 overflow-hidden">
            <Smartphone className="w-4 h-4 text-brand-blue flex-shrink-0" />
            <span className="text-[11px] text-white/60 truncate font-mono select-all">{publicLink}</span>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <button 
              onClick={() => window.open(realLink, '_blank')}
              className="p-2 hover:bg-white/10 rounded-lg text-white/60 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button 
              onClick={handleCopy}
              className={`p-2 rounded-lg transition-all ${copied ? 'bg-emerald-500/20 text-emerald-500' : 'hover:bg-white/10 text-brand-blue'}`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Customização Visual */}
      <div className="glass-card-dashboard p-5">
        <h3 className="text-lg font-bold mb-6">Aparência</h3>
        <div className="space-y-6">
          {/* Banner */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Banner Superior</label>
              <label className="cursor-pointer text-brand-blue text-[10px] font-bold hover:underline uppercase tracking-widest">
                Upload
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'banner')} />
              </label>
            </div>
            <div className="relative aspect-[16/6] rounded-xl overflow-hidden border border-white/10 bg-white/5 w-full flex items-center justify-center">
              {siteData.banner ? (
                <img src={siteData.banner} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20" />
              )}
            </div>
          </div>

          {/* Logo/Profile Pic */}
          <div className="space-y-3">
            <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest block">Logotipo / Perfil</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 bg-white/5 flex-shrink-0">
                <img src={siteData.profilePic} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
              </div>
              <label className="cursor-pointer glass-btn !py-2 !px-5 !text-[10px] uppercase tracking-widest">
                Alterar
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'profilePic')} />
              </label>
            </div>
          </div>

          {/* Tema */}
          <div className="space-y-3">
            <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest block">Tema do Site</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setSiteData({...siteData, theme: 'light'})}
                className={`py-3 rounded-xl border transition-all flex flex-col items-center gap-1.5 ${siteData.theme === 'light' ? 'bg-white text-black border-white shadow-lg' : 'bg-white/5 border-white/10 text-white/40'}`}
              >
                <Sun className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Claro</span>
              </button>
              <button 
                onClick={() => setSiteData({...siteData, theme: 'dark'})}
                className={`py-3 rounded-xl border transition-all flex flex-col items-center gap-1.5 ${siteData.theme === 'dark' ? 'bg-white/10 border-white/30 text-white shadow-lg' : 'bg-white/5 border-white/10 text-white/40'}`}
              >
                <Moon className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Escuro</span>
              </button>
            </div>
          </div>

          {/* Cor dos Botões */}
          <div className="space-y-3">
            <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest block">Cor dos Botões</label>
            <div className="flex flex-wrap gap-2.5">
              {colors.map(c => (
                <button 
                  key={c.value}
                  onClick={() => setSiteData({...siteData, buttonColor: c.value})}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${siteData.buttonColor === c.value ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60'}`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest">WhatsApp</label>
              <input 
                type="text" 
                className="glass-input !px-5 !py-3 !text-sm" 
                placeholder="(99) 99999-9999"
                value={siteData.bioWhatsapp}
                onChange={e => setSiteData((prev: any) => ({...prev, bioWhatsapp: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Instagram</label>
              <input 
                type="text" 
                className="glass-input !px-5 !py-3 !text-sm" 
                placeholder="@suabarbearia"
                value={siteData.instagram}
                onChange={e => setSiteData((prev: any) => ({...prev, instagram: e.target.value}))}
              />
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full blue-gradient-btn !py-4 flex items-center justify-center gap-3 text-base shadow-xl active:scale-95 transition-transform"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>

      {/* Serviços */}
      <div className="glass-card-dashboard p-5">
        <h3 className="text-lg font-bold mb-6">Serviços no Site</h3>
        <div className="space-y-4">
          {services.map((service: any) => (
            <div key={service.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <input 
                  type="text" 
                  className="bg-transparent border-none text-white font-bold text-base outline-none flex-1 min-w-0"
                  value={service.name}
                  onChange={e => setServices(services.map((s: any) => s.id === service.id ? { ...s, name: e.target.value } : s))}
                />
                <button 
                  onClick={() => setServices((prev: any) => prev.filter((s: any) => s.id !== service.id))}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-white/20 uppercase font-bold tracking-widest">Preço (R$)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-brand-blue"
                    value={service.price}
                    onChange={e => setServices(services.map((s: any) => s.id === service.id ? { ...s, price: Number(e.target.value) } : s))}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-white/20 uppercase font-bold tracking-widest">Tempo (Min)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-brand-blue"
                    value={service.time}
                    onChange={e => setServices(services.map((s: any) => s.id === service.id ? { ...s, time: Number(e.target.value) } : s))}
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            onClick={() => setServices([...services, { id: Date.now().toString(), name: 'Novo Serviço', price: 0, time: 30 }])}
            className="w-full py-4 rounded-xl border-2 border-dashed border-white/10 text-white/40 hover:text-white hover:border-brand-blue hover:bg-brand-blue/5 transition-all font-bold text-[10px] uppercase tracking-widest"
          >
            + Adicionar Serviço
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfiguracoesTab = ({ userData, setUserData, onLogout, services, setServices, setTab }: any) => {
  const [isSaving, setIsSaving] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  
  const [editData, setEditData] = useState({
    name: userData.name || '',
    establishmentName: userData.establishmentName || '',
    email: userData.email || '',
    profilePic: userData.profilePic || '',
    banner: userData.banner || '',
    instagram: userData.instagram || '',
    bioWhatsapp: userData.bioWhatsapp || '',
    schedule: userData.schedule || {
      seg: { open: true, start: '09:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
      ter: { open: true, start: '09:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
      qua: { open: true, start: '09:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
      qui: { open: true, start: '09:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
      sex: { open: true, start: '09:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
      sab: { open: true, start: '09:00', end: '14:00', lunchStart: '', lunchEnd: '' },
      dom: { open: false, start: '09:00', end: '18:00', lunchStart: '', lunchEnd: '' },
    }
  });

  const handleCopyLink = () => {
    const link = `https://agendei.me/${userData.establishmentName.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(link);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePic' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/user/site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userData.id,
          ...userData,
          ...editData,
          services
        })
      });
      
      if (response.ok) {
        setUserData((prev: any) => ({
          ...prev,
          ...editData
        }));
        alert('Configurações salvas com sucesso!');
        setActiveSubTab(null);
      } else {
        alert('Erro ao salvar alterações');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSchedule = (day: string, field: string, value: any) => {
    setEditData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: { ...prev.schedule[day], [field]: value }
      }
    }));
  };

  const updateService = (id: string, field: string, value: any) => {
    setServices((prev: Service[]) => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const renderMainMenu = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header with Banner */}
      <div className="relative">
        {/* Banner */}
        <div className="h-48 md:h-64 w-full rounded-[2.5rem] overflow-hidden relative group bg-white/5 border border-white/10">
          {editData.banner ? (
            <img src={editData.banner} className="w-full h-full object-cover" alt="Banner" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20 flex items-center justify-center">
              <Smartphone className="w-12 h-12 text-white/10" />
            </div>
          )}
          <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <div className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Alterar Banner</div>
            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'banner')} />
          </label>
        </div>

        {/* Profile Info */}
        <div className="px-8 -mt-16 relative z-10 flex flex-col items-center sm:items-start sm:flex-row sm:justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-grafite bg-grafite shadow-2xl">
                {editData.profilePic ? (
                  <img src={editData.profilePic} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10">
                    <Users className="w-12 h-12" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center cursor-pointer shadow-lg active:scale-90 transition-transform">
                <Camera className="w-5 h-5 text-white" />
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'profilePic')} />
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white">{userData.establishmentName}</h2>
              <p className="text-white/40 text-sm">{userData.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-16">
            <button 
              onClick={() => setActiveSubTab('perfil')}
              className="px-8 py-3 bg-brand-blue text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-blue/20 hover:scale-105 transition-transform active:scale-95"
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      {/* Quick Link */}
      <div className="glass-card-dashboard p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-cyan"></div>
        <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-3">Seu Link da Bio</p>
        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
          <Globe className="w-5 h-5 text-brand-blue flex-shrink-0" />
          <span className="text-sm text-white/60 truncate flex-1">agendei.me/{userData.establishmentName.toLowerCase().replace(/\s+/g, '-')}</span>
          <button 
            onClick={handleCopyLink}
            className="p-2 bg-brand-blue/20 text-brand-blue rounded-xl hover:bg-brand-blue/30 transition-all relative"
          >
            <Copy className="w-4 h-4" />
            <AnimatePresence>
              {copyFeedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full mb-2 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-lg whitespace-nowrap shadow-xl"
                >
                  Link copiado!
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Menu Options */}
      <div className="grid gap-4">
        {[
          { id: 'horarios', label: 'Horários de Atendimento', icon: <Clock className="w-5 h-5" />, desc: 'Defina seus dias e horários de trabalho' },
          { id: 'servicos', label: 'Meus Serviços', icon: <Scissors className="w-5 h-5" />, desc: 'Gerencie preços e duração dos serviços' },
          { id: 'design', label: 'Design do Site', icon: <Palette className="w-5 h-5" />, desc: 'Personalize o banner e visual do seu site' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSubTab(item.id)}
            className="glass-card-dashboard p-6 flex items-center gap-6 text-left hover:bg-white/5 transition-colors group active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-lg">{item.label}</p>
              <p className="text-sm text-white/40">{item.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="pt-8 text-center">
        <button 
          onClick={onLogout}
          className="text-red-500/40 hover:text-red-500 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 mx-auto"
        >
          <LogOut className="w-4 h-4" />
          Sair da Conta
        </button>
      </div>
    </div>
  );

  const renderSubTab = () => {
    const backButton = (
      <button 
        onClick={() => setActiveSubTab(null)}
        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-widest">Voltar</span>
      </button>
    );

    const saveButton = (
      <div className="fixed bottom-[88px] left-0 right-0 md:left-24 px-6 z-40 flex justify-center">
        <div className="w-full max-w-2xl">
          <button 
            onClick={handleSaveAll}
            disabled={isSaving}
            className="w-full blue-gradient-btn !py-5 flex items-center justify-center gap-3 text-lg shadow-2xl active:scale-95 transition-transform"
          >
            {isSaving ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-6 h-6" />
            )}
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    );

    switch (activeSubTab) {
      case 'perfil':
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            {backButton}
            <h3 className="text-2xl font-bold text-white mb-8">Editar Perfil</h3>
            <div className="space-y-6">
              {/* Visual Assets */}
              <div className="glass-card-dashboard p-6 space-y-6">
                <div>
                  <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest block mb-4">Banner do Perfil</label>
                  <div className="aspect-[16/6] rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative group">
                    {editData.banner ? (
                      <img src={editData.banner} className="w-full h-full object-cover" alt="Banner" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20" />
                    )}
                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="bg-white text-black px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Alterar Banner</span>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'banner')} />
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 bg-white/5">
                      {editData.profilePic ? (
                        <img src={editData.profilePic} className="w-full h-full object-cover" alt="Profile" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10"><Users className="w-8 h-8" /></div>
                      )}
                    </div>
                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer">
                      <Camera className="w-5 h-5 text-white" />
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'profilePic')} />
                    </label>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-white">Foto de Perfil</p>
                    <p className="text-xs text-white/40">Clique na foto para alterar</p>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="glass-card-dashboard p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Nome do Estabelecimento</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-blue"
                    value={editData.establishmentName}
                    onChange={(e) => setEditData(prev => ({ ...prev, establishmentName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Seu Nome</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-blue"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Instagram (opcional)</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-blue"
                    placeholder="@seuusuario"
                    value={editData.instagram}
                    onChange={(e) => setEditData(prev => ({ ...prev, instagram: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            {saveButton}
          </div>
        );
      case 'servicos':
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            {backButton}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Meus Serviços</h3>
              <button 
                onClick={() => {
                  const newService: Service = { id: Date.now().toString(), name: 'Novo Serviço', price: 0, time: 30 };
                  setServices([...services, newService]);
                }}
                className="px-4 py-2 bg-brand-blue/20 text-brand-blue rounded-xl text-xs font-bold uppercase tracking-widest"
              >
                + Adicionar
              </button>
            </div>
            <div className="space-y-4">
              {services.map((service: any) => (
                <div key={service.id} className="glass-card-dashboard p-6 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {service.image ? (
                      <img src={service.image} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <Camera className="w-6 h-6 text-white/10" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <input 
                      type="text" 
                      className="w-full bg-transparent text-lg font-bold text-white outline-none focus:text-brand-blue"
                      value={service.name}
                      onChange={(e) => updateService(service.id, 'name', e.target.value)}
                    />
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/20 font-bold uppercase">Preço</span>
                        <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                          <span className="text-[10px] text-white/20">R$</span>
                          <input 
                            type="number" 
                            className="w-16 bg-transparent text-sm font-bold text-emerald-500 outline-none"
                            value={service.price}
                            onChange={(e) => updateService(service.id, 'price', Number(e.target.value))}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/20 font-bold uppercase">Duração</span>
                        <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                          <input 
                            type="number" 
                            className="w-12 bg-transparent text-sm font-bold text-white outline-none"
                            value={service.time}
                            onChange={(e) => updateService(service.id, 'time', Number(e.target.value))}
                          />
                          <span className="text-[10px] text-white/20">min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setServices(services.filter((s: any) => s.id !== service.id))}
                    className="p-3 text-white/10 hover:text-red-500 transition-colors bg-white/5 rounded-xl border border-white/10"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            {saveButton}
          </div>
        );
      case 'horarios':
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            {backButton}
            <h3 className="text-2xl font-bold text-white mb-8">Horários de Atendimento</h3>
            <div className="space-y-4">
              {Object.entries(editData.schedule).map(([key, config]: [string, any]) => {
                const dayNames: any = { seg: 'Segunda', ter: 'Terça', qua: 'Quarta', qui: 'Quinta', sex: 'Sexta', sab: 'Sábado', dom: 'Domingo' };
                return (
                  <div key={key} className="glass-card-dashboard p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-lg">{dayNames[key]}</span>
                      <button 
                        onClick={() => updateSchedule(key, 'open', !config.open)}
                        className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${config.open ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}
                      >
                        {config.open ? 'Aberto' : 'Fechado'}
                      </button>
                    </div>
                    {config.open && (
                      <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                        <div className="space-y-3">
                          <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Horário de Expediente</p>
                          <div className="flex items-center gap-3">
                            <input 
                              type="text" 
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white text-center outline-none focus:border-brand-blue"
                              value={config.start}
                              onChange={(e) => updateSchedule(key, 'start', e.target.value)}
                            />
                            <span className="text-white/20">até</span>
                            <input 
                              type="text" 
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white text-center outline-none focus:border-brand-blue"
                              value={config.end}
                              onChange={(e) => updateSchedule(key, 'end', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Intervalo de Almoço</p>
                          <div className="flex items-center gap-3">
                            <input 
                              type="text" 
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white text-center outline-none focus:border-brand-blue"
                              placeholder="Início"
                              value={config.lunchStart}
                              onChange={(e) => updateSchedule(key, 'lunchStart', e.target.value)}
                            />
                            <span className="text-white/20">até</span>
                            <input 
                              type="text" 
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white text-center outline-none focus:border-brand-blue"
                              placeholder="Fim"
                              value={config.lunchEnd}
                              onChange={(e) => updateSchedule(key, 'lunchEnd', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {saveButton}
          </div>
        );
      case 'design':
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            {backButton}
            <h3 className="text-2xl font-bold text-white mb-8">Design do Site</h3>
            <div className="space-y-8">
              <div className="glass-card-dashboard p-8 space-y-6">
                <div>
                  <label className="text-xs text-white/40 uppercase font-bold tracking-widest block mb-4">Banner Principal</label>
                  <p className="text-sm text-white/20 mb-6">Esta imagem aparecerá no topo do seu site de agendamento.</p>
                  <div className="aspect-[16/7] rounded-[2rem] overflow-hidden bg-white/5 border-2 border-dashed border-white/10 relative group">
                    {editData.banner ? (
                      <img src={editData.banner} className="w-full h-full object-cover" alt="Banner" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white/10 gap-4">
                        <Smartphone className="w-12 h-12" />
                        <span className="text-xs font-bold uppercase tracking-widest">Upload do Banner</span>
                      </div>
                    )}
                    <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <div className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl">
                        Alterar Banner
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'banner')} />
                    </label>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <label className="text-xs text-white/40 uppercase font-bold tracking-widest block mb-6">Foto de Perfil do Site</label>
                  <div className="flex items-center gap-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-white/5 border-2 border-white/10 relative flex-shrink-0">
                      {editData.profilePic ? (
                        <img src={editData.profilePic} className="w-full h-full object-cover" alt="Profile" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10"><Users className="w-8 h-8" /></div>
                      )}
                      <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                        <Camera className="w-6 h-6 text-white" />
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'profilePic')} />
                      </label>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-white text-lg">Foto de Perfil</p>
                      <p className="text-sm text-white/40 leading-relaxed">Recomendamos uma foto nítida do seu rosto ou da sua logomarca.</p>
                      <label className="inline-block mt-4 text-brand-blue text-xs font-bold uppercase tracking-widest cursor-pointer hover:underline">
                        Trocar Foto
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'profilePic')} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {saveButton}
          </div>
        );
      default:
        return renderMainMenu();
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-32">
      {renderSubTab()}
    </div>
  );
};
