import React, { useState } from 'react';
import {
  Plus, Search, GripVertical, Edit2, Trash2, ChevronDown,
  ChevronRight, MoreHorizontal, FileText, Copy, Eye,
  Lock, ToggleLeft, ToggleRight, Tag, AlertCircle, CheckCircle2,
  AlignLeft, ListChecks, Table2, ScrollText, PenLine, X
} from 'lucide-react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';

/* ─── Static data ─────────────────────────────────── */
const templates = [
  { id: 1, name: 'Assessoria Tributária Completa', category: 'Assessoria', clauses: 7, status: 'ativo',   used: 14 },
  { id: 2, name: 'Auditoria Fiscal Independente',  category: 'Auditoria',  clauses: 6, status: 'ativo',   used: 8  },
  { id: 3, name: 'BPO Contábil Mensal',            category: 'Assessoria', clauses: 6, status: 'ativo',   used: 11 },
  { id: 4, name: 'Treinamento Corporativo',         category: 'Treinamento', clauses: 5, status: 'rascunho', used: 0  },
  { id: 5, name: 'Planejamento Tributário Anual',  category: 'Assessoria', clauses: 8, status: 'rascunho', used: 2  },
];

const variables = [
  '{{CLIENTE_NOME}}', '{{CLIENTE_CNPJ}}', '{{RESPONSAVEL}}',
  '{{VALOR_MENSAL}}', '{{VALOR_ANUAL}}', '{{DATA_INICIO}}',
  '{{DATA_FIM}}', '{{PRAZO_VIGENCIA}}', '{{FORO}}',
];

type Clause = {
  id: number;
  title: string;
  type: 'text' | 'list' | 'table' | 'sign';
  required: boolean;
  content: string;
  icon: React.FC<{ size: number; className?: string }>;
};

const initialClauses: Clause[] = [
  { id: 1, title: 'Objeto',                      type: 'text',  required: true,  icon: AlignLeft,   content: 'O presente contrato tem como objeto a prestação de serviços de assessoria tributária e fiscal para {{CLIENTE_NOME}}, contemplando: (i) revisão mensal de obrigações acessórias; (ii) planejamento tributário anual; (iii) acompanhamento de autuações fiscais.' },
  { id: 2, title: 'Prazo de Vigência',            type: 'text',  required: true,  icon: AlignLeft,   content: 'O presente contrato tem vigência de {{PRAZO_VIGENCIA}}, com início em {{DATA_INICIO}} e término em {{DATA_FIM}}, renovando-se automaticamente por igual período, salvo notificação escrita com 30 dias de antecedência.' },
  { id: 3, title: 'Valor e Forma de Pagamento',  type: 'text',  required: true,  icon: Table2,      content: 'A CONTRATANTE pagará à CONTRATADA o valor mensal de {{VALOR_MENSAL}} ({{VALOR_ANUAL}} anuais), com vencimento todo dia 12 de cada mês, mediante boleto bancário ou PIX. Reajuste anual pelo IPCA.' },
  { id: 4, title: 'Obrigações das Partes',        type: 'list',  required: true,  icon: ListChecks,  content: '' },
  { id: 5, title: 'Rescisão',                     type: 'text',  required: true,  icon: ScrollText,  content: 'Qualquer parte poderá rescindir mediante 60 dias de aviso escrito. Rescisão antecipada imotivada implica multa de 2 mensalidades. Rescisão por inadimplência superior a 30 dias dispensa aviso prévio.' },
  { id: 6, title: 'Confidencialidade',            type: 'text',  required: false, icon: AlignLeft,   content: 'As partes comprometem-se a manter sigilo sobre todas as informações confidenciais trocadas durante a vigência deste contrato e por 3 anos após seu término.' },
  { id: 7, title: 'Assinatura',                   type: 'sign',  required: true,  icon: PenLine,     content: '' },
];

const categoryColor: Record<string, string> = {
  'Assessoria':  'bg-[#CFFAFE] text-[#0891B2]',
  'Auditoria':   'bg-[#FEF3C7] text-[#D97706]',
  'Treinamento': 'bg-[#DCFCE7] text-[#16A34A]',
};

