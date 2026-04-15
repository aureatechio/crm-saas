import React, { useState } from 'react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';
import { useNav } from './_shared/nav-context';
import {
  Search, Filter, Download, Plus, Mail, Phone, MessageCircle,
  X, ChevronRight, CheckCircle2, Clock, MoreHorizontal,
  ChevronLeft, Star, TrendingUp, Building2, Users,
  ArrowUpRight, ArrowDownRight, SlidersHorizontal, Calendar
} from 'lucide-react';

/* ─── Data ────────────────────────────────── */
const R$ = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(v);

const contacts = [
  { id:1,  name:'Marina Oliveira',  initials:'MO', color:'#0F766E', email:'marina@andrade.com',        company:'Andrade Contábil',   role:'Diretora Financeira',      score:82, grade:'A', deal:'Assessoria Tributária', value:34500, stage:'Proposta',    stageColor:'#D97706', activity:'2h atrás',   actType:'email',   status:'ativo' },
  { id:2,  name:'Carlos Mendes',    initials:'CM', color:'#1e40af', email:'carlos@prisma.com.br',       company:'Grupo Prisma',       role:'Gerente de RH',            score:61, grade:'B', deal:'Sistema RH',            value:28000, stage:'Qualificação', stageColor:'#0891B2', activity:'5h atrás',   actType:'call',    status:'ativo' },
  { id:3,  name:'Patrícia Santos',  initials:'PS', color:'#9333ea', email:'patricia@pontal.ag',         company:'Agência Pontal',     role:'Sócia-Fundadora',          score:79, grade:'A', deal:'Plano de Marketing',    value:22000, stage:'Negociação',   stageColor:'#E85D2F', activity:'1d atrás',   actType:'meeting', status:'ativo' },
  { id:4,  name:'Roberto Ferreira', initials:'RF', color:'#CA8A04', email:'roberto@metalrj.ind.br',     company:'Metalúrgica RJ',     role:'CFO',                      score:45, grade:'C', deal:'Assessoria Tributária', value:34500, stage:'Prospecção',   stageColor:'#64748B', activity:'3d atrás',   actType:'email',   status:'inativo' },
  { id:5,  name:'Juliana Costa',    initials:'JC', color:'#E85D2F', email:'juliana@primavera.edu.br',   company:'Escola Primavera',   role:'Coord. Pedagógica',        score:58, grade:'B', deal:'Treinamento Equipe',    value:18700, stage:'Qualificação', stageColor:'#0891B2', activity:'1sem atrás', actType:'call',    status:'ativo' },
  { id:6,  name:'André Lima',       initials:'AL', color:'#047857', email:'andre@portolog.com',         company:'Porto Logística',    role:'Diretor Administrativo',   score:91, grade:'A', deal:'Auditoria Anual',       value:52000, stage:'Fechamento',   stageColor:'#16A34A', activity:'2h atrás',   actType:'email',   status:'ativo' },
  { id:7,  name:'Fernanda Alves',   initials:'FA', color:'#be185d', email:'fernanda@clinicasnorte.com', company:'Clínicas Norte',     role:'CEO',                      score:73, grade:'B', deal:'BPO Financeiro',        value:31200, stage:'Negociação',   stageColor:'#E85D2F', activity:'Ontem',      actType:'meeting', status:'ativo' },
  { id:8,  name:'Marcos Vieira',    initials:'MV', color:'#b45309', email:'marcos@barroslima.com.br',   company:'Barros & Lima',      role:'Controller',               score:29, grade:'D', deal:'Diagnóstico Fiscal',    value:12500, stage:'Prospecção',   stageColor:'#64748B', activity:'2sem atrás', actType:'email',   status:'inativo' },
  { id:9,  name:'Luciana Ramos',    initials:'LR', color:'#0284C7', email:'luciana@indsul.com.br',      company:'Indústria Sul',      role:'Gerente Financeira',       score:68, grade:'B', deal:'Implementação SAP',     value:78000, stage:'Negociação',   stageColor:'#E85D2F', activity:'4h atrás',   actType:'call',    status:'ativo' },
  { id:10, name:'Eduardo Brito',    initials:'EB', color:'#15803D', email:'eduardo@fernandes.adv.br',   company:'Fernandes & Cia',    role:'Sócio-Diretor',            score:55, grade:'C', deal:'ERP Contábil',          value:45000, stage:'Qualificação', stageColor:'#0891B2', activity:'6h atrás',   actType:'meeting', status:'ativo' },
];

const scoreGrade = (g: string) => {
  const m: Record<string,string> = {
    A: 'bg-[#DCFCE7] text-[#15803D]',
    B: 'bg-[#FEF3C7] text-[#C2680A]',
    C: 'bg-[#FEE2E2] text-[#DC2626]',
    D: 'bg-[#F5F4F2] text-[#A09890]',
  };
  return m[g] ?? m.D;
};

const actIcon: Record<string, React.FC<{size:number;className?:string}>> = {
  email: Mail, call: Phone, meeting: MessageCircle,
};

/* ─── Mini score bar ─────────────────────── */
function ScoreBar({ value }: { value: number }) {
  const color = value >= 75 ? '#15803D' : value >= 50 ? '#C2680A' : '#DC2626';
  return (
    <div className="flex items-center gap-2">
      <div className="w-[48px] h-[3px] bg-[var(--color-inset)] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width:`${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-[12px] font-mono font-[600]" style={{ color }}>{value}</span>
    </div>
  );
}

/* ─── Stats bar ─────────────────────────── */
function StatCard({ label, value, trend, up }: { label:string; value:string; trend?:string; up?:boolean }) {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-[10px] px-4 py-3.5 shadow-[var(--shadow-xs)]">
      <div className="text-[10px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)] mb-1.5">{label}</div>
      <div className="text-[20px] font-[700] font-mono text-[var(--color-text-primary)] leading-none mb-1.5">{value}</div>
      {trend && (
        <div className={`flex items-center gap-0.5 text-[10px] font-mono font-[600] ${up?'text-[var(--color-success)]':'text-[var(--color-danger)]'}`}>
          {up?<ArrowUpRight size={10}/>:<ArrowDownRight size={10}/>}{trend}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════ */
export default function Contatos() {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<'todos'|'leads'|'clientes'|'arquivados'>('todos');
  const [panel, setPanel] = useState<typeof contacts[0]|null>(null);
  const { navigate } = useNav();
  const allChecked = selected.size === contacts.length;

  const toggleAll = () => setSelected(allChecked ? new Set() : new Set(contacts.map(c=>c.id)));
  const toggleOne = (id:number) => setSelected(prev => { const s=new Set(prev); s.has(id)?s.delete(id):s.add(id); return s; });

  const tabs: [typeof activeTab, string, number][] = [
    ['todos','Todos',234],['leads','Leads',89],['clientes','Clientes',62],['arquivados','Arquivados',83],
  ];

  return (
    <AppLayout currentPage="contatos" pageTitle="Contatos" pageSub="Gerencie seus leads, clientes e oportunidades"
      actions={
        <>
          <button className="h-[32px] px-3 border border-[var(--color-border-strong)] rounded-[7px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center gap-1.5 transition-colors">
            <Download size={13} /> Exportar
          </button>
          <button className="h-[32px] px-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[12px] font-[600] rounded-[7px] flex items-center gap-1.5 transition-colors shadow-[var(--shadow-xs)]">
            <Plus size={14} /> Novo contato
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-5">

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Total de contatos" value="234"    trend="+12 este mês" up />
          <StatCard label="Score médio"        value="64,3"  trend="+2,1 pp" up />
          <StatCard label="Taxa de conversão"  value="34,2%" trend="+3,1 pp" up />
          <StatCard label="Pipeline total"     value={R$(1284000)} trend="+18,3%" up />
        </div>

        {/* Table card */}
        <div className="bg-white border border-[var(--color-border)] rounded-[12px] overflow-hidden shadow-[var(--shadow-sm)]">

          {/* Toolbar */}
          <div className="px-5 pt-4 pb-0 border-b border-[var(--color-border)]">
            <div className="flex items-center justify-between gap-4 mb-3">
              {/* Tabs */}
              <div className="flex gap-0.5">
                {tabs.map(([id,label,count]) => (
                  <button key={id} onClick={()=>setActiveTab(id)}
                    className={`h-[32px] px-3.5 text-[12px] font-[600] rounded-t-[7px] flex items-center gap-1.5 transition-colors border-b-2 -mb-px
                      ${activeTab===id
                        ? 'text-[var(--color-accent)] border-[var(--color-accent)]'
                        : 'text-[var(--color-text-tertiary)] border-transparent hover:text-[var(--color-text-secondary)]'
                      }`}>
                    {label}
                    <span className={`text-[10px] font-[500] px-1.5 py-0.5 rounded-full ${activeTab===id?'bg-[var(--color-accent-soft)] text-[var(--color-accent)]':'bg-[var(--color-subtle)] text-[var(--color-text-tertiary)]'}`}>{count}</span>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pb-3">
                <div className="relative">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
                  <input type="text" placeholder="Buscar contatos..."
                    className="h-[32px] pl-8 pr-3 border border-[var(--color-border)] rounded-[7px] text-[12px] w-[200px] outline-none focus:border-[var(--color-accent)] bg-[var(--color-subtle)] placeholder-[var(--color-text-tertiary)]"
                  />
                </div>
                <button className="h-[32px] px-3 border border-[var(--color-border)] bg-white rounded-[7px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center gap-1.5 transition-colors">
                  <SlidersHorizontal size={13} /> Filtros
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-subtle)]/60">
                  <th className="pl-5 pr-3 py-2.5 w-[40px]">
                    <input type="checkbox" checked={allChecked} onChange={toggleAll}
                      className="w-[14px] h-[14px] rounded-[3px] border border-[var(--color-border-strong)] cursor-pointer accent-[var(--color-accent)]" />
                  </th>
                  <th className="px-3 py-2.5 text-[10px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)]">Nome</th>
                  <th className="px-3 py-2.5 text-[10px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)]">Empresa</th>
                  <th className="px-3 py-2.5 text-[10px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)]">Score IA</th>
                  <th className="px-3 py-2.5 text-[10px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)]">Deal ativo</th>
                  <th className="px-3 py-2.5 text-[10px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)]">Etapa</th>
                  <th className="px-3 py-2.5 text-[10px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)]">Valor</th>
                  <th className="px-3 py-2.5 text-[10px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)]">Última atividade</th>
                  <th className="px-3 py-2.5 text-[10px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)] w-[40px]"></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, idx) => {
                  const ActIcon = actIcon[c.actType];
                  const isSelected = selected.has(c.id);
                  return (
                    <tr key={c.id}
                      className={`group border-b border-[var(--color-border)] last:border-0 cursor-pointer transition-colors
                        ${isSelected ? 'bg-[var(--color-accent-soft)]/40' : 'hover:bg-[var(--color-subtle)]/60'}`}
                      onClick={()=>setPanel(c)}>
                      <td className="pl-5 pr-3 py-3" onClick={e=>{e.stopPropagation();toggleOne(c.id)}}>
                        <input type="checkbox" checked={isSelected} onChange={()=>toggleOne(c.id)}
                          className="w-[14px] h-[14px] rounded-[3px] border border-[var(--color-border-strong)] cursor-pointer accent-[var(--color-accent)]" />
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-white text-[11px] font-[700] shrink-0" style={{ backgroundColor: c.color }}>
                            {c.initials}
                          </div>
                          <div>
                            <div className="text-[13px] font-[600] text-[var(--color-text-primary)]">{c.name}</div>
                            <div className="text-[11px] text-[var(--color-text-tertiary)]">{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-[12px] font-[500] text-[var(--color-text-primary)]">{c.company}</div>
                        <div className="text-[11px] text-[var(--color-text-tertiary)]">{c.role}</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-[700] w-[18px] h-[18px] flex items-center justify-center rounded-full ${scoreGrade(c.grade)}`}>{c.grade}</span>
                          <ScoreBar value={c.score} />
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-[12px] font-[500] text-[var(--color-text-primary)] truncate max-w-[140px]">{c.deal}</div>
                      </td>
                      <td className="px-3 py-3">
                        <span className="text-[11px] font-[600] px-2 py-0.5 rounded-[5px] whitespace-nowrap"
                          style={{ backgroundColor: c.stageColor + '18', color: c.stageColor }}>
                          {c.stage}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-[12px] font-mono font-[600] text-[var(--color-text-primary)]">{R$(c.value)}</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-tertiary)]">
                          <ActIcon size={11} />
                          <span className="font-mono">{c.activity}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <button className="opacity-0 group-hover:opacity-100 w-[24px] h-[24px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-inset)] rounded-[5px] transition-all ml-auto">
                          <MoreHorizontal size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-3 border-t border-[var(--color-border)] flex items-center justify-between bg-white">
            <div className="text-[12px] text-[var(--color-text-tertiary)]">
              {selected.size > 0
                ? <><span className="font-[600] text-[var(--color-text-primary)]">{selected.size}</span> selecionados</>
                : <>Mostrando <span className="font-[600] text-[var(--color-text-primary)]">1–10</span> de <span className="font-[600] text-[var(--color-text-primary)]">234</span> contatos</>
              }
            </div>
            <div className="flex items-center gap-1">
              <button className="w-[28px] h-[28px] flex items-center justify-center border border-[var(--color-border)] rounded-[6px] text-[var(--color-text-tertiary)] hover:bg-[var(--color-subtle)] disabled:opacity-40 transition-colors" disabled>
                <ChevronLeft size={13} />
              </button>
              {[1,2,3,'...',24].map((p,i)=>(
                <button key={i} className={`w-[28px] h-[28px] flex items-center justify-center text-[12px] font-[500] border rounded-[6px] transition-colors
                  ${p===1?'border-[var(--color-accent)] bg-[var(--color-accent)] text-white':'border-[var(--color-border)] hover:bg-[var(--color-subtle)] text-[var(--color-text-secondary)]'}`}>
                  {p}
                </button>
              ))}
              <button className="w-[28px] h-[28px] flex items-center justify-center border border-[var(--color-border)] rounded-[6px] text-[var(--color-text-tertiary)] hover:bg-[var(--color-subtle)] transition-colors">
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Slide-out panel ── */}
      {panel && (
        <>
          <div className="fixed inset-0 bg-black/10 z-40" onClick={()=>setPanel(null)} />
          <div className="fixed inset-y-0 right-0 w-[400px] bg-white border-l border-[var(--color-border)] shadow-[var(--shadow-lg)] flex flex-col z-50">

            {/* Panel header */}
            <div className="p-5 border-b border-[var(--color-border)] flex items-start gap-3">
              <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center text-white text-[14px] font-[700] shrink-0" style={{ backgroundColor: panel.color }}>
                {panel.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-[700] text-[var(--color-text-primary)]">{panel.name}</div>
                <div className="text-[12px] text-[var(--color-text-tertiary)]">{panel.role} · {panel.company}</div>
              </div>
              <button onClick={()=>setPanel(null)} className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-subtle)] rounded-[6px] shrink-0">
                <X size={15} />
              </button>
            </div>

            {/* Actions */}
            <div className="px-4 py-3 border-b border-[var(--color-border)] flex gap-2">
              {([['Email','email',Mail,'bg-[#EFF6FF] text-[#1d4ed8]'],['Ligar','call',Phone,'bg-[var(--color-success-soft)] text-[var(--color-success)]'],['WhatsApp','wa',MessageCircle,'bg-[#DCFCE7] text-[#15803D]'],['Agendar','cal',Calendar,'bg-[var(--color-accent-soft)] text-[var(--color-accent)]']] as const).map(([l,_,Ic,cls])=>(
                <button key={l} className={`flex-1 h-[30px] ${cls} rounded-[7px] text-[11px] font-[600] flex items-center justify-center gap-1 transition-opacity hover:opacity-80`}>
                  <Ic size={11} />{l}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

              {/* Score */}
              <div className="bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/20 rounded-[10px] p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-[700] uppercase tracking-wider text-[var(--color-accent)]">◇ Score IA</span>
                  <span className={`text-[13px] font-[800] font-mono px-2 py-0.5 rounded-full ${panel.score>=75?'bg-[var(--color-success-soft)] text-[var(--color-success)]':panel.score>=50?'bg-[var(--color-warning-soft)] text-[var(--color-warning)]':'bg-[var(--color-danger-soft)] text-[var(--color-danger)]'}`}>
                    {panel.score}/100
                  </span>
                </div>
                <div className="h-[5px] bg-[var(--color-accent)]/15 rounded-full overflow-hidden mb-2">
                  <div className="h-full rounded-full bg-[var(--color-accent)]" style={{ width:`${panel.score}%` }} />
                </div>
                <p className="text-[12px] text-[var(--color-text-primary)] leading-relaxed">
                  Engajamento alto — {panel.score >= 75 ? 'grande probabilidade de fechamento. Próximo passo: envolver CEO.' : 'engajamento moderado, continuar nutrição.'}
                </p>
              </div>

              {/* Key info */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l:'Email',       v:panel.email,   mono:false },
                  { l:'Empresa',     v:panel.company, mono:false },
                  { l:'Cargo',       v:panel.role,    mono:false },
                  { l:'Receita est.',v:'R$ 2–5M',     mono:true  },
                ].map(f=>(
                  <div key={f.l} className="flex flex-col gap-0.5">
                    <div className="text-[10px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)]">{f.l}</div>
                    <div className={`text-[12px] font-[500] text-[var(--color-text-primary)] ${f.mono?'font-mono':''} truncate`}>{f.v}</div>
                  </div>
                ))}
              </div>

              {/* Deal */}
              <div className="border border-[var(--color-border)] rounded-[10px] p-3.5">
                <div className="text-[10px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)] mb-2">Deal ativo</div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-[600] text-[var(--color-text-primary)]">{panel.deal}</span>
                  <span className="text-[13px] font-[700] font-mono text-[var(--color-accent)]">{R$(panel.value)}</span>
                </div>
                <span className="text-[11px] font-[600] px-2 py-0.5 rounded-[5px]"
                  style={{ backgroundColor: panel.stageColor + '18', color: panel.stageColor }}>
                  {panel.stage}
                </span>
              </div>

              {/* Upcoming */}
              <div className="border border-[var(--color-border)] rounded-[10px] p-3.5">
                <div className="text-[10px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)] mb-2">Próxima atividade</div>
                <div className="flex items-start gap-2.5">
                  <div className="w-[28px] h-[28px] bg-[var(--color-warning-soft)] rounded-[7px] flex items-center justify-center shrink-0">
                    <Clock size={13} className="text-[var(--color-warning)]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-[600] text-[var(--color-text-primary)]">Follow-up Proposta Comercial</div>
                    <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">Amanhã, 10:30 · Call</div>
                  </div>
                  <button><CheckCircle2 size={16} className="text-[var(--color-text-tertiary)] hover:text-[var(--color-success)]" /></button>
                </div>
              </div>

            </div>

            <div className="p-4 border-t border-[var(--color-border)]">
              <button
                onClick={() => navigate('contact-panel')}
                className="w-full h-[34px] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[12px] font-[700] rounded-[8px] flex items-center justify-center gap-1.5 transition-colors"
              >
                <ChevronRight size={14} /> Abrir perfil completo
              </button>
            </div>
          </div>
        </>
      )}
    </AppLayout>
  );
}
