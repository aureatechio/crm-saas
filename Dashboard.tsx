import React, { useState } from 'react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';
import { useNav } from './_shared/nav-context';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  ResponsiveContainer, XAxis, YAxis, Tooltip,
  CartesianGrid, ReferenceLine, Cell
} from 'recharts';
import {
  ArrowUpRight, ArrowDownRight, ArrowRight,
  Phone, Calendar, FileText, MessageSquare,
  AlertTriangle, Clock, Users, ChevronRight,
  Flame, Target, RefreshCw, Filter, TrendingUp, Zap
} from 'lucide-react';

/* ─── Formatters ─────────────────────────── */
const R$ = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(v);
const Rk = (v: number) =>
  v >= 1000000 ? `R$ ${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `R$ ${(v / 1000).toFixed(0)}k` : R$(v);
const pct = (v: number) => `${v.toFixed(1)}%`;

/* ─── Tooltip ─────────────────────────────── */
const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0F0F0E] text-white px-3 py-2.5 rounded-[8px] text-[11px] shadow-lg border border-[#333] min-w-[140px]">
      <div className="text-[#A8A29E] mb-1.5 font-[500]">{label}</div>
      {payload.map((e: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4 mb-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: e.color }} />
            <span className="text-[#D6D3D1]">{e.name}</span>
          </div>
          <span className="font-mono font-[600]">
            {typeof e.value === 'number' && e.name?.includes('R$') ? Rk(e.value) : `${e.value}${e.name?.includes('%') ? '%' : ''}`}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ─── Kpi ─────────────────────────────────── */
function Kpi({ label, value, sub, trend, up, spark, sparkColor }: {
  label: string; value: string; sub?: string; trend?: string; up?: boolean;
  spark?: { v: number }[]; sparkColor?: string;
}) {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-[10px] p-4 shadow-[var(--shadow-xs)] flex flex-col gap-2.5">
      <div className="text-[10px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)]">{label}</div>
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col gap-1.5">
          <div className="text-[22px] font-[700] font-mono text-[var(--color-text-primary)] leading-none tracking-[-0.03em]">{value}</div>
          <div className="flex items-center gap-2 flex-wrap min-h-[16px]">
            {trend && (
              <span className={`inline-flex items-center gap-0.5 text-[10px] font-mono font-[600] px-1.5 py-0.5 rounded-[4px] ${up ? 'bg-[var(--color-success-soft)] text-[var(--color-success)]' : 'bg-[var(--color-danger-soft)] text-[var(--color-danger)]'}`}>
                {up ? <ArrowUpRight size={9} /> : <ArrowDownRight size={9} />}{trend}
              </span>
            )}
            {sub && <span className="text-[10px] text-[var(--color-text-tertiary)]">{sub}</span>}
          </div>
        </div>
        {spark && (
          <div className="w-[56px] h-[32px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spark} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
                <defs>
                  <linearGradient id={`sg${sparkColor}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={sparkColor ?? '#E85D2F'} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={sparkColor ?? '#E85D2F'} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke={sparkColor ?? 'var(--color-accent)'} fill={`url(#sg${sparkColor})`} strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Section ──────────────────────────────── */
