import React, { useState } from 'react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';
import {
  ArrowUpRight, ArrowDownRight, Download, ChevronDown,
  TrendingUp, Users, Target, Clock, AlertTriangle, Filter
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  Cell, ReferenceLine
} from 'recharts';

/* ─── Formatters ─────────────────────────── */
const R$ = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(v);
const Rk = (v: number) =>
  v >= 1000 ? `R$ ${(v / 1000).toFixed(0)}k` : R$(v);

/* ─── Tooltip ────────────────────────────── */
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
            {typeof e.value === 'number' && e.value > 999 ? Rk(e.value) : e.value}{typeof e.value === 'number' && e.name?.includes('%') ? '%' : ''}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ─── KPI card ───────────────────────────── */
function Kpi({ label, value, sub, trend, up }: { label: string; value: string; sub?: string; trend?: string; up?: boolean }) {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-[10px] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-2">
      <div className="text-[11px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)]">{label}</div>
      <div className="text-[26px] font-[700] font-mono text-[var(--color-text-primary)] leading-none tracking-tight">{value}</div>
      <div className="flex items-center gap-2">
        {trend && (
          <span className={`inline-flex items-center gap-0.5 text-[11px] font-mono font-[600] px-1.5 py-0.5 rounded-full ${up ? 'bg-[var(--color-success-soft)] text-[var(--color-success)]' : 'bg-[var(--color-danger-soft)] text-[var(--color-danger)]'}`}>
            {up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}{trend}
          </span>
        )}
        {sub && <span className="text-[11px] text-[var(--color-text-tertiary)]">{sub}</span>}
      </div>
    </div>
  );
}

/* ─── Section wrapper ────────────────────── */
function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">{title}</div>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ─── AI Insight strip ───────────────────── */
function AIInsight({ text }: { text: string }) {
  return (
    <div className="bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/30 rounded-[8px] px-4 py-3 flex items-start gap-2.5 text-[12px]">
      <span className="text-[var(--color-accent)] font-[700] text-[15px] leading-none mt-0.5 shrink-0">◇</span>
      <p className="text-[var(--color-text-primary)] leading-relaxed">{text}</p>
    </div>
  );
}

/* ══════════════════════════════════════════ */
/* TAB: FUNIL                                 */
/* ══════════════════════════════════════════ */

const funnelStages = [
  { stage: 'Prospecção',   entrada: 148, saida: 84,  ganhos: 0,  perdidos: 64,  valor: 2180000, ciclo: 8,  conv: null  },
  { stage: 'Qualificação', entrada: 84,  saida: 61,  ganhos: 0,  perdidos: 23,  valor: 1540000, ciclo: 11, conv: 72.6  },
  { stage: 'Proposta',     entrada: 61,  saida: 38,  ganhos: 0,  perdidos: 23,  valor:  980000, ciclo: 14, conv: 62.3  },
  { stage: 'Negociação',   entrada: 38,  saida: 22,  ganhos: 0,  perdidos: 16,  valor:  540000, ciclo: 18, conv: 57.9  },
  { stage: 'Fechamento',   entrada: 22,  saida: 15,  ganhos: 15, perdidos: 7,   valor:  312400, ciclo: 9,  conv: 68.2  },
];

const lostReasons = [
  { reason: 'Preço acima do orçamento', count: 31, pct: 34 },
  { reason: 'Escolheu concorrente',     count: 26, pct: 28 },
  { reason: 'Timing inadequado',        count: 17, pct: 19 },
  { reason: 'Não houve follow-up',      count: 12, pct: 13 },
  { reason: 'Proposta mal ajustada',    count:  6, pct:  6 },
];

const stageColors = ['#64748B','#0891B2','#D97706','#E85D2F','#16A34A'];

function TabFunil() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-3">
        <Kpi label="Leads gerados (período)" value="148"   trend="+18 vs trim. ant." up />
        <Kpi label="Deals ganhos"            value="15"    trend="-3 vs trim. ant."  up={false} sub="10,1% de conv." />
        <Kpi label="Deals perdidos"          value="92"    trend="+7 vs trim. ant."  up={false} />
        <Kpi label="Ciclo médio total"       value="42 d"  trend="-3 dias" up sub="Meta: 45 d" />
      </div>

      {/* Funil visual */}
      <Section title="Funil por etapa — entradas, saídas e tempo médio">
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                {['Etapa','Entradas','Saídas para próx.','Perdidos','Conv. (%)', 'Valor total','Tempo médio (d)'].map(h => (
                  <th key={h} className="pb-2.5 text-left font-[600] uppercase tracking-wider text-[10px] text-[var(--color-text-tertiary)] pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {funnelStages.map((s, i) => (
                <tr key={s.stage} className="hover:bg-[var(--color-subtle)] transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-[10px] h-[10px] rounded-full shrink-0" style={{ backgroundColor: stageColors[i] }} />
                      <span className="font-[500] text-[var(--color-text-primary)]">{s.stage}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 font-mono font-[600] text-[var(--color-text-primary)]">{s.entrada}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[80px] h-[6px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-[var(--color-success)]" style={{ width:`${(s.saida/s.entrada)*100}%` }} />
                      </div>
                      <span className="font-mono font-[600] text-[var(--color-text-primary)]">{s.saida}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`font-mono font-[600] ${s.perdidos > 20 ? 'text-[var(--color-danger)]' : 'text-[var(--color-text-secondary)]'}`}>{s.perdidos}</span>
                  </td>
                  <td className="py-3 pr-4">
                    {s.conv !== null ? (
                      <span className={`font-mono font-[600] text-[11px] px-2 py-0.5 rounded-full ${s.conv >= 65 ? 'bg-[var(--color-success-soft)] text-[var(--color-success)]' : s.conv >= 55 ? 'bg-[var(--color-warning-soft)] text-[var(--color-warning)]' : 'bg-[var(--color-danger-soft)] text-[var(--color-danger)]'}`}>
                        {s.conv}%
                      </span>
                    ) : <span className="text-[var(--color-text-tertiary)]">—</span>}
                  </td>
                  <td className="py-3 pr-4 font-mono text-[var(--color-text-secondary)]">{R$(s.valor)}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-[50px] h-[4px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-[var(--color-accent)]" style={{ width:`${(s.ciclo/20)*100}%` }} />
                      </div>
                      <span className="font-mono text-[var(--color-text-primary)]">{s.ciclo}d</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Perdas + funil visual */}
      <div className="grid grid-cols-5 gap-4">
        {/* Motivos de perda */}
        <Section title="Motivos de perda (92 deals)" action={<span className="text-[11px] text-[var(--color-text-tertiary)]">Últimos 90 dias</span>}>
          <div className="flex flex-col gap-3 col-span-3">
            {lostReasons.map((r, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[var(--color-text-primary)]">{r.reason}</span>
                  <span className="font-mono font-[600] text-[var(--color-text-secondary)]">{r.count} deals</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-[6px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width:`${r.pct}%`, backgroundColor: i === 0 ? 'var(--color-danger)' : i === 1 ? 'var(--color-warning)' : 'var(--color-border-strong)' }} />
                  </div>
                  <span className="text-[11px] font-mono text-[var(--color-text-tertiary)] w-[30px] text-right">{r.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Funil visual */}
        <div className="col-span-2 bg-white border border-[var(--color-border)] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-2 items-center justify-center">
          <div className="text-[13px] font-[700] text-[var(--color-text-primary)] mb-3 self-start">Funil visual</div>
          {funnelStages.map((s, i) => {
            const pct = (s.entrada / 148) * 100;
            return (
              <div key={s.stage} className="flex flex-col items-center w-full gap-0.5">
                <div
                  className="flex items-center justify-center text-white text-[11px] font-[600] rounded-[4px] transition-all"
                  style={{ width:`${pct}%`, minWidth:'120px', height:'28px', backgroundColor: stageColors[i], opacity: 0.85 }}
                >
                  {s.stage} · {s.entrada}
                </div>
                {i < funnelStages.length - 1 && (
                  <div className="text-[10px] font-mono text-[var(--color-text-tertiary)]">▼ {funnelStages[i+1].conv}%</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AIInsight text="A maior queda acontece em Qualificação→Proposta (62,3%). Negócios abertos por Carlos Mendes têm taxa 18% menor nesta transição. Recomendação: revisar critério de qualificação e script de descoberta." />
    </div>
  );
}

/* ══════════════════════════════════════════ */
/* TAB: CONVERSÃO                             */
/* ══════════════════════════════════════════ */

const winRateHistory = [
  { m: 'Mai/24', taxa: 28.4, meta: 32 },
  { m: 'Jun/24', taxa: 30.1, meta: 32 },
  { m: 'Jul/24', taxa: 27.8, meta: 32 },
  { m: 'Ago/24', taxa: 31.2, meta: 32 },
  { m: 'Set/24', taxa: 29.7, meta: 32 },
  { m: 'Out/24', taxa: 33.1, meta: 32 },
  { m: 'Nov/24', taxa: 35.4, meta: 32 },
  { m: 'Dez/24', taxa: 38.0, meta: 32 },
  { m: 'Jan/25', taxa: 32.4, meta: 34 },
  { m: 'Fev/25', taxa: 31.1, meta: 34 },
  { m: 'Mar/25', taxa: 33.8, meta: 34 },
  { m: 'Abr/25', taxa: 34.2, meta: 34 },
];

const winBySource = [
  { canal: 'Indicação',  taxa: 48.2, deals: 42 },
  { canal: 'LinkedIn',   taxa: 31.4, deals: 28 },
  { canal: 'Outbound',   taxa: 22.7, deals: 18 },
  { canal: 'Eventos',    taxa: 38.5, deals: 12 },
  { canal: 'Site',       taxa: 14.2, deals:  8 },
];

const winBySize = [
  { bracket: '> R$ 100k',      taxa: 41.2, avg_ciclo: 68 },
  { bracket: 'R$ 50k–R$ 100k', taxa: 38.7, avg_ciclo: 54 },
  { bracket: 'R$ 20k–R$ 50k',  taxa: 35.1, avg_ciclo: 38 },
  { bracket: 'R$ 10k–R$ 20k',  taxa: 29.4, avg_ciclo: 28 },
  { bracket: '< R$ 10k',       taxa: 18.6, avg_ciclo: 14 },
];

const repConversion = [
  { name: 'Ana Beatriz',   taxa: 42.1, deals_won: 7,  total: 17 },
  { name: 'Carlos Mendes', taxa: 28.3, deals_won: 4,  total: 14 },
  { name: 'Juliana Costa', taxa: 18.2, deals_won: 2,  total: 11 },
  { name: 'Ricardo Lemos', taxa: 36.8, deals_won: 4,  total: 11 },
];

function TabConversao() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-3">
        <Kpi label="Taxa de conversão geral" value="34,2%" trend="+3,1 pp vs tri. ant." up />
        <Kpi label="Taxa deals > R$ 50k"     value="39,5%" trend="+5,2 pp" up sub="Melhor segmento" />
        <Kpi label="Ciclo médio (ganhos)"    value="42 dias" trend="-3 d vs trim. ant." up />
        <Kpi label="Taxa após follow-up ◇2" value="61,8%" sub="vs 29,1% sem follow-up" />
      </div>

      {/* Win rate ao longo do tempo */}
      <Section title="Taxa de conversão mensal (12 meses)" action={
        <div className="flex items-center gap-3 text-[11px] text-[var(--color-text-tertiary)]">
          <div className="flex items-center gap-1.5"><div className="w-[8px] h-[2px] bg-[var(--color-accent)] rounded" /> Realizado</div>
          <div className="flex items-center gap-1.5"><div className="w-[8px] h-[2px] bg-[var(--color-border-strong)] rounded border-dashed" /> Meta</div>
        </div>
      }>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={winRateHistory} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-subtle)" />
              <XAxis dataKey="m" tick={{ fontSize: 10, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[20, 42]} />
              <Tooltip content={<Tip />} />
              <ReferenceLine y={34} stroke="var(--color-border-strong)" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="taxa" name="Conversão" stroke="var(--color-accent)" strokeWidth={2.5} dot={{ r: 3, fill: 'var(--color-accent)' }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex items-center gap-4 text-[11px] text-[var(--color-text-tertiary)] border-t border-[var(--color-border)] pt-3">
          <span>Mín: <span className="font-mono font-[600] text-[var(--color-danger)]">22,7% (Jul/24)</span></span>
          <span>Máx: <span className="font-mono font-[600] text-[var(--color-success)]">38,0% (Dez/24)</span></span>
          <span>Média: <span className="font-mono font-[600] text-[var(--color-text-primary)]">32,0%</span></span>
        </div>
      </Section>

      {/* Taxa por canal + por tamanho */}
      <div className="grid grid-cols-2 gap-4">
        <Section title="Taxa de conversão por canal de origem">
          <div className="flex flex-col gap-2.5">
            {winBySource.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-[100px] shrink-0 text-[12px] text-[var(--color-text-secondary)]">{s.canal}</div>
                <div className="flex-1 h-[20px] bg-[var(--color-subtle)] rounded-[4px] overflow-hidden relative">
                  <div
                    className="h-full rounded-[4px] flex items-center"
                    style={{ width:`${s.taxa}%`, backgroundColor: s.taxa >= 40 ? 'var(--color-success)' : s.taxa >= 30 ? 'var(--color-accent)' : 'var(--color-warning)' }}
                  >
                    <span className="text-white text-[10px] font-mono font-[700] px-2">{s.taxa}%</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[var(--color-text-tertiary)] w-[50px] text-right">{s.deals} deals</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Taxa de conversão por faixa de valor">
          <div className="flex flex-col gap-2.5">
            {winBySize.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-[130px] shrink-0 text-[12px] text-[var(--color-text-secondary)] truncate">{s.bracket}</div>
                <div className="flex-1 h-[20px] bg-[var(--color-subtle)] rounded-[4px] overflow-hidden">
                  <div className="h-full rounded-[4px] flex items-center bg-[var(--color-accent)]" style={{ width:`${s.taxa}%`, opacity: 0.7 + i * 0.06 }}>
                    <span className="text-white text-[10px] font-mono font-[700] px-2">{s.taxa}%</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[var(--color-text-tertiary)] w-[45px] text-right">{s.avg_ciclo}d</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[10px] text-[var(--color-text-tertiary)] border-t border-[var(--color-border)] pt-2">Coluna direita = ciclo médio em dias para deals ganhos</div>
        </Section>
      </div>

      {/* Conversão por vendedor */}
      <Section title="Taxa de conversão por vendedor" action={<span className="text-[11px] text-[var(--color-text-tertiary)]">Abr 2025</span>}>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                {['Vendedor','Deals ganhos','Total abordados','Taxa de conv.','Benchmark equipe',''].map(h => (
                  <th key={h} className="pb-2.5 text-left font-[600] uppercase tracking-wider text-[10px] text-[var(--color-text-tertiary)] pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {repConversion.map((r, i) => {
                const avg = 32.0;
                const diff = r.taxa - avg;
                return (
                  <tr key={r.name} className="hover:bg-[var(--color-subtle)] transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center text-white text-[9px] font-[700]" style={{ backgroundColor: ['#1e40af','#047857','#b45309','#7c3aed'][i] }}>
                          {r.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                        </div>
                        <span className="font-[500] text-[var(--color-text-primary)]">{r.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 font-mono font-[700] text-[var(--color-text-primary)]">{r.deals_won}</td>
                    <td className="py-3 pr-4 font-mono text-[var(--color-text-secondary)]">{r.total}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-[12px] font-mono font-[700] px-2 py-0.5 rounded-full ${r.taxa >= 38 ? 'bg-[var(--color-success-soft)] text-[var(--color-success)]' : r.taxa >= 30 ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]' : 'bg-[var(--color-warning-soft)] text-[var(--color-warning)]'}`}>
                        {r.taxa}%
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[100px] h-[6px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width:`${(r.taxa/50)*100}%`, backgroundColor: r.taxa >= avg ? 'var(--color-success)' : 'var(--color-warning)' }} />
                        </div>
                        <span className={`text-[11px] font-mono font-[600] ${diff >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                          {diff >= 0 ? '+' : ''}{diff.toFixed(1)} pp
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-[11px] text-right">
                      {i === 0 && <span className="text-[var(--color-accent)] font-[700]">Lider</span>}
                      {i === 2 && <span className="text-[var(--color-danger)] font-[500]">Atenção</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <AIInsight text="Indicação converte 48% vs 23% de outbound — 2× mais. Ana Beatriz tem a maior taxa (42,1%) usando follow-up em D+3. Treinar a equipe neste padrão pode elevar a taxa média de 34% para 40%+." />
    </div>
  );
}

/* ══════════════════════════════════════════ */
/* TAB: RECEITA                               */
/* ══════════════════════════════════════════ */

const revenueMonths = [
  { m: 'Mai/24', real: 198000, prev: 210000, mrr: 74000 },
  { m: 'Jun/24', real: 223000, prev: 230000, mrr: 76000 },
  { m: 'Jul/24', real: 241000, prev: 245000, mrr: 76500 },
  { m: 'Ago/24', real: 268000, prev: 260000, mrr: 78000 },
  { m: 'Set/24', real: 254000, prev: 275000, mrr: 79200 },
  { m: 'Out/24', real: 289000, prev: 280000, mrr: 80100 },
  { m: 'Nov/24', real: 312000, prev: 305000, mrr: 82400 },
  { m: 'Dez/24', real: 347000, prev: 330000, mrr: 84200 },
  { m: 'Jan/25', real: 280000, prev: 320000, mrr: 84600 },
  { m: 'Fev/25', real: 296000, prev: 310000, mrr: 85900 },
  { m: 'Mar/25', real: 312400, prev: 340000, mrr: 87800 },
  { m: 'Abr/25', real: 0,      prev: 390000, mrr: 89400 },
];

const cohortData = [
  { cohort: 'Jan/2025', m0: 100, m1: 94, m2: 88, m3: 85, m4: null },
  { cohort: 'Fev/2025', m0: 100, m1: 92, m2: 89, m3: null, m4: null },
  { cohort: 'Mar/2025', m0: 100, m1: 96, m2: null, m3: null, m4: null },
  { cohort: 'Abr/2025', m0: 100, m1: null, m2: null, m3: null, m4: null },
];

const channelData = [
  { canal: 'Indicação', pct: 42, valor: 540750, color: '#E85D2F' },
  { canal: 'LinkedIn',  pct: 28, valor: 360500, color: '#0891B2' },
  { canal: 'Outbound',  pct: 18, valor: 231750, color: '#D97706' },
  { canal: 'Eventos',   pct: 12, valor: 154500, color: '#16A34A' },
];

const revenueTable = [
  { m: 'Jan/25', real: 280000, meta: 300000, mrr: 84600, novos: 31200, churn: 8400, pct: 93.3 },
  { m: 'Fev/25', real: 296000, meta: 310000, mrr: 85900, novos: 28600, churn: 7200, pct: 95.5 },
  { m: 'Mar/25', real: 312400, meta: 350000, mrr: 87800, novos: 34400, churn: 6600, pct: 89.3 },
  { m: 'Abr/25', real: 0,      meta: 380000, mrr: 89400, novos: null,  churn: null, pct: null },
];

function TabReceita() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-3">
        <Kpi label="Receita realizada (1T25)"  value={R$(888400)}  trend="+23,4% vs 4T24" up />
        <Kpi label="Meta do trimestre"         value={R$(1040000)} sub="85,4% atingido" />
        <Kpi label="MRR atual"                 value={R$(89400)}   trend="+6,2% em 3 meses" up />
        <Kpi label="Forecast — Abril"          value={R$(390000)}  sub="±12% · prob. ponderada" />
      </div>

      {/* Receita real vs forecast */}
      <Section title="Receita mensal — Realizado vs. Previsto (12 meses)" action={
        <div className="flex items-center gap-3 text-[11px] text-[var(--color-text-tertiary)]">
          <div className="flex items-center gap-1.5"><div className="w-[8px] h-[8px] rounded-full bg-[var(--color-accent)]" /> Realizado</div>
          <div className="flex items-center gap-1.5"><div className="w-[8px] h-[2px] bg-[#0891B2]" style={{ borderTop:'2px dashed #0891B2' }} /> Previsto</div>
        </div>
      }>
        <div className="h-[190px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueMonths} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradReal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--color-accent)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-subtle)" />
              <XAxis dataKey="m" tick={{ fontSize: 10, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} tickFormatter={v => Rk(v)} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="real" name="Realizado" stroke="var(--color-accent)" strokeWidth={2.5} fill="url(#gradReal)" dot={false} />
              <Area type="monotone" dataKey="prev" name="Previsto"  stroke="#0891B2" strokeWidth={2} strokeDasharray="5 4" fill="none" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Section>

      {/* Breakdown mensal + canal */}
      <div className="grid grid-cols-3 gap-4">
        {/* Tabela mensal */}
        <div className="col-span-2 bg-white border border-[var(--color-border)] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">Breakdown mensal — 1T 2025</div>
          </div>
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                {['Mês','Realizado','Meta','% meta','MRR','Novos clientes','Churn MRR'].map(h => (
                  <th key={h} className="pb-2.5 text-left font-[600] uppercase tracking-wider text-[10px] text-[var(--color-text-tertiary)] pr-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {revenueTable.map((row, i) => (
                <tr key={row.m} className={`hover:bg-[var(--color-subtle)] transition-colors ${i === 3 ? 'opacity-50' : ''}`}>
                  <td className="py-3 pr-3 font-[600] text-[var(--color-text-primary)]">{row.m}</td>
                  <td className="py-3 pr-3 font-mono font-[600] text-[var(--color-text-primary)]">{row.real > 0 ? R$(row.real) : '—'}</td>
                  <td className="py-3 pr-3 font-mono text-[var(--color-text-tertiary)]">{R$(row.meta)}</td>
                  <td className="py-3 pr-3">
                    {row.pct !== null ? (
                      <span className={`font-mono font-[600] text-[11px] px-1.5 py-0.5 rounded-full ${row.pct >= 95 ? 'bg-[var(--color-success-soft)] text-[var(--color-success)]' : 'bg-[var(--color-warning-soft)] text-[var(--color-warning)]'}`}>
                        {row.pct}%
                      </span>
                    ) : <span className="text-[var(--color-text-tertiary)] text-[11px]">em andamento</span>}
                  </td>
                  <td className="py-3 pr-3 font-mono text-[var(--color-text-secondary)]">{R$(row.mrr)}</td>
                  <td className="py-3 pr-3 font-mono text-[var(--color-success)]">{row.novos ? `+${R$(row.novos)}` : '—'}</td>
                  <td className="py-3 font-mono text-[var(--color-danger)]">{row.churn ? `-${R$(row.churn)}` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Receita por canal */}
        <Section title="Receita por canal">
          <div className="flex w-full h-[10px] rounded-full overflow-hidden mb-4">
            {channelData.map(ch => (
              <div key={ch.canal} style={{ width:`${ch.pct}%`, backgroundColor: ch.color }} />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {channelData.map(ch => (
              <div key={ch.canal} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: ch.color }} />
                  <span className="text-[12px] text-[var(--color-text-primary)]">{ch.canal}</span>
                  <span className="text-[11px] font-mono text-[var(--color-text-tertiary)]">{ch.pct}%</span>
                </div>
                <span className="text-[12px] font-mono font-[500] text-[var(--color-text-secondary)]">{R$(ch.valor)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
            <div className="text-[11px] text-[var(--color-text-tertiary)] mb-3">Retenção por cohort (últ. 4 coortes)</div>
            <div className="border border-[var(--color-border)] rounded-[6px] overflow-hidden text-[10px]">
              <div className="flex bg-[var(--color-subtle)] border-b border-[var(--color-border)]">
                <div className="w-[70px] p-1.5 font-[600] text-[var(--color-text-tertiary)]">Cohort</div>
                {['M0','M1','M2','M3'].map(m => <div key={m} className="flex-1 p-1.5 text-center font-[600] text-[var(--color-text-tertiary)]">{m}</div>)}
              </div>
              {cohortData.map((row, i) => (
                <div key={i} className={`flex ${i < cohortData.length-1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                  <div className="w-[70px] p-1.5 text-[var(--color-text-secondary)] border-r border-[var(--color-border)]">{row.cohort.slice(0,7)}</div>
                  {[row.m0,row.m1,row.m2,row.m3].map((v,j) => (
                    <div key={j} className="flex-1 p-1.5 text-center font-mono font-[600]"
                      style={{ backgroundColor: v === null ? 'transparent' : `rgba(232,93,47,${((v-80)/20)*0.7+0.1})`,
                               color: v !== null && v > 90 ? '#fff' : 'var(--color-text-primary)' }}>
                      {v !== null ? `${v}%` : ''}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <AIInsight text="Previsão para abril: R$ 390.000 ±12%. Risco: 3 contratos em negociação final sem atividade há mais de 8 dias respondem por R$ 127.000 do forecast. Acionar follow-up até sexta-feira pode salvar R$ 85k." />
    </div>
  );
}

/* ══════════════════════════════════════════ */
/* TAB: EQUIPE                                */
/* ══════════════════════════════════════════ */

const repData = [
  {
    name: 'Ana Beatriz', initials: 'AB', color: '#1e40af',
    fechado: 187400, meta: 200000, deals_won: 7, deals_total: 17,
    taxa: 42.1, ciclo: 38, atividades: 94, ticket: 26771,
    calls: 32, emails: 41, meetings: 21, quota: 93.7,
  },
  {
    name: 'Carlos Mendes', initials: 'CM', color: '#047857',
    fechado: 82000, meta: 150000, deals_won: 4, deals_total: 14,
    taxa: 28.3, ciclo: 47, atividades: 68, ticket: 20500,
    calls: 28, emails: 22, meetings: 18, quota: 54.7,
  },
  {
    name: 'Juliana Costa', initials: 'JC', color: '#b45309',
    fechado: 43000, meta: 100000, deals_won: 2, deals_total: 11,
    taxa: 18.2, ciclo: 54, atividades: 45, ticket: 21500,
    calls: 18, emails: 15, meetings: 12, quota: 43.0,
  },
  {
    name: 'Ricardo Lemos', initials: 'RL', color: '#7c3aed',
    fechado: 89600, meta: 120000, deals_won: 4, deals_total: 11,
    taxa: 36.8, ciclo: 41, atividades: 72, ticket: 22400,
    calls: 24, emails: 31, meetings: 17, quota: 74.7,
  },
];

const teamActivity = [
  { d: 'Seg', AB: 5, CM: 3, JC: 2, RL: 4 },
  { d: 'Ter', AB: 7, CM: 5, JC: 3, RL: 6 },
  { d: 'Qua', AB: 4, CM: 4, JC: 1, RL: 5 },
  { d: 'Qui', AB: 8, CM: 6, JC: 4, RL: 7 },
  { d: 'Sex', AB: 6, CM: 2, JC: 3, RL: 4 },
];

const repColors = { AB: '#1e40af', CM: '#047857', JC: '#b45309', RL: '#7c3aed' };

function TabEquipe() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-3">
        <Kpi label="Total fechado (equipe)"  value={R$(402000)} trend="+14% vs mar" up />
        <Kpi label="Média por vendedor"      value={R$(100500)} sub="4 vendedores ativos" />
        <Kpi label="Melhor taxa de conv."    value="42,1%"      sub="Ana Beatriz" trend="+8 pp vs média" up />
        <Kpi label="Total de atividades"     value="279"        trend="+34 vs mar" up sub="esta semana" />
      </div>

      {/* Performance table */}
      <Section title="Performance individual — Abril 2025" action={
        <button className="h-[28px] px-3 border border-[var(--color-border-strong)] rounded-[6px] text-[11px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center gap-1.5 transition-colors">
          <Download size={11} /> Exportar
        </button>
      }>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                {['Vendedor','Fechado / Meta','% Meta','Deals ganhos','Taxa conv.','Ciclo médio','Ticket médio','Atividades'].map(h => (
                  <th key={h} className="pb-2.5 text-left font-[600] uppercase tracking-wider text-[10px] text-[var(--color-text-tertiary)] pr-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {repData.map(r => {
                const quotaPct = r.fechado / r.meta;
                return (
                  <tr key={r.name} className="hover:bg-[var(--color-subtle)] transition-colors">
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white text-[10px] font-[700] shrink-0" style={{ backgroundColor: r.color }}>{r.initials}</div>
                        <span className="font-[500] text-[var(--color-text-primary)]">{r.name.split(' ')[0]}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-[600] text-[var(--color-text-primary)]">{R$(r.fechado)}</span>
                        </div>
                        <div className="w-full h-[4px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width:`${Math.min(quotaPct*100,100)}%`, backgroundColor: quotaPct >= 0.9 ? 'var(--color-success)' : quotaPct >= 0.6 ? 'var(--color-warning)' : 'var(--color-danger)' }} />
                        </div>
                        <span className="text-[10px] font-mono text-[var(--color-text-tertiary)]">/ {R$(r.meta)}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      <span className={`font-mono font-[700] text-[11px] px-2 py-0.5 rounded-full ${quotaPct >= 0.9 ? 'bg-[var(--color-success-soft)] text-[var(--color-success)]' : quotaPct >= 0.6 ? 'bg-[var(--color-warning-soft)] text-[var(--color-warning)]' : 'bg-[var(--color-danger-soft)] text-[var(--color-danger)]'}`}>
                        {r.quota}%
                      </span>
                    </td>
                    <td className="py-3 pr-3 font-mono font-[600] text-[var(--color-text-primary)]">{r.deals_won} / {r.deals_total}</td>
                    <td className="py-3 pr-3 font-mono font-[600] text-[var(--color-text-secondary)]">{r.taxa}%</td>
                    <td className="py-3 pr-3">
                      <span className={`font-mono ${r.ciclo <= 42 ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]'} font-[600]`}>{r.ciclo}d</span>
                    </td>
                    <td className="py-3 pr-3 font-mono text-[var(--color-text-secondary)]">{R$(r.ticket)}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-[40px] h-[4px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-[var(--color-accent)]" style={{ width:`${(r.atividades/100)*100}%` }} />
                        </div>
                        <span className="font-mono text-[var(--color-text-primary)]">{r.atividades}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Atividades por tipo + semana */}
      <div className="grid grid-cols-2 gap-4">
        {/* Mix de atividades */}
        <Section title="Mix de atividades por vendedor">
          <div className="flex flex-col gap-3">
            {repData.map(r => (
              <div key={r.name} className="flex items-center gap-3">
                <div className="w-[90px] shrink-0 text-[12px] text-[var(--color-text-secondary)]">{r.name.split(' ')[0]}</div>
                <div className="flex-1 flex h-[18px] rounded-[4px] overflow-hidden gap-[2px]">
                  {[
                    { label:'Ligações',   v: r.calls,    c: '#0891B2' },
                    { label:'E-mails',    v: r.emails,   c: '#D97706' },
                    { label:'Reuniões',   v: r.meetings, c: '#E85D2F' },
                  ].map(s => {
                    const total = r.calls + r.emails + r.meetings;
                    return (
                      <div key={s.label} title={`${s.label}: ${s.v}`} className="flex items-center justify-center text-white text-[9px] font-[700]" style={{ width:`${(s.v/total)*100}%`, backgroundColor: s.c }}>
                        {((s.v/total)*100) > 15 ? s.v : ''}
                      </div>
                    );
                  })}
                </div>
                <div className="text-[11px] font-mono text-[var(--color-text-tertiary)] w-[30px] text-right">{r.atividades}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[var(--color-border)]">
            {[{l:'Ligações',c:'#0891B2'},{l:'E-mails',c:'#D97706'},{l:'Reuniões',c:'#E85D2F'}].map(item => (
              <div key={item.l} className="flex items-center gap-1.5 text-[10px] text-[var(--color-text-tertiary)]">
                <div className="w-[8px] h-[8px] rounded-sm" style={{ backgroundColor: item.c }} />
                {item.l}
              </div>
            ))}
          </div>
        </Section>

        {/* Atividades por dia */}
        <Section title="Atividades diárias (esta semana)">
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamActivity} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barSize={10}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-subtle)" />
                <XAxis dataKey="d" tick={{ fontSize: 10, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<Tip />} />
                {Object.entries(repColors).map(([key, color]) => (
                  <Bar key={key} dataKey={key} name={repData.find(r=>r.initials===key)?.name.split(' ')[0] ?? key} stackId="a" fill={color} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      {/* Ranking */}
      <Section title="Ranking — % de meta atingida" action={<span className="text-[11px] text-[var(--color-text-tertiary)]">Abr 2025</span>}>
        <div className="flex flex-col gap-3">
          {[...repData].sort((a,b) => b.quota - a.quota).map((r, i) => (
            <div key={r.name} className="flex items-center gap-4">
              <div className={`w-[22px] text-[13px] font-[700] ${i === 0 ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-tertiary)]'}`}>{i+1}°</div>
              <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center text-white text-[9px] font-[700] shrink-0" style={{ backgroundColor: r.color }}>{r.initials}</div>
              <div className="w-[110px] shrink-0">
                <div className="text-[12px] font-[500] text-[var(--color-text-primary)]">{r.name.split(' ')[0]}</div>
              </div>
              <div className="flex-1 h-[8px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width:`${r.quota}%`, backgroundColor: r.quota >= 90 ? 'var(--color-success)' : r.quota >= 60 ? 'var(--color-warning)' : 'var(--color-danger)' }} />
              </div>
              <div className="flex items-center gap-3 w-[180px] justify-end">
                <span className="font-mono font-[700] text-[12px] text-[var(--color-text-primary)]">{r.quota}%</span>
                <span className="font-mono text-[11px] text-[var(--color-text-tertiary)]">{R$(r.fechado)}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <AIInsight text="Ana Beatriz lidera em conversão (42,1%) e atividades (94), mas Ricardo Lemos tem o crescimento mais acelerado (+28% vs mês anterior). Juliana Costa está em 43% da meta — recomenda-se acompanhamento semanal e revisão da carteira de leads." />
    </div>
  );
}

/* ══════════════════════════════════════════ */
/* Main                                       */
/* ══════════════════════════════════════════ */

const TABS = [
  { id: 'funil',     label: 'Funil',     comp: TabFunil     },
  { id: 'conversao', label: 'Conversão', comp: TabConversao },
  { id: 'receita',   label: 'Receita',   comp: TabReceita   },
  { id: 'equipe',    label: 'Equipe',    comp: TabEquipe    },
];

export default function Relatorios() {
  const [tab, setTab] = useState('funil');
  const ActiveTab = TABS.find(t => t.id === tab)?.comp ?? TabFunil;

  return (
    <AppLayout currentPage="relatorios"
      pageTitle="Relatórios"
      pageSub="1° trimestre 2025 · Pipeline Comercial"
      actions={
        <>
          <button className="h-[32px] px-3 border border-[var(--color-border)] rounded-[7px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center gap-1.5 transition-colors">
            <Filter size={12} /> Filtros
          </button>
          <button className="h-[32px] px-3 border border-[var(--color-border)] rounded-[7px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center gap-1.5 transition-colors">
            Jan–Mar 2025 <ChevronDown size={12} />
          </button>
          <button className="h-[32px] px-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[12px] font-[600] rounded-[7px] flex items-center gap-1.5 transition-colors shadow-[var(--shadow-xs)]">
            <Download size={12} /> Exportar
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-5">

        {/* Tabs */}
        <div className="flex items-end gap-0 border-b border-[var(--color-border)]">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`h-[36px] px-5 text-[13px] font-[600] border-b-2 transition-colors ${tab === t.id ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <ActiveTab />

      </div>
    </AppLayout>
  );
}
