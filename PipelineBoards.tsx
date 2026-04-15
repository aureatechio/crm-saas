import React, { useState } from 'react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';
import { useNav } from './_shared/nav-context';
import {
  Plus, Search, MoreHorizontal, Kanban, Trash2, Settings2,
  Copy, Archive, ChevronDown, X, AlertTriangle, ArrowRight,
  GripVertical, ChevronRight, Users, Check, Pencil
} from 'lucide-react';

/* ─── Types ─────────────────────────────── */
type StageType = 'aberta' | 'ganha' | 'perdida' | 'cancelada';
interface Stage  { id: string; name: string; color: string; type: StageType; leads: number; }
interface Board  { id: string; name: string; stages: Stage[]; leads: number; owner: string; createdAt: string; status: 'ativo' | 'arquivado'; description: string; }

/* ─── Seed ───────────────────────────────── */
const SEED: Board[] = [
  {
    id: 'b1', name: 'Pipeline Comercial', owner: 'Ana Beatriz', createdAt: '01/01/2025', status: 'ativo', leads: 11,
    description: 'Pipeline principal de vendas consultivas para clientes B2B.',
    stages: [
      { id: 's1', name: 'Prospecção',  color: '#64748B', type: 'aberta', leads: 3 },
      { id: 's2', name: 'Qualificação',color: '#0891B2', type: 'aberta', leads: 2 },
      { id: 's3', name: 'Proposta',    color: '#D97706', type: 'aberta', leads: 2 },
      { id: 's4', name: 'Negociação',  color: '#E85D2F', type: 'aberta', leads: 2 },
      { id: 's5', name: 'Fechamento',  color: '#16A34A', type: 'ganha',  leads: 2 },
    ],
  },
  {
    id: 'b2', name: 'Pipeline Parceiros', owner: 'Carlos Mendes', createdAt: '15/02/2025', status: 'ativo', leads: 4,
    description: 'Gestão de parcerias estratégicas e joint ventures.',
    stages: [
      { id: 'p1', name: 'Contato inicial', color: '#64748B', type: 'aberta', leads: 1 },
      { id: 'p2', name: 'Avaliação',       color: '#7C3AED', type: 'aberta', leads: 2 },
      { id: 'p3', name: 'Negociação',      color: '#D97706', type: 'aberta', leads: 1 },
      { id: 'p4', name: 'Formalizado',     color: '#16A34A', type: 'ganha',  leads: 0 },
    ],
  },
  {
    id: 'b3', name: 'Prospecção Inbound', owner: 'Juliana Costa', createdAt: '10/03/2025', status: 'ativo', leads: 7,
    description: 'Leads capturados via site, LinkedIn e eventos.',
    stages: [
      { id: 'i1', name: 'Novo lead',   color: '#64748B', type: 'aberta', leads: 2 },
      { id: 'i2', name: 'Qualificado', color: '#0891B2', type: 'aberta', leads: 3 },
      { id: 'i3', name: 'Transferido', color: '#D97706', type: 'aberta', leads: 1 },
      { id: 'i4', name: 'Descartado',  color: '#EF4444', type: 'perdida',leads: 1 },
    ],
  },
  {
    id: 'b4', name: 'Renovações 2024', owner: 'Ana Beatriz', createdAt: '05/01/2024', status: 'arquivado', leads: 18,
    description: 'Ciclo de renovações encerrado. Arquivado em dez/2024.',
    stages: [
      { id: 'r1', name: 'Em análise',  color: '#64748B', type: 'aberta',    leads: 0 },
      { id: 'r2', name: 'Renovado',    color: '#16A34A', type: 'ganha',     leads: 15 },
      { id: 'r3', name: 'Cancelado',   color: '#EF4444', type: 'cancelada', leads: 3 },
    ],
  },
];

const STAGE_COLORS = ['#64748B','#0891B2','#D97706','#E85D2F','#16A34A','#7C3AED','#DB2777','#0D9488','#EF4444'];
const TYPE_OPTS: { id: StageType; label: string }[] = [
  { id: 'aberta', label: 'Aberta' }, { id: 'ganha', label: 'Ganha' },
  { id: 'perdida', label: 'Perdida' }, { id: 'cancelada', label: 'Cancelada' },
];

/* ─── Delete Board modal ─────────────────── */
function DeleteBoardModal({ board, others, onCancel, onConfirm }: {
  board: Board; others: Board[];
  onCancel: () => void; onConfirm: (toBoardId: string, toStageId: string) => void;
}) {
  const [destBoard, setDestBoard] = useState(others[0]?.id ?? '');
  const [destStage, setDestStage] = useState(others[0]?.stages[0]?.id ?? '');
  const destBoardObj = others.find(b => b.id === destBoard);

  const handleBoardChange = (id: string) => {
    setDestBoard(id);
    const b = others.find(x => x.id === id);
    setDestStage(b?.stages[0]?.id ?? '');
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center" style={{ background: 'rgba(15,15,15,0.38)', backdropFilter: 'blur(2px)' }}>
      <div className="bg-white rounded-[12px] shadow-[0_8px_48px_rgba(0,0,0,0.18)] w-[480px] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 flex items-start gap-3 border-b border-[var(--color-border)]">
          <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--color-danger-soft)] flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-[var(--color-danger)]" />
          </div>
          <div>
            <h3 className="text-[15px] font-[700] text-[var(--color-text-primary)]">Excluir "{board.name}"?</h3>
            <p className="text-[12px] text-[var(--color-text-secondary)] mt-1 leading-relaxed">
              Este kanban contém <span className="font-[600]">{board.leads} leads</span> distribuídos em <span className="font-[600]">{board.stages.length} etapas</span>. Antes de excluir, selecione para onde mover os leads.
            </p>
          </div>
        </div>

        {/* Body */}
        {board.leads > 0 ? (
          <div className="px-5 py-5 bg-[var(--color-subtle)] border-b border-[var(--color-border)] flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Mover todos os leads para o kanban:</label>
              <div className="relative">
                <select value={destBoard} onChange={e => handleBoardChange(e.target.value)} className="w-full h-[38px] border border-[var(--color-border-strong)] rounded-[8px] bg-white pl-3 pr-8 text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] appearance-none transition-colors">
                  {others.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Na etapa:</label>
              <div className="relative">
                <select value={destStage} onChange={e => setDestStage(e.target.value)} className="w-full h-[38px] border border-[var(--color-border-strong)] rounded-[8px] bg-white pl-3 pr-8 text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] appearance-none transition-colors">
                  {destBoardObj?.stages.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white border border-[var(--color-border)] rounded-[8px] text-[12px] text-[var(--color-text-secondary)]">
              <ArrowRight size={13} className="text-[var(--color-accent)] shrink-0" />
              <span>
                <span className="font-[600]">{board.leads} leads</span> serão movidos para{' '}
                <span className="font-[600]">{destBoardObj?.name}</span>
                {destStage && <> → <span className="font-[600]">{destBoardObj?.stages.find(s => s.id === destStage)?.name}</span></>}
              </span>
            </div>
          </div>
        ) : (
          <div className="px-5 py-4 bg-[var(--color-subtle)] border-b border-[var(--color-border)]">
            <p className="text-[13px] text-[var(--color-text-secondary)]">Este kanban não possui leads e pode ser excluído com segurança.</p>
          </div>
        )}

        {/* Warning */}
        <div className="px-5 py-3 bg-[var(--color-danger-soft)] border-b border-[var(--color-danger)]/20">
          <p className="text-[12px] text-[var(--color-danger)] font-[500]">
            Esta ação é permanente. O kanban, todas as suas etapas e configurações serão removidos.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3.5">
          <button onClick={onCancel} className="h-[36px] px-4 text-[13px] font-[500] border border-[var(--color-border-strong)] rounded-[8px] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors">Cancelar</button>
          <button onClick={() => onConfirm(destBoard, destStage)} className="h-[36px] px-5 text-[13px] font-[600] bg-[var(--color-danger)] hover:opacity-90 text-white rounded-[8px] transition-opacity">
            {board.leads > 0 ? 'Mover leads e excluir' : 'Excluir kanban'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Create Board modal (2 steps) ─────── */
function CreateBoardModal({ onClose }: { onClose: () => void }) {
  const [step, setStep]   = useState<'info' | 'stages'>('info');
  const [stages, setStages] = useState([
    { id: 'n1', name: 'Prospecção',  color: '#64748B', type: 'aberta' as StageType },
    { id: 'n2', name: 'Qualificação',color: '#0891B2', type: 'aberta' as StageType },
    { id: 'n3', name: 'Proposta',    color: '#D97706', type: 'aberta' as StageType },
    { id: 'n4', name: 'Fechamento',  color: '#16A34A', type: 'ganha'  as StageType },
  ]);
  const [addName, setAddName]   = useState('');
  const [addColor, setAddColor] = useState(STAGE_COLORS[0]);
  const [addType, setAddType]   = useState<StageType>('aberta');
  const [editIdx, setEditIdx]   = useState<number | null>(null);

  const removeStage = (id: string) => setStages(ss => ss.filter(s => s.id !== id));
  const addStage = () => {
    if (!addName.trim()) return;
    setStages(ss => [...ss, { id: `ns${Date.now()}`, name: addName.trim(), color: addColor, type: addType }]);
    setAddName('');
  };

  const typeStyle = (t: StageType) => {
    const m: Record<StageType, string> = {
      aberta: 'bg-[var(--color-subtle)] text-[var(--color-text-secondary)]',
      ganha: 'bg-[var(--color-success-soft)] text-[var(--color-success)]',
      perdida: 'bg-[var(--color-danger-soft)] text-[var(--color-danger)]',
      cancelada: 'bg-[var(--color-subtle)] text-[var(--color-text-tertiary)]',
    };
    return m[t];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(15,15,15,0.30)', backdropFilter: 'blur(2px)' }} onClick={onClose}>
      <div className="bg-white rounded-[14px] shadow-[0_12px_56px_rgba(0,0,0,0.14)] w-[580px] max-h-[88vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-[34px] h-[34px] rounded-[9px] bg-[var(--color-accent-soft)] flex items-center justify-center">
              <Kanban size={16} className="text-[var(--color-accent)]" />
            </div>
            <div>
              <h2 className="text-[15px] font-[700] text-[var(--color-text-primary)]">Novo kanban</h2>
              <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">Passo {step === 'info' ? '1' : '2'} de 2</p>
            </div>
          </div>
          <button onClick={onClose} className="w-[30px] h-[30px] flex items-center justify-center hover:bg-[var(--color-subtle)] rounded-[7px] transition-colors text-[var(--color-text-tertiary)]"><X size={15} /></button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 px-6 py-3 border-b border-[var(--color-border)] bg-[var(--color-subtle)] shrink-0">
          {[{ key: 'info', label: 'Configurações' }, { key: 'stages', label: 'Etapas' }].map((s, i) => (
            <React.Fragment key={s.key}>
              <div className="flex items-center gap-2">
                <div className={`w-[20px] h-[20px] rounded-full flex items-center justify-center text-[10px] font-[700] ${step === s.key ? 'bg-[var(--color-accent)] text-white' : step === 'stages' && i === 0 ? 'bg-[var(--color-success)] text-white' : 'bg-[var(--color-border-strong)] text-[var(--color-text-tertiary)]'}`}>
                  {step === 'stages' && i === 0 ? <Check size={10} strokeWidth={3} /> : i + 1}
                </div>
                <span className={`text-[12px] font-[500] ${step === s.key ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)]'}`}>{s.label}</span>
              </div>
              {i === 0 && <ChevronRight size={12} className="text-[var(--color-text-tertiary)]" />}
            </React.Fragment>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          {step === 'info' ? (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Nome do kanban <span className="text-[var(--color-danger)]">*</span></label>
                <input autoFocus placeholder="Ex: Pipeline Enterprise" className="h-[38px] border border-[var(--color-border-strong)] rounded-[8px] px-3 text-[13px] outline-none focus:border-[var(--color-accent)] transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Descrição</label>
                <textarea rows={2} placeholder="Descreva o propósito deste kanban..." className="border border-[var(--color-border-strong)] rounded-[8px] p-3 text-[13px] outline-none focus:border-[var(--color-accent)] resize-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Responsável <span className="text-[var(--color-danger)]">*</span></label>
                  <div className="relative">
                    <select className="w-full h-[38px] border border-[var(--color-border-strong)] rounded-[8px] px-3 pr-8 text-[13px] outline-none focus:border-[var(--color-accent)] appearance-none bg-white transition-colors">
                      <option value="">Selecionar...</option>
                      {['Ana Beatriz','Carlos Mendes','Juliana Costa','Roberto Lima'].map(n => <option key={n}>{n}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Visibilidade</label>
                  <div className="h-[38px] bg-[var(--color-subtle)] border border-[var(--color-border-strong)] rounded-[8px] flex p-1 gap-1">
                    {['Equipe','Privado'].map((l, i) => (
                      <button key={l} className={`flex-1 h-full rounded-[6px] text-[12px] font-[500] ${i === 0 ? 'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Permissões de edição</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Somente gestor','Toda a equipe','Por etapa'].map((o, i) => (
                    <button key={o} className={`h-[34px] text-[12px] font-[500] rounded-[7px] border transition-all ${i === 1 ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]' : 'border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]'}`}>{o}</button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-[12px] text-[var(--color-text-secondary)]">Defina as etapas iniciais do kanban. Você pode adicionar, remover e reordenar etapas a qualquer momento.</p>
              <div className="flex flex-col gap-2">
                {stages.map((s, idx) => (
                  <div key={s.id} className="flex items-center gap-2 p-2.5 bg-[var(--color-subtle)] border border-[var(--color-border)] rounded-[8px] group">
                    <GripVertical size={14} className="text-[var(--color-border-strong)] cursor-grab shrink-0" />
                    <div className="w-[10px] h-[10px] rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="flex-1 text-[13px] font-[500] text-[var(--color-text-primary)]">{s.name}</span>
                    <span className={`text-[10px] font-[500] px-1.5 py-0.5 rounded-full ${typeStyle(s.type)}`}>{TYPE_OPTS.find(o => o.id === s.type)?.label}</span>
                    <button onClick={() => removeStage(s.id)} className="w-[24px] h-[24px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger-soft)] rounded-[5px] opacity-0 group-hover:opacity-100 transition-all shrink-0"><X size={12} /></button>
                  </div>
                ))}
              </div>
              {/* Add new stage inline */}
              <div className="flex flex-col gap-2 p-3 border border-dashed border-[var(--color-border-strong)] rounded-[8px]">
                <div className="flex gap-2">
                  <input value={addName} onChange={e => setAddName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addStage()} placeholder="Nome da nova etapa..." className="flex-1 h-[32px] border border-[var(--color-border-strong)] rounded-[6px] px-2.5 text-[12px] outline-none focus:border-[var(--color-accent)] transition-colors" />
                  <button onClick={addStage} disabled={!addName.trim()} className="h-[32px] px-3 bg-[var(--color-accent)] text-white text-[12px] font-[600] rounded-[6px] disabled:opacity-40 hover:bg-[var(--color-accent-hover)] transition-colors">Adicionar</button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1 flex-wrap">
                    {STAGE_COLORS.map(c => (
                      <button key={c} onClick={() => setAddColor(c)} className="w-[18px] h-[18px] rounded-full border-[2px] transition-all" style={{ backgroundColor: c, borderColor: addColor === c ? '#E85D2F' : 'transparent' }} />
                    ))}
                  </div>
                  <div className="flex gap-1 flex-1">
                    {TYPE_OPTS.map(o => (
                      <button key={o.id} onClick={() => setAddType(o.id)} className={`flex-1 h-[24px] text-[10px] font-[500] rounded-[4px] border transition-all ${addType === o.id ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]' : 'border-[var(--color-border-strong)] text-[var(--color-text-secondary)]'}`}>{o.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-subtle)] shrink-0">
          <button onClick={onClose} className="h-[36px] px-4 text-[13px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] rounded-[8px] transition-colors">Cancelar</button>
          <div className="flex gap-2">
            {step === 'stages' && (
              <button onClick={() => setStep('info')} className="h-[36px] px-4 border border-[var(--color-border-strong)] rounded-[8px] text-[13px] font-[500] text-[var(--color-text-secondary)] hover:bg-white transition-colors">Voltar</button>
            )}
            <button onClick={() => step === 'info' ? setStep('stages') : onClose()} className="h-[36px] px-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-[8px] text-[13px] font-[600] transition-colors shadow-sm">
              {step === 'info' ? 'Próximo →' : 'Criar kanban'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Board row ─────────────────────────── */
function BoardRow({ board, onDelete, onMenu, menuOpen, onNavigate }: {
  board: Board; onDelete: () => void; onMenu: () => void; menuOpen: boolean; onNavigate: () => void;
}) {
  const stageStyle = (t: StageType) => {
    const m: Record<StageType, string> = {
      aberta: 'bg-[var(--color-subtle)] text-[var(--color-text-secondary)]',
      ganha: 'bg-[var(--color-success-soft)] text-[var(--color-success)]',
      perdida: 'bg-[var(--color-danger-soft)] text-[var(--color-danger)]',
      cancelada: 'bg-[var(--color-subtle)] text-[var(--color-text-tertiary)]',
    };
    return m[t];
  };

  return (
    <div className={`grid items-center gap-0 hover:bg-[var(--color-subtle)] transition-colors ${board.status === 'arquivado' ? 'opacity-60' : ''}`}
      style={{ gridTemplateColumns: '1fr 200px 80px 130px 110px 100px' }}>

      {/* Name + description */}
      <div className="px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className={`w-[30px] h-[30px] rounded-[7px] flex items-center justify-center shrink-0 ${board.status === 'arquivado' ? 'bg-[var(--color-subtle)] border border-[var(--color-border)]' : 'bg-[var(--color-accent-soft)]'}`}>
            <Kanban size={14} className={board.status === 'arquivado' ? 'text-[var(--color-text-tertiary)]' : 'text-[var(--color-accent)]'} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-[600] text-[var(--color-text-primary)] truncate">{board.name}</span>
              {board.status === 'arquivado' && <span className="text-[10px] font-[500] px-1.5 py-0.5 rounded-full bg-[var(--color-subtle)] text-[var(--color-text-tertiary)] border border-[var(--color-border)] shrink-0">Arquivado</span>}
            </div>
            <span className="text-[11px] text-[var(--color-text-tertiary)] truncate block mt-0.5">{board.description}</span>
          </div>
        </div>
      </div>

      {/* Stages mini */}
      <div className="px-4 py-3.5">
        <div className="flex items-center gap-1 flex-wrap">
          {board.stages.slice(0, 4).map(s => (
            <div key={s.id} className="flex items-center gap-1">
              <div className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-[10px] text-[var(--color-text-tertiary)] font-[500]">{s.name}</span>
            </div>
          ))}
          {board.stages.length > 4 && <span className="text-[10px] text-[var(--color-text-tertiary)]">+{board.stages.length - 4}</span>}
        </div>
      </div>

      {/* Leads */}
      <div className="px-4 py-3.5 text-[13px] font-mono font-[500] text-[var(--color-text-secondary)]">
        {board.leads}
      </div>

      {/* Owner */}
      <div className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <div className="w-[22px] h-[22px] rounded-full bg-[#1e40af] text-white flex items-center justify-center text-[8px] font-[700] shrink-0">
            {board.owner.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <span className="text-[12px] text-[var(--color-text-secondary)] truncate">{board.owner}</span>
        </div>
      </div>

      {/* Created */}
      <div className="px-4 py-3.5 text-[12px] text-[var(--color-text-secondary)]">{board.createdAt}</div>

      {/* Actions */}
      <div className="px-4 py-3.5 flex items-center gap-0.5">
        <button
          onClick={onNavigate}
          className="h-[28px] px-2.5 flex items-center gap-1.5 border border-[var(--color-accent)] bg-[var(--color-accent-soft)] rounded-[6px] text-[11px] font-[600] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors shrink-0"
        >
          <ArrowRight size={11} /> Abrir
        </button>
        <div className="relative">
          <button onClick={onMenu} className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:bg-[var(--color-subtle)] rounded-[6px] transition-colors">
            <MoreHorizontal size={13} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-[32px] z-30 bg-white border border-[var(--color-border)] rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.10)] py-1 w-[156px]">
              {[
                { icon: Pencil,  label: 'Editar' },
                { icon: Copy,    label: 'Duplicar' },
                { icon: Archive, label: 'Arquivar' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="w-full text-left px-3 py-2 text-[12px] font-[500] text-[var(--color-text-primary)] hover:bg-[var(--color-subtle)] flex items-center gap-2 transition-colors">
                  <Icon size={12} className="text-[var(--color-text-tertiary)]" /> {label}
                </button>
              ))}
              <div className="h-[1px] bg-[var(--color-border)] my-1" />
              <button onClick={onDelete} className="w-full text-left px-3 py-2 text-[12px] font-[500] text-[var(--color-danger)] hover:bg-[var(--color-danger-soft)] flex items-center gap-2 transition-colors">
                <Trash2 size={12} /> Excluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────── */
export default function PipelineBoards() {
  const { navigate } = useNav();
  const [boards, setBoards]       = useState<Board[]>(SEED);
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState<'todos' | 'ativo' | 'arquivado'>('todos');
  const [menuId, setMenuId]       = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Board | null>(null);
  const [showCreate, setShowCreate] = useState(true);

  const filtered = boards.filter(b => {
    const ms = b.name.toLowerCase().includes(search.toLowerCase());
    const mf = filter === 'todos' || b.status === filter;
    return ms && mf;
  });

  const counts = {
    todos:     boards.length,
    ativo:     boards.filter(b => b.status === 'ativo').length,
    arquivado: boards.filter(b => b.status === 'arquivado').length,
  };

  const doDelete = (toBoardId: string, toStageId: string) => {
    if (!deleteTarget) return;
    setBoards(bs => {
      const updated = bs.filter(b => b.id !== deleteTarget.id);
      if (toBoardId && deleteTarget.leads > 0) {
        return updated.map(b => b.id === toBoardId
          ? { ...b, leads: b.leads + deleteTarget.leads, stages: b.stages.map((s, i) => i === 0 ? { ...s, leads: s.leads + deleteTarget.leads } : s) }
          : b
        );
      }
      return updated;
    });
    setDeleteTarget(null);
  };

  return (
    <AppLayout currentPage="pipeline">
      {showCreate && <CreateBoardModal onClose={() => setShowCreate(false)} />}
      {deleteTarget && (
        <DeleteBoardModal
          board={deleteTarget}
          others={boards.filter(b => b.id !== deleteTarget.id && b.status === 'ativo')}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={doDelete}
        />
      )}

      <div className="flex flex-col h-full font-[var(--font-ui)]" onClick={() => setMenuId(null)}>

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-1 text-[12px] text-[var(--color-text-tertiary)] mb-1.5">
              <span>Pipeline</span><ChevronRight size={12} /><span>Kanbans</span>
            </div>
            <h1 className="text-[20px] font-[700] text-[var(--color-text-primary)] tracking-[-0.02em]">Gerenciar Kanbans</h1>
            <p className="text-[13px] text-[var(--color-text-tertiary)] mt-0.5">Crie e configure pipelines independentes para cada fluxo de vendas</p>
          </div>
          <button onClick={() => setShowCreate(true)} className="h-[38px] px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-[8px] text-[13px] font-[600] flex items-center gap-2 transition-colors shadow-sm">
            <Plus size={15} /> Novo kanban
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-4">
          {([['todos','Todos'], ['ativo','Ativos'], ['arquivado','Arquivados']] as const).map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} className={`h-[30px] px-3 rounded-[6px] text-[12px] font-[500] border transition-colors ${filter === val ? 'bg-[var(--color-text-primary)] text-white border-[var(--color-text-primary)]' : 'bg-white border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]'}`}>
              {label} <span className={`ml-1 font-mono text-[11px] ${filter === val ? 'opacity-70' : 'text-[var(--color-text-tertiary)]'}`}>{counts[val]}</span>
            </button>
          ))}
          <div className="relative ml-auto max-w-[280px] w-full">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar kanban..." className="w-full h-[30px] pl-8 pr-3 text-[12px] border border-[var(--color-border-strong)] rounded-[7px] bg-white outline-none focus:border-[var(--color-accent)] transition-colors" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-[var(--color-border)] rounded-[10px] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex flex-col flex-1">

          {/* Head */}
          <div className="grid border-b border-[var(--color-border)] bg-[var(--color-subtle)]"
            style={{ gridTemplateColumns: '1fr 200px 80px 130px 110px 100px' }}>
            {['NOME DO KANBAN','ETAPAS','LEADS','RESPONSÁVEL','CRIADO EM','AÇÕES'].map(h => (
              <div key={h} className="px-4 py-2.5 text-[10px] font-[700] text-[var(--color-text-tertiary)] uppercase tracking-wider">{h}</div>
            ))}
          </div>

          {/* Rows */}
          <div className="flex-1 overflow-y-auto divide-y divide-[var(--color-border)]">
            {filtered.map(board => (
              <BoardRow
                key={board.id}
                board={board}
                menuOpen={menuId === board.id}
                onMenu={() => setMenuId(id => id === board.id ? null : board.id)}
                onDelete={() => { setDeleteTarget(board); setMenuId(null); }}
                onNavigate={() => navigate('pipeline')}
              />
            ))}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-[var(--color-text-tertiary)]">
                <Kanban size={32} className="mb-3 opacity-30" />
                <div className="text-[14px] font-[500]">Nenhum kanban encontrado</div>
                <div className="text-[12px] mt-1">Crie um novo kanban ou ajuste o filtro.</div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[var(--color-border)] px-4 py-2.5 flex items-center justify-between bg-[var(--color-subtle)] shrink-0">
            <span className="text-[12px] text-[var(--color-text-tertiary)]">{filtered.length} de {boards.length} kanbans</span>
            <div className="flex items-center gap-2 text-[12px] text-[var(--color-text-tertiary)]">
              <span>Total de leads:</span>
              <span className="font-mono font-[500] text-[var(--color-text-secondary)]">{boards.filter(b => b.status === 'ativo').reduce((s, b) => s + b.leads, 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
