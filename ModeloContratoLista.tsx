import React, { useState } from 'react';
import {
  Plus, Search, ChevronDown, MoreHorizontal, Edit2,
  Copy, Archive, Trash2, FileText, CheckCircle2, Clock,
  AlertTriangle, X, ChevronRight, Filter, ArrowUpDown,
  ListChecks, AlignLeft
} from 'lucide-react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';

/* ─── Types ──────────────────────────────── */
type Status = 'ativo' | 'rascunho' | 'arquivado';
type Category = 'Assessoria' | 'Auditoria' | 'Treinamento' | 'Pacotes';

interface Template {
  id: number;
  name: string;
  category: Category;
  clauses: number;
  status: Status;
  used: number;
  lastEdited: string;
  editedBy: string;
  description: string;
}

/* ─── Data ───────────────────────────────── */
const initial: Template[] = [
  { id: 1, name: 'Assessoria Tributária Completa', category: 'Assessoria',  clauses: 7, status: 'ativo',    used: 14, lastEdited: '12/04/2025', editedBy: 'Ana Beatriz',     description: 'Modelo padrão para assessoria tributária anual com parcelas mensais.' },
  { id: 2, name: 'Auditoria Fiscal Independente',  category: 'Auditoria',   clauses: 6, status: 'ativo',    used: 8,  lastEdited: '08/04/2025', editedBy: 'Carlos Mendes',    description: 'Contrato de auditoria fiscal avulsa com entrega de relatório.' },
  { id: 3, name: 'BPO Contábil Mensal',            category: 'Assessoria',  clauses: 6, status: 'ativo',    used: 11, lastEdited: '01/04/2025', editedBy: 'Ana Beatriz',     description: 'BPO contábil com SLA mensal e relatório de desempenho.' },
  { id: 4, name: 'Treinamento Equipe Financeira',  category: 'Treinamento', clauses: 5, status: 'ativo',    used: 4,  lastEdited: '25/03/2025', editedBy: 'Juliana Costa',    description: 'Treinamento presencial ou remoto para equipe financeira.' },
  { id: 5, name: 'Planejamento Tributário Anual',  category: 'Assessoria',  clauses: 8, status: 'rascunho', used: 0,  lastEdited: '14/04/2025', editedBy: 'Ana Beatriz',     description: 'Modelo em elaboração para planejamento tributário estratégico.' },
  { id: 6, name: 'Pacote Startup (3 serviços)',    category: 'Pacotes',     clauses: 9, status: 'rascunho', used: 2,  lastEdited: '10/04/2025', editedBy: 'Carlos Mendes',    description: 'Pacote combinado de assessoria, BPO e diagnóstico para startups.' },
  { id: 7, name: 'Diagnóstico Fiscal Avulso',      category: 'Auditoria',   clauses: 4, status: 'ativo',    used: 6,  lastEdited: '05/03/2025', editedBy: 'Juliana Costa',    description: 'Diagnóstico pontual para identificação de passivo tributário.' },
  { id: 8, name: 'Assessoria Básica (ME/MEI)',     category: 'Assessoria',  clauses: 5, status: 'arquivado',used: 3,  lastEdited: '18/02/2025', editedBy: 'Ana Beatriz',     description: 'Modelo descontinuado. Use "Assessoria Tributária Completa".' },
];

const categoryStyle: Record<string, string> = {
  'Assessoria':  'bg-[#CFFAFE] text-[#0891B2]',
  'Auditoria':   'bg-[var(--color-warning-soft)] text-[var(--color-warning)]',
  'Treinamento': 'bg-[var(--color-success-soft)] text-[var(--color-success)]',
  'Pacotes':     'bg-[var(--color-accent-soft)] text-[var(--color-accent)]',
};

const statusConfig: Record<Status, { label: string; style: string; icon: React.FC<{ size: number }> }> = {
  ativo:     { label: 'Ativo',     style: 'bg-[var(--color-success-soft)] text-[var(--color-success)]',   icon: CheckCircle2 },
  rascunho:  { label: 'Rascunho',  style: 'bg-[var(--color-warning-soft)] text-[var(--color-warning)]',   icon: Clock },
  arquivado: { label: 'Arquivado', style: 'bg-[var(--color-subtle)] text-[var(--color-text-tertiary)] border border-[var(--color-border)]', icon: Archive },
};

/* ─── Subcomponent: Status pill ─────────── */
function StatusPill({ status }: { status: Status }) {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-[500] ${cfg.style}`}>
      <Icon size={9} /> {cfg.label}
    </span>
  );
}

/* ─── Subcomponent: New template modal ─── */
function NewModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'form' | 'clauses'>('form');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.25)' }} onClick={onClose}>
      <div
        className="bg-white rounded-[12px] shadow-[0_8px_40px_rgba(0,0,0,0.14)] w-[560px] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <div>
            <h2 className="text-[15px] font-[700] text-[var(--color-text-primary)] tracking-[-0.01em]">Novo modelo de contrato</h2>
            <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5">Passo {step === 'form' ? '1' : '2'} de 2 — {step === 'form' ? 'Configurações básicas' : 'Selecionar cláusulas iniciais'}</p>
          </div>
          <button onClick={onClose} className="w-[32px] h-[32px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-subtle)] rounded-[8px] transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex px-6 py-3 gap-2 border-b border-[var(--color-border)] bg-[var(--color-subtle)]">
          {['Configurações', 'Cláusulas'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-[20px] h-[20px] rounded-full flex items-center justify-center text-[10px] font-[700] ${
                (step === 'form' && i === 0) || (step === 'clauses' && i === 1)
                  ? 'bg-[var(--color-accent)] text-white'
                  : step === 'clauses' && i === 0
                  ? 'bg-[var(--color-success)] text-white'
                  : 'bg-[var(--color-border-strong)] text-[var(--color-text-tertiary)]'
              }`}>
                {step === 'clauses' && i === 0 ? '✓' : i + 1}
              </div>
              <span className={`text-[12px] font-[500] ${
                (step === 'form' && i === 0) || (step === 'clauses' && i === 1)
                  ? 'text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-tertiary)]'
              }`}>{s}</span>
              {i === 0 && <ChevronRight size={12} className="text-[var(--color-text-tertiary)]" />}
            </div>
          ))}
        </div>

        {/* Modal body */}
        <div className="px-6 py-5 flex flex-col gap-4 flex-1">
          {step === 'form' ? (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Nome do modelo <span className="text-[var(--color-danger)]">*</span></label>
                <input
                  autoFocus
                  placeholder="Ex: Assessoria Tributária Premium"
                  className="h-[38px] border border-[var(--color-border-strong)] rounded-[8px] px-3 text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Categoria <span className="text-[var(--color-danger)]">*</span></label>
                  <div className="h-[38px] border border-[var(--color-border-strong)] rounded-[8px] flex items-center px-3 justify-between cursor-pointer hover:border-[var(--color-text-tertiary)] transition-colors">
                    <span className="text-[13px] text-[var(--color-text-tertiary)]">Selecionar...</span>
                    <ChevronDown size={14} className="text-[var(--color-text-tertiary)]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Criar como</label>
                  <div className="h-[38px] bg-[var(--color-subtle)] border border-[var(--color-border-strong)] rounded-[8px] flex p-1 gap-1">
                    <button className="flex-1 h-full rounded-[6px] text-[12px] font-[500] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] text-[var(--color-text-primary)]">Rascunho</button>
                    <button className="flex-1 h-full rounded-[6px] text-[12px] font-[500] text-[var(--color-text-secondary)]">Ativo</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Descrição interna</label>
                <textarea
                  placeholder="Descreva o propósito e quando usar este modelo..."
                  rows={3}
                  className="border border-[var(--color-border-strong)] rounded-[8px] p-3 text-[13px] text-[var(--color-text-secondary)] outline-none focus:border-[var(--color-accent)] resize-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Partir de um modelo existente</label>
                <div className="h-[38px] border border-[var(--color-border-strong)] rounded-[8px] flex items-center px-3 justify-between cursor-pointer hover:border-[var(--color-text-tertiary)] transition-colors">
                  <span className="text-[13px] text-[var(--color-text-tertiary)]">Modelo em branco</span>
                  <ChevronDown size={14} className="text-[var(--color-text-tertiary)]" />
                </div>
                <p className="text-[11px] text-[var(--color-text-tertiary)]">Copia todas as cláusulas e variáveis do modelo selecionado.</p>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-[12px] text-[var(--color-text-secondary)] mb-1">Selecione as cláusulas que farão parte deste modelo. Você pode adicionar, remover ou reordenar mais tarde.</p>
              {[
                { label: 'Objeto', icon: AlignLeft, checked: true  },
                { label: 'Prazo de Vigência', icon: AlignLeft, checked: true  },
                { label: 'Valor e Forma de Pagamento', icon: AlignLeft, checked: true  },
                { label: 'Obrigações das Partes', icon: ListChecks, checked: true  },
                { label: 'Rescisão', icon: AlignLeft, checked: false },
                { label: 'Confidencialidade', icon: AlignLeft, checked: false },
                { label: 'Assinatura', icon: AlignLeft, checked: true  },
              ].map(({ label, icon: Icon, checked }) => (
                <label key={label} className="flex items-center gap-3 p-2.5 border border-[var(--color-border)] rounded-[8px] cursor-pointer hover:bg-[var(--color-subtle)] transition-colors">
                  <div className={`w-[16px] h-[16px] rounded-[4px] border-2 flex items-center justify-center shrink-0 ${checked ? 'bg-[var(--color-accent)] border-[var(--color-accent)]' : 'border-[var(--color-border-strong)]'}`}>
                    {checked && <CheckCircle2 size={9} className="text-white" strokeWidth={3} />}
                  </div>
                  <Icon size={13} className="text-[var(--color-text-tertiary)] shrink-0" />
                  <span className="text-[13px] font-[500] text-[var(--color-text-primary)]">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-subtle)]">
          <button onClick={onClose} className="h-[36px] px-4 text-[13px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] rounded-[8px] transition-colors">
            Cancelar
          </button>
          <div className="flex items-center gap-2">
            {step === 'clauses' && (
              <button onClick={() => setStep('form')} className="h-[36px] px-4 border border-[var(--color-border-strong)] rounded-[8px] text-[13px] font-[500] text-[var(--color-text-secondary)] hover:bg-white transition-colors">
                Voltar
              </button>
            )}
            <button
              onClick={() => step === 'form' ? setStep('clauses') : onClose()}
              className="h-[36px] px-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-[8px] text-[13px] font-[500] transition-colors shadow-sm"
            >
              {step === 'form' ? 'Próximo →' : 'Criar modelo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Subcomponent: Delete confirm row ─── */
function DeleteConfirm({ name, onCancel, onConfirm }: { name: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-[var(--color-danger-soft)] border border-[var(--color-danger)]/20 rounded-[8px]">
      <AlertTriangle size={15} className="text-[var(--color-danger)] shrink-0" />
      <span className="text-[13px] text-[var(--color-text-primary)] flex-1">
        Excluir <span className="font-[600]">{name}</span>? Esta ação não pode ser desfeita.
      </span>
      <button onClick={onCancel} className="h-[28px] px-3 border border-[var(--color-border-strong)] rounded-[6px] text-[12px] font-[500] bg-white text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors">
        Cancelar
      </button>
      <button onClick={onConfirm} className="h-[28px] px-3 bg-[var(--color-danger)] hover:opacity-90 text-white rounded-[6px] text-[12px] font-[500] transition-opacity">
        Excluir
      </button>
    </div>
  );
}

/* ─── Main component ─────────────────────── */
export default function ModeloContratoLista() {
  const [rows, setRows]           = useState<Template[]>(initial);
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'todos'>('todos');
  const [catFilter, setCatFilter] = useState<Category | 'todos'>('todos');
  const [menuId, setMenuId]       = useState<number | null>(null);
  const [deleteId, setDeleteId]   = useState<number | null>(null);
  const [showModal, setShowModal] = useState(true);
  const [selected, setSelected]   = useState<number[]>([]);

  const filtered = rows.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                        r.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todos' || r.status === statusFilter;
    const matchCat    = catFilter    === 'todos' || r.category === catFilter;
    return matchSearch && matchStatus && matchCat;
  });

  const counts = {
    total:    rows.length,
    ativo:    rows.filter(r => r.status === 'ativo').length,
    rascunho: rows.filter(r => r.status === 'rascunho').length,
    arquivado:rows.filter(r => r.status === 'arquivado').length,
  };

  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map(r => r.id));

  const toggleRow = (id: number) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const doDelete = (id: number) => {
    setRows(rs => rs.filter(r => r.id !== id));
    setDeleteId(null);
  };

  return (
    <AppLayout currentPage="contratos">
      {showModal && <NewModal onClose={() => setShowModal(false)} />}

      <div className="flex flex-col h-full font-[var(--font-ui)]">

        {/* ── Page header ── */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-1 text-[12px] text-[var(--color-text-tertiary)] mb-1.5">
              <span>Contratos</span><ChevronRight size={12} /><span>Modelos</span>
            </div>
            <h1 className="text-[20px] font-[700] text-[var(--color-text-primary)] tracking-[-0.02em]">Modelos de Contrato</h1>
            <p className="text-[13px] text-[var(--color-text-tertiary)] mt-0.5">Gerencie os modelos usados para gerar contratos automaticamente</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="h-[38px] px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-[8px] text-[13px] font-[600] transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus size={15} /> Novo modelo
          </button>
        </div>

        {/* ── Stat chips ── */}
        <div className="flex items-center gap-3 mb-5">
          {([
            ['todos',    'Todos',     counts.total],
            ['ativo',    'Ativos',    counts.ativo],
            ['rascunho', 'Rascunhos', counts.rascunho],
            ['arquivado','Arquivados',counts.arquivado],
          ] as const).map(([val, label, count]) => (
            <button
              key={val}
              onClick={() => setStatusFilter(val as any)}
              className={`h-[30px] px-3 rounded-[6px] text-[12px] font-[500] transition-colors border ${
                statusFilter === val
                  ? 'bg-[var(--color-text-primary)] text-white border-[var(--color-text-primary)]'
                  : 'bg-white border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]'
              }`}
            >
              {label} <span className={`ml-1 font-mono text-[11px] ${statusFilter === val ? 'opacity-70' : 'text-[var(--color-text-tertiary)]'}`}>{count}</span>
            </button>
          ))}
        </div>

        {/* ── Search + filters ── */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-[360px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome ou categoria..."
              className="w-full h-[34px] pl-9 pr-3 text-[13px] border border-[var(--color-border-strong)] rounded-[8px] bg-white outline-none focus:border-[var(--color-accent)] transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
                <X size={12} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Category filter */}
            <div className="h-[34px] border border-[var(--color-border-strong)] rounded-[8px] bg-white flex items-center px-3 gap-1.5 cursor-pointer hover:bg-[var(--color-subtle)] transition-colors">
              <Filter size={13} className="text-[var(--color-text-tertiary)]" />
              <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Categoria</span>
              <ChevronDown size={13} className="text-[var(--color-text-tertiary)]" />
            </div>

            <div className="h-[34px] border border-[var(--color-border-strong)] rounded-[8px] bg-white flex items-center px-3 gap-1.5 cursor-pointer hover:bg-[var(--color-subtle)] transition-colors">
              <ArrowUpDown size={13} className="text-[var(--color-text-tertiary)]" />
              <span className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Ordenar</span>
              <ChevronDown size={13} className="text-[var(--color-text-tertiary)]" />
            </div>
          </div>

          {selected.length > 0 && (
            <div className="ml-auto flex items-center gap-2 bg-[var(--color-text-primary)] text-white px-3 h-[34px] rounded-[8px] text-[12px] font-[500]">
              <span>{selected.length} selecionados</span>
              <span className="w-[1px] h-[14px] bg-white/20" />
              <button className="hover:opacity-70 transition-opacity flex items-center gap-1"><Copy size={12} /> Duplicar</button>
              <button className="hover:opacity-70 transition-opacity flex items-center gap-1"><Archive size={12} /> Arquivar</button>
              <button className="hover:opacity-70 transition-opacity flex items-center gap-1 text-[#FCA5A5]"><Trash2 size={12} /> Excluir</button>
              <button onClick={() => setSelected([])} className="hover:opacity-70 ml-1"><X size={14} /></button>
            </div>
          )}
        </div>

        {/* ── Table ── */}
        <div className="bg-white border border-[var(--color-border)] rounded-[10px] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex-1 flex flex-col">

          {/* Table head */}
          <div className="grid gap-0 border-b border-[var(--color-border)] bg-[var(--color-subtle)]"
            style={{ gridTemplateColumns: '44px 1fr 110px 80px 80px 110px 130px 96px' }}>
            <div className="px-4 py-2.5 flex items-center">
              <input
                type="checkbox"
                checked={selected.length === filtered.length && filtered.length > 0}
                onChange={toggleAll}
                className="w-[14px] h-[14px] accent-[var(--color-accent)] cursor-pointer"
              />
            </div>
            {['NOME DO MODELO','CATEGORIA','CLÁUSULAS','STATUS','USOS','ÚLTIMA EDIÇÃO','AÇÕES'].map(h => (
              <div key={h} className="px-3 py-2.5 text-[10px] font-[700] text-[var(--color-text-tertiary)] uppercase tracking-wider flex items-center gap-1">
                {h} {h === 'ÚLTIMA EDIÇÃO' && <ArrowUpDown size={9} className="opacity-60" />}
              </div>
            ))}
          </div>

          {/* Table body */}
          <div className="flex-1 overflow-y-auto divide-y divide-[var(--color-border)]">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-[var(--color-text-tertiary)]">
                <FileText size={32} className="mb-3 opacity-30" />
                <div className="text-[14px] font-[500]">Nenhum modelo encontrado</div>
                <div className="text-[12px] mt-1">Tente ajustar os filtros ou criar um novo modelo.</div>
              </div>
            ) : filtered.map(row => (
              <React.Fragment key={row.id}>
                {/* Delete confirm row */}
                {deleteId === row.id && (
                  <div className="px-4 py-2">
                    <DeleteConfirm
                      name={row.name}
                      onCancel={() => setDeleteId(null)}
                      onConfirm={() => doDelete(row.id)}
                    />
                  </div>
                )}

                {/* Data row */}
                <div
                  className={`grid items-center transition-colors ${
                    deleteId === row.id ? 'opacity-30 pointer-events-none' :
                    selected.includes(row.id) ? 'bg-[var(--color-accent-soft)]' :
                    row.status === 'arquivado' ? 'opacity-60 hover:opacity-80 hover:bg-[var(--color-subtle)]' :
                    'hover:bg-[var(--color-subtle)]'
                  }`}
                  style={{ gridTemplateColumns: '44px 1fr 110px 80px 80px 110px 130px 96px' }}
                >
                  {/* Checkbox */}
                  <div className="px-4 py-3 flex items-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(row.id)}
                      onChange={() => toggleRow(row.id)}
                      className="w-[14px] h-[14px] accent-[var(--color-accent)] cursor-pointer"
                    />
                  </div>

                  {/* Name + description */}
                  <div className="px-3 py-3 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="w-[28px] h-[28px] rounded-[6px] bg-[var(--color-subtle)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                        <FileText size={13} className="text-[var(--color-text-secondary)]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-[600] text-[var(--color-text-primary)] truncate">{row.name}</div>
                        <div className="text-[11px] text-[var(--color-text-tertiary)] truncate mt-0.5">{row.description}</div>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="px-3 py-3">
                    <span className={`text-[11px] font-[500] px-2 py-0.5 rounded-full ${categoryStyle[row.category]}`}>
                      {row.category}
                    </span>
                  </div>

                  {/* Clauses */}
                  <div className="px-3 py-3 text-[13px] font-mono text-[var(--color-text-secondary)] text-center">
                    {row.clauses}
                  </div>

                  {/* Status */}
                  <div className="px-3 py-3">
                    <StatusPill status={row.status} />
                  </div>

                  {/* Used */}
                  <div className="px-3 py-3 text-[13px] font-mono text-[var(--color-text-secondary)]">
                    {row.used === 0 ? (
                      <span className="text-[var(--color-text-tertiary)]">—</span>
                    ) : (
                      <span>{row.used}x</span>
                    )}
                  </div>

                  {/* Last edited */}
                  <div className="px-3 py-3">
                    <div className="text-[12px] text-[var(--color-text-secondary)]">{row.lastEdited}</div>
                    <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">{row.editedBy}</div>
                  </div>

                  {/* Actions */}
                  <div className="px-3 py-3 flex items-center gap-0.5" onClick={e => e.stopPropagation()}>
                    <button
                      title="Editar"
                      className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-subtle)] rounded-[6px] transition-colors"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      title="Duplicar"
                      className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-subtle)] rounded-[6px] transition-colors"
                    >
                      <Copy size={13} />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setMenuId(menuId === row.id ? null : row.id)}
                        className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-subtle)] rounded-[6px] transition-colors"
                      >
                        <MoreHorizontal size={13} />
                      </button>
                      {menuId === row.id && (
                        <div className="absolute right-0 top-[32px] z-30 bg-white border border-[var(--color-border)] rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.10)] py-1 w-[160px]">
                          <button className="w-full text-left px-3 py-2 text-[12px] font-[500] text-[var(--color-text-primary)] hover:bg-[var(--color-subtle)] flex items-center gap-2 transition-colors">
                            <Edit2 size={12} className="text-[var(--color-text-tertiary)]" /> Editar
                          </button>
                          <button className="w-full text-left px-3 py-2 text-[12px] font-[500] text-[var(--color-text-primary)] hover:bg-[var(--color-subtle)] flex items-center gap-2 transition-colors">
                            <Copy size={12} className="text-[var(--color-text-tertiary)]" /> Duplicar
                          </button>
                          <button className="w-full text-left px-3 py-2 text-[12px] font-[500] text-[var(--color-text-primary)] hover:bg-[var(--color-subtle)] flex items-center gap-2 transition-colors">
                            <Archive size={12} className="text-[var(--color-text-tertiary)]" /> Arquivar
                          </button>
                          <div className="h-[1px] bg-[var(--color-border)] my-1" />
                          <button
                            onClick={() => { setDeleteId(row.id); setMenuId(null); }}
                            className="w-full text-left px-3 py-2 text-[12px] font-[500] text-[var(--color-danger)] hover:bg-[var(--color-danger-soft)] flex items-center gap-2 transition-colors"
                          >
                            <Trash2 size={12} /> Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Table footer */}
          <div className="border-t border-[var(--color-border)] px-4 py-2.5 flex items-center justify-between bg-[var(--color-subtle)] shrink-0">
            <span className="text-[12px] text-[var(--color-text-tertiary)]">
              {filtered.length} de {rows.length} modelos
            </span>
            <div className="flex items-center gap-2 text-[12px] text-[var(--color-text-tertiary)]">
              <span>Linhas por página:</span>
              <div className="flex items-center gap-1 border border-[var(--color-border-strong)] rounded-[5px] px-2 py-0.5 bg-white cursor-pointer">
                <span className="font-[500] text-[var(--color-text-primary)]">10</span>
                <ChevronDown size={11} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
