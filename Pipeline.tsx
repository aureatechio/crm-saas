import React, { useState } from 'react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';
import { useNav } from './_shared/nav-context';
import {
  ChevronDown, Plus, MessageSquare, Link as LinkIcon,
  MoreHorizontal, X, Zap, AlignLeft, AlertCircle,
  Settings2, GripVertical, Pencil, Trash2, Check,
  ChevronRight, Kanban, AlertTriangle, ArrowRight,
  Users, Mail, Phone, DollarSign, Tag, CalendarDays
} from 'lucide-react';

const fmt = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(v);

/* ─── Types ─────────────────────────────── */
type StageType = 'aberta' | 'ganha' | 'perdida' | 'cancelada';

interface Card {
  id: string; title: string; category: string;
  value: number; priority: 'baixa' | 'moderada' | 'alta' | 'urgente';
  health: number; comments: number; links: number; urgent?: boolean;
}

interface Stage {
  id: string; name: string; color: string; type: StageType; cards: Card[];
}

interface Board { id: string; name: string; stages: Stage[]; }

/* ─── Seed data ─────────────────────────── */
const BOARDS: Board[] = [
  {
    id: 'b1', name: 'Pipeline Comercial',
    stages: [
      { id: 's1', name: 'Prospecção',  color: '#64748B', type: 'aberta', cards: [
        { id: '1', title: 'Diagnóstico Fiscal — Barros & Lima',    category: 'CONTABILIDADE', value: 12500, priority: 'baixa',    health: 80, comments: 2,  links: 1 },
        { id: '2', title: 'Sistema RH — Grupo Prisma',             category: 'TECNOLOGIA',    value: 28000, priority: 'moderada', health: 50, comments: 0,  links: 0 },
        { id: '3', title: 'Auditoria Interna — Rede Contábil',     category: 'AUDITORIA',     value: 9800,  priority: 'baixa',    health: 90, comments: 5,  links: 2 },
      ]},
      { id: 's2', name: 'Qualificação', color: '#0891B2', type: 'aberta', cards: [
        { id: '4', title: 'ERP Contábil — Fernandes & Cia',        category: 'TECNOLOGIA',    value: 45000, priority: 'alta',     health: 60, comments: 1,  links: 3 },
        { id: '5', title: 'Treinamento Equipe — Escola Primavera', category: 'EDUCAÇÃO',      value: 18700, priority: 'moderada', health: 75, comments: 3,  links: 1 },
      ]},
      { id: 's3', name: 'Proposta',     color: '#D97706', type: 'aberta', cards: [
        { id: '6', title: 'Assessoria Tributária — Metalúrgica RJ',category: 'ASSESSORIA',    value: 34500, priority: 'moderada', health: 85, comments: 8,  links: 4 },
        { id: '7', title: 'Plano de Marketing — Agência Pontal',   category: 'MARKETING',     value: 22000, priority: 'baixa',    health: 40, comments: 2,  links: 0 },
      ]},
      { id: 's4', name: 'Negociação',   color: '#E85D2F', type: 'aberta', cards: [
        { id: '8', title: 'Implementação SAP — Indústria Sul',     category: 'TECNOLOGIA',    value: 78000, priority: 'urgente',  health: 30, comments: 12, links: 5, urgent: true },
        { id: '9', title: 'Contabilidade Full — Farmácias Vida',   category: 'CONTABILIDADE', value: 15600, priority: 'moderada', health: 65, comments: 4,  links: 2 },
      ]},
      { id: 's5', name: 'Fechamento',   color: '#16A34A', type: 'ganha',  cards: [
        { id: '10', title: 'Auditoria Anual — Porto Logística',    category: 'AUDITORIA',     value: 52000, priority: 'alta',     health: 95, comments: 6,  links: 3 },
        { id: '11', title: 'BPO Financeiro — Clínicas Norte',      category: 'BPO',           value: 31200, priority: 'baixa',    health: 88, comments: 1,  links: 1 },
      ]},
    ]
  },
  {
    id: 'b2', name: 'Pipeline Parceiros',
    stages: [
      { id: 'p1', name: 'Contato inicial', color: '#64748B', type: 'aberta',    cards: [{ id: 'p1c1', title: 'Parceria — Grupo Ômega', category: 'PARCERIA', value: 5000, priority: 'baixa',    health: 70, comments: 1, links: 0 }] },
      { id: 'p2', name: 'Avaliação',       color: '#7C3AED', type: 'aberta',    cards: [{ id: 'p2c1', title: 'Joint venture — TechBR',  category: 'PARCERIA', value: 80000, priority: 'alta',     health: 60, comments: 3, links: 2 },
                                                                                         { id: 'p2c2', title: 'Revenda — SoftHouse SP',  category: 'PARCERIA', value: 30000, priority: 'moderada', health: 75, comments: 1, links: 1 }] },
      { id: 'p3', name: 'Negociação',      color: '#D97706', type: 'aberta',    cards: [{ id: 'p3c1', title: 'Acordo — Consultores RS',  category: 'PARCERIA', value: 12000, priority: 'baixa',    health: 50, comments: 0, links: 0 }] },
      { id: 'p4', name: 'Formalizado',     color: '#16A34A', type: 'ganha',     cards: [] },
    ]
  },
  {
    id: 'b3', name: 'Prospecção Inbound',
    stages: [
      { id: 'i1', name: 'Novo lead',   color: '#64748B', type: 'aberta',  cards: [
        { id: 'i1a', title: 'Lead site — Construtora Alves', category: 'CONSTRUÇÃO', value: 6000, priority: 'baixa', health: 70, comments: 0, links: 0 },
        { id: 'i1b', title: 'Lead evento — Clínica Saúde+', category: 'SAÚDE', value: 9000, priority: 'baixa', health: 80, comments: 1, links: 0 },
      ]},
      { id: 'i2', name: 'Qualificado', color: '#0891B2', type: 'aberta',  cards: [
        { id: 'i2a', title: 'Lead LinkedIn — Fazenda Bela Vista', category: 'AGRO', value: 22000, priority: 'moderada', health: 65, comments: 2, links: 1 },
        { id: 'i2b', title: 'Lead site — Distribuidora Norte',    category: 'LOGÍSTICA', value: 14000, priority: 'alta', health: 55, comments: 3, links: 2 },
        { id: 'i2c', title: 'Lead evento — Studio Design RJ',    category: 'DESIGN', value: 5500, priority: 'baixa', health: 90, comments: 0, links: 0 },
      ]},
      { id: 'i3', name: 'Transferido', color: '#D97706', type: 'aberta',  cards: [
        { id: 'i3a', title: 'Transferido — Grupo Prisma (comercial)', category: 'TECNOLOGIA', value: 28000, priority: 'moderada', health: 50, comments: 1, links: 0 },
      ]},
      { id: 'i4', name: 'Descartado',  color: '#EF4444', type: 'perdida', cards: [
        { id: 'i4a', title: 'Lead site — Escola Criativa SP', category: 'EDUCAÇÃO', value: 3000, priority: 'baixa', health: 20, comments: 0, links: 0 },
      ]},
    ]
  }
];

const STAGE_COLORS = ['#64748B','#0891B2','#D97706','#E85D2F','#16A34A','#7C3AED','#DB2777','#0D9488','#EF4444'];
const TYPE_OPTS: { id: StageType; label: string }[] = [
  { id: 'aberta', label: 'Aberta' }, { id: 'ganha', label: 'Ganha' },
  { id: 'perdida', label: 'Perdida' }, { id: 'cancelada', label: 'Cancelada' },
];

/* ─── Helpers ───────────────────────────── */
const priorityBar: Record<string, string> = {
  urgente: 'bg-[var(--color-danger)]', alta: 'bg-[var(--color-danger-soft)]',
  moderada: 'bg-[var(--color-warning)]', baixa: 'bg-[var(--color-success-soft)]',
};
const healthColor = (h: number) =>
  h < 40 ? 'bg-[var(--color-danger)]' : h <= 70 ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-success)]';
const typeStyle = (t: StageType): string => ({
  aberta:    'bg-[var(--color-subtle)] text-[var(--color-text-tertiary)] border border-[var(--color-border)]',
  ganha:     'bg-[var(--color-success-soft)] text-[var(--color-success)]',
  perdida:   'bg-[var(--color-danger-soft)] text-[var(--color-danger)]',
  cancelada: 'bg-[var(--color-subtle)] text-[var(--color-text-tertiary)]',
})[t];

