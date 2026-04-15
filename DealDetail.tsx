import React from 'react';
import { ChevronRight, Mail, Phone, Users, MessageCircle, Check, AlertCircle } from 'lucide-react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(val);
};

const radarData = [
  { subject: 'Engajamento', A: 85, fullMark: 100 },
  { subject: 'Fit', A: 80, fullMark: 100 },
  { subject: 'Urgência', A: 75, fullMark: 100 },
  { subject: 'Budget', A: 90, fullMark: 100 },
  { subject: 'Autoridade', A: 60, fullMark: 100 },
];

export default function DealDetail() {
  return (
    <AppLayout currentPage="pipeline">
      <div className="flex flex-col h-full font-[var(--font-ui)]">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-1 text-[12px] text-[var(--color-text-tertiary)] mb-2">
            <span>Pipeline</span> <ChevronRight size={12} />
            <span>Negociação</span> <ChevronRight size={12} />
            <span>Metalúrgica RJ</span>
          </div>
          <div className="flex items-end justify-between">
            <h1 className="text-[20px] font-[600] text-[var(--color-text-primary)] tracking-[-0.015em]">Assessoria Tributária — Metalúrgica RJ</h1>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-[var(--color-warning-soft)] text-[var(--color-warning)] text-[12px] font-[500] rounded-full">Negociação</span>
              <span className="font-mono text-[14px] font-[500] text-[var(--color-text-primary)]">{formatCurrency(34500)}</span>
              <span className="font-mono text-[14px] text-[var(--color-text-secondary)]">72%</span>
              <button className="px-3 py-1.5 border border-[var(--color-border)] hover:bg-[var(--color-subtle)] text-[13px] font-[500] rounded-[6px] transition-colors text-[var(--color-text-primary)]">Editar</button>
              <button className="px-3 py-1.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[13px] font-[500] rounded-[6px] transition-colors">Mover estágio →</button>
            </div>
          </div>
        </div>

        {/* Split Layout */}
        <div className="flex flex-1 border border-[var(--color-border)] rounded-[12px] bg-[var(--color-surface)] overflow-hidden">
          
          {/* Left: Tabs + Timeline */}
          <div className="w-[70%] flex flex-col">
            {/* Tabs */}
            <div className="flex px-6 border-b border-[var(--color-border)] pt-4 gap-6">
              {['Visão geral', 'Atividades', 'Propostas', 'Arquivos', 'Notas'].map((tab) => (
                <button 
                  key={tab} 
                  className={`pb-3 text-[14px] ${tab === 'Atividades' ? 'font-[500] text-[var(--color-text-primary)] border-b-2 border-[var(--color-accent)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div className="flex-1 p-6 overflow-y-auto bg-[var(--color-canvas)]">
              <div className="relative pl-6 border-l border-[var(--color-border)] flex flex-col gap-6 ml-2">
                
                {/* Entry 1 */}
                <div className="relative">
                  <div className="absolute left-[-35px] top-4 w-[18px] h-[18px] rounded-full bg-[var(--color-info-soft)] text-[var(--color-info)] flex items-center justify-center ring-4 ring-[var(--color-canvas)]">
                    <Mail size={10} />
                  </div>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px] p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Email</span>
                      <span className="font-mono text-[11px] text-[var(--color-text-tertiary)]">14 Abr · 10:32</span>
                    </div>
                    <p className="text-[13px] text-[var(--color-text-primary)] leading-[1.6] mb-3">
                      "Olá Roberto, conforme conversamos, segue a proposta revisada com os ajustes solicitados no escopo de auditoria fiscal para o Q2..."
                    </p>
                    <div className="bg-[var(--color-subtle)] rounded-[6px] p-2 text-[12px] text-[var(--color-text-secondary)] mb-3 flex gap-2 items-start border border-[var(--color-border)]">
                      <span className="text-[var(--color-accent)] font-[600] shrink-0">◇</span>
                      <span className="font-[500]">Resumo:</span>
                      <span>Proposta enviada com revisão de escopo. Cliente solicitou desconto adicional de 5%.</span>
                    </div>
                    <span className="px-2 py-1 bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-[500] rounded-full inline-block">Positivo</span>
                  </div>
                </div>

                {/* Entry 2 */}
                <div className="relative">
                  <div className="absolute left-[-35px] top-4 w-[18px] h-[18px] rounded-full bg-[var(--color-success-soft)] text-[var(--color-success)] flex items-center justify-center ring-4 ring-[var(--color-canvas)]">
                    <Phone size={10} />
                  </div>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px] p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Ligação</span>
                      <span className="font-mono text-[11px] text-[var(--color-text-tertiary)]">11 Abr · 14:15</span>
                    </div>
                    <p className="text-[13px] text-[var(--color-text-primary)] leading-[1.6] mb-3">
                      "Ligação com Roberto Ferreira (CFO). Duração: 28 min. Discutimos cronograma de implementação e necessidade de reunião presencial."
                    </p>
                    <div className="bg-[var(--color-subtle)] rounded-[6px] p-2 text-[12px] text-[var(--color-text-secondary)] mb-3 flex gap-2 items-start border border-[var(--color-border)]">
                      <span className="text-[var(--color-accent)] font-[600] shrink-0">◇</span>
                      <span className="font-[500]">Resumo:</span>
                      <span>CFO interessado mas quer aprovação do jurídico antes de fechar. Próximo passo: reunião presencial.</span>
                    </div>
                    <span className="px-2 py-1 bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[11px] font-[500] rounded-full inline-block">Neutro</span>
                  </div>
                </div>

                {/* Entry 3 */}
                <div className="relative">
                  <div className="absolute left-[-35px] top-4 w-[18px] h-[18px] rounded-full bg-[#F3E8FF] text-[#7E22CE] flex items-center justify-center ring-4 ring-[var(--color-canvas)]">
                    <Users size={10} />
                  </div>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px] p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Reunião</span>
                      <span className="font-mono text-[11px] text-[var(--color-text-tertiary)]">8 Abr · 09:00</span>
                    </div>
                    <p className="text-[13px] text-[var(--color-text-primary)] leading-[1.6] mb-3">
                      "Reunião de alinhamento com equipe técnica da Metalúrgica RJ. Apresentação de metodologia e cases do setor industrial."
                    </p>
                    <div className="bg-[var(--color-subtle)] rounded-[6px] p-2 text-[12px] text-[var(--color-text-secondary)] mb-3 flex gap-2 items-start border border-[var(--color-border)]">
                      <span className="text-[var(--color-accent)] font-[600] shrink-0">◇</span>
                      <span className="font-[500]">Resumo:</span>
                      <span>Equipe técnica aprovou a metodologia. Decisão final com diretoria em 15/04.</span>
                    </div>
                    <span className="px-2 py-1 bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-[500] rounded-full inline-block">Positivo</span>
                  </div>
                </div>

                {/* Entry 4 */}
                <div className="relative">
                  <div className="absolute left-[-35px] top-4 w-[18px] h-[18px] rounded-full bg-[var(--color-success-soft)] text-[var(--color-success)] flex items-center justify-center ring-4 ring-[var(--color-canvas)]">
                    <MessageCircle size={10} />
                  </div>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[8px] p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">WhatsApp</span>
                      <span className="font-mono text-[11px] text-[var(--color-text-tertiary)]">5 Abr · 16:45</span>
                    </div>
                    <p className="text-[13px] text-[var(--color-text-primary)] leading-[1.6] mb-3 italic">
                      "Mensagem de Roberto: 'Ana, pode me mandar o comparativo que discutimos? Vou apresentar na reunião de diretoria.'"
                    </p>
                    <div className="bg-[var(--color-subtle)] rounded-[6px] p-2 text-[12px] text-[var(--color-text-secondary)] mb-3 flex gap-2 items-start border border-[var(--color-border)]">
                      <span className="text-[var(--color-accent)] font-[600] shrink-0">◇</span>
                      <span className="font-[500]">Resumo:</span>
                      <span>Cliente proativo buscando material para apresentação interna — sinal de engajamento alto.</span>
                    </div>
                    <span className="px-2 py-1 bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-[500] rounded-full inline-block">Positivo</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[30%] border-l border-[var(--color-border)] p-6 bg-[var(--color-surface)] overflow-y-auto">
            
            {/* Health Score */}
            <div className="border border-[var(--color-border)] rounded-[8px] p-4 mb-4">
              <h3 className="text-[12px] uppercase text-[var(--color-text-tertiary)] font-[600] tracking-wider mb-2">Health Score</h3>
              <div className="flex items-baseline mb-4">
                <span className="font-mono text-[40px] font-[600] text-[var(--color-text-primary)] leading-none">78</span>
                <span className="text-[16px] text-[var(--color-text-tertiary)] font-mono ml-1">/100</span>
              </div>
              
              <div className="h-[200px] w-full mx-auto mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid gridType="polygon" stroke="var(--color-border)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }} />
                    <Radar name="Score" dataKey="A" stroke="var(--color-accent)" fill="var(--color-accent-soft)" fillOpacity={0.8} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col gap-2.5">
                {[
                  { name: 'Engajamento', score: 85, color: 'var(--color-success)', icon: <Check size={12} /> },
                  { name: 'Autoridade', score: 60, color: 'var(--color-warning)', icon: <AlertCircle size={12} /> },
                  { name: 'Budget', score: 90, color: 'var(--color-success)', icon: <Check size={12} /> },
                  { name: 'Urgência', score: 75, color: 'var(--color-success)', icon: <Check size={12} /> },
                  { name: 'Fit', score: 80, color: 'var(--color-success)', icon: <Check size={12} /> },
                ].map(factor => (
                  <div key={factor.name} className="flex items-center justify-between text-[12px]">
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)] font-[500]">
                      <span style={{ color: factor.color }}>{factor.icon}</span>
                      {factor.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-[60px] h-[4px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${factor.score}%`, backgroundColor: factor.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Next Step */}
            <div className="bg-[var(--color-accent-soft)] border border-[var(--color-accent)] border-opacity-30 rounded-[8px] p-4 mb-4">
              <h3 className="text-[12px] font-[600] text-[var(--color-accent)] mb-2 flex items-center gap-1.5">
                <span>◇</span> Próximo passo sugerido
              </h3>
              <p className="text-[13px] text-[var(--color-text-primary)] leading-[1.5] mb-4">
                Envie um caso de cliente similar no setor industrial — a taxa de resposta aumenta 3× quando acompanhado de case do mesmo segmento.
              </p>
              <div className="flex gap-2">
                <button className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[12px] font-[500] py-1.5 rounded-[6px] transition-colors text-center">Executar sugestão</button>
                <button className="px-3 border border-[var(--color-border-strong)] hover:bg-white text-[var(--color-text-secondary)] text-[12px] font-[500] py-1.5 rounded-[6px] transition-colors">Ignorar</button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border border-[var(--color-border)] rounded-[8px] p-4 mb-4">
              <h3 className="text-[12px] uppercase text-[var(--color-text-tertiary)] font-[600] tracking-wider mb-4">Contato</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[40px] h-[40px] rounded-full bg-[#FED7AA] text-[#C2410C] flex items-center justify-center font-[600] text-[16px]">R</div>
                <div>
                  <div className="text-[14px] font-[500] text-[var(--color-text-primary)]">Roberto Ferreira</div>
                  <div className="text-[12px] text-[var(--color-text-secondary)]">CFO</div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mb-4">
                <div className="flex items-center gap-2 text-[12px] text-[var(--color-text-secondary)]">
                  <Mail size={14} className="text-[var(--color-text-tertiary)]" /> roberto@metalurgicasj.com.br
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[var(--color-text-secondary)] font-mono">
                  <Phone size={14} className="text-[var(--color-text-tertiary)]" /> (21) 99847-3312
                </div>
              </div>

              <div className="inline-block px-2.5 py-1 bg-[var(--color-warning-soft)] text-[var(--color-warning)] text-[11px] font-[600] rounded-full">Lead Score: C</div>
            </div>

            {/* Custom Fields */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[12px]">
                <span className="text-[var(--color-text-tertiary)]">Setor</span>
                <span className="font-[500] text-[var(--color-text-primary)]">Indústria</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-[var(--color-text-tertiary)]">Fonte</span>
                <span className="font-[500] text-[var(--color-text-primary)]">Outbound</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-[var(--color-text-tertiary)]">Contrato esperado</span>
                <span className="font-[500] font-mono text-[var(--color-text-primary)]">30/04/2025</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}