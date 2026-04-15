import React, { useState } from 'react';
import { MoreHorizontal, Plus, X, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(val);
};

const sparklineGreen = [{v:10},{v:12},{v:15},{v:14},{v:20},{v:25},{v:30}];
const sparklineBlue = [{v:20},{v:18},{v:15},{v:22},{v:18},{v:20},{v:15}];
const sparklineRed = [{v:5},{v:5},{v:8},{v:12},{v:10},{v:15},{v:18}];

export default function Cobranca() {
  const [panelOpen, setPanelOpen] = useState(true);

  return (
    <AppLayout currentPage="cobranca">
      <div className="flex flex-col h-full font-[var(--font-ui)] relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-[20px] font-[600] text-[var(--color-text-primary)]">Cobrança</h1>
            <select className="bg-transparent border border-[var(--color-border)] rounded-[6px] text-[13px] px-2 py-1 text-[var(--color-text-secondary)] outline-none focus:border-[var(--color-accent)] cursor-pointer">
              <option>Abril 2025</option>
              <option>Março 2025</option>
              <option>Fevereiro 2025</option>
            </select>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[13px] font-[500] rounded-[6px] transition-colors">
            <Plus size={14} /> Nova Fatura
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* KPI 1 */}
          <div className="bg-white border border-[var(--color-border)] rounded-[8px] p-4 flex flex-col gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="text-[12px] uppercase text-[var(--color-text-tertiary)] font-[600] tracking-wide">Recebido no Mês</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="font-mono text-[32px] font-[600] text-[var(--color-text-primary)] leading-none mb-1">{formatCurrency(287400)}</div>
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-mono font-[500]">
                  <ArrowUpRight size={10} /> +15,3%
                </div>
              </div>
              <div className="w-[50px] h-[32px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparklineGreen}>
                    <Area type="monotone" dataKey="v" stroke="var(--color-success)" fill="var(--color-success-soft)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-white border border-[var(--color-border)] rounded-[8px] p-4 flex flex-col gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="text-[12px] uppercase text-[var(--color-text-tertiary)] font-[600] tracking-wide">A Receber</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="font-mono text-[32px] font-[600] text-[var(--color-text-primary)] leading-none mb-1">{formatCurrency(142800)}</div>
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--color-info-soft)] text-[var(--color-info)] text-[11px] font-mono font-[500]">
                  <ArrowDownRight size={10} /> -3,2%
                </div>
              </div>
              <div className="w-[50px] h-[32px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparklineBlue}>
                    <Area type="monotone" dataKey="v" stroke="var(--color-info)" fill="var(--color-info-soft)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-white border border-[var(--color-border)] rounded-[8px] p-4 flex flex-col gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="text-[12px] uppercase text-[var(--color-text-tertiary)] font-[600] tracking-wide">Inadimplência</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="font-mono text-[32px] font-[600] text-[var(--color-danger)] leading-none mb-1">{formatCurrency(18500)}</div>
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--color-danger-soft)] text-[var(--color-danger)] text-[11px] font-mono font-[500]">
                  <ArrowUpRight size={10} /> +2,1%
                </div>
              </div>
              <div className="w-[50px] h-[32px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparklineRed}>
                    <Area type="monotone" dataKey="v" stroke="var(--color-danger)" fill="var(--color-danger-soft)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-[var(--color-border)] rounded-[8px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-canvas)]">
                <th className="py-3 px-4 text-[11px] font-[600] uppercase text-[var(--color-text-tertiary)] tracking-wider">#</th>
                <th className="py-3 px-4 text-[11px] font-[600] uppercase text-[var(--color-text-tertiary)] tracking-wider">Cliente</th>
                <th className="py-3 px-4 text-[11px] font-[600] uppercase text-[var(--color-text-tertiary)] tracking-wider">Descrição</th>
                <th className="py-3 px-4 text-[11px] font-[600] uppercase text-[var(--color-text-tertiary)] tracking-wider text-right">Vencimento</th>
                <th className="py-3 px-4 text-[11px] font-[600] uppercase text-[var(--color-text-tertiary)] tracking-wider text-right">Valor</th>
                <th className="py-3 px-4 text-[11px] font-[600] uppercase text-[var(--color-text-tertiary)] tracking-wider text-center">Status</th>
                <th className="py-3 px-4 text-[11px] font-[600] uppercase text-[var(--color-text-tertiary)] tracking-wider text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "INV-001", client: "Andrade Contábil", desc: "Assessoria Tributária — Abr/25", date: "10/04/2025", val: 2875, status: "PAGO", selected: false },
                { id: "INV-002", client: "Escola Primavera", desc: "Treinamento Corporativo", date: "15/04/2025", val: 18700, status: "PAGO", selected: false },
                { id: "INV-003", client: "Metalúrgica RJ", desc: "Assessoria Tributária — Abr/25", date: "10/04/2025", val: 2875, status: "PENDENTE", selected: false },
                { id: "INV-004", client: "Porto Logística", desc: "Auditoria Anual — Q1", date: "05/04/2025", val: 52000, status: "VENCIDO", selected: true },
                { id: "INV-005", client: "Farmácias Vida", desc: "BPO Contábil — Mar/25", date: "01/04/2025", val: 6500, status: "VENCIDO", selected: false },
                { id: "INV-006", client: "Agência Pontal", desc: "Consultoria Marketing", date: "20/04/2025", val: 22000, status: "PENDENTE", selected: false },
                { id: "INV-007", client: "Clínicas Norte", desc: "BPO Financeiro — Abr/25", date: "25/04/2025", val: 15600, status: "PENDENTE", selected: false },
              ].map((inv, i) => (
                <tr key={i} className={`border-b border-[var(--color-border)] h-[48px] hover:bg-[var(--color-subtle)] transition-colors cursor-pointer ${inv.selected ? 'bg-[var(--color-subtle)]' : ''}`} onClick={() => setPanelOpen(true)}>
                  <td className="px-4 text-[13px] font-mono text-[var(--color-text-secondary)]">{inv.id}</td>
                  <td className="px-4 text-[13px] font-[500] text-[var(--color-text-primary)]">{inv.client}</td>
                  <td className="px-4 text-[13px] text-[var(--color-text-secondary)]">{inv.desc}</td>
                  <td className="px-4 text-[13px] font-mono text-[var(--color-text-secondary)] text-right">{inv.date}</td>
                  <td className="px-4 text-[13px] font-mono font-[500] text-[var(--color-text-primary)] text-right">{formatCurrency(inv.val)}</td>
                  <td className="px-4 text-center">
                    <span className={`inline-flex items-center justify-center h-[24px] px-2.5 rounded-[6px] text-[11px] font-[600] ${
                      inv.status === 'PAGO' ? 'bg-[var(--color-success-soft)] text-[var(--color-success)]' :
                      inv.status === 'PENDENTE' ? 'bg-[var(--color-warning-soft)] text-[var(--color-warning)]' :
                      'bg-[var(--color-danger-soft)] text-[var(--color-danger)]'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 text-center">
                    <button className="w-[32px] h-[32px] inline-flex items-center justify-center rounded-[6px] text-[var(--color-text-tertiary)] hover:bg-[var(--color-border)] hover:text-[var(--color-text-primary)] transition-colors mx-auto">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Slide-out Panel */}
        {panelOpen && (
          <>
            <div className="fixed inset-0 bg-[#0F0F0E] bg-opacity-20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setPanelOpen(false)} />
            <div className="absolute top-0 right-0 bottom-0 w-[400px] bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.08)] z-50 flex flex-col border-l border-[var(--color-border)]">
              
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-canvas)] shrink-0">
                <h2 className="text-[16px] font-[600] text-[var(--color-text-primary)]">Fatura #INV-004</h2>
                <button onClick={() => setPanelOpen(false)} className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-flex items-center px-3 py-1.5 bg-[var(--color-danger-soft)] text-[var(--color-danger)] text-[12px] font-[600] rounded-[6px]">VENCIDO</span>
                </div>

                <div className="mb-6">
                  <div className="text-[32px] font-mono font-[600] text-[var(--color-danger)] leading-none mb-1">{formatCurrency(52000)}</div>
                  <div className="text-[13px] text-[var(--color-text-secondary)]">Auditoria Anual — Q1</div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-4 border-t border-[var(--color-border)] pt-6 mb-6">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest font-[600] text-[var(--color-text-tertiary)] mb-1">Cliente</div>
                    <div className="text-[13px] font-[500] text-[var(--color-text-primary)] text-blue-600 hover:underline cursor-pointer">Porto Logística</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest font-[600] text-[var(--color-text-tertiary)] mb-1">Vencimento</div>
                    <div className="text-[13px] font-[500] font-mono text-[var(--color-danger)]">05/04/2025</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest font-[600] text-[var(--color-text-tertiary)] mb-1">Emissão</div>
                    <div className="text-[13px] font-[500] font-mono text-[var(--color-text-primary)]">01/03/2025</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest font-[600] text-[var(--color-text-tertiary)] mb-1">Plano de Pagamento</div>
                    <div className="text-[13px] font-[500] text-[var(--color-text-primary)]">Boleto 30 dias</div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-[var(--color-danger-soft)] border border-[var(--color-danger)] border-opacity-20 rounded-[8px] p-4 mb-6">
                  <div className="text-[12px] font-[500] text-[var(--color-danger)]">Dias em atraso</div>
                  <div className="text-[24px] font-mono font-[600] text-[var(--color-danger)]">9 dias</div>
                </div>

                <div className="bg-[var(--color-accent-soft)] border border-[var(--color-accent)] border-opacity-30 rounded-[8px] p-4 mb-6">
                  <div className="flex gap-2">
                    <span className="text-[var(--color-accent)] font-[600] text-[13px] mt-0.5">◇</span>
                    <span className="text-[12px] text-[var(--color-text-secondary)] leading-[1.5]">
                      Risco de perda: cliente não respondeu follow-ups em 7 dias. Recomendado contato direto via WhatsApp.
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-8">
                  <button className="w-full h-[40px] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-[500] text-[13px] rounded-[6px] transition-colors">
                    Enviar 2ª via
                  </button>
                  <div className="flex gap-2">
                    <button className="flex-1 h-[40px] bg-white border border-[var(--color-border-strong)] hover:bg-[var(--color-subtle)] text-[var(--color-text-primary)] font-[500] text-[13px] rounded-[6px] transition-colors">
                      Marcar como pago
                    </button>
                    <button className="flex-1 h-[40px] bg-white border border-[var(--color-border-strong)] hover:bg-[var(--color-danger-soft)] text-[var(--color-danger)] font-[500] text-[13px] rounded-[6px] transition-colors">
                      Cancelar fatura
                    </button>
                  </div>
                </div>

                <div className="border-t border-[var(--color-border)] pt-6">
                  <h3 className="text-[12px] font-[600] text-[var(--color-text-secondary)] mb-4">Histórico de contato</h3>
                  <div className="flex flex-col gap-3 text-[12px]">
                    <div className="flex items-start justify-between">
                      <span className="text-[var(--color-text-primary)]">Follow-up via email automático</span>
                      <span className="font-mono text-[11px] text-[var(--color-text-tertiary)]">12/04 09:00</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-[var(--color-text-primary)]">Lembrete de vencimento SMS</span>
                      <span className="font-mono text-[11px] text-[var(--color-text-tertiary)]">04/04 14:30</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-[var(--color-text-primary)]">Fatura enviada por email</span>
                      <span className="font-mono text-[11px] text-[var(--color-text-tertiary)]">01/03 10:15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}