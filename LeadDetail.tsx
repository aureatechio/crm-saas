import React from 'react';
import { Mail, Phone, MessageCircle, MoreHorizontal, CheckCircle2, XCircle, ArrowRight, Plus, Reply, Edit, Trash2, FileText, CirclePlus } from 'lucide-react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(val);
};

const radarData = [
  { subject: 'Engajamento', A: 85, fullMark: 100 },
  { subject: 'Fit', A: 75, fullMark: 100 },
  { subject: 'Urgência', A: 90, fullMark: 100 },
  { subject: 'Budget', A: 80, fullMark: 100 },
  { subject: 'Autoridade', A: 70, fullMark: 100 },
];

export default function LeadDetail() {
  return (
    <AppLayout currentPage="contatos">
      <div className="flex flex-col h-full font-[var(--font-ui)]">
        
        {/* Page Header */}
        <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-8 py-6 shrink-0 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-[72px] h-[72px] rounded-full bg-[var(--color-subtle)] text-[var(--color-text-secondary)] font-[600] text-[18px] flex items-center justify-center shrink-0">
              M
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-[28px] font-[600] text-[var(--color-text-primary)] tracking-[-0.02em] leading-tight">Marina Oliveira</h1>
              <div className="text-[14px] text-[var(--color-text-tertiary)] mt-1">Diretora Financeira · Contábil Andrade</div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[var(--color-border)] rounded-[6px] text-[12px] text-[var(--color-text-secondary)]">
                  <Mail size={12} /> marina@andrade.com.br
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[var(--color-border)] rounded-[6px] text-[12px] text-[var(--color-text-secondary)]">
                  <Phone size={12} /> (11) 98423-1122
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[var(--color-border)] rounded-[6px] text-[12px] text-[var(--color-text-secondary)]">
                  <MessageCircle size={12} className="text-[#16A34A]" /> WhatsApp
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-[48px] h-[48px] rounded-[10px] bg-[var(--color-accent-soft)] flex items-center justify-center text-[24px] font-[700] text-[var(--color-accent)] font-[var(--font-ui)]">
              A
            </div>
            <div className="flex flex-col gap-2 items-end">
              <button className="h-[36px] px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[13px] font-[500] rounded-[8px] transition-colors">
                Converter em Oportunidade
              </button>
              <div className="flex items-center gap-2">
                <button className="w-[36px] h-[36px] flex items-center justify-center border border-[var(--color-border)] rounded-[8px] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors">
                  <Mail size={16} />
                </button>
                <button className="w-[36px] h-[36px] flex items-center justify-center border border-[var(--color-border)] rounded-[8px] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors">
                  <Phone size={16} />
                </button>
                <button className="w-[36px] h-[36px] flex items-center justify-center border border-[var(--color-border)] rounded-[8px] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stage Stepper */}
        <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-8 py-4 shrink-0 flex items-center">
          <div className="flex items-center w-full max-w-[800px]">
            {/* Stage 1 */}
            <div className="flex flex-col items-center gap-2 relative">
              <CheckCircle2 size={20} className="text-[#16A34A] bg-white rounded-full relative z-10" />
              <span className="text-[12px] text-[var(--color-text-secondary)]">Novo</span>
            </div>
            <div className="flex-1 h-[1px] bg-[#16A34A] relative top-[-10px]"></div>
            
            {/* Stage 2 */}
            <div className="flex flex-col items-center gap-2 relative">
              <CheckCircle2 size={20} className="text-[#16A34A] bg-white rounded-full relative z-10" />
              <span className="text-[12px] text-[var(--color-text-secondary)]">Contatado</span>
            </div>
            <div className="flex-1 h-[1px] bg-[#16A34A] relative top-[-10px]"></div>

            {/* Stage 3 (Active) */}
            <div className="flex flex-col items-center gap-2 relative">
              <div className="w-[20px] h-[20px] rounded-full bg-[var(--color-accent)] flex items-center justify-center relative z-10">
                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
              </div>
              <span className="text-[12px] font-[600] text-[var(--color-accent)]">Qualificado</span>
            </div>
            <div className="flex-1 h-[1px] bg-[var(--color-border)] relative top-[-10px]"></div>

            {/* Stage 4 */}
            <div className="flex flex-col items-center gap-2 relative">
              <div className="w-[20px] h-[20px] rounded-full border border-[var(--color-border-strong)] bg-white relative z-10"></div>
              <span className="text-[12px] text-[var(--color-text-tertiary)]">SQL</span>
            </div>
            <div className="flex-1 h-[1px] bg-[var(--color-border)] relative top-[-10px]"></div>

            {/* Stage 5 */}
            <div className="flex flex-col items-center gap-2 relative">
              <div className="w-[20px] h-[20px] rounded-full border border-[var(--color-border-strong)] bg-white relative z-10"></div>
              <span className="text-[12px] text-[var(--color-text-tertiary)]">Convertido</span>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-8 flex gap-6 shrink-0 sticky top-0 z-20">
          <button className="py-3 text-[14px] font-[500] text-[var(--color-text-primary)] border-b-2 border-[var(--color-accent)]">Visão geral</button>
          <button className="py-3 text-[14px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">Atividades</button>
          <button className="py-3 text-[14px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">Mensagens</button>
          <button className="py-3 text-[14px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">Notas</button>
          <button className="py-3 text-[14px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">Arquivos</button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--color-canvas)] p-8">
          <div className="flex gap-6 max-w-[1200px] mx-auto">
            
            {/* Left Column (70%) */}
            <div className="w-[70%] flex flex-col">
              
              {/* Card 1: AI Summary */}
              <div className="bg-[var(--color-accent-soft)] border border-[rgba(232,93,47,0.25)] rounded-[8px] p-5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[12px] font-[600] text-[var(--color-accent)] flex items-center gap-1.5">
                    <span>◇</span> Resumo do lead
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-[500] rounded-full">Positivo</span>
                    <span className="px-2 py-0.5 bg-[var(--color-info-soft)] text-[var(--color-info)] text-[11px] font-[500] rounded-full">Alto engajamento</span>
                  </div>
                </div>
                <p className="text-[14px] text-[var(--color-text-secondary)] leading-[1.7] mt-2">
                  Marina entrou em contato em 08/04 pelo formulário do site buscando serviço de assessoria tributária para empresa de médio porte. Demonstrou urgência e autoridade para a decisão. Último contato há 2 dias sem resposta — recomendado follow-up imediato.
                </p>
              </div>

              {/* Card 2: AI Next Step */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px] p-[16px_20px] mb-4">
                <div className="text-[12px] font-[600] text-[var(--color-text-secondary)] flex items-center gap-1.5">
                  <span className="text-[var(--color-accent)]">◇</span> Próximo passo sugerido
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-[1.6] mt-[6px]">
                  Envie o estudo de caso da Metalúrgica RJ — setor similar, cliente fechou em 14 dias após receber este material.
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="h-[32px] px-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[12px] font-[500] rounded-[8px] transition-colors">Enviar agora</button>
                  <button className="h-[32px] px-3 border border-[var(--color-border-strong)] hover:bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[12px] font-[500] rounded-[8px] transition-colors">Ver outros</button>
                </div>
              </div>

              {/* Timeline */}
              <h2 className="text-[13px] font-[600] text-[var(--color-text-secondary)] mb-3 mt-2">Atividade recente</h2>
              
              <div className="relative ml-2 pl-[24px] border-l border-[var(--color-border)] flex flex-col gap-6 pb-4">
                
                {/* Entry 1 */}
                <div className="relative group">
                  <div className="absolute left-[-33px] top-1 w-[16px] h-[16px] rounded-full bg-[var(--color-info-soft)] text-[var(--color-info)] flex items-center justify-center ring-4 ring-[var(--color-canvas)]">
                    <Mail size={10} />
                  </div>
                  <div className="flex items-center gap-2 mb-2 ml-[-4px]">
                    <span className="text-[12px] text-[var(--color-text-secondary)]">Email enviado · 2 dias atrás</span>
                  </div>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px] p-[12px_16px] shadow-sm relative">
                    <h4 className="text-[13px] font-[500] text-[var(--color-text-primary)] mb-1">Proposta comercial inicial</h4>
                    <p className="text-[12px] text-[var(--color-text-tertiary)] italic flex gap-1.5 items-start">
                      <span className="text-[var(--color-accent)] font-[600] shrink-0 not-italic">◇</span> 
                      Enviou apresentação completa com 3 opções de pacote.
                    </p>
                    {/* Hover actions */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-[28px] h-[28px] flex items-center justify-center rounded-[6px] text-[var(--color-text-tertiary)] hover:bg-[var(--color-subtle)] hover:text-[var(--color-text-secondary)]"><Reply size={14} /></button>
                      <button className="w-[28px] h-[28px] flex items-center justify-center rounded-[6px] text-[var(--color-text-tertiary)] hover:bg-[var(--color-subtle)] hover:text-[var(--color-text-secondary)]"><Edit size={14} /></button>
                      <button className="w-[28px] h-[28px] flex items-center justify-center rounded-[6px] text-[var(--color-text-tertiary)] hover:bg-[var(--color-danger-soft)] hover:text-[var(--color-danger)]"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>

                {/* Entry 2 */}
                <div className="relative">
                  <div className="absolute left-[-33px] top-1 w-[16px] h-[16px] rounded-full bg-[var(--color-success-soft)] text-[var(--color-success)] flex items-center justify-center ring-4 ring-[var(--color-canvas)]">
                    <MessageCircle size={10} />
                  </div>
                  <div className="flex items-center gap-2 mb-2 ml-[-4px]">
                    <span className="text-[12px] text-[var(--color-text-secondary)]">WhatsApp recebido · 3 dias atrás</span>
                  </div>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px] p-[12px_16px] shadow-sm">
                    <h4 className="text-[13px] font-[500] text-[var(--color-text-primary)] mb-1">Gostei da proposta, posso...</h4>
                    <p className="text-[12px] text-[var(--color-text-tertiary)] italic flex gap-1.5 items-start mb-2">
                      <span className="text-[var(--color-accent)] font-[600] shrink-0 not-italic">◇</span> 
                      Cliente pediu desconto de 10% e quer revisar cláusula de reajuste.
                    </p>
                    <span className="inline-block px-2 py-0.5 bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[11px] font-[500] rounded-[6px]">Neutro</span>
                  </div>
                </div>

                {/* Entry 3 */}
                <div className="relative">
                  <div className="absolute left-[-33px] top-1 w-[16px] h-[16px] rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center ring-4 ring-[var(--color-canvas)]">
                    <Phone size={10} />
                  </div>
                  <div className="flex items-center gap-2 mb-2 ml-[-4px]">
                    <span className="text-[12px] text-[var(--color-text-secondary)]">Ligação realizada · 5 dias atrás · 23 min</span>
                  </div>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px] p-[12px_16px] shadow-sm">
                    <h4 className="text-[13px] font-[500] text-[var(--color-text-primary)] mb-1">Call com Ana Beatriz</h4>
                    <p className="text-[12px] text-[var(--color-text-tertiary)] italic flex gap-1.5 items-start">
                      <span className="text-[var(--color-accent)] font-[600] shrink-0 not-italic">◇</span> 
                      Briefing inicial. Empresa tem 3 CNPJs, Lucro Presumido, insatisfeita com contador atual por falta de proatividade.
                    </p>
                  </div>
                </div>

                {/* Entry 4 */}
                <div className="relative">
                  <div className="absolute left-[-33px] top-1 w-[16px] h-[16px] rounded-full bg-[var(--color-warning-soft)] text-[var(--color-warning)] flex items-center justify-center ring-4 ring-[var(--color-canvas)]">
                    <FileText size={10} />
                  </div>
                  <div className="flex items-center gap-2 mb-2 ml-[-4px]">
                    <span className="text-[12px] text-[var(--color-text-secondary)]">Nota criada · 6 dias atrás · por Ana Beatriz</span>
                  </div>
                  <div className="bg-[#FEFCE8] border border-[var(--color-warning-soft)] rounded-[8px] p-[12px_16px] shadow-sm">
                    <p className="text-[13px] text-[var(--color-text-primary)] leading-[1.6]">
                      Indicada por Carlos Mendes (cliente atual). Orçamento mencionado: ~R$ 4.500/mês. Urgência: quer fechar antes do Q2.
                    </p>
                  </div>
                </div>

                {/* Entry 5 */}
                <div className="relative">
                  <div className="absolute left-[-33px] top-1 w-[16px] h-[16px] rounded-full bg-[var(--color-subtle)] text-[var(--color-text-tertiary)] flex items-center justify-center ring-4 ring-[var(--color-canvas)]">
                    <CirclePlus size={10} />
                  </div>
                  <div className="flex items-center gap-2 mb-2 ml-[-4px]">
                    <span className="text-[12px] text-[var(--color-text-secondary)]">Lead criado · 7 dias atrás · via formulário do site</span>
                  </div>
                  <div className="p-[4px_16px]">
                    <p className="text-[12px] text-[var(--color-text-tertiary)]">
                      Lead capturado automaticamente via integração com site.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column (30%) */}
            <div className="w-[30%] flex flex-col gap-4">
              
              {/* Card 1: Lead Health */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px] p-4">
                <h3 className="text-[12px] uppercase text-[var(--color-text-tertiary)] font-[600] tracking-wider mb-3">Lead Health</h3>
                <div className="flex items-baseline mb-2">
                  <span className="font-[var(--font-mono)] text-[32px] font-[600] text-[var(--color-text-primary)]">78</span>
                  <span className="text-[16px] text-[var(--color-text-tertiary)] ml-1 font-[var(--font-mono)]">/100</span>
                </div>
                
                <div className="w-[180px] h-[180px] mx-auto my-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid gridType="polygon" stroke="var(--color-subtle)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }} />
                      <Radar name="Score" dataKey="A" stroke="var(--color-accent)" strokeWidth={2} fill="var(--color-accent-soft)" fillOpacity={1} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-col gap-1.5 mt-3">
                  <div className="flex items-start gap-2 text-[12px]">
                    <CheckCircle2 size={14} className="text-[var(--color-success)] shrink-0 mt-[1px]" />
                    <span className="text-[var(--color-text-secondary)]">Respondeu 4 de 5 emails</span>
                  </div>
                  <div className="flex items-start gap-2 text-[12px]">
                    <CheckCircle2 size={14} className="text-[var(--color-success)] shrink-0 mt-[1px]" />
                    <span className="text-[var(--color-text-secondary)]">Cargo decisor confirmado</span>
                  </div>
                  <div className="flex items-start gap-2 text-[12px]">
                    <CheckCircle2 size={14} className="text-[var(--color-success)] shrink-0 mt-[1px]" />
                    <span className="text-[var(--color-text-secondary)]">Orçamento mencionado</span>
                  </div>
                  <div className="flex items-start gap-2 text-[12px]">
                    <XCircle size={14} className="text-[var(--color-danger)] shrink-0 mt-[1px]" />
                    <span className="text-[var(--color-text-tertiary)]">Sem data de decisão definida</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Informações */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px] p-4">
                <h3 className="text-[12px] uppercase text-[var(--color-text-tertiary)] font-[600] tracking-wider mb-3">Informações</h3>
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Responsável</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-[20px] h-[20px] rounded-full bg-[#1e40af] text-white flex items-center justify-center text-[8px] font-semibold">AB</div>
                      <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Ana Beatriz</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Origem</span>
                    <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Formulário do site</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Campanha</span>
                    <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Google Ads — Contabilidade</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Criado em</span>
                    <span className="text-[12px] font-[500] text-[var(--color-text-secondary)] font-[var(--font-mono)]">08/04/2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Último contato</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-[500] text-[var(--color-text-secondary)] font-[var(--font-mono)]">12/04/2025</span>
                      <span className="text-[11px] text-[var(--color-text-tertiary)]">2 dias atrás</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="px-2 py-0.5 bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[10px] rounded-[4px]">Tributação</span>
                    <span className="px-2 py-0.5 bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[10px] rounded-[4px]">Médio porte</span>
                    <span className="px-2 py-0.5 bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[10px] rounded-[4px]">Indicação</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Empresa */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px] p-4">
                <h3 className="text-[12px] uppercase text-[var(--color-text-tertiary)] font-[600] tracking-wider mb-3">Empresa</h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-[32px] h-[32px] rounded-[6px] bg-[var(--color-subtle)] flex items-center justify-center text-[10px] text-[var(--color-text-tertiary)] font-[600]">AC</div>
                    <span className="text-[13px] font-[500] text-[var(--color-text-primary)]">Andrade Contábil</span>
                  </div>
                  <a href="#" className="text-[11px] text-[var(--color-accent)] hover:underline">Ver empresa →</a>
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">CNPJ</span>
                    <span className="text-[12px] font-[500] text-[var(--color-text-secondary)] font-[var(--font-mono)]">12.345.678/0001-90</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Porte</span>
                    <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Médio porte (50–200 func.)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Setor</span>
                    <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Contabilidade e Assessoria</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Faturamento est.</span>
                    <span className="text-[12px] font-[500] text-[var(--color-text-secondary)] font-[var(--font-mono)]">R$ 8.000.000/ano</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Funcionários</span>
                    <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">~80</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Oportunidades */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px] p-4">
                <h3 className="text-[12px] uppercase text-[var(--color-text-tertiary)] font-[600] tracking-wider mb-3">Oportunidades</h3>
                <div className="border border-[var(--color-border)] rounded-[6px] p-[10px_12px] mb-2 flex items-center justify-between group cursor-pointer hover:border-[var(--color-border-strong)] transition-colors">
                  <div>
                    <div className="text-[12px] font-[500] text-[var(--color-text-primary)] mb-1">Assessoria Tributária — Andrade Contábil</div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[var(--color-warning-soft)] text-[var(--color-warning)] text-[10px] font-[500] rounded-full">Negociação</span>
                      <span className="text-[12px] text-[var(--color-text-secondary)] font-[var(--font-mono)]">{formatCurrency(34500)}</span>
                    </div>
                  </div>
                  <ArrowRight size={12} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-secondary)] transition-colors" />
                </div>
                <button className="w-full h-[32px] mt-2 border border-dashed border-[var(--color-border-strong)] rounded-[8px] text-[12px] text-[var(--color-text-tertiary)] flex items-center justify-center gap-1.5 hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors">
                  <Plus size={14} /> Criar oportunidade
                </button>
              </div>

              {/* Card 5: Campos personalizados */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px] p-4">
                <h3 className="text-[12px] uppercase text-[var(--color-text-tertiary)] font-[600] tracking-wider mb-3">Campos personalizados</h3>
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Regime tributário</span>
                    <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Lucro Presumido</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Número de CNPJs</span>
                    <span className="text-[12px] font-[500] text-[var(--color-text-secondary)] font-[var(--font-mono)]">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Contador atual</span>
                    <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Sim, insatisfeito</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Urgência declarada</span>
                    <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Alta</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