/* ─── Delete Stage modal ─────────────────── */
function DeleteStageModal({ stage, otherStages, onCancel, onConfirm }: {
  stage: Stage; otherStages: Stage[];
  onCancel: () => void; onConfirm: (toStageId: string) => void;
}) {
  const [dest, setDest] = useState(otherStages[0]?.id ?? '');
  const leadCount = stage.cards.length;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center" style={{ background: 'rgba(15,15,15,0.40)', backdropFilter: 'blur(2px)' }}>
      <div className="bg-white rounded-[12px] shadow-[0_8px_48px_rgba(0,0,0,0.20)] w-[460px] overflow-hidden">
        <div className="px-5 py-4 flex items-start gap-3 border-b border-[var(--color-border)]">
          <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--color-danger-soft)] flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-[var(--color-danger)]" />
          </div>
          <div>
            <h3 className="text-[15px] font-[700] text-[var(--color-text-primary)]">Excluir etapa "{stage.name}"?</h3>
            <p className="text-[12px] text-[var(--color-text-secondary)] mt-1 leading-relaxed">
              Esta etapa contém <span className="font-[600] text-[var(--color-text-primary)]">{leadCount} {leadCount === 1 ? 'lead' : 'leads'}</span>. Antes de excluir, mova os leads para outra etapa.
            </p>
          </div>
        </div>

        {leadCount > 0 ? (
          <div className="px-5 py-4 flex flex-col gap-3 bg-[var(--color-subtle)] border-b border-[var(--color-border)]">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Mover {leadCount} {leadCount === 1 ? 'lead' : 'leads'} para a etapa:</label>
              <div className="relative">
                <select value={dest} onChange={e => setDest(e.target.value)} className="w-full h-[38px] border border-[var(--color-border-strong)] rounded-[8px] bg-white pl-3 pr-8 text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] appearance-none transition-colors">
                  {otherStages.map(s => <option key={s.id} value={s.id}>{s.name} ({s.cards.length} leads)</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-white border border-[var(--color-border)] rounded-[8px] text-[12px] text-[var(--color-text-secondary)]">
              <ArrowRight size={13} className="text-[var(--color-accent)] shrink-0" />
              <span>{leadCount} {leadCount === 1 ? 'lead será movido' : 'leads serão movidos'} para <span className="font-[600] text-[var(--color-text-primary)]">{otherStages.find(s => s.id === dest)?.name}</span></span>
            </div>
          </div>
        ) : (
          <div className="px-5 py-4 bg-[var(--color-subtle)] border-b border-[var(--color-border)]">
            <p className="text-[13px] text-[var(--color-text-secondary)]">Esta etapa está vazia e pode ser excluída com segurança.</p>
          </div>
        )}

        <div className="px-5 py-3 bg-[var(--color-danger-soft)] border-b border-[var(--color-danger)]/20">
          <p className="text-[12px] text-[var(--color-danger)] font-[500]">Esta ação não pode ser desfeita. A etapa e sua configuração serão removidas.</p>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3.5">
          <button onClick={onCancel} className="h-[36px] px-4 text-[13px] font-[500] border border-[var(--color-border-strong)] rounded-[8px] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors">Cancelar</button>
          <button onClick={() => onConfirm(dest)} className="h-[36px] px-5 text-[13px] font-[600] bg-[var(--color-danger)] hover:opacity-90 text-white rounded-[8px] transition-opacity">
            {leadCount > 0 ? 'Mover e excluir etapa' : 'Excluir etapa'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Stage Panel ────────────────────────── */
function StagePanel({ stages, onClose, onAddStage, onRenameStage, onDeleteStage, onDeleteRequest }: {
  stages: Stage[]; onClose: () => void;
  onAddStage: (name: string, color: string, type: StageType) => void;
  onRenameStage: (id: string, name: string) => void;
  onDeleteStage: (id: string) => void;
  onDeleteRequest: (stage: Stage) => void;
}) {
  const [newName, setNewName]   = useState('');
  const [newColor, setNewColor] = useState(STAGE_COLORS[0]);
  const [newType, setNewType]   = useState<StageType>('aberta');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editVal, setEditVal]   = useState('');

  const startEdit = (s: Stage) => { setEditingId(s.id); setEditVal(s.name); };
  const commitEdit = (id: string) => { if (editVal.trim()) onRenameStage(id, editVal.trim()); setEditingId(null); };

  const handleDelete = (s: Stage) => {
    if (s.cards.length > 0) onDeleteRequest(s);
    else onDeleteStage(s.id);
  };

  const handleAdd = () => {
    if (!newName.trim()) return;
    onAddStage(newName.trim(), newColor, newType);
    setNewName('');
  };

  return (
    <div className="w-[340px] shrink-0 bg-white border border-[var(--color-border)] rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.09)] flex flex-col overflow-hidden h-full max-h-[calc(100vh-120px)]">

      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-subtle)] shrink-0">
        <div className="flex items-center gap-2">
          <Settings2 size={14} className="text-[var(--color-accent)]" />
          <span className="text-[13px] font-[700] text-[var(--color-text-primary)]">Etapas do pipeline</span>
          <span className="text-[11px] font-mono bg-[var(--color-border)] text-[var(--color-text-secondary)] px-1.5 py-0.5 rounded-full">{stages.length}</span>
        </div>
        <button onClick={onClose} className="w-[26px] h-[26px] flex items-center justify-center hover:bg-[var(--color-border)] rounded-[6px] transition-colors text-[var(--color-text-tertiary)]"><X size={14} /></button>
      </div>

      {/* Stage list */}
      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1.5">
        {stages.map((s, idx) => (
          <div key={s.id} className="flex items-center gap-2 p-2.5 rounded-[8px] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] bg-white group transition-colors">
            <GripVertical size={14} className="text-[var(--color-border-strong)] cursor-grab shrink-0" />

            <div className="w-[10px] h-[10px] rounded-full shrink-0" style={{ backgroundColor: s.color }} />

            {editingId === s.id ? (
              <input
                autoFocus
                value={editVal}
                onChange={e => setEditVal(e.target.value)}
                onBlur={() => commitEdit(s.id)}
                onKeyDown={e => { if (e.key === 'Enter') commitEdit(s.id); if (e.key === 'Escape') setEditingId(null); }}
                className="flex-1 h-[24px] text-[12px] border-b border-[var(--color-accent)] outline-none font-[500] bg-transparent text-[var(--color-text-primary)]"
              />
            ) : (
              <span className="flex-1 text-[12px] font-[500] text-[var(--color-text-primary)] truncate">{s.name}</span>
            )}

            <span className={`text-[10px] font-[500] px-1.5 py-0.5 rounded-full shrink-0 ${typeStyle(s.type)}`}>
              {TYPE_OPTS.find(o => o.id === s.type)?.label}
            </span>

            {s.cards.length > 0 && (
              <span className="text-[10px] font-mono text-[var(--color-text-tertiary)] shrink-0">{s.cards.length}</span>
            )}

            <button onClick={() => startEdit(s)} className="w-[22px] h-[22px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-subtle)] rounded-[5px] opacity-0 group-hover:opacity-100 transition-all shrink-0">
              <Pencil size={11} />
            </button>
            <button onClick={() => handleDelete(s)} className="w-[22px] h-[22px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger-soft)] rounded-[5px] opacity-0 group-hover:opacity-100 transition-all shrink-0">
              <Trash2 size={11} />
            </button>
          </div>
        ))}
      </div>

      {/* Add stage */}
      <div className="border-t border-[var(--color-border)] px-3 py-3 flex flex-col gap-2 shrink-0 bg-[var(--color-subtle)]">
        <div className="text-[10px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-1">Nova etapa</div>
        <div className="flex gap-2">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Nome da etapa..."
            className="flex-1 h-[32px] border border-[var(--color-border-strong)] rounded-[6px] px-2.5 text-[12px] bg-white outline-none focus:border-[var(--color-accent)] transition-colors"
          />
          <button onClick={handleAdd} disabled={!newName.trim()} className="h-[32px] px-3 bg-[var(--color-accent)] disabled:opacity-40 hover:bg-[var(--color-accent-hover)] text-white text-[12px] font-[600] rounded-[6px] transition-colors">
            <Plus size={13} />
          </button>
        </div>

        {/* Color picker */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {STAGE_COLORS.map(c => (
              <button key={c} onClick={() => setNewColor(c)} className="w-[16px] h-[16px] rounded-full border-[2px] transition-all" style={{ backgroundColor: c, borderColor: newColor === c ? '#E85D2F' : 'transparent' }} />
            ))}
          </div>
        </div>

        {/* Type selector */}
        <div className="flex gap-1">
          {TYPE_OPTS.map(o => (
            <button key={o.id} onClick={() => setNewType(o.id)} className={`flex-1 h-[24px] text-[10px] font-[500] rounded-[5px] border transition-all ${newType === o.id ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]' : 'border-[var(--color-border-strong)] bg-white text-[var(--color-text-secondary)]'}`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── New Lead modal ─────────────────────── */
function NovoLeadModal({ onClose }: { onClose: () => void }) {
  const [priority, setPriority] = useState('moderada');
  const [source, setSource]     = useState('indicacao');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(15,15,15,0.30)', backdropFilter: 'blur(2px)' }} onClick={onClose}>
      <div className="bg-white rounded-[14px] shadow-[0_12px_56px_rgba(0,0,0,0.16)] w-[660px] max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-[34px] h-[34px] rounded-[9px] bg-[var(--color-accent-soft)] flex items-center justify-center">
              <Zap size={16} className="text-[var(--color-accent)]" />
            </div>
            <div>
              <h2 className="text-[15px] font-[700] text-[var(--color-text-primary)] tracking-[-0.01em]">Novo Lead</h2>
              <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">Pipeline Comercial · Prospecção</p>
            </div>
          </div>
          <button onClick={onClose} className="w-[32px] h-[32px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:bg-[var(--color-subtle)] rounded-[8px] transition-colors"><X size={16} /></button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">
          {/* Empresa */}
          <div>
            <p className="text-[10px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3 flex items-center gap-2"><span className="w-[1px] h-[10px] bg-[var(--color-accent)] inline-block" />Empresa</p>
            <div className="grid grid-cols-2 gap-3">
              {[['Razão social / Nome *', 'Ex: Metalúrgica Barros Ltda.'],['CNPJ','00.000.000/0001-00']].map(([l,p]) => (
                <div key={l} className="flex flex-col gap-1">
                  <label className="text-[11px] font-[600] text-[var(--color-text-secondary)]">{l}</label>
                  <input placeholder={p} className="h-[34px] border border-[var(--color-border-strong)] rounded-[7px] px-3 text-[12px] outline-none focus:border-[var(--color-accent)] transition-colors" />
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-[600] text-[var(--color-text-secondary)]">Segmento *</label>
                <div className="relative">
                  <select className="w-full h-[34px] border border-[var(--color-border-strong)] rounded-[7px] pl-3 pr-8 text-[12px] outline-none focus:border-[var(--color-accent)] appearance-none bg-white">
                    <option value="">Selecionar...</option>
                    {['Contabilidade','Auditoria','Tecnologia','Assessoria','Educação','BPO','Marketing'].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-[600] text-[var(--color-text-secondary)]">Porte</label>
                <div className="relative">
                  <select className="w-full h-[34px] border border-[var(--color-border-strong)] rounded-[7px] pl-3 pr-8 text-[12px] outline-none focus:border-[var(--color-accent)] appearance-none bg-white">
                    <option value="">Selecionar...</option>
                    {['MEI','Micro','Pequena','Média','Grande'].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[var(--color-border)]" />

          {/* Contato */}
          <div>
            <p className="text-[10px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3 flex items-center gap-2"><span className="w-[1px] h-[10px] bg-[var(--color-accent)] inline-block" />Contato principal</p>
            <div className="grid grid-cols-2 gap-3">
              {[['Nome completo *','Ex: Ricardo Barros',''],['Cargo','Ex: Diretor Financeiro',''],['E-mail *','contato@empresa.com.br','email'],['Telefone','(21) 99999-0000','']].map(([l,p,t]) => (
                <div key={l} className="flex flex-col gap-1">
                  <label className="text-[11px] font-[600] text-[var(--color-text-secondary)]">{l}</label>
                  <input type={t||'text'} placeholder={p} className="h-[34px] border border-[var(--color-border-strong)] rounded-[7px] px-3 text-[12px] outline-none focus:border-[var(--color-accent)] transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-[var(--color-border)]" />

          {/* Oportunidade */}
          <div>
            <p className="text-[10px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3 flex items-center gap-2"><span className="w-[1px] h-[10px] bg-[var(--color-accent)] inline-block" />Oportunidade</p>
            <div className="grid grid-cols-2 gap-3">
              {[['Título do negócio *','Ex: Assessoria Tributária'],['Valor estimado (R$)','0,00']].map(([l,p]) => (
                <div key={l} className="flex flex-col gap-1">
                  <label className="text-[11px] font-[600] text-[var(--color-text-secondary)]">{l}</label>
                  <input placeholder={p} className="h-[34px] border border-[var(--color-border-strong)] rounded-[7px] px-3 text-[12px] outline-none focus:border-[var(--color-accent)] transition-colors" />
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-[600] text-[var(--color-text-secondary)]">Etapa inicial</label>
                <div className="relative">
                  <select className="w-full h-[34px] border border-[var(--color-border-strong)] rounded-[7px] pl-3 pr-8 text-[12px] outline-none focus:border-[var(--color-accent)] appearance-none bg-white">
                    <option value="">Selecionar...</option>
                    {['Prospecção','Qualificação','Proposta','Negociação'].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-[600] text-[var(--color-text-secondary)]">Responsável *</label>
                <div className="relative">
                  <select className="w-full h-[34px] border border-[var(--color-border-strong)] rounded-[7px] pl-3 pr-8 text-[12px] outline-none focus:border-[var(--color-accent)] appearance-none bg-white">
                    <option value="">Selecionar...</option>
                    {['Ana Beatriz','Carlos Mendes','Juliana Costa'].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[var(--color-border)]" />

          {/* Priority */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-[600] text-[var(--color-text-secondary)]">Prioridade</label>
            <div className="grid grid-cols-4 gap-2">
              {[{id:'baixa',label:'Baixa',dot:'bg-[var(--color-success)]'},{id:'moderada',label:'Moderada',dot:'bg-[var(--color-warning)]'},{id:'alta',label:'Alta',dot:'bg-[var(--color-danger-soft)]'},{id:'urgente',label:'Urgente',dot:'bg-[var(--color-danger)]'}].map(o => (
                <button key={o.id} type="button" onClick={() => setPriority(o.id)} className={`h-[32px] flex items-center justify-center gap-1.5 text-[11px] font-[500] rounded-[7px] border transition-all ${priority === o.id ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]' : 'border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]'}`}>
                  <div className={`w-[6px] h-[6px] rounded-full ${o.dot}`} />{o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Source */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-[600] text-[var(--color-text-secondary)]">Origem</label>
            <div className="flex flex-wrap gap-1.5">
              {['Indicação','Inbound','Outbound','Evento','LinkedIn','Site'].map(o => (
                <button key={o} onClick={() => setSource(o.toLowerCase())} className={`h-[26px] px-2.5 text-[11px] font-[500] rounded-full border transition-all ${source === o.toLowerCase() ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]' : 'border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]'}`}>{o}</button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-[600] text-[var(--color-text-secondary)]">Notas iniciais</label>
            <textarea rows={3} placeholder="Contexto da prospecção, dores identificadas, próximos passos..." className="border border-[var(--color-border-strong)] rounded-[7px] p-3 text-[12px] outline-none focus:border-[var(--color-accent)] resize-none transition-colors" />
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-subtle)] shrink-0">
          <span className="text-[11px] text-[var(--color-text-tertiary)]">Campos com <span className="text-[var(--color-danger)] font-[700]">*</span> são obrigatórios</span>
          <div className="flex gap-2">
            <button onClick={onClose} className="h-[36px] px-4 text-[13px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] rounded-[8px] transition-colors">Cancelar</button>
            <button onClick={onClose} className="h-[36px] px-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[13px] font-[600] rounded-[8px] transition-colors shadow-sm">Salvar lead</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Board selector dropdown ───────────── */
function BoardDropdown({ boards, current, onSelect, onClose, onManage }: {
  boards: Board[]; current: Board;
  onSelect: (id: string) => void; onClose: () => void; onManage: () => void;
}) {
  return (
    <div className="absolute left-0 top-[44px] z-40 bg-white border border-[var(--color-border)] rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] w-[280px] py-1" onClick={e => e.stopPropagation()}>
      <div className="px-3 py-2 text-[10px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)]">Kanbans disponíveis</div>
      {boards.map(b => {
        const total = b.stages.reduce((s, st) => s + st.cards.length, 0);
        return (
          <button key={b.id} onClick={() => { onSelect(b.id); onClose(); }}
            className={`w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-[var(--color-subtle)] transition-colors ${current.id === b.id ? 'bg-[var(--color-accent-soft)]' : ''}`}>
            <div className={`w-[28px] h-[28px] rounded-[6px] flex items-center justify-center shrink-0 ${current.id === b.id ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-subtle)] text-[var(--color-text-secondary)]'}`}>
              <Kanban size={13} />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-[13px] font-[500] truncate ${current.id === b.id ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'}`}>{b.name}</div>
              <div className="text-[11px] text-[var(--color-text-tertiary)]">{b.stages.length} etapas · {total} leads</div>
            </div>
            {current.id === b.id && <Check size={13} className="text-[var(--color-accent)] shrink-0" />}
          </button>
        );
      })}
      <div className="h-px bg-[var(--color-border)] mx-3 my-1" />
      <button onClick={onManage} className="w-full text-left px-3 py-2 text-[12px] font-[500] text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] flex items-center gap-2 transition-colors">
        <Settings2 size={12} /> Gerenciar todos os kanbans
      </button>
    </div>
  );
}

/* ─── Main Pipeline component ───────────── */
export default function Pipeline() {
  const { navigate } = useNav();
  const [boards, setBoards]           = useState<Board[]>(BOARDS);
  const [currentBoardId, setCurrentBoardId] = useState('b1');
  const [showLeadModal, setShowLeadModal]   = useState(false);
  const [showStagePanel, setShowStagePanel] = useState(true);
  const [showBoardDrop, setShowBoardDrop]   = useState(false);
  const [deleteStageTarget, setDeleteStageTarget] = useState<Stage | null>(null);

  const board = boards.find(b => b.id === currentBoardId)!;

  const updateBoard = (updater: (b: Board) => Board) =>
    setBoards(bs => bs.map(b => b.id === currentBoardId ? updater(b) : b));

  const handleAddStage = (name: string, color: string, type: StageType) =>
    updateBoard(b => ({
      ...b,
      stages: [...b.stages, { id: `st${Date.now()}`, name, color, type, cards: [] }]
    }));

  const handleRenameStage = (id: string, name: string) =>
    updateBoard(b => ({ ...b, stages: b.stages.map(s => s.id === id ? { ...s, name } : s) }));

  const handleDeleteStage = (id: string) =>
    updateBoard(b => ({ ...b, stages: b.stages.filter(s => s.id !== id) }));

  const handleDeleteWithMigration = (toStageId: string) => {
    if (!deleteStageTarget) return;
    const from = deleteStageTarget;
    updateBoard(b => ({
      ...b,
      stages: b.stages
        .filter(s => s.id !== from.id)
        .map(s => s.id === toStageId ? { ...s, cards: [...s.cards, ...from.cards] } : s)
    }));
    setDeleteStageTarget(null);
  };

  const totalValue = board.stages.reduce((s, st) => s + st.cards.reduce((sv, c) => sv + c.value, 0), 0);

  return (
    <AppLayout currentPage="pipeline">
      {showLeadModal && <NovoLeadModal onClose={() => setShowLeadModal(false)} />}
      {deleteStageTarget && (
        <DeleteStageModal
          stage={deleteStageTarget}
          otherStages={board.stages.filter(s => s.id !== deleteStageTarget.id)}
          onCancel={() => setDeleteStageTarget(null)}
          onConfirm={handleDeleteWithMigration}
        />
      )}

      <div className="flex flex-col h-full min-h-[calc(100vh-80px)]" onClick={() => setShowBoardDrop(false)}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-3">
            {/* Board selector */}
            <div className="relative">
              <button
                onClick={e => { e.stopPropagation(); setShowBoardDrop(d => !d); }}
                className="flex items-center gap-2 px-3 py-2 rounded-[8px] hover:bg-[var(--color-subtle)] transition-colors group"
              >
                <h1 className="text-[18px] font-[700] text-[var(--color-text-primary)] tracking-[-0.01em]">{board.name}</h1>
                <ChevronDown size={16} className={`text-[var(--color-text-tertiary)] transition-transform ${showBoardDrop ? 'rotate-180' : ''}`} />
              </button>
              {showBoardDrop && (
                <BoardDropdown
                  boards={boards} current={board}
                  onSelect={setCurrentBoardId}
                  onClose={() => setShowBoardDrop(false)}
                  onManage={() => setShowBoardDrop(false)}
                />
              )}
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-[12px] text-[var(--color-text-tertiary)]">
              <span className="font-mono">{board.stages.reduce((s,st) => s + st.cards.length, 0)} leads</span>
              <span>·</span>
              <span className="font-mono">{fmt(totalValue)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('pipeline-boards')}
              className="h-[36px] px-3 border border-[var(--color-border-strong)] rounded-[8px] text-[12px] font-[500] flex items-center gap-1.5 transition-colors text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]"
            >
              <Kanban size={13} /> Ver kanbans
            </button>
            <button
              onClick={() => setShowStagePanel(v => !v)}
              className={`h-[36px] px-3 border rounded-[8px] text-[12px] font-[500] flex items-center gap-1.5 transition-colors ${showStagePanel ? 'bg-[var(--color-accent-soft)] border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]'}`}
            >
              <Settings2 size={13} /> Etapas
            </button>
            <button
              onClick={() => setShowLeadModal(true)}
              className="h-[36px] px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[13px] font-[600] rounded-[8px] flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus size={15} /> Novo Lead
            </button>
          </div>
        </div>

        {/* ── Board + Panel ── */}
        <div className="flex gap-4 flex-1 min-h-0">

          {/* Kanban columns */}
          <div className="flex gap-3 overflow-x-auto pb-3 flex-1 items-start">
            {board.stages.map(col => (
              <div key={col.id} className="min-w-[268px] w-[268px] bg-[var(--color-surface)] rounded-[8px] border border-[var(--color-border)] flex flex-col flex-shrink-0 max-h-full">

                {/* Column header */}
                <div className="p-3 border-b border-[var(--color-border)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: col.color }} />
                    <span className="font-[600] text-[13px] text-[var(--color-text-primary)]">{col.name}</span>
                    <span className="bg-[var(--color-subtle)] text-[var(--color-text-secondary)] text-[10px] font-mono px-1.5 py-0.5 rounded-full">{col.cards.length}</span>
                    <span className={`text-[9px] font-[500] px-1.5 py-0.5 rounded-full ${typeStyle(col.type)}`}>{TYPE_OPTS.find(o => o.id === col.type)?.label}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-[var(--color-text-tertiary)]">
                    <button onClick={() => setShowLeadModal(true)} className="hover:text-[var(--color-text-primary)] p-1 hover:bg-[var(--color-subtle)] rounded transition-colors"><Plus size={13} /></button>
                    <button className="hover:text-[var(--color-text-primary)] p-1 hover:bg-[var(--color-subtle)] rounded transition-colors"><MoreHorizontal size={13} /></button>
                  </div>
                </div>

                {/* Cards */}
                <div className="p-2.5 flex flex-col gap-2.5 flex-1 bg-[var(--color-canvas)] rounded-b-[8px] overflow-y-auto">
                  {col.cards.map(card => (
                    <div key={card.id} className="bg-[var(--color-surface)] rounded-[8px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden cursor-pointer hover:border-[var(--color-border-strong)] transition-colors group">
                      <div className={`h-[3px] w-full ${priorityBar[card.priority]}`} />
                      <div className="p-3 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[9px] uppercase font-[700] tracking-wide text-[var(--color-text-tertiary)]">{card.category}</span>
                          {card.urgent && <span className="text-[9px] uppercase font-[700] text-[var(--color-danger)] bg-[var(--color-danger-soft)] px-1 rounded">Urgente</span>}
                        </div>
                        <h4 className="text-[13px] font-[500] text-[var(--color-text-primary)] leading-tight line-clamp-2">{card.title}</h4>
                        <div className="text-[12px] font-mono font-[500] text-[var(--color-text-secondary)]">{fmt(card.value)}</div>
                        <div className="w-full bg-[var(--color-subtle)] h-[3px] rounded-full overflow-hidden">
                          <div className={`h-full ${healthColor(card.health)}`} style={{ width: `${card.health}%` }} />
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-dashed border-[var(--color-border)]">
                          <div className="flex items-center gap-2.5 text-[var(--color-text-tertiary)]">
                            {card.comments > 0 && <div className="flex items-center gap-1 text-[10px] font-mono"><MessageSquare size={11} />{card.comments}</div>}
                            {card.links > 0 && <div className="flex items-center gap-1 text-[10px] font-mono"><LinkIcon size={11} />{card.links}</div>}
                          </div>
                          <div className="flex -space-x-1.5">
                            <div className="w-[18px] h-[18px] rounded-full bg-[#1e40af] border-[1.5px] border-white text-white flex items-center justify-center text-[7px] font-[700]">AB</div>
                            <div className="w-[18px] h-[18px] rounded-full bg-[#047857] border-[1.5px] border-white text-white flex items-center justify-center text-[7px] font-[700]">CM</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {col.cards.length === 0 && (
                    <button onClick={() => setShowLeadModal(true)} className="flex flex-col items-center justify-center py-8 text-[var(--color-text-tertiary)] border-2 border-dashed border-[var(--color-border)] rounded-[8px] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] transition-all group">
                      <Plus size={18} className="mb-1 opacity-50 group-hover:opacity-100" />
                      <span className="text-[11px] font-[500]">Adicionar lead</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Add column button */}
            <button
              onClick={() => setShowStagePanel(true)}
              className="min-w-[220px] w-[220px] border-2 border-dashed border-[var(--color-border)] rounded-[8px] h-[80px] flex items-center justify-center gap-2 text-[13px] font-[500] text-[var(--color-text-tertiary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] transition-all shrink-0 self-start"
            >
              <Plus size={16} /> Nova etapa
            </button>
          </div>

          {/* Stage management panel */}
          {showStagePanel && (
            <StagePanel
              stages={board.stages}
              onClose={() => setShowStagePanel(false)}
              onAddStage={handleAddStage}
              onRenameStage={handleRenameStage}
              onDeleteStage={handleDeleteStage}
              onDeleteRequest={setDeleteStageTarget}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