function Section({ title, sub, children, action, className = '' }: {
  title: string; sub?: string; children: React.ReactNode; action?: React.ReactNode; className?: string;
}) {
  return (
    <div className={`bg-white border border-[var(--color-border)] rounded-[10px] p-5 shadow-[var(--shadow-xs)] ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-[13px] font-[700] text-[var(--color-text-primary)] tracking-[-0.01em]">{title}</div>
          {sub && <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">{sub}</div>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ─── AIInsight ────────────────────────────── */
function AIInsight({ text, label, labelColor }: {
  text: string; label?: string; labelColor?: 'urgente' | 'risco' | 'dica';
}) {
  const tag = { urgente: 'bg-[var(--color-danger-soft)] text-[var(--color-danger)]', risco: 'bg-[var(--color-warning-soft)] text-[var(--color-warning)]', dica: 'bg-[var(--color-success-soft)] text-[var(--color-success)]' };
  return (
    <div className="bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/30 rounded-[10px] p-4 flex flex-col gap-3">
      <div className="flex items-start gap-2.5">
        <span className="text-[var(--color-accent)] font-[700] text-[14px] leading-none mt-0.5 shrink-0">◇</span>
        <p className="text-[12px] text-[var(--color-text-primary)] leading-relaxed">{text}</p>
      </div>
      {label && labelColor && (
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-[700] uppercase tracking-wider px-2 py-0.5 rounded-full ${tag[labelColor]}`}>{label}</span>
          <button className="text-[11px] font-[600] text-[var(--color-accent)] flex items-center gap-1">Ver detalhes <ArrowRight size={10} /></button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════ DATA ═══ */

const stageColors = ['#64748B', '#0891B2', '#D97706', '#E85D2F', '#16A34A'];

const funnelStages = [
  { stage: 'Prospecção',   count: 148, value: 2180000, conv: null,  color: '#64748B', ciclo: 8  },
  { stage: 'Qualificação', count: 84,  value: 1540000, conv: 72.6,  color: '#0891B2', ciclo: 11 },
  { stage: 'Proposta',     count: 61,  value:  980000, conv: 62.3,  color: '#D97706', ciclo: 14 },
  { stage: 'Negociação',   count: 38,  value:  540000, conv: 57.9,  color: '#E85D2F', ciclo: 18 },
  { stage: 'Fechamento',   count: 22,  value:  312400, conv: 68.2,  color: '#16A34A', ciclo: 9  },
  { stage: 'Ganhos',       count: 15,  value:  280000, conv: 68.2,  color: '#15803D', ciclo: 0  },
];

const convEvolution = [
  { m: 'Nov', qual: 78.2, prop: 64.1, neg: 58.3, fech: 71.0 },
  { m: 'Dez', qual: 80.1, prop: 66.3, neg: 60.2, fech: 73.5 },
  { m: 'Jan', qual: 74.5, prop: 61.8, neg: 55.9, fech: 69.2 },
  { m: 'Fev', qual: 76.8, prop: 63.0, neg: 57.4, fech: 70.1 },
  { m: 'Mar', qual: 77.3, prop: 63.9, neg: 58.1, fech: 71.8 },
  { m: 'Abr', qual: 72.6, prop: 62.3, neg: 57.9, fech: 68.2 },
];

const revenueData = [
  { m: 'Out', v: 248000, p: 260000 }, { m: 'Nov', v: 271000, p: 270000 },
  { m: 'Dez', v: 295000, p: 285000 }, { m: 'Jan', v: 259000, p: 280000 },
  { m: 'Fev', v: 287000, p: 290000 }, { m: 'Mar', v: 312400, p: 320000 },
  { m: 'Abr', v: null,   p: 390000 },
];

const activities = [
  { time: '09:30', type: 'reunião',   label: 'Reunião de apresentação',    deal: 'Metalúrgica RJ',  urgent: false },
  { time: '11:00', type: 'tarefa',    label: 'Enviar proposta revisada',   deal: 'Farmácias Vida',  urgent: false },
  { time: '14:00', type: 'follow-up', label: 'Follow-up de negociação',    deal: 'Indústria Sul',   urgent: true  },
  { time: '15:30', type: 'ligação',   label: 'Ligação de qualificação',    deal: 'Rede Contábil',   urgent: false },
  { time: '17:00', type: 'tarefa',    label: 'Revisar minuta de contrato', deal: 'Porto Logística', urgent: false },
];
const actIcon: Record<string, React.FC<{ size: number }>> = {
  'reunião': Calendar, 'tarefa': FileText, 'follow-up': MessageSquare, 'ligação': Phone,
};
const actBadge: Record<string, string> = {
  'reunião':   'bg-[#DBEAFE] text-[#1d4ed8]',
  'tarefa':    'bg-[var(--color-subtle)] text-[var(--color-text-secondary)]',
  'follow-up': 'bg-[var(--color-warning-soft)] text-[var(--color-warning)]',
  'ligação':   'bg-[var(--color-success-soft)] text-[var(--color-success)]',
};

const hotDeals = [
  { id:1, title:'Implementação SAP',     company:'Indústria Sul',   value:78000, stage:'Negociação', prob:72, days:3,  urgent:true  },
  { id:2, title:'Assessoria Tributária', company:'Metalúrgica RJ',  value:34500, stage:'Proposta',   prob:85, days:7,  urgent:false },
  { id:3, title:'Auditoria Anual',       company:'Porto Logística', value:52000, stage:'Fechamento', prob:92, days:5,  urgent:false },
  { id:4, title:'ERP Contábil',          company:'Fernandes & Cia', value:45000, stage:'Negociação', prob:61, days:12, urgent:false },
];

const team = [
  { name:'Ana Beatriz',    initials:'AB', color:'#1e40af', fechado:187400, meta:200000, taxa:42.1, deals:7,  tick:26771, ciclo:38, ativ:47, conv:42.1 },
  { name:'Ricardo Lemos',  initials:'RL', color:'#0f766e', fechado:89600,  meta:120000, taxa:36.8, deals:4,  tick:22400, ciclo:44, ativ:38, conv:36.8 },
  { name:'Carlos Mendes',  initials:'CM', color:'#047857', fechado:82000,  meta:150000, taxa:28.3, deals:4,  tick:20500, ciclo:51, ativ:29, conv:28.3 },
  { name:'Juliana Costa',  initials:'JC', color:'#b45309', fechado:43000,  meta:100000, taxa:18.2, deals:2,  tick:21500, ciclo:67, ativ:21, conv:18.2 },
  { name:'Pedro Alves',    initials:'PA', color:'#6b21a8', fechado:31200,  meta:80000,  taxa:22.5, deals:2,  tick:15600, ciclo:58, ativ:19, conv:22.5 },
];

const leadOrigins = [
  { name: 'Indicação',       leads: 48, deals: 23, taxa: 47.9, valor: 490000, color: '#16A34A' },
  { name: 'Site / Inbound',  leads: 41, deals: 12, taxa: 29.3, valor: 218000, color: '#0891B2' },
  { name: 'LinkedIn',        leads: 29, deals: 9,  taxa: 31.0, valor: 312000, color: '#1d4ed8' },
  { name: 'Outbound SDR',    leads: 22, deals: 5,  taxa: 22.7, valor: 143000, color: '#D97706' },
  { name: 'Evento / Webinar',leads: 8,  deals: 2,  taxa: 25.0, valor: 117000, color: '#E85D2F' },
];

const pending = [
  { title:'BPO Financeiro',     company:'Clínicas Norte',   value:31200, overdue:12, type:'Assinatura pendente' },
  { title:'Assessoria Básica',  company:'Farmácias Vida',   value:15600, overdue:8,  type:'Assinatura pendente' },
  { title:'Treinamento Equipe', company:'Escola Primavera', value:18700, overdue:4,  type:'Cobrança em atraso'  },
  { title:'Plano de Marketing', company:'Agência Pontal',   value:22000, overdue:0,  type:'Renovação em 5 dias' },
];

const weekSpark = [{ v:8 },{ v:12 },{ v:7 },{ v:15 },{ v:10 },{ v:2 },{ v:1 }];
const revSpark  = [{ v:248000 },{ v:271000 },{ v:295000 },{ v:259000 },{ v:287000 },{ v:312400 }];

/* ══════════════════════════════════════════ */
export default function Dashboard() {
  const [period, setPeriod] = useState<'semana'|'mes'|'trimestre'>('mes');
  const { navigate } = useNav();

  const goalTotal = 380000;
  const goalDone  = 312400;
  const goalPct   = goalDone / goalTotal;
  const urgentToday = activities.filter(a => a.urgent).length;
  const velocity = Math.round(goalDone / 42); // R$/dia

  return (
    <AppLayout currentPage="dashboard"
      pageTitle="Bom dia, Ana Beatriz"
      pageSub="Segunda-feira, 14 de abril de 2025 · Pipeline Comercial"
      actions={
        <>
          <div className="flex items-center bg-[var(--color-subtle)] border border-[var(--color-border)] rounded-[8px] p-1 gap-0.5">
            {([['semana','Semana'],['mes','Mês'],['trimestre','Trim.']] as const).map(([v,l]) => (
              <button key={v} onClick={() => setPeriod(v)}
                className={`h-[26px] px-3 text-[11px] font-[600] rounded-[6px] transition-all ${period===v?'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] text-[var(--color-text-primary)]':'text-[var(--color-text-tertiary)]'}`}>
                {l}
              </button>
            ))}
          </div>
          <button className="h-[32px] px-3 border border-[var(--color-border)] rounded-[7px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center gap-1.5 transition-colors">
            <Filter size={12} /> Filtros
          </button>
          <button className="h-[32px] px-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[12px] font-[600] rounded-[7px] flex items-center gap-1.5 transition-colors shadow-[var(--shadow-xs)]">
            <Calendar size={12} /> Nova atividade
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-5">

        {/* ── Meta bar ── */}
        <div className="bg-white border border-[var(--color-border)] rounded-[10px] px-5 py-3.5 shadow-[var(--shadow-xs)]">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Target size={13} className="text-[var(--color-accent)]" />
              <span className="text-[11px] font-[700] uppercase tracking-wider text-[var(--color-text-secondary)]">Meta de abril</span>
              <span className={`text-[10px] font-mono font-[700] px-1.5 py-0.5 rounded-full ml-1 ${goalPct>=0.8?'bg-[var(--color-success-soft)] text-[var(--color-success)]':'bg-[var(--color-warning-soft)] text-[var(--color-warning)]'}`}>
                {pct(goalPct*100)}
              </span>
            </div>
            <div className="flex items-center gap-5 text-[12px]">
              <span className="text-[var(--color-text-tertiary)]">Realizado: <span className="font-mono font-[700] text-[var(--color-text-primary)]">{R$(goalDone)}</span></span>
              <span className="text-[var(--color-text-tertiary)]">Meta: <span className="font-mono font-[600] text-[var(--color-text-primary)]">{R$(goalTotal)}</span></span>
              <span className="text-[var(--color-text-tertiary)]">Faltam: <span className="font-mono font-[600] text-[var(--color-accent)]">{R$(goalTotal-goalDone)}</span></span>
              <span className="text-[var(--color-text-tertiary)] text-[11px]">12 dias úteis</span>
            </div>
          </div>
          <div className="h-[7px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-[var(--color-accent)]" style={{ width:`${goalPct*100}%` }} />
          </div>
        </div>

        {/* ── KPI strip (5+5) ── */}
        <div className="grid grid-cols-5 gap-3">
          <Kpi label="Fechado este mês"     value={R$(312400)}   trend="+8,3% vs mar" up spark={revSpark}  sparkColor="var(--color-success)" />
          <Kpi label="Pipeline total"       value={R$(1284000)}  trend="+R$ 180k" up sub="47 oportunidades" />
          <Kpi label="Taxa de conversão"    value="34,2%"        trend="+3,1 pp vs mar" up />
          <Kpi label="Novos leads"          value="23"           sub="esta semana" trend="+5 vs sem. ant." up spark={weekSpark} sparkColor="var(--color-accent)" />
          <Kpi label="MRR atual"            value={R$(89400)}    trend="+6,2%" up sub="+R$ 5.200 este mês" />
        </div>
        <div className="grid grid-cols-5 gap-3" style={{ marginTop: '-8px' }}>
          <Kpi label="Ciclo médio"          value="42 dias"     trend="-3 d vs trim." up sub="Meta: 45 d" />
          <Kpi label="Ticket médio"         value={R$(18700)}   trend="+12% vs mar" up />
          <Kpi label="Velocidade"           value={`${R$(velocity)}/d`} sub="receita por dia útil" trend="+R$ 481 vs mar" up />
          <Kpi label="Deals ganhos"         value="15"          sub="este mês" trend="-3 vs trim." up={false} />
          <Kpi label="Renovações em risco"  value="5"           sub={`${R$(234000)}`} trend="+2 contratos" up={false} />
        </div>

        {/* ── Funil de Vendas + Atividades ── */}
        <div className="grid grid-cols-5 gap-4">

          {/* Funil visual */}
          <div className="col-span-3 bg-white border border-[var(--color-border)] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">Funil de Vendas</div>
                <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">Conversão geral: <span className="font-mono font-[600]">10,1%</span> · {R$(3458000)} em pipeline</div>
              </div>
              <button onClick={() => navigate('relatorios')} className="text-[11px] font-[500] text-[var(--color-accent)] flex items-center gap-1 hover:underline">Ver relatório <ArrowRight size={11} /></button>
            </div>

            {/* Stage number boxes */}
            <div className="flex items-start gap-0 mb-5 overflow-x-auto">
              {funnelStages.map((s, i) => (
                <React.Fragment key={s.stage}>
                  <div className="flex flex-col items-center min-w-0 flex-1">
                    <div className="text-[22px] font-[800] font-mono leading-none" style={{ color: s.color }}>{s.count}</div>
                    <div className="text-[10px] text-[var(--color-text-tertiary)] mt-1 text-center leading-tight">{s.stage}</div>
                    <div className="text-[10px] font-mono text-[var(--color-text-secondary)] mt-0.5">{Rk(s.value)}</div>
                  </div>
                  {i < funnelStages.length - 1 && (
                    <div className="flex flex-col items-center justify-center pt-1 px-1 min-w-[32px]">
                      {s.conv !== null ? (
                        <span className={`text-[9px] font-mono font-[700] ${(s.conv as number)>=65?'text-[var(--color-success)]':(s.conv as number)>=55?'text-[var(--color-warning)]':'text-[var(--color-danger)]'}`}>
                          {s.conv}%
                        </span>
                      ) : <span className="text-[9px] text-[var(--color-text-tertiary)]">→</span>}
                      <ArrowRight size={10} className="text-[var(--color-text-tertiary)] mt-0.5" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Visual funnel bars */}
            <div className="flex flex-col gap-1">
              {funnelStages.slice(0, 5).map((s) => {
                const w = (s.count / funnelStages[0].count) * 100;
                return (
                  <div key={s.stage} className="flex items-center gap-3">
                    <div className="w-[90px] shrink-0 text-[11px] font-[500] text-[var(--color-text-secondary)] text-right">{s.stage}</div>
                    <div className="flex-1 h-[28px] bg-[var(--color-subtle)] rounded-[4px] relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 rounded-[4px] flex items-center px-2.5"
                        style={{ width:`${w}%`, backgroundColor: s.color, opacity: 0.88 }}>
                        <span className="text-[11px] font-mono font-[700] text-white whitespace-nowrap">{s.count} deals</span>
                      </div>
                    </div>
                    <div className="w-[70px] shrink-0 text-right">
                      <div className="text-[11px] font-mono font-[600] text-[var(--color-text-primary)]">{Rk(s.value)}</div>
                      {s.ciclo > 0 && <div className="text-[9px] text-[var(--color-text-tertiary)]">{s.ciclo}d médio</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Atividades de hoje */}
          <div className="col-span-2 bg-white border border-[var(--color-border)] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">Atividades de Hoje</div>
                <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
                  {activities.length} atividades{urgentToday > 0 && <> · <span className="text-[var(--color-danger)] font-[600]">{urgentToday} urgente</span></>}
                </div>
              </div>
              <button className="w-[26px] h-[26px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:bg-[var(--color-subtle)] rounded-[6px]"><RefreshCw size={12} /></button>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {activities.map((a, i) => {
                const Icon = actIcon[a.type];
                return (
                  <div key={i} className={`flex items-start gap-3 p-2.5 rounded-[8px] border cursor-pointer transition-colors hover:bg-[var(--color-subtle)] ${a.urgent?'border-[var(--color-danger)]/30 bg-[var(--color-danger-soft)]':'border-[var(--color-border)]'}`}>
                    <div className="text-[11px] font-mono font-[600] text-[var(--color-text-tertiary)] w-[36px] shrink-0 pt-0.5">{a.time}</div>
                    <div className={`w-[22px] h-[22px] rounded-[5px] flex items-center justify-center shrink-0 ${actBadge[a.type]}`}><Icon size={10} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-[500] text-[var(--color-text-primary)] leading-tight">{a.label}</div>
                      <div className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5 truncate">{a.deal}</div>
                    </div>
                    {a.urgent && <AlertTriangle size={11} className="text-[var(--color-danger)] shrink-0 mt-0.5" />}
                  </div>
                );
              })}
            </div>
            <button className="mt-3 w-full h-[30px] border border-[var(--color-border-strong)] rounded-[7px] text-[11px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center justify-center gap-1.5">
              Ver todas as atividades <ChevronRight size={12} />
            </button>
          </div>
        </div>

        {/* ── Evolução de conversão + Receita ── */}
        <div className="grid grid-cols-3 gap-4">

          {/* Evolução por etapa — multi-line */}
          <Section className="col-span-2" title="Evolução de Conversão por Etapa" sub="Taxa de conversão por estágio · últimos 6 meses"
            action={
              <div className="flex items-center gap-3 text-[10px] text-[var(--color-text-tertiary)]">
                {[['Qualif.','#0891B2'],['Proposta','#D97706'],['Negoc.','#E85D2F'],['Fecha.','#16A34A']].map(([n,c])=>(
                  <div key={n} className="flex items-center gap-1"><div className="w-[8px] h-[2px] rounded-full" style={{backgroundColor:c}} /><span>{n}</span></div>
                ))}
              </div>
            }>
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={convEvolution} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-subtle)" />
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill:'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50,85]} tick={{ fontSize: 10, fill:'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`} width={32} />
                  <Tooltip content={<Tip />} />
                  <ReferenceLine y={65} stroke="var(--color-border-strong)" strokeDasharray="4 3" label={{ value:'Meta 65%', position:'right', fontSize:9, fill:'var(--color-text-tertiary)' }} />
                  <Line type="monotone" dataKey="qual" name="Qualificação %" stroke="#0891B2" strokeWidth={2} dot={{ r:2.5, fill:'#0891B2' }} activeDot={{ r:4 }} />
                  <Line type="monotone" dataKey="prop" name="Proposta %"     stroke="#D97706" strokeWidth={2} dot={{ r:2.5, fill:'#D97706' }} activeDot={{ r:4 }} />
                  <Line type="monotone" dataKey="neg"  name="Negociação %"   stroke="#E85D2F" strokeWidth={2} dot={{ r:2.5, fill:'#E85D2F' }} activeDot={{ r:4 }} />
                  <Line type="monotone" dataKey="fech" name="Fechamento %"   stroke="#16A34A" strokeWidth={2} dot={{ r:2.5, fill:'#16A34A' }} activeDot={{ r:4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--color-border)] grid grid-cols-4 gap-3">
              {[
                { label:'Qualificação', val:'72.6%', delta:'-4,7 pp', up:false, color:'#0891B2' },
                { label:'Proposta',     val:'62.3%', delta:'-2,0 pp', up:false, color:'#D97706' },
                { label:'Negociação',   val:'57.9%', delta:'-0,2 pp', up:false, color:'#E85D2F' },
                { label:'Fechamento',   val:'68.2%', delta:'+4,4 pp', up:true,  color:'#16A34A' },
              ].map(m => (
                <div key={m.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-[7px] h-[7px] rounded-full shrink-0" style={{backgroundColor:m.color}} />
                    <span className="text-[10px] text-[var(--color-text-tertiary)]">{m.label}</span>
                  </div>
                  <div className="text-[16px] font-[700] font-mono text-[var(--color-text-primary)]">{m.val}</div>
                  <span className={`text-[10px] font-mono font-[600] flex items-center gap-0.5 ${m.up?'text-[var(--color-success)]':'text-[var(--color-danger)]'}`}>
                    {m.up?<ArrowUpRight size={9}/>:<ArrowDownRight size={9}/>}{m.delta} vs nov
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* Receita + velocidade */}
          <div className="flex flex-col gap-4">
            <Section title="Receita mensal" sub="Realizado vs. Previsto"
              action={<div className="flex items-center gap-2 text-[10px] text-[var(--color-text-tertiary)]">
                <div className="flex items-center gap-1"><div className="w-[8px] h-[2px] rounded bg-[var(--color-accent)]"/>Real</div>
                <div className="flex items-center gap-1"><div className="w-[8px] h-[2px] rounded bg-[#0891B2] opacity-60"/>Prev.</div>
              </div>}>
              <div className="h-[96px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="dGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="var(--color-accent)" stopOpacity={0.18}/>
                        <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="m" tick={{ fontSize: 9, fill:'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip content={<Tip />} />
                    <Area dataKey="v" name="R$ Realizado" stroke="var(--color-accent)" strokeWidth={2} fill="url(#dGrad)" dot={false} connectNulls={false} />
                    <Area dataKey="p" name="R$ Previsto"  stroke="#0891B2" strokeWidth={1.5} strokeDasharray="4 3" fill="none" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="font-mono font-[700] text-[var(--color-text-primary)]">{R$(312400)}</span>
                <span className="text-[var(--color-text-tertiary)]">Forecast: <span className="font-mono font-[600] text-[var(--color-text-primary)]">{R$(390000)}</span></span>
              </div>
            </Section>

            {/* Pipeline velocity */}
            <div className="bg-white border border-[var(--color-border)] rounded-[10px] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={13} className="text-[var(--color-accent)]" />
                <div className="text-[12px] font-[700] text-[var(--color-text-primary)]">Velocidade do Pipeline</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label:'Receita/dia',  value:R$(velocity),      sub:'dias úteis de abr' },
                  { label:'Win rate',     value:'34,2%',           sub:'+3,1 pp vs mar'    },
                  { label:'Ticket médio', value:R$(18700),         sub:'por deal ganho'    },
                  { label:'Deals abertos',value:'47',              sub:`${R$(1284000)}`    },
                ].map(m => (
                  <div key={m.label} className="flex flex-col gap-0.5">
                    <div className="text-[10px] font-[600] uppercase tracking-wider text-[var(--color-text-tertiary)]">{m.label}</div>
                    <div className="text-[14px] font-[700] font-mono text-[var(--color-text-primary)]">{m.value}</div>
                    <div className="text-[10px] text-[var(--color-text-tertiary)]">{m.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabela da equipe (full width) ── */}
        <Section title="Performance da Equipe" sub="Abril 2025 · 5 vendedores ativos"
          action={<span className="text-[11px] text-[var(--color-accent)] font-[500]">Abr 2025</span>}>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  {['Vendedor','Fechado / Meta','% Meta','Deals','Conversão','Ciclo médio','Ticket médio','Atividades'].map(h => (
                    <th key={h} className="text-left text-[10px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] py-2 pr-4 whitespace-nowrap first:pl-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {team.map((r, i) => {
                  const q = r.fechado / r.meta;
                  return (
                    <tr key={r.name} className={`border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-subtle)] transition-colors ${i===0?'bg-[var(--color-accent-soft)]/30':''}`}>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center text-white text-[9px] font-[700] shrink-0" style={{ backgroundColor: r.color }}>{r.initials}</div>
                          <div>
                            <div className="font-[600] text-[var(--color-text-primary)]">{r.name}</div>
                            {i===0 && <div className="text-[9px] font-[700] text-[var(--color-accent)] uppercase tracking-wider">Lider do mês</div>}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="font-mono font-[600] text-[var(--color-text-primary)] whitespace-nowrap">{R$(r.fechado)}</div>
                        <div className="w-full mt-1.5 h-[3px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width:`${Math.min(q*100,100)}%`, backgroundColor:q>=0.8?'var(--color-success)':q>=0.5?'var(--color-warning)':'var(--color-danger)' }} />
                        </div>
                        <div className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">de {R$(r.meta)}</div>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`text-[11px] font-mono font-[700] px-2 py-0.5 rounded-full ${q>=0.8?'bg-[var(--color-success-soft)] text-[var(--color-success)]':q>=0.5?'bg-[var(--color-warning-soft)] text-[var(--color-warning)]':'bg-[var(--color-danger-soft)] text-[var(--color-danger)]'}`}>
                          {Math.round(q*100)}%
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-mono font-[600] text-[var(--color-text-primary)]">{r.deals}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-[4px] bg-[var(--color-subtle)] rounded-full overflow-hidden w-[60px]">
                            <div className="h-full rounded-full bg-[var(--color-accent)]" style={{ width:`${(r.taxa/50)*100}%` }} />
                          </div>
                          <span className="font-mono font-[600] text-[var(--color-text-primary)] text-[11px]">{r.taxa}%</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`font-mono font-[600] text-[11px] ${r.ciclo<=42?'text-[var(--color-success)]':r.ciclo<=55?'text-[var(--color-warning)]':'text-[var(--color-danger)]'}`}>{r.ciclo}d</span>
                      </td>
                      <td className="py-3 pr-4 font-mono text-[var(--color-text-primary)] text-[11px]">{R$(r.tick)}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-[4px] w-[50px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-[var(--color-info,#2563EB)]" style={{ width:`${(r.ativ/50)*100}%` }} />
                          </div>
                          <span className="font-mono text-[11px] text-[var(--color-text-primary)]">{r.ativ}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-[var(--color-border-strong)]">
                  <td className="py-2.5 text-[11px] font-[700] text-[var(--color-text-secondary)]">Total da equipe</td>
                  <td className="py-2.5 font-mono font-[700] text-[var(--color-text-primary)]">{R$(team.reduce((s,r)=>s+r.fechado,0))}</td>
                  <td className="py-2.5"><span className="text-[11px] font-mono font-[600] px-2 py-0.5 rounded-full bg-[var(--color-warning-soft)] text-[var(--color-warning)]">{Math.round((team.reduce((s,r)=>s+r.fechado,0)/team.reduce((s,r)=>s+r.meta,0))*100)}%</span></td>
                  <td className="py-2.5 font-mono font-[700] text-[var(--color-text-primary)]">{team.reduce((s,r)=>s+r.deals,0)}</td>
                  <td className="py-2.5 font-mono font-[600] text-[var(--color-text-primary)]">34,2%</td>
                  <td className="py-2.5 font-mono font-[600] text-[var(--color-text-primary)]">42d</td>
                  <td className="py-2.5 font-mono text-[var(--color-text-primary)]">{R$(Math.round(team.reduce((s,r)=>s+r.tick,0)/team.length))}</td>
                  <td className="py-2.5 font-mono font-[700] text-[var(--color-text-primary)]">{team.reduce((s,r)=>s+r.ativ,0)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Section>

        {/* ── Origem dos leads + Hot deals + Atenção ── */}
        <div className="grid grid-cols-3 gap-4">

          {/* Origem dos leads */}
          <Section title="Origem dos Leads" sub="Conversão e valor por canal">
            <div className="flex flex-col gap-2">
              {leadOrigins.map((o) => (
                <div key={o.name} className="flex items-center gap-3">
                  <div className="w-[90px] shrink-0 text-[11px] font-[500] text-[var(--color-text-secondary)] truncate">{o.name}</div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[var(--color-text-tertiary)]">{o.leads} leads → {o.deals} deals</span>
                      <span className={`font-mono font-[700] ${o.taxa>=40?'text-[var(--color-success)]':o.taxa>=28?'text-[var(--color-warning)]':'text-[var(--color-danger)]'}`}>{o.taxa}%</span>
                    </div>
                    <div className="h-[5px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width:`${(o.leads/leadOrigins[0].leads)*100}%`, backgroundColor: o.color, opacity:0.85 }} />
                    </div>
                  </div>
                  <div className="w-[60px] shrink-0 text-right text-[11px] font-mono font-[600] text-[var(--color-text-primary)]">{Rk(o.valor)}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[11px]">
              <span className="text-[var(--color-text-tertiary)]">Total: {leadOrigins.reduce((s,o)=>s+o.leads,0)} leads · {leadOrigins.reduce((s,o)=>s+o.deals,0)} deals</span>
              <span className="font-mono font-[600] text-[var(--color-text-primary)]">{Rk(leadOrigins.reduce((s,o)=>s+o.valor,0))}</span>
            </div>
          </Section>

          {/* Negócios quentes */}
          <Section title="Negócios Quentes" action={<div className="flex items-center gap-1.5"><Flame size={13} className="text-[var(--color-accent)]" /><span className="text-[11px] font-mono text-[var(--color-text-tertiary)]">{hotDeals.length} deals</span></div>}>
            <div className="flex flex-col gap-2">
              {hotDeals.map(d => (
                <div key={d.id} className={`flex items-center gap-3 p-2.5 rounded-[8px] border cursor-pointer hover:bg-[var(--color-subtle)] transition-colors ${d.urgent?'border-[var(--color-danger)]/30 bg-[var(--color-danger-soft)]':'border-[var(--color-border)]'}`}>
                  <div className="relative w-[34px] h-[34px] shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="13" fill="none" stroke="var(--color-subtle)" strokeWidth="3" />
                      <circle cx="18" cy="18" r="13" fill="none"
                        stroke={d.prob>=80?'var(--color-success)':d.prob>=65?'var(--color-accent)':'var(--color-warning)'}
                        strokeWidth="3" strokeDasharray={`${d.prob*81.68/100} 81.68`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-[700] text-[var(--color-text-primary)]">{d.prob}%</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-[600] text-[var(--color-text-primary)] truncate">{d.title}</div>
                    <div className="text-[10px] text-[var(--color-text-tertiary)] truncate">{d.company}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-mono font-[500] text-[var(--color-text-secondary)]">{R$(d.value)}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${d.stage==='Fechamento'?'bg-[var(--color-success-soft)] text-[var(--color-success)]':'bg-[var(--color-subtle)] text-[var(--color-text-tertiary)]'}`}>{d.stage}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`text-[10px] font-mono font-[700] ${d.days<=5?'text-[var(--color-danger)]':'text-[var(--color-text-tertiary)]'}`}>{d.days}d</div>
                    <Clock size={8} className="text-[var(--color-text-tertiary)] ml-auto mt-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Requer atenção */}
          <Section title="Requer Atenção" action={<div className="flex items-center gap-1.5"><AlertTriangle size={13} className="text-[var(--color-warning)]" /><span className="text-[10px] font-[700] text-[var(--color-danger)] bg-[var(--color-danger-soft)] px-1.5 py-0.5 rounded-full">3 em atraso</span></div>}>
            <div className="flex flex-col gap-2">
              {pending.map((c,i) => (
                <div key={i} className={`flex items-center gap-3 p-2.5 rounded-[8px] border cursor-pointer hover:bg-[var(--color-subtle)] transition-colors ${c.overdue>7?'border-[var(--color-danger)]/30 bg-[var(--color-danger-soft)]':c.overdue>0?'border-[var(--color-warning)]/30 bg-[var(--color-warning-soft)]':'border-[var(--color-border)]'}`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-[600] text-[var(--color-text-primary)] truncate">{c.title}</div>
                    <div className="text-[10px] text-[var(--color-text-tertiary)] truncate">{c.company}</div>
                    <span className={`text-[10px] font-[500] px-1.5 py-0.5 rounded-full ${c.overdue>7?'bg-[var(--color-danger-soft)] text-[var(--color-danger)]':c.overdue>0?'bg-[var(--color-warning-soft)] text-[var(--color-warning)]':'bg-[var(--color-subtle)] text-[var(--color-text-tertiary)]'}`}>{c.type}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[12px] font-mono font-[600] text-[var(--color-text-primary)]">{R$(c.value)}</div>
                    {c.overdue>0 && <div className={`text-[10px] font-mono ${c.overdue>7?'text-[var(--color-danger)]':'text-[var(--color-warning)]'}`}>+{c.overdue}d</div>}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full h-[30px] border border-[var(--color-border-strong)] rounded-[7px] text-[11px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center justify-center gap-1.5">
              Ver cobranças e contratos <ChevronRight size={12} />
            </button>
          </Section>
        </div>

        {/* ── AI Insights ── */}
        <div className="grid grid-cols-3 gap-3">
          <AIInsight text="Proposta→Negociação caiu 4 pp este mês. Os 3 deals de Carlos Mendes emperraram nessa etapa por 20+ dias. Revise o script de qualificação do ICP para projetos acima de R$ 40k." label="Risco" labelColor="risco" />
          <AIInsight text="3 contratos sem assinatura há mais de 8 dias. Probabilidade histórica de perda: 67%. Enviar lembrete agora pode recuperar até R$ 62.800 ainda neste mês." label="Urgente" labelColor="urgente" />
          <AIInsight text="Indicação tem 48% de conversão — 2× mais que outbound. Cada cliente ativo gera em média 1,4 indicações por ano. Ativar programa de referral pode gerar +R$ 280k no próximo trimestre." label="Dica" labelColor="dica" />
        </div>

      </div>
    </AppLayout>
  );
}
