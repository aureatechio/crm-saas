import React, { useState } from 'react';
import { 
  Plus, Search, Grid, List, MoreHorizontal, Edit2, 
  Trash2, ChevronDown, CheckSquare, Square, Briefcase, X, ChevronRight, ChevronLeft
} from 'lucide-react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(val);
};

export default function Produtos() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <AppLayout currentPage="configuracoes">
      <div className="flex flex-col h-full font-[var(--font-ui)] relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-[20px] font-[600] text-[var(--color-text-primary)] tracking-[-0.015em] mb-1">Produtos & Serviços</h1>
            <p className="text-[13px] text-[var(--color-text-tertiary)]">Catálogo de serviços e pacotes disponíveis para propostas</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-[36px] px-4 border border-[var(--color-border-strong)] rounded-[8px] text-[13px] font-[500] text-[var(--color-text-primary)] hover:bg-[var(--color-subtle)] transition-colors">
              Importar
            </button>
            <button className="h-[36px] px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-[8px] text-[13px] font-[500] transition-colors shadow-sm flex items-center gap-2">
              <Plus size={16} /> Novo produto
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] rounded-[6px] px-3 py-1.5 text-[12px] text-[var(--color-text-secondary)]">
            <span className="font-[600] text-[var(--color-text-primary)]">23</span> produtos ativos
          </div>
          <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] rounded-[6px] px-3 py-1.5 text-[12px] text-[var(--color-text-secondary)]">
            <span className="font-[600] text-[var(--color-text-primary)]">4</span> categorias
          </div>
          <div className="bg-[var(--color-subtle)] border border-[var(--color-border)] rounded-[6px] px-3 py-1.5 text-[12px] text-[var(--color-text-secondary)]">
            Ticket médio: <span className="font-[500] text-[var(--color-text-primary)] font-mono">{formatCurrency(8400)}</span>
          </div>
        </div>

        {/* Category Tabs + Filter bar */}
        <div className="flex justify-between items-end border-b border-[var(--color-border)] mb-6">
          <div className="flex items-center gap-6">
            <button className="pb-3 text-[14px] font-[500] text-[var(--color-text-primary)] border-b-2 border-[var(--color-accent)] -mb-[1px]">Todos</button>
            <button className="pb-3 text-[14px] font-[500] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-b-2 border-transparent -mb-[1px] transition-colors">Assessoria</button>
            <button className="pb-3 text-[14px] font-[500] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-b-2 border-transparent -mb-[1px] transition-colors">Auditoria</button>
            <button className="pb-3 text-[14px] font-[500] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-b-2 border-transparent -mb-[1px] transition-colors">Treinamento</button>
            <button className="pb-3 text-[14px] font-[500] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-b-2 border-transparent -mb-[1px] transition-colors">Pacotes</button>
          </div>

          <div className="flex items-center gap-3 pb-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
              <input 
                type="text" 
                placeholder="Buscar produto..." 
                className="w-[240px] h-[32px] pl-9 pr-3 text-[13px] border border-[var(--color-border-strong)] rounded-[6px] outline-none focus:border-[var(--color-accent)] transition-colors"
              />
            </div>
            
            <button className="h-[32px] px-3 border border-[var(--color-border-strong)] rounded-[6px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors flex items-center gap-1.5">
              Categoria <ChevronDown size={14} className="text-[var(--color-text-tertiary)]" />
            </button>
            <button className="h-[32px] px-3 border border-[var(--color-border-strong)] rounded-[6px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors flex items-center gap-1.5">
              Status <ChevronDown size={14} className="text-[var(--color-text-tertiary)]" />
            </button>

            <div className="flex items-center ml-2 border border-[var(--color-border-strong)] rounded-[6px] p-0.5 bg-[var(--color-subtle)]">
              <button className="w-[28px] h-[26px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[4px]">
                <Grid size={14} />
              </button>
              <button className="w-[28px] h-[26px] flex items-center justify-center text-[var(--color-text-primary)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] rounded-[4px]">
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white border border-[var(--color-border)] rounded-[8px] overflow-hidden flex-1 flex flex-col">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-subtle)] border-b border-[var(--color-border)]">
                <th className="py-2.5 px-4 w-[40px]"><Square size={14} className="text-[var(--color-text-tertiary)]" /></th>
                <th className="py-2.5 px-4 text-[11px] uppercase tracking-wider font-[600] text-[var(--color-text-tertiary)]">PRODUTO</th>
                <th className="py-2.5 px-4 text-[11px] uppercase tracking-wider font-[600] text-[var(--color-text-tertiary)]">CATEGORIA</th>
                <th className="py-2.5 px-4 text-[11px] uppercase tracking-wider font-[600] text-[var(--color-text-tertiary)]">PREÇO</th>
                <th className="py-2.5 px-4 text-[11px] uppercase tracking-wider font-[600] text-[var(--color-text-tertiary)]">RECORRÊNCIA</th>
                <th className="py-2.5 px-4 text-[11px] uppercase tracking-wider font-[600] text-[var(--color-text-tertiary)]">STATUS</th>
                <th className="py-2.5 px-4 w-[80px] text-[11px] uppercase tracking-wider font-[600] text-[var(--color-text-tertiary)]">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              
              {/* Row 1 */}
              <tr className="h-[48px] hover:bg-[var(--color-subtle)] transition-colors border-b border-[var(--color-border)] cursor-pointer" onClick={() => setDrawerOpen(true)}>
                <td className="px-4"><Square size={14} className="text-[var(--color-text-tertiary)]" /></td>
                <td className="px-4">
                  <div className="flex items-center gap-2.5">
                    <Briefcase size={16} className="text-[var(--color-accent)]" />
                    <span className="text-[13px] font-[500] text-[var(--color-text-primary)]">Assessoria Tributária Completa</span>
                    <span className="px-1.5 py-0.5 bg-[var(--color-accent-soft)] text-[var(--color-accent)] text-[10px] font-[500] rounded-[4px]">Plano mais popular</span>
                  </div>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[10px] font-[500] px-2 py-1 rounded-[4px] border border-[var(--color-border)]">Assessoria</span>
                </td>
                <td className="px-4">
                  <span className="text-[13px] font-[500] text-[var(--color-text-primary)] font-mono">{formatCurrency(2875)}</span>
                  <span className="text-[11px] text-[var(--color-text-tertiary)] ml-1">/mês</span>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-info-soft)] text-[var(--color-info)] text-[11px] font-[500] px-2 py-0.5 rounded-full">Mensal</span>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-[500] px-2 py-0.5 rounded-full">Ativo</span>
                </td>
                <td className="px-4">
                  <div className="flex items-center gap-1">
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="h-[48px] hover:bg-[var(--color-subtle)] transition-colors border-b border-[var(--color-border)] cursor-pointer">
                <td className="px-4"><Square size={14} className="text-[var(--color-text-tertiary)]" /></td>
                <td className="px-4">
                  <div className="flex items-center gap-2.5">
                    <Briefcase size={16} className="text-[var(--color-text-tertiary)]" />
                    <span className="text-[13px] font-[500] text-[var(--color-text-primary)]">Diagnóstico Fiscal</span>
                  </div>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[10px] font-[500] px-2 py-1 rounded-[4px] border border-[var(--color-border)]">Auditoria</span>
                </td>
                <td className="px-4">
                  <span className="text-[13px] font-[500] text-[var(--color-text-primary)] font-mono">{formatCurrency(3500)}</span>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[11px] font-[500] px-2 py-0.5 rounded-full border border-[var(--color-border)]">Único</span>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-[500] px-2 py-0.5 rounded-full">Ativo</span>
                </td>
                <td className="px-4">
                  <div className="flex items-center gap-1">
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="h-[48px] hover:bg-[var(--color-subtle)] transition-colors border-b border-[var(--color-border)] cursor-pointer">
                <td className="px-4"><Square size={14} className="text-[var(--color-text-tertiary)]" /></td>
                <td className="px-4">
                  <div className="flex items-center gap-2.5">
                    <Briefcase size={16} className="text-[var(--color-text-tertiary)]" />
                    <span className="text-[13px] font-[500] text-[var(--color-text-primary)]">Planejamento Tributário Anual</span>
                  </div>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[10px] font-[500] px-2 py-1 rounded-[4px] border border-[var(--color-border)]">Assessoria</span>
                </td>
                <td className="px-4">
                  <span className="text-[13px] font-[500] text-[var(--color-text-primary)] font-mono">{formatCurrency(18000)}</span>
                </td>
                <td className="px-4">
                  <span className="bg-[#F3E8FF] text-[#2563EB] text-[11px] font-[500] px-2 py-0.5 rounded-full">Anual</span>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-[500] px-2 py-0.5 rounded-full">Ativo</span>
                </td>
                <td className="px-4">
                  <div className="flex items-center gap-1">
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="h-[48px] hover:bg-[var(--color-subtle)] transition-colors border-b border-[var(--color-border)] cursor-pointer">
                <td className="px-4"><Square size={14} className="text-[var(--color-text-tertiary)]" /></td>
                <td className="px-4">
                  <div className="flex items-center gap-2.5">
                    <Briefcase size={16} className="text-[var(--color-text-tertiary)]" />
                    <span className="text-[13px] font-[500] text-[var(--color-text-primary)]">Treinamento Equipe Financeira</span>
                  </div>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[10px] font-[500] px-2 py-1 rounded-[4px] border border-[var(--color-border)]">Treinamento</span>
                </td>
                <td className="px-4">
                  <span className="text-[13px] font-[500] text-[var(--color-text-primary)] font-mono">{formatCurrency(8700)}</span>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[11px] font-[500] px-2 py-0.5 rounded-full border border-[var(--color-border)]">Único</span>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-[500] px-2 py-0.5 rounded-full">Ativo</span>
                </td>
                <td className="px-4">
                  <div className="flex items-center gap-1">
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="h-[48px] hover:bg-[var(--color-subtle)] transition-colors border-b border-[var(--color-border)] cursor-pointer">
                <td className="px-4"><Square size={14} className="text-[var(--color-text-tertiary)]" /></td>
                <td className="px-4">
                  <div className="flex items-center gap-2.5">
                    <Briefcase size={16} className="text-[var(--color-text-tertiary)]" />
                    <span className="text-[13px] font-[500] text-[var(--color-text-primary)]">BPO Contábil</span>
                  </div>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[10px] font-[500] px-2 py-1 rounded-[4px] border border-[var(--color-border)]">Assessoria</span>
                </td>
                <td className="px-4">
                  <span className="text-[13px] font-[500] text-[var(--color-text-primary)] font-mono">{formatCurrency(4200)}</span>
                  <span className="text-[11px] text-[var(--color-text-tertiary)] ml-1">/mês</span>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-info-soft)] text-[var(--color-info)] text-[11px] font-[500] px-2 py-0.5 rounded-full">Mensal</span>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-[500] px-2 py-0.5 rounded-full">Ativo</span>
                </td>
                <td className="px-4">
                  <div className="flex items-center gap-1">
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 6 */}
              <tr className="h-[48px] hover:bg-[var(--color-subtle)] transition-colors border-b border-[var(--color-border)] cursor-pointer">
                <td className="px-4"><Square size={14} className="text-[var(--color-text-tertiary)]" /></td>
                <td className="px-4">
                  <div className="flex items-center gap-2.5">
                    <Briefcase size={16} className="text-[var(--color-text-tertiary)]" />
                    <span className="text-[13px] font-[500] text-[var(--color-text-primary)]">Auditoria Independente</span>
                  </div>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[10px] font-[500] px-2 py-1 rounded-[4px] border border-[var(--color-border)]">Auditoria</span>
                </td>
                <td className="px-4">
                  <span className="text-[13px] font-[500] text-[var(--color-text-primary)] font-mono">{formatCurrency(24000)}</span>
                </td>
                <td className="px-4">
                  <span className="bg-[#F3E8FF] text-[#2563EB] text-[11px] font-[500] px-2 py-0.5 rounded-full">Anual</span>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-[500] px-2 py-0.5 rounded-full">Ativo</span>
                </td>
                <td className="px-4">
                  <div className="flex items-center gap-1">
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 7 */}
              <tr className="h-[48px] hover:bg-[var(--color-subtle)] transition-colors border-b border-[var(--color-border)] cursor-pointer">
                <td className="px-4"><Square size={14} className="text-[var(--color-text-tertiary)]" /></td>
                <td className="px-4">
                  <div className="flex items-center gap-2.5">
                    <Briefcase size={16} className="text-[var(--color-text-tertiary)] opacity-50" />
                    <span className="text-[13px] font-[500] text-[var(--color-text-primary)] opacity-70">Pacote Startup (3 serviços)</span>
                  </div>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[10px] font-[500] px-2 py-1 rounded-[4px] border border-[var(--color-border)] opacity-70">Pacotes</span>
                </td>
                <td className="px-4 opacity-70">
                  <span className="text-[13px] font-[500] text-[var(--color-text-primary)] font-mono">{formatCurrency(6900)}</span>
                  <span className="text-[11px] text-[var(--color-text-tertiary)] ml-1">/mês</span>
                </td>
                <td className="px-4 opacity-70">
                  <span className="bg-[var(--color-info-soft)] text-[var(--color-info)] text-[11px] font-[500] px-2 py-0.5 rounded-full">Mensal</span>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-warning-soft)] text-[var(--color-warning)] text-[11px] font-[500] px-2 py-0.5 rounded-full">Rascunho</span>
                </td>
                <td className="px-4">
                  <div className="flex items-center gap-1">
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 8 */}
              <tr className="h-[48px] hover:bg-[var(--color-subtle)] transition-colors border-b border-[var(--color-border)] cursor-pointer">
                <td className="px-4"><Square size={14} className="text-[var(--color-text-tertiary)]" /></td>
                <td className="px-4">
                  <div className="flex items-center gap-2.5">
                    <Briefcase size={16} className="text-[var(--color-text-tertiary)]" />
                    <span className="text-[13px] font-[500] text-[var(--color-text-primary)]">Recuperação de Créditos Fiscais</span>
                  </div>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[10px] font-[500] px-2 py-1 rounded-[4px] border border-[var(--color-border)]">Assessoria</span>
                </td>
                <td className="px-4">
                  <span className="text-[13px] font-[500] text-[var(--color-text-primary)] font-mono">{formatCurrency(12500)}</span>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[11px] font-[500] px-2 py-0.5 rounded-full border border-[var(--color-border)]">Único</span>
                </td>
                <td className="px-4">
                  <span className="bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-[500] px-2 py-0.5 rounded-full">Ativo</span>
                </td>
                <td className="px-4">
                  <div className="flex items-center gap-1">
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-white border border-transparent hover:border-[var(--color-border)]">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Edit Drawer Overlay */}
        {drawerOpen && (
          <div className="absolute inset-0 bg-black/10 z-40 flex justify-end" onClick={() => setDrawerOpen(false)}>
            <div 
              className="w-[420px] bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.08)] h-full flex flex-col transform transition-transform duration-300"
              onClick={e => e.stopPropagation()}
            >
              
              {/* Drawer Header */}
              <div className="h-[64px] border-b border-[var(--color-border)] flex items-center justify-between px-5 shrink-0">
                <div className="flex items-center gap-3">
                  <button className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors" onClick={() => setDrawerOpen(false)}>
                    <ChevronLeft size={18} />
                  </button>
                  <h2 className="text-[14px] font-[600] text-[var(--color-text-primary)]">Editar produto</h2>
                </div>
                <button className="w-[32px] h-[32px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-[var(--color-subtle)]" onClick={() => setDrawerOpen(false)}>
                  <X size={16} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Nome do produto</label>
                  <input 
                    type="text" 
                    defaultValue="Assessoria Tributária Completa"
                    className="h-[36px] border border-[var(--color-border-strong)] rounded-[8px] px-3 text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Categoria</label>
                  <div className="h-[36px] border border-[var(--color-border-strong)] rounded-[8px] flex items-center px-3 justify-between cursor-pointer hover:border-[var(--color-text-tertiary)] transition-colors">
                    <span className="text-[13px] text-[var(--color-text-primary)]">Assessoria</span>
                    <ChevronDown size={14} className="text-[var(--color-text-tertiary)]" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Descrição</label>
                  <textarea 
                    defaultValue="Serviço completo de assessoria tributária incluindo revisão de obrigações, planejamento e relatórios mensais."
                    className="h-[80px] border border-[var(--color-border-strong)] rounded-[8px] p-3 text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                  <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Tipo de preço</label>
                  <div className="flex bg-[var(--color-subtle)] border border-[var(--color-border-strong)] rounded-[8px] p-1">
                    <button className="flex-1 h-[28px] text-[12px] font-[500] text-[var(--color-text-secondary)] rounded-[6px] transition-colors">
                      Único
                    </button>
                    <button className="flex-1 h-[28px] text-[12px] font-[500] bg-[var(--color-accent)] text-white shadow-sm rounded-[6px] transition-colors">
                      Mensal
                    </button>
                    <button className="flex-1 h-[28px] text-[12px] font-[500] text-[var(--color-text-secondary)] rounded-[6px] transition-colors">
                      Anual
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Preço</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        defaultValue="R$ 2.875"
                        className="w-full h-[36px] border border-[var(--color-border-strong)] rounded-[8px] pl-3 pr-[44px] text-[13px] text-[var(--color-text-primary)] font-mono outline-none focus:border-[var(--color-accent)]"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[var(--color-text-tertiary)]">/mês</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Preço anual</label>
                    <div className="flex flex-col">
                      <input 
                        type="text" 
                        defaultValue="R$ 31.625"
                        className="w-full h-[36px] border border-[var(--color-border-strong)] rounded-[8px] px-3 text-[13px] text-[var(--color-text-primary)] font-mono outline-none focus:border-[var(--color-accent)]"
                      />
                      <span className="text-[10px] text-[var(--color-text-tertiary)] mt-1 ml-1">(5% desc.)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-2 mb-2">
                  <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-[var(--color-subtle)] border border-[var(--color-border-strong)] rounded-[4px] pl-2 pr-1 py-1 text-[11px] flex items-center gap-1">
                      <span className="text-[var(--color-text-primary)]">Tributação</span>
                      <button className="w-[16px] h-[16px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"><X size={10} /></button>
                    </div>
                    <div className="bg-[var(--color-subtle)] border border-[var(--color-border-strong)] rounded-[4px] pl-2 pr-1 py-1 text-[11px] flex items-center gap-1">
                      <span className="text-[var(--color-text-primary)]">Popular</span>
                      <button className="w-[16px] h-[16px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"><X size={10} /></button>
                    </div>
                    <button className="border border-dashed border-[var(--color-border-strong)] rounded-[4px] px-2 py-1 text-[11px] text-[var(--color-text-tertiary)] hover:border-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
                      Adicionar tag...
                    </button>
                  </div>
                </div>

                <div className="h-[1px] bg-[var(--color-border)] my-2" />

                <div className="flex items-center justify-between">
                  <div className="text-[13px] text-[var(--color-text-secondary)] font-[500]">Destaque na proposta</div>
                  <div className="w-[36px] h-[20px] bg-[var(--color-success)] rounded-full p-[2px] cursor-pointer">
                    <div className="w-[16px] h-[16px] bg-white rounded-full translate-x-[16px] shadow-sm" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-[13px] text-[var(--color-text-secondary)] font-[500]">Ativo no catálogo</div>
                  <div className="w-[36px] h-[20px] bg-[var(--color-success)] rounded-full p-[2px] cursor-pointer">
                    <div className="w-[16px] h-[16px] bg-white rounded-full translate-x-[16px] shadow-sm" />
                  </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-[var(--color-border)] flex items-center justify-between bg-white shrink-0">
                <button className="text-[13px] font-[500] text-[var(--color-danger)] hover:bg-[var(--color-danger-soft)] px-3 h-[36px] rounded-[8px] transition-colors">
                  Excluir produto
                </button>
                <div className="flex items-center gap-2">
                  <button className="h-[36px] px-4 text-[13px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] rounded-[8px] transition-colors" onClick={() => setDrawerOpen(false)}>
                    Cancelar
                  </button>
                  <button className="h-[36px] px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-[8px] text-[13px] font-[500] transition-colors shadow-sm" onClick={() => setDrawerOpen(false)}>
                    Salvar alterações
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
