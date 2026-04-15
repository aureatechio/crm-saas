import React, { useState } from 'react';
import { 
  ChevronDown, GripVertical, Edit2, Trash2, Plus, 
  Search, Lock, CheckCircle2, ChevronRight,
  MoreHorizontal, FileText, ChevronLeft, X,
  AlignLeft, ListChecks, Table2, ScrollText, PenLine
} from 'lucide-react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(val);
};

export default function PropostaEditor() {
  const [basicDataOpen, setBasicDataOpen] = useState(true);

  return (
    <AppLayout currentPage="propostas">
      <div className="flex h-[calc(100vh-48px)] font-[var(--font-ui)] -m-8">
        
        {/* LEFT PANEL - Construtor */}
        <div className="w-1/2 bg-white border-r border-[var(--color-border)] h-full overflow-y-auto relative flex flex-col">
          
          <div className="p-6 flex-1">
            {/* Top bar inside panel */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-[12px] uppercase font-[600] text-[var(--color-text-tertiary)] tracking-wider">Construtor</div>
              <div className="flex items-center gap-3">
                <button className="text-[13px] font-[500] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                  Salvar rascunho
                </button>
                <button className="h-[36px] px-4 border border-[var(--color-border-strong)] rounded-[8px] text-[13px] font-[500] text-[var(--color-text-primary)] hover:bg-[var(--color-subtle)] transition-colors">
                  Pré-visualizar
                </button>
              </div>
            </div>

            {/* Dados básicos */}
            <div className="mb-8">
              <div 
                className="flex items-center gap-2 cursor-pointer mb-4"
                onClick={() => setBasicDataOpen(!basicDataOpen)}
              >
                <ChevronDown size={16} className={`text-[var(--color-text-tertiary)] transition-transform ${basicDataOpen ? '' : '-rotate-90'}`} />
                <h3 className="text-[14px] font-[600] text-[var(--color-text-primary)]">Dados básicos</h3>
              </div>
              
              {basicDataOpen && (
                <div className="flex flex-col gap-4 pl-6">
                  <div className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Cliente</label>
                      <div className="h-[36px] border border-[var(--color-border-strong)] rounded-[8px] flex items-center px-3 gap-2 cursor-pointer hover:border-[var(--color-text-tertiary)] transition-colors">
                        <div className="w-[20px] h-[20px] rounded-full bg-[var(--color-subtle)] flex items-center justify-center text-[10px] font-[600] text-[var(--color-text-secondary)]">M</div>
                        <span className="text-[13px] text-[var(--color-text-primary)] flex-1">Metalúrgica RJ</span>
                        <Search size={14} className="text-[var(--color-text-tertiary)]" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Responsável</label>
                      <div className="h-[36px] border border-[var(--color-border-strong)] rounded-[8px] flex items-center px-3 gap-2 cursor-pointer hover:border-[var(--color-text-tertiary)] transition-colors">
                        <div className="w-[20px] h-[20px] rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center text-[10px] font-[600] text-[var(--color-accent)]">A</div>
                        <span className="text-[13px] text-[var(--color-text-primary)] flex-1">Ana Beatriz</span>
                        <ChevronDown size={14} className="text-[var(--color-text-tertiary)]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Validade da proposta</label>
                      <input 
                        type="text" 
                        defaultValue="30/04/2025"
                        className="h-[36px] border border-[var(--color-border-strong)] rounded-[8px] px-3 text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] font-mono"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Modelo</label>
                      <div className="h-[36px] border border-[var(--color-border-strong)] rounded-[8px] flex items-center px-3 gap-2 cursor-pointer hover:border-[var(--color-text-tertiary)] transition-colors">
                        <span className="text-[13px] text-[var(--color-text-primary)] flex-1">Consultoria Padrão</span>
                        <ChevronDown size={14} className="text-[var(--color-text-tertiary)]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Título da proposta</label>
                    <input 
                      type="text" 
                      defaultValue="Assessoria Tributária Completa"
                      className="h-[36px] border border-[var(--color-border-strong)] rounded-[8px] px-3 text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Seções da proposta */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4 pl-6">
                <h3 className="text-[14px] font-[600] text-[var(--color-text-primary)]">Seções da proposta</h3>
                <button className="text-[13px] font-[500] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1">
                  <Plus size={14} /> Adicionar seção
                </button>
              </div>

              <div className="flex flex-col gap-2 pl-6">
                
                {/* Introdução */}
                <div className="bg-white border border-[var(--color-border)] rounded-[8px] p-3 flex items-center justify-between group hover:border-[var(--color-text-tertiary)] transition-colors">
                  <div className="flex items-center gap-3">
                    <GripVertical size={16} className="text-[var(--color-text-tertiary)] cursor-grab" />
                    <div>
                      <div className="flex items-center gap-2">
                        <AlignLeft size={14} className="text-[var(--color-text-tertiary)]" />
                        <span className="text-[12px] font-[600] text-[var(--color-text-primary)] bg-[var(--color-canvas)] px-2 py-0.5 rounded">Introdução</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[var(--color-text-tertiary)] mr-2">Texto livre</span>
                    <button className="h-[28px] px-3 bg-[var(--color-accent-soft)] text-[var(--color-accent)] rounded-[8px] text-[12px] font-[500] flex items-center gap-1.5 hover:opacity-90 transition-opacity">
                      <span className="text-[14px] leading-none -mt-0.5">◇</span> Gerar
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-[var(--color-subtle)]">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors rounded-[6px] hover:bg-[var(--color-danger-soft)]">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Escopo de Serviços */}
                <div className="bg-white border border-[var(--color-border)] rounded-[8px] p-3 flex items-center justify-between group hover:border-[var(--color-text-tertiary)] transition-colors">
                  <div className="flex items-center gap-3">
                    <GripVertical size={16} className="text-[var(--color-text-tertiary)] cursor-grab" />
                    <div>
                      <div className="flex items-center gap-2">
                        <ListChecks size={14} className="text-[var(--color-text-tertiary)]" />
                        <span className="text-[12px] font-[600] text-[var(--color-text-primary)] bg-[var(--color-canvas)] px-2 py-0.5 rounded">Escopo de Serviços</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[var(--color-text-tertiary)] mr-2">Lista de escopo</span>
                    <button className="h-[28px] px-3 bg-[var(--color-accent-soft)] text-[var(--color-accent)] rounded-[8px] text-[12px] font-[500] flex items-center gap-1.5 hover:opacity-90 transition-opacity">
                      <span className="text-[14px] leading-none -mt-0.5">◇</span> Gerar
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-[var(--color-subtle)]">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors rounded-[6px] hover:bg-[var(--color-danger-soft)]">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Tabela de Investimento */}
                <div className="bg-white border-2 border-[var(--color-accent)] shadow-[0_0_0_2px_rgba(232,93,47,0.1)] rounded-[8px] p-3 flex items-center justify-between group relative z-10">
                  <div className="flex items-center gap-3">
                    <GripVertical size={16} className="text-[var(--color-text-tertiary)] cursor-grab" />
                    <div>
                      <div className="flex items-center gap-2">
                        <Table2 size={14} className="text-[var(--color-accent)]" />
                        <span className="text-[12px] font-[600] text-[var(--color-text-primary)] bg-[var(--color-canvas)] px-2 py-0.5 rounded">Tabela de Investimento</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[var(--color-text-tertiary)] mr-2">Tabela de preços</span>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-[var(--color-subtle)]">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors rounded-[6px] hover:bg-[var(--color-danger-soft)]">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Condições Comerciais */}
                <div className="bg-white border border-[var(--color-border)] rounded-[8px] p-3 flex items-center justify-between group hover:border-[var(--color-text-tertiary)] transition-colors">
                  <div className="flex items-center gap-3">
                    <GripVertical size={16} className="text-[var(--color-text-tertiary)] cursor-grab" />
                    <div>
                      <div className="flex items-center gap-2">
                        <ScrollText size={14} className="text-[var(--color-text-tertiary)]" />
                        <span className="text-[12px] font-[600] text-[var(--color-text-primary)] bg-[var(--color-canvas)] px-2 py-0.5 rounded">Condições Comerciais</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[var(--color-text-tertiary)] mr-2">Texto livre</span>
                    <button className="h-[28px] px-3 bg-[var(--color-accent-soft)] text-[var(--color-accent)] rounded-[8px] text-[12px] font-[500] flex items-center gap-1.5 hover:opacity-90 transition-opacity">
                      <span className="text-[14px] leading-none -mt-0.5">◇</span> Gerar
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-[var(--color-subtle)]">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors rounded-[6px] hover:bg-[var(--color-danger-soft)]">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Assinatura */}
                <div className="bg-white border border-[var(--color-border)] rounded-[8px] p-3 flex items-center justify-between group hover:border-[var(--color-text-tertiary)] transition-colors">
                  <div className="flex items-center gap-3">
                    <GripVertical size={16} className="text-[var(--color-text-tertiary)] cursor-grab" />
                    <div>
                      <div className="flex items-center gap-2">
                        <PenLine size={14} className="text-[var(--color-text-tertiary)]" />
                        <span className="text-[12px] font-[600] text-[var(--color-text-primary)] bg-[var(--color-canvas)] px-2 py-0.5 rounded">Assinatura</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[var(--color-text-tertiary)] mr-2">Bloco de assinatura</span>
                    <div className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)]">
                      <Lock size={14} />
                    </div>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[6px] hover:bg-[var(--color-subtle)]">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors rounded-[6px] hover:bg-[var(--color-danger-soft)]">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Itens de serviço */}
            <div className="mb-8 bg-[var(--color-subtle)] -mx-6 px-6 py-6 border-y border-[var(--color-border)]">
              <div className="flex justify-between items-center mb-4 pl-6">
                <h3 className="text-[14px] font-[600] text-[var(--color-text-primary)]">Tabela de Investimento</h3>
                <button className="text-[13px] font-[500] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1">
                  <Plus size={14} /> Adicionar item
                </button>
              </div>

              <div className="pl-6 flex flex-col gap-2">
                {/* Row 1 */}
                <div className="bg-white border border-[var(--color-border)] rounded-[8px] p-2.5 flex items-center gap-3">
                  <input type="text" defaultValue="Assessoria Tributária" className="flex-[2] text-[13px] text-[var(--color-text-primary)] font-[500] outline-none" />
                  <div className="flex-1 h-[32px] border border-[var(--color-border)] rounded-[6px] flex items-center px-2 justify-between">
                    <span className="text-[12px] text-[var(--color-text-secondary)]">12 meses</span>
                    <ChevronDown size={12} className="text-[var(--color-text-tertiary)]" />
                  </div>
                  <input type="text" defaultValue="R$ 2.875/mês" className="flex-1 text-[13px] text-[var(--color-text-primary)] font-mono outline-none text-right" />
                  <div className="flex-1 text-[13px] text-[var(--color-text-primary)] font-[600] font-mono text-right">
                    R$ 34.500
                  </div>
                  <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors rounded-[6px] hover:bg-[var(--color-danger-soft)] shrink-0">
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Row 2 */}
                <div className="bg-white border border-[var(--color-border)] rounded-[8px] p-2.5 flex items-center gap-3">
                  <input type="text" defaultValue="Diagnóstico Fiscal Inicial" className="flex-[2] text-[13px] text-[var(--color-text-primary)] font-[500] outline-none" />
                  <div className="flex-1 h-[32px] border border-[var(--color-border)] rounded-[6px] flex items-center px-2 justify-between">
                    <span className="text-[12px] text-[var(--color-text-secondary)]">1x</span>
                    <ChevronDown size={12} className="text-[var(--color-text-tertiary)]" />
                  </div>
                  <input type="text" defaultValue="R$ 3.500" className="flex-1 text-[13px] text-[var(--color-text-primary)] font-mono outline-none text-right" />
                  <div className="flex-1 text-[13px] text-[var(--color-text-tertiary)] font-mono text-right line-through">
                    R$ 3.500
                  </div>
                  <button className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors rounded-[6px] hover:bg-[var(--color-danger-soft)] shrink-0">
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Totals */}
                <div className="mt-4 pt-4 border-t-2 border-[var(--color-border-strong)] flex flex-col gap-2">
                  <div className="flex justify-between items-center pr-[40px]">
                    <span className="text-[13px] text-[var(--color-text-secondary)]">Subtotal</span>
                    <span className="text-[13px] font-mono text-[var(--color-text-primary)]">R$ 38.000</span>
                  </div>
                  <div className="flex justify-between items-center pr-[40px]">
                    <span className="text-[13px] text-[var(--color-text-tertiary)]">Desconto (5%)</span>
                    <span className="text-[13px] font-mono text-[var(--color-danger)]">- R$ 1.900</span>
                  </div>
                  <div className="flex justify-between items-center pr-[40px] pt-2">
                    <span className="text-[14px] font-[700] text-[var(--color-text-primary)]">Total</span>
                    <span className="text-[15px] font-[700] font-mono text-[var(--color-text-primary)]">R$ 36.100</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* AI Teaser (Bottom of left panel) */}
          <div className="bg-[var(--color-accent-soft)] border-t border-[rgba(232,93,47,0.25)] p-4 shrink-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[16px] text-[var(--color-accent)] leading-none -mt-0.5">◇</span>
              <h4 className="text-[12px] font-[600] text-[var(--color-accent)] uppercase tracking-wider">Gerar seção com Análise</h4>
            </div>
            <p className="text-[12px] text-[var(--color-text-secondary)] leading-[1.6]">
              Selecione uma seção acima e clique em '◇ Gerar' para criar o conteúdo automaticamente com base no perfil do cliente e histórico de atividades.
            </p>
          </div>

        </div>

        {/* RIGHT PANEL - Pré-visualização */}
        <div className="w-1/2 bg-[var(--color-subtle)] shadow-[inset_4px_0_12px_rgba(0,0,0,0.02)] h-full overflow-y-auto flex flex-col relative">
          
          <div className="p-[32px] flex-1">
            
            {/* Editoral preview container */}
            <div className="w-full max-w-[600px] mx-auto bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] rounded-[8px] p-[40px] min-h-[800px] relative overflow-hidden flex flex-col">
              
              {/* Scaled down preview content */}
              <div className="transform origin-top scale-[0.85] w-[117.6%]">
                
                {/* Letterhead */}
                <div className="flex justify-between items-start border-b border-[var(--color-border)] pb-[24px] mb-[32px]">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-[28px] h-[28px] rounded-[6px] bg-[var(--color-accent)] flex items-center justify-center text-white font-[700] text-[12px] tracking-tight">
                        CA
                      </div>
                      <div className="text-[14px] font-[600] text-[var(--color-text-primary)]">Andrade Contábil</div>
                    </div>
                    <div className="text-[10px] text-[var(--color-text-tertiary)] font-mono">CNPJ: 12.345.678/0001-90</div>
                  </div>
                  <div className="flex flex-col items-end text-right mt-1">
                    <div className="text-[11px] text-[var(--color-text-tertiary)] font-mono">Proposta #2024-048</div>
                    <div className="text-[11px] text-[var(--color-text-tertiary)] font-mono">Válida até 30/04/2025</div>
                  </div>
                </div>

                {/* Hero */}
                <div className="mb-[32px]">
                  <div className="text-[10px] uppercase tracking-widest text-[var(--color-text-tertiary)] font-[600] mb-2">Proposta para</div>
                  <h1 className="text-[22px] font-[600] text-[var(--color-text-primary)] tracking-[-0.02em] leading-tight mb-1">Assessoria Tributária Completa</h1>
                  <h2 className="text-[13px] text-[var(--color-text-secondary)]">Metalúrgica RJ Indústria e Comércio Ltda.</h2>
                </div>

                {/* Seções Preview */}
                <div className="mb-[24px]">
                  <h3 className="text-[18px] font-[600] text-[var(--color-text-primary)] tracking-tight mb-3">Introdução</h3>
                  <div className="space-y-1">
                    <div className="h-[14px] bg-[var(--color-subtle)] w-full rounded-[2px]" />
                    <div className="h-[14px] bg-[var(--color-subtle)] w-[92%] rounded-[2px]" />
                    <div className="h-[14px] bg-[var(--color-subtle)] w-[78%] rounded-[2px]" />
                  </div>
                </div>

                <div className="mb-[24px]">
                  <h3 className="text-[18px] font-[600] text-[var(--color-text-primary)] tracking-tight mb-3">Escopo de Serviços</h3>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[var(--color-text-tertiary)] shrink-0 mt-0.5" />
                      <div className="space-y-1 flex-1 mt-0.5">
                        <div className="h-[12px] bg-[var(--color-subtle)] w-[60%] rounded-[2px]" />
                        <div className="h-[12px] bg-[var(--color-subtle)] w-[85%] rounded-[2px]" />
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[var(--color-text-tertiary)] shrink-0 mt-0.5" />
                      <div className="space-y-1 flex-1 mt-0.5">
                        <div className="h-[12px] bg-[var(--color-subtle)] w-[55%] rounded-[2px]" />
                        <div className="h-[12px] bg-[var(--color-subtle)] w-[90%] rounded-[2px]" />
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[var(--color-text-tertiary)] shrink-0 mt-0.5" />
                      <div className="space-y-1 flex-1 mt-0.5">
                        <div className="h-[12px] bg-[var(--color-subtle)] w-[40%] rounded-[2px]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-[24px]">
                  <h3 className="text-[18px] font-[600] text-[var(--color-text-primary)] tracking-tight mb-3">Tabela de Investimento</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[var(--color-subtle)] border-b border-[var(--color-border)]">
                        <th className="py-2 px-2 text-left text-[10px] font-[600] text-[var(--color-text-tertiary)] tracking-wider">SERVIÇO</th>
                        <th className="py-2 px-2 text-right text-[10px] font-[600] text-[var(--color-text-tertiary)] tracking-wider">VALOR MENSAL</th>
                        <th className="py-2 px-2 text-right text-[10px] font-[600] text-[var(--color-text-tertiary)] tracking-wider">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[var(--color-border)]">
                        <td className="py-2 px-2 text-[12px] text-[var(--color-text-primary)] font-[500]">Assessoria Tributária</td>
                        <td className="py-2 px-2 text-[12px] text-[var(--color-text-primary)] font-mono text-right">{formatCurrency(2875)}</td>
                        <td className="py-2 px-2 text-[12px] text-[var(--color-text-primary)] font-mono text-right">{formatCurrency(34500)}</td>
                      </tr>
                      <tr className="border-b border-[var(--color-border)]">
                        <td className="py-2 px-2 text-[12px] text-[var(--color-text-secondary)]">Diagnóstico Fiscal Inicial</td>
                        <td className="py-2 px-2 text-[12px] text-[var(--color-text-tertiary)] text-right line-through">{formatCurrency(3500)}</td>
                        <td className="py-2 px-2 text-[12px] text-[var(--color-text-tertiary)] text-right">Incluso</td>
                      </tr>
                      <tr className="border-t-2 border-[var(--color-text-primary)]">
                        <td colSpan={2} className="py-2 px-2 text-[12px] font-[700] text-[var(--color-text-primary)]">TOTAL DO CONTRATO</td>
                        <td className="py-2 px-2 text-[12px] font-[700] text-[var(--color-text-primary)] font-mono text-right">{formatCurrency(36100)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
              
              {/* Fade out bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent to-white z-10" />
            </div>

          </div>

          {/* Preview Toolbar (Sticky Bottom) */}
          <div className="sticky bottom-0 bg-white border-t border-[var(--color-border)] px-6 py-3 flex justify-between items-center shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.02)] z-20">
            <button className="h-[32px] px-3 border border-[var(--color-border-strong)] rounded-[6px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors flex items-center gap-1.5">
              Versão 1 de 2 <ChevronDown size={14} className="text-[var(--color-text-tertiary)]" />
            </button>
            <div className="flex items-center gap-3">
              <button className="text-[13px] font-[500] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                Copiar link
              </button>
              <button className="h-[36px] px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-[8px] text-[13px] font-[500] transition-colors shadow-sm">
                Enviar para cliente
              </button>
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