/* ─── Component ───────────────────────────────────── */
export default function ModeloContrato() {
  const [selectedId, setSelectedId]     = useState(1);
  const [search, setSearch]             = useState('');
  const [expandedId, setExpandedId]     = useState<number | null>(3);
  const [clauses, setClauses]           = useState<Clause[]>(initialClauses);
  const [showVarPanel, setShowVarPanel] = useState(true);
  const [previewMode, setPreviewMode]   = useState(false);

  const selected = templates.find(t => t.id === selectedId)!;
  const filtered = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRequired = (id: number) =>
    setClauses(cs => cs.map(c => c.id === id ? { ...c, required: !c.required } : c));

  return (
    <AppLayout currentPage="contratos">
      <div className="flex h-full font-[var(--font-ui)] -mx-8 -my-6 overflow-hidden">

        {/* ══ COLUMN 1 — Template Library (260px) ══ */}
        <div className="w-[260px] shrink-0 border-r border-[var(--color-border)] flex flex-col bg-[var(--color-subtle)] h-full">

          {/* Library header */}
          <div className="px-4 pt-5 pb-3 border-b border-[var(--color-border)] shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[13px] font-[700] text-[var(--color-text-primary)] tracking-[-0.01em]">Modelos</h2>
              <button className="w-[28px] h-[28px] flex items-center justify-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-[6px] transition-colors shadow-sm">
                <Plus size={14} />
              </button>
            </div>
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar modelo..."
                className="w-full h-[30px] pl-8 pr-3 text-[12px] bg-white border border-[var(--color-border-strong)] rounded-[6px] outline-none focus:border-[var(--color-accent)] transition-colors"
              />
            </div>
          </div>

          {/* Template list */}
          <div className="flex-1 overflow-y-auto py-2">
            {['Assessoria', 'Auditoria', 'Treinamento'].map(cat => {
              const items = filtered.filter(t => t.category === cat);
              if (!items.length) return null;
              return (
                <div key={cat} className="mb-1">
                  <div className="px-4 py-1.5 text-[10px] uppercase font-[700] text-[var(--color-text-tertiary)] tracking-wider">{cat}</div>
                  {items.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedId(t.id)}
                      className={`w-full text-left px-4 py-2.5 transition-colors flex flex-col gap-0.5 ${
                        selectedId === t.id
                          ? 'bg-white border-r-2 border-r-[var(--color-accent)]'
                          : 'hover:bg-white/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[13px] font-[${selectedId === t.id ? '600' : '500'}] text-[var(--color-text-primary)] leading-tight truncate`}>
                          {t.name}
                        </span>
                        {t.status === 'rascunho' && (
                          <span className="text-[9px] font-[600] text-[var(--color-warning)] bg-[var(--color-warning-soft)] px-1.5 py-0.5 rounded-full shrink-0">Rascunho</span>
                        )}
                      </div>
                      <div className="text-[11px] text-[var(--color-text-tertiary)]">
                        {t.clauses} cláusulas · {t.used > 0 ? `${t.used} usos` : 'Nunca usado'}
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ COLUMN 2 — Editor (flexible) ══ */}
        <div className="flex-1 flex flex-col bg-[var(--color-canvas)] h-full overflow-hidden">

          {/* Editor toolbar */}
          <div className="h-[52px] border-b border-[var(--color-border)] bg-white flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[var(--color-text-tertiary)]">Contratos</span>
              <ChevronRight size={12} className="text-[var(--color-text-tertiary)]" />
              <span className="text-[11px] text-[var(--color-text-tertiary)]">Modelos</span>
              <ChevronRight size={12} className="text-[var(--color-text-tertiary)]" />
              <span className="text-[12px] font-[600] text-[var(--color-text-primary)]">{selected.name}</span>
              <span className={`text-[10px] font-[500] px-1.5 py-0.5 rounded-full ml-1 ${categoryColor[selected.category] || 'bg-[var(--color-subtle)] text-[var(--color-text-secondary)]'}`}>
                {selected.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewMode(v => !v)}
                className={`h-[30px] px-3 rounded-[6px] text-[12px] font-[500] flex items-center gap-1.5 transition-colors border ${
                  previewMode
                    ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-[var(--color-accent)]/30'
                    : 'border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]'
                }`}
              >
                <Eye size={13} /> {previewMode ? 'Editando...' : 'Pré-visualizar'}
              </button>
              <button className="h-[30px] px-3 border border-[var(--color-border-strong)] rounded-[6px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors flex items-center gap-1.5">
                <Copy size={12} /> Duplicar
              </button>
              <button className="h-[30px] px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-[6px] text-[12px] font-[500] transition-colors shadow-sm">
                Salvar modelo
              </button>
              <button className="w-[30px] h-[30px] border border-[var(--color-border-strong)] rounded-[6px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:bg-[var(--color-subtle)] transition-colors">
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>

          {/* Editor body */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[860px] mx-auto py-6 px-6 flex flex-col gap-5">

              {/* ── Metadata card ── */}
              <div className="bg-white border border-[var(--color-border)] rounded-[10px] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                <div className="text-[11px] uppercase font-[700] text-[var(--color-text-tertiary)] tracking-wider mb-4">Configurações do modelo</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Nome do modelo</label>
                    <input
                      defaultValue={selected.name}
                      className="h-[36px] border border-[var(--color-border-strong)] rounded-[8px] px-3 text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Categoria</label>
                    <div className="h-[36px] border border-[var(--color-border-strong)] rounded-[8px] flex items-center px-3 justify-between cursor-pointer hover:border-[var(--color-text-tertiary)] transition-colors">
                      <span className="text-[13px] text-[var(--color-text-primary)]">{selected.category}</span>
                      <ChevronDown size={14} className="text-[var(--color-text-tertiary)]" />
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Descrição interna</label>
                    <input
                      defaultValue="Modelo padrão para contratos de assessoria tributária com vigência anual e parcelas mensais."
                      className="h-[36px] border border-[var(--color-border-strong)] rounded-[8px] px-3 text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* ── Variables panel ── */}
              <div className="bg-white border border-[var(--color-border)] rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.03)] overflow-hidden">
                <button
                  onClick={() => setShowVarPanel(v => !v)}
                  className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-[var(--color-subtle)] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-[var(--color-accent)]" />
                    <span className="text-[12px] font-[700] text-[var(--color-text-primary)] uppercase tracking-wider">Variáveis do modelo</span>
                    <span className="text-[11px] text-[var(--color-text-tertiary)] font-normal">({variables.length} variáveis)</span>
                  </div>
                  <ChevronDown size={14} className={`text-[var(--color-text-tertiary)] transition-transform ${showVarPanel ? '' : '-rotate-90'}`} />
                </button>

                {showVarPanel && (
                  <div className="px-5 pb-4 border-t border-[var(--color-border)]">
                    <p className="text-[12px] text-[var(--color-text-tertiary)] mt-3 mb-3 leading-[1.5]">
                      Insira estas variáveis no texto das cláusulas. Elas serão substituídas automaticamente ao gerar o contrato.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {variables.map(v => (
                        <button
                          key={v}
                          className="flex items-center gap-1.5 h-[26px] px-2.5 bg-[var(--color-accent-soft)] text-[var(--color-accent)] text-[11px] font-[500] rounded-[5px] border border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)] hover:text-white transition-colors font-mono"
                        >
                          {v}
                        </button>
                      ))}
                      <button className="flex items-center gap-1 h-[26px] px-2.5 border border-dashed border-[var(--color-border-strong)] text-[var(--color-text-tertiary)] text-[11px] font-[500] rounded-[5px] hover:border-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
                        <Plus size={11} /> Nova variável
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Clause builder ── */}
              <div className="bg-white border border-[var(--color-border)] rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-[var(--color-text-tertiary)]" />
                    <span className="text-[12px] font-[700] text-[var(--color-text-primary)] uppercase tracking-wider">Cláusulas</span>
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">({clauses.length} cláusulas)</span>
                  </div>
                  <button className="h-[28px] px-3 text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] rounded-[6px] transition-colors flex items-center gap-1.5 border border-[var(--color-border-strong)]">
                    <Plus size={12} /> Adicionar cláusula
                  </button>
                </div>

                <div className="flex flex-col divide-y divide-[var(--color-border)]">
                  {clauses.map((clause, index) => {
                    const isExpanded = expandedId === clause.id;
                    const Icon = clause.icon;
                    return (
                      <div key={clause.id} className={`transition-colors ${isExpanded ? 'bg-white' : 'hover:bg-[var(--color-subtle)/30]'}`}>

                        {/* Clause header row */}
                        <div
                          className="flex items-center gap-3 px-5 py-3 cursor-pointer"
                          onClick={() => setExpandedId(isExpanded ? null : clause.id)}
                        >
                          <GripVertical size={15} className="text-[var(--color-text-tertiary)] cursor-grab shrink-0" />

                          <div className="w-[22px] h-[22px] rounded-[5px] bg-[var(--color-subtle)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                            <Icon size={12} className="text-[var(--color-text-secondary)]" />
                          </div>

                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="text-[11px] font-[700] text-[var(--color-text-tertiary)] w-[60px] shrink-0">Cl. {index + 1}</span>
                            <span className={`text-[13px] font-[${isExpanded ? '600' : '500'}] text-[var(--color-text-primary)] truncate`}>
                              {clause.title}
                            </span>
                            {!clause.required && (
                              <span className="text-[10px] font-[500] text-[var(--color-text-tertiary)] bg-[var(--color-subtle)] border border-[var(--color-border)] px-1.5 py-0.5 rounded-full shrink-0">
                                Opcional
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {/* AI generate */}
                            {clause.type !== 'sign' && (
                              <button
                                className="h-[26px] px-2.5 bg-[var(--color-accent-soft)] text-[var(--color-accent)] rounded-[6px] text-[11px] font-[500] flex items-center gap-1 hover:opacity-90 transition-opacity"
                                onClick={e => e.stopPropagation()}
                              >
                                <span className="text-[13px] leading-none">◇</span> Gerar
                              </button>
                            )}
                            <button
                              className="w-[26px] h-[26px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[5px] hover:bg-[var(--color-subtle)]"
                              onClick={e => { e.stopPropagation(); toggleRequired(clause.id); }}
                              title={clause.required ? 'Tornar opcional' : 'Tornar obrigatória'}
                            >
                              {clause.required ? <Lock size={12} /> : <AlertCircle size={12} />}
                            </button>
                            <button
                              className="w-[26px] h-[26px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors rounded-[5px] hover:bg-[var(--color-danger-soft)]"
                              onClick={e => { e.stopPropagation(); setClauses(cs => cs.filter(c => c.id !== clause.id)); }}
                            >
                              <Trash2 size={12} />
                            </button>
                            <ChevronDown
                              size={14}
                              className={`text-[var(--color-text-tertiary)] transition-transform ${isExpanded ? '' : '-rotate-90'}`}
                            />
                          </div>
                        </div>

                        {/* Clause body — expanded */}
                        {isExpanded && (
                          <div className="px-5 pb-4 bg-[var(--color-subtle)] border-t border-[var(--color-border)]">

                            {clause.type === 'sign' ? (
                              /* Signature block preview */
                              <div className="mt-4 bg-white border border-[var(--color-border)] rounded-[8px] p-4">
                                <div className="text-[11px] uppercase font-[600] text-[var(--color-text-tertiary)] tracking-wider mb-3">Bloco de assinatura (gerado automaticamente)</div>
                                <div className="flex gap-8">
                                  {['Contratante', 'Contratada'].map(party => (
                                    <div key={party} className="flex-1 flex flex-col items-center">
                                      <div className="w-full h-[44px] border-b border-dashed border-[var(--color-border-strong)]" />
                                      <div className="mt-2 text-center">
                                        <div className="text-[10px] uppercase font-[700] text-[var(--color-text-tertiary)] tracking-wider">{party}</div>
                                        <div className="text-[11px] text-[var(--color-text-secondary)] font-mono mt-0.5">{party === 'Contratante' ? '{{RESPONSAVEL}}' : 'Ana Beatriz, Sócia'}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-4 flex items-center gap-1.5 text-[11px] text-[var(--color-success)]">
                                  <CheckCircle2 size={12} /> Assinatura eletrônica ICP-Brasil habilitada
                                </div>
                              </div>

                            ) : clause.type === 'list' ? (
                              /* List clause */
                              <div className="mt-4 flex flex-col gap-3">
                                <div>
                                  <div className="text-[12px] font-[600] text-[var(--color-text-primary)] mb-2">Da Contratada:</div>
                                  {['Executar os serviços com qualidade técnica e nos prazos acordados.', 'Manter sigilo absoluto sobre informações confidenciais da Contratante.'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 mb-2">
                                      <span className="w-[4px] h-[4px] rounded-full bg-[var(--color-text-tertiary)] shrink-0 mt-[1px]" />
                                      <input defaultValue={item} className="flex-1 text-[13px] text-[var(--color-text-secondary)] bg-transparent border-b border-transparent hover:border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none transition-colors py-0.5" />
                                      <button className="text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors"><X size={12} /></button>
                                    </div>
                                  ))}
                                  <button className="text-[12px] text-[var(--color-accent)] hover:opacity-80 transition-opacity flex items-center gap-1 mt-1"><Plus size={11} /> Adicionar item</button>
                                </div>
                                <div>
                                  <div className="text-[12px] font-[600] text-[var(--color-text-primary)] mb-2">Da Contratante:</div>
                                  {['Fornecer documentos e informações em até 5 dias úteis.', 'Efetuar os pagamentos nas datas de vencimento.'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 mb-2">
                                      <span className="w-[4px] h-[4px] rounded-full bg-[var(--color-text-tertiary)] shrink-0 mt-[1px]" />
                                      <input defaultValue={item} className="flex-1 text-[13px] text-[var(--color-text-secondary)] bg-transparent border-b border-transparent hover:border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none transition-colors py-0.5" />
                                      <button className="text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] transition-colors"><X size={12} /></button>
                                    </div>
                                  ))}
                                  <button className="text-[12px] text-[var(--color-accent)] hover:opacity-80 transition-opacity flex items-center gap-1 mt-1"><Plus size={11} /> Adicionar item</button>
                                </div>
                              </div>

                            ) : (
                              /* Text clause */
                              <div className="mt-4">
                                <textarea
                                  defaultValue={clause.content}
                                  rows={4}
                                  className="w-full border border-[var(--color-border-strong)] rounded-[8px] p-3 text-[13px] text-[var(--color-text-secondary)] leading-[1.7] outline-none focus:border-[var(--color-accent)] resize-none bg-white transition-colors"
                                />
                                <div className="flex items-center gap-3 mt-2">
                                  <div className="flex flex-wrap gap-1.5">
                                    {variables.slice(0, 4).map(v => (
                                      <button key={v} className="h-[20px] px-1.5 bg-[var(--color-accent-soft)] text-[var(--color-accent)] text-[10px] font-[500] rounded-[4px] font-mono hover:opacity-80 transition-opacity">
                                        {v}
                                      </button>
                                    ))}
                                  </div>
                                  <span className="text-[11px] text-[var(--color-text-tertiary)] ml-auto">Clique numa variável para inserir</span>
                                </div>
                              </div>
                            )}

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Add clause footer */}
                <div className="px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="h-[30px] px-3 border border-dashed border-[var(--color-border-strong)] rounded-[6px] text-[12px] font-[500] text-[var(--color-text-tertiary)] hover:border-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors flex items-center gap-1.5">
                      <AlignLeft size={12} /> Texto livre
                    </button>
                    <button className="h-[30px] px-3 border border-dashed border-[var(--color-border-strong)] rounded-[6px] text-[12px] font-[500] text-[var(--color-text-tertiary)] hover:border-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors flex items-center gap-1.5">
                      <ListChecks size={12} /> Lista de itens
                    </button>
                    <button className="h-[30px] px-3 border border-dashed border-[var(--color-border-strong)] rounded-[6px] text-[12px] font-[500] text-[var(--color-text-tertiary)] hover:border-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors flex items-center gap-1.5">
                      <Table2 size={12} /> Tabela
                    </button>
                  </div>
                  <button className="h-[30px] px-3 bg-[var(--color-accent-soft)] text-[var(--color-accent)] rounded-[6px] text-[12px] font-[500] flex items-center gap-1.5 hover:opacity-90 transition-opacity">
                    <span className="text-[14px] leading-none">◇</span> Gerar cláusula com IA
                  </button>
                </div>
              </div>

              {/* Bottom padding */}
              <div className="h-4" />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
