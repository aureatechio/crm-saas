import React, { useState } from 'react';
import {
  ArrowLeft, Mail, Phone, MessageCircle, Calendar, User, Plus,
  ExternalLink, ChevronRight, Clock, FileText,
  Check, AlertTriangle, TrendingUp, Star, Send, Edit3,
  Globe, Building2, X, Instagram, BarChart2, Activity,
  Eye, Target, Zap, RefreshCw, CheckCircle, Circle
} from 'lucide-react';
import './_shared/_group.css';
import { useNav } from './_shared/nav-context';

/* ─── Formatters ─────────────────────────── */
const R$ = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(v);

/* ─── Types ──────────────────────────────── */
type Tab = 'geral' | 'analise' | 'pipeline' | 'atividades' | 'notas';
type BantStatus = 'confirmado' | 'parcial' | 'nao_avaliado';
type ActivityType = 'email' | 'ligacao' | 'reuniao' | 'nota' | 'proposta' | 'tarefa' | 'whatsapp';
type AnaliseSubTab = 'instagram' | 'site';

/* ─── Helpers ────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] font-[700] uppercase tracking-[0.08em] text-[var(--color-text-tertiary)] mb-2">{children}</div>;
}
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white border border-[var(--color-border)] rounded-[10px] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] ${className}`}>{children}</div>;
}
function BantPill({ status }: { status: BantStatus }) {
  const map = {
    confirmado:   { label: 'Confirmado',  cls: 'bg-[var(--color-success-soft)] text-[var(--color-success)]' },
    parcial:      { label: 'Parcial',     cls: 'bg-[var(--color-warning-soft)] text-[var(--color-warning)]' },
    nao_avaliado: { label: 'N/A',         cls: 'bg-[var(--color-subtle)] text-[var(--color-text-tertiary)]' },
  };
  const { label, cls } = map[status];
  return <span className={`text-[10px] font-[600] px-1.5 py-0.5 rounded-full ${cls}`}>{label}</span>;
}

/* ─── Activity icons ─────────────────────── */
const actMeta: Record<ActivityType, { icon: React.FC<{size:number;className?:string}>, color: string, bg: string }> = {
  email:    { icon: Mail,          color: 'text-[#1d4ed8]',                  bg: 'bg-[#DBEAFE]' },
  ligacao:  { icon: Phone,         color: 'text-[var(--color-success)]',     bg: 'bg-[var(--color-success-soft)]' },
  reuniao:  { icon: Calendar,      color: 'text-[var(--color-accent)]',      bg: 'bg-[var(--color-accent-soft)]' },
  nota:     { icon: Edit3,         color: 'text-[var(--color-text-secondary)]', bg: 'bg-[var(--color-subtle)]' },
  proposta: { icon: FileText,      color: 'text-[#7c3aed]',                  bg: 'bg-[#ede9fe]' },
  tarefa:   { icon: Check,         color: 'text-[var(--color-warning)]',     bg: 'bg-[var(--color-warning-soft)]' },
  whatsapp: { icon: MessageCircle, color: 'text-[var(--color-success)]',     bg: 'bg-[var(--color-success-soft)]' },
};

/* ─── Data ────────────────────────────────── */
const bantItems = [
  { letter:'B', label:'Budget',   status:'confirmado'   as BantStatus, note:'R$ 40–50k aprovado para Q2 2025' },
  { letter:'A', label:'Authority',status:'parcial'      as BantStatus, note:'Diretora Financeira — precisa aval do CEO' },
  { letter:'N', label:'Need',     status:'confirmado'   as BantStatus, note:'Reforma do processo fiscal — urgente' },
  { letter:'T', label:'Timeline', status:'confirmado'   as BantStatus, note:'Implementar até início de Q2' },
];

const deal = {
  stages: ['Prospecção','Qualificação','Proposta','Negociação','Fechamento'],
  stageIdx: 2, value: 34500, prob: 65,
  forecast: '30 Mai 2025', daysInStage: 11,
  dealName: 'Assessoria Tributária Anual',
};

const proposals = [
  { id:'PRO-034', name:'Assessoria Tributária — Plano Anual', value:34500, status:'enviada',  sent:'10 Abr', expires:'24 Abr', viewCount:3 },
  { id:'PRO-031', name:'BPO Financeiro — Proposta Inicial',   value:28000, status:'expirada', sent:'14 Mar', expires:'28 Mar', viewCount:5 },
];

const propBadge: Record<string,{label:string;cls:string}> = {
  enviada:  { label:'Enviada',  cls:'bg-[#DBEAFE] text-[#1d4ed8]' },
  rascunho: { label:'Rascunho', cls:'bg-[var(--color-subtle)] text-[var(--color-text-tertiary)]' },
  aceita:   { label:'Aceita',   cls:'bg-[var(--color-success-soft)] text-[var(--color-success)]' },
  expirada: { label:'Expirada', cls:'bg-[var(--color-danger-soft)] text-[var(--color-danger)]' },
};

const timeline = [
  { date:'Hoje, 11h00', type:'tarefa'   as ActivityType, title:'Enviar proposta revisada',           desc:'Atualizar cláusula de reajuste anual',              future:true,  by:'Ana B.' },
  { date:'Hoje, 09h15', type:'email'    as ActivityType, title:'PRO-034 visualizada pelo cliente',   desc:'Abriu o documento por 4 min · 3ª visualização',      future:false, by:'Sistema' },
  { date:'12 Abr',      type:'reuniao'  as ActivityType, title:'Reunião de alinhamento — 45 min',    desc:'Apresentação da proposta. Solicitou desconto de 10%', future:false, by:'Ana B.' },
  { date:'10 Abr',      type:'proposta' as ActivityType, title:'Proposta PRO-034 enviada',           desc:`${R$(34500)} · Assessoria Tributária`,               future:false, by:'Ana B.' },
  { date:'07 Abr',      type:'ligacao'  as ActivityType, title:'Ligação de qualificação — 22 min',   desc:'BANT validado. Budget confirmado para Q2.',           future:false, by:'Ana B.' },
  { date:'02 Abr',      type:'email'    as ActivityType, title:'Email de apresentação enviado',      desc:'Taxa de abertura: 1× · Link clicado',                future:false, by:'Ana B.' },
  { date:'28 Mar',      type:'nota'     as ActivityType, title:'Lead criado por indicação',          desc:'Indicada por Carlos Mendes — Fernandes & Cia',        future:false, by:'CM'     },
];

const notes = [
  { date:'14 Abr', author:'Ana B.', text:'"Muito aberta a reunião presencial. Prefere terças. Quer envolver o CEO na próxima."' },
  { date:'07 Abr', author:'Ana B.', text:'"Budget aprovado Q2 ~R$ 40–50k. Urgência real no fiscal — mencionar compliance na proposta."' },
  { date:'28 Mar', author:'CM',      text:'"Indicada pelo Ricardo da Fernandes. Conhecem nosso trabalho de BPO."' },
];

/* ─── Instagram analysis data ─────────────── */
const instaAnalysis = {
  handle: '@andrade.contabil',
  seguidores: '2.847',
  posts: '94',
  engajamento: '2,3%',
  sections: [
    {
      icon: Eye,
      title: 'PERCEPÇÃO',
      type: 'text' as const,
      content: 'Mercado vê a Andrade como escritório contábil tradicional e competente, mas sem diferencial claro de proposta de valor. Visual profissional, porém sem CTAs ou funil de entrada visível. Gera credibilidade institucional, mas baixa geração de demanda.'
    },
    {
      icon: User,
      title: 'PERFIL DO DECISOR',
      type: 'text' as const,
      content: 'Marina é executiva que usa o Instagram para networking corporativo e consumo de conteúdo de gestão/finanças. Segue influenciadores de eficiência operacional e compliance. Decisora com viés de ROI — responde a conteúdo de resultado concreto, não a branding genérico.'
    },
    {
      icon: AlertTriangle,
      title: 'GARGALOS IDENTIFICADOS',
      type: 'list' as const,
      content: [
        'Bio sem CTA ou link de captação — visitante não sabe o próximo passo',
        'Nenhum destaque de serviço ou caso de sucesso fixado no perfil',
        'Posts variados sem linha editorial clara (mistura de institucional + regulatório + eventos)',
        'Sem prova social visível: nenhum depoimento, resultado ou métrica de cliente',
        'Frequência irregular: 3–4 posts/mês, abaixo do benchmark do segmento',
      ]
    },
    {
      icon: Zap,
      title: 'O GANCHO',
      type: 'text' as const,
      content: '"Vi que a Andrade atende empresas de médio porte com alto volume fiscal — mas o perfil de vocês não mostra os resultados que entregam. Em 10s no IG, o cliente não sabe o que vocês resolvem. Tenho uma proposta específica para isso."'
    },
    {
      icon: Star,
      title: 'OPORTUNIDADE DE ABORDAGEM',
      type: 'text' as const,
      content: 'Abertura ideal: referir-se a um post específico recente sobre obrigações fiscais Q1. Mostrar como a Andrade pode monetizar sua autoridade técnica transformando seguidores técnicos em prospects qualificados — argumento direto ao C-level.'
    },
  ]
};

/* ─── Website analysis data ──────────────── */
const siteAnalysis = {
  url: 'andrade.com.br',
  techScore: 72,
  convScore: 38,
  seoScore: 61,
  sections: [
    {
      icon: Eye,
      title: 'POSICIONAMENTO',
      type: 'text' as const,
      content: 'Site institucional completo e profissional, mas messaging genérico: "soluções contábeis completas para sua empresa". Não há diferencial competitivo claro nem segmento-alvo explícito. Empresas concorrentes comunicam de forma idêntica.'
    },
    {
      icon: Target,
      title: 'PROPOSTA DE VALOR',
      type: 'text' as const,
      content: 'Focada em "qualidade e experiência" — falta especificidade de resultados tangíveis. Não há menção a médio porte, volume de NF, economia tributária gerada ou certificações relevantes. O visitante não sente que o escritório foi feito para ele.'
    },
    {
      icon: AlertTriangle,
      title: 'GARGALOS DE CONVERSÃO',
      type: 'list' as const,
      content: [
        'Sem formulário ou CTA acima da dobra — visitante sai sem deixar contato',
        'Nenhum caso de sucesso, depoimento ou resultado concreto na homepage',
        'Blog vazio / sem conteúdo desde 2023 — sinal negativo para SEO e autoridade',
        'Tempo de carregamento: 4,2s (mobile) — acima do threshold de conversão',
        'Sem chat ou WhatsApp widget — barreira de atrito alta para contato',
      ]
    },
    {
      icon: Zap,
      title: 'ABORDAGEM RECOMENDADA',
      type: 'text' as const,
      content: '"Como sua contabilidade está posicionada para atrair empresas de médio porte?" — a lacuna entre a qualidade real da Andrade e o que o site comunica é o gancho ideal. Mostrar que o site atual filtra leads em vez de atraí-los.'
    },
  ]
};

/* ════════════════════ TAB COMPONENTS ══════ */

function TabGeral() {
  const bantScore = Math.round((bantItems.filter(b=>b.status==='confirmado').length/bantItems.length)*100);
  const aiScore = 78;

  return (
    <div className="grid grid-cols-2 gap-4">

      {/* ◇ IA Score + Next action */}
      <div className="col-span-2">
        <div className="bg-[#FEF5F2] border border-[var(--color-accent)]/25 rounded-[10px] p-4">
          <div className="flex items-start gap-3">
            <span className="text-[var(--color-accent)] font-[800] text-[16px] leading-none mt-0.5 shrink-0">◇</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-[700] uppercase tracking-wider text-[var(--color-accent)]">IA · Análise do Lead</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[var(--color-text-tertiary)]">Score de fechamento</span>
                  <span className={`text-[13px] font-[800] font-mono px-2 py-0.5 rounded-full ${aiScore>=70?'bg-[var(--color-success-soft)] text-[var(--color-success)]':'bg-[var(--color-warning-soft)] text-[var(--color-warning)]'}`}>{aiScore}/100</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mb-3">
                {[
                  { label:'Emails abertos', val:'4/5',  score:80 },
                  { label:'Links clicados', val:'2',    score:60 },
                  { label:'Reuniões',        val:'2',   score:75 },
                  { label:'WhatsApp resp.', val:'3/3',  score:100 },
                ].map(e=>(
                  <div key={e.label}>
                    <div className="flex justify-between text-[10px] mb-0.5"><span className="text-[var(--color-text-tertiary)]">{e.label}</span><span className="font-mono font-[600]">{e.val}</span></div>
                    <div className="h-[3px] bg-[var(--color-accent)]/15 rounded-full overflow-hidden"><div className="h-full rounded-full bg-[var(--color-accent)]" style={{width:`${e.score}%`}} /></div>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-start gap-2 text-[12px] text-[var(--color-text-primary)]"><TrendingUp size={12} className="text-[var(--color-success)] mt-0.5 shrink-0" />Budget confirmado + alta responsividade. Probabilidade de fechar: <span className="font-mono font-[700] ml-1">72%</span></div>
                  <div className="flex items-start gap-2 text-[12px] text-[var(--color-text-primary)]"><AlertTriangle size={12} className="text-[var(--color-warning)] mt-0.5 shrink-0" />Cargo não é decisor final — envolver CEO antes de fechar</div>
                </div>
                <div className="border border-[var(--color-accent)]/30 bg-white/70 rounded-[8px] px-3 py-2.5 flex items-center gap-2.5 min-w-[280px]">
                  <Star size={12} className="text-[var(--color-accent)] shrink-0" />
                  <div className="flex-1"><div className="text-[9px] font-[700] text-[var(--color-accent)] uppercase tracking-wider mb-0.5">Próxima melhor ação</div><div className="text-[11px] font-[600] text-[var(--color-text-primary)]">Enviar proposta revisada hoje com 8% de desconto e cláusula IPCA</div></div>
                  <button className="shrink-0 h-[24px] px-2.5 bg-[var(--color-accent)] text-white text-[10px] font-[700] rounded-[5px] hover:bg-[var(--color-accent-hover)] whitespace-nowrap">Criar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BANT */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <Label>Qualificação BANT</Label>
          <span className="text-[11px] font-mono font-[700] px-2 py-0.5 rounded-full bg-[var(--color-success-soft)] text-[var(--color-success)] ml-auto">{bantScore}%</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {bantItems.map(b=>(
            <div key={b.letter} className="flex items-start gap-2.5">
              <div className={`w-[20px] h-[20px] rounded-full flex items-center justify-center text-[9px] font-[800] shrink-0 ${b.status==='confirmado'?'bg-[var(--color-success-soft)] text-[var(--color-success)]':b.status==='parcial'?'bg-[var(--color-warning-soft)] text-[var(--color-warning)]':'bg-[var(--color-subtle)] text-[var(--color-text-tertiary)]'}`}>{b.letter}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5"><span className="text-[11px] font-[600] text-[var(--color-text-secondary)]">{b.label}</span><BantPill status={b.status} /></div>
                <div className="text-[11px] text-[var(--color-text-tertiary)]">{b.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Deal summary */}
      <Card>
        <Label>Negócio · {deal.dealName}</Label>
        <div className="flex items-center gap-0 mb-4">
          {deal.stages.map((s,i)=>{
            const done=i<deal.stageIdx, active=i===deal.stageIdx;
            return (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-1 min-w-0">
                  <div className={`w-[7px] h-[7px] rounded-full ${done?'bg-[var(--color-success)]':active?'bg-[var(--color-accent)] ring-[3px] ring-[var(--color-accent)]/20':'bg-[var(--color-border-strong)]'}`} />
                  <span className={`text-[9px] whitespace-nowrap font-[${active?'700':'400'}] ${active?'text-[var(--color-accent)]':done?'text-[var(--color-success)]':'text-[var(--color-text-tertiary)]'}`}>{s}</span>
                </div>
                {i<deal.stages.length-1&&<div className={`flex-1 h-[2px] mb-3 mx-0.5 ${i<deal.stageIdx?'bg-[var(--color-success)]':'bg-[var(--color-border)]'}`}/>}
              </React.Fragment>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label:'Valor',             val:R$(deal.value),     mono:true  },
            { label:'Probabilidade',     val:`${deal.prob}%`,    mono:true  },
            { label:'Forecast',          val:deal.forecast,      mono:false },
            { label:'Dias nesta etapa',  val:`${deal.daysInStage}d`, mono:true },
          ].map(f=>(
            <div key={f.label}>
              <div className="text-[10px] font-[600] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-0.5">{f.label}</div>
              <div className={`text-[14px] font-[700] text-[var(--color-text-primary)] ${f.mono?'font-mono':''}`}>{f.val}</div>
            </div>
          ))}
        </div>
        <button className="mt-3 w-full h-[28px] border border-[var(--color-border-strong)] rounded-[7px] text-[11px] font-[600] text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] transition-colors flex items-center justify-center gap-1">
          Avançar para Negociação <ChevronRight size={11} />
        </button>
      </Card>

      {/* Recent activity */}
      <div className="col-span-2">
        <Card>
          <div className="flex items-center justify-between mb-3"><Label>Atividades Recentes</Label><button className="text-[11px] font-[500] text-[var(--color-accent)]">Ver todas →</button></div>
          <div className="flex flex-col gap-0">
            {timeline.slice(0,4).map((a,i)=>{
              const meta=actMeta[a.type]; const Icon=meta.icon;
              return (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-[var(--color-border)] last:border-0">
                  <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center shrink-0 ${meta.bg}`}><Icon size={10} className={meta.color} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2"><span className="text-[12px] font-[500] text-[var(--color-text-primary)]">{a.title}</span>{a.future&&<span className="text-[9px] font-[700] uppercase tracking-wider text-[var(--color-warning)] bg-[var(--color-warning-soft)] px-1.5 py-0.5 rounded-full">Agendado</span>}</div>
                    <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">{a.desc}</div>
                  </div>
                  <div className="text-[10px] font-mono text-[var(--color-text-tertiary)] shrink-0 mt-0.5">{a.date}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
function TabAnalise() {
  const [subTab, setSubTab] = useState<AnaliseSubTab>('instagram');
  const [mode, setMode] = useState<'resumo'|'completo'>('resumo');

  const data = subTab === 'instagram' ? instaAnalysis : null;
  const site = subTab === 'site' ? siteAnalysis : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Sub-tab selector */}
      <div className="flex items-center gap-3">
        <div className="flex bg-[var(--color-subtle)] border border-[var(--color-border-strong)] rounded-[8px] p-1 gap-0.5">
          <button onClick={()=>setSubTab('instagram')} className={`h-[30px] px-4 text-[12px] font-[600] rounded-[6px] flex items-center gap-1.5 transition-all ${subTab==='instagram'?'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] text-[var(--color-text-primary)]':'text-[var(--color-text-tertiary)]'}`}>
            <Instagram size={13} /> Instagram
          </button>
          <button onClick={()=>setSubTab('site')} className={`h-[30px] px-4 text-[12px] font-[600] rounded-[6px] flex items-center gap-1.5 transition-all ${subTab==='site'?'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] text-[var(--color-text-primary)]':'text-[var(--color-text-tertiary)]'}`}>
            <Globe size={13} /> Site
          </button>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[12px] text-[var(--color-text-tertiary)]">Resumo</span>
          <button onClick={()=>setMode(m=>m==='resumo'?'completo':'resumo')}
            className={`relative w-[36px] h-[20px] rounded-full transition-colors ${mode==='completo'?'bg-[var(--color-accent)]':'bg-[var(--color-border-strong)]'}`}>
            <span className={`absolute top-[2px] w-[16px] h-[16px] bg-white rounded-full shadow transition-all ${mode==='completo'?'left-[18px]':'left-[2px]'}`} />
          </button>
          <span className="text-[12px] text-[var(--color-text-tertiary)]">Completo</span>
        </div>
        <button className="h-[32px] px-3 border border-[var(--color-border-strong)] rounded-[7px] text-[11px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center gap-1.5 transition-colors">
          <RefreshCw size={11} /> Reanalisar com IA
        </button>
      </div>

      {subTab === 'instagram' && (
        <>
          {/* Instagram header stats */}
          <div className="bg-gradient-to-r from-[#fdf2f8] to-[#fef5f2] border border-[#f9a8d4]/30 rounded-[10px] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-br from-[#f97316] to-[#db2777] flex items-center justify-center">
                  <Instagram size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-[14px] font-[700] text-[var(--color-text-primary)]">{instaAnalysis.handle}</div>
                  <div className="text-[11px] text-[var(--color-text-tertiary)]">andrade.com.br · Última análise: hoje</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-[600] bg-[var(--color-success-soft)] text-[var(--color-success)] px-2.5 py-1 rounded-full">
                <div className="w-[5px] h-[5px] rounded-full bg-[var(--color-success)]" /> Perfil público detectado
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label:'Seguidores', val:instaAnalysis.seguidores },
                { label:'Posts', val:instaAnalysis.posts },
                { label:'Engajamento', val:instaAnalysis.engajamento },
              ].map(s=>(
                <div key={s.label} className="text-center">
                  <div className="text-[18px] font-[800] font-mono text-[var(--color-text-primary)]">{s.val}</div>
                  <div className="text-[10px] text-[var(--color-text-tertiary)]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis sections */}
          <div className="flex flex-col gap-3">
            {instaAnalysis.sections.map((sec, i) => {
              if (mode === 'resumo' && i >= 3) return null;
              const Icon = sec.icon;
              return (
                <Card key={sec.title}>
                  <div className="flex items-start gap-3">
                    <div className="w-[32px] h-[32px] rounded-[8px] bg-[var(--color-accent-soft)] flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-[var(--color-accent)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)] mb-1.5">{sec.title}</div>
                      {sec.type === 'text' ? (
                        <p className="text-[13px] text-[var(--color-text-primary)] leading-relaxed">{sec.content as string}</p>
                      ) : (
                        <ul className="flex flex-col gap-1.5">
                          {(sec.content as string[]).map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-[12px] text-[var(--color-text-primary)]">
                              <div className="w-[5px] h-[5px] rounded-full bg-[var(--color-accent)] shrink-0 mt-[5px]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {mode === 'resumo' && (
            <button onClick={()=>setMode('completo')} className="w-full h-[36px] border border-[var(--color-border-strong)] rounded-[8px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors flex items-center justify-center gap-1.5">
              Ver análise completa <ChevronRight size={13} />
            </button>
          )}
        </>
      )}

      {subTab === 'site' && (
        <>
          {/* Site header */}
          <div className="bg-gradient-to-r from-[#eff6ff] to-[#f0fdf4] border border-[#93c5fd]/30 rounded-[10px] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-full bg-[#1d4ed8] flex items-center justify-center">
                  <Globe size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-[14px] font-[700] text-[var(--color-text-primary)]">{siteAnalysis.url}</div>
                  <div className="text-[11px] text-[var(--color-text-tertiary)]">Site ativo · Última análise: hoje</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label:'Score técnico', val:`${siteAnalysis.techScore}/100`, color:siteAnalysis.techScore>=70?'text-[var(--color-success)]':'text-[var(--color-warning)]' },
                { label:'Score conversão', val:`${siteAnalysis.convScore}/100`, color:siteAnalysis.convScore>=50?'text-[var(--color-success)]':'text-[var(--color-danger)]' },
                { label:'Score SEO', val:`${siteAnalysis.seoScore}/100`, color:siteAnalysis.seoScore>=70?'text-[var(--color-success)]':'text-[var(--color-warning)]' },
              ].map(s=>(
                <div key={s.label} className="text-center">
                  <div className={`text-[18px] font-[800] font-mono ${s.color}`}>{s.val}</div>
                  <div className="text-[10px] text-[var(--color-text-tertiary)]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Site analysis sections */}
          <div className="flex flex-col gap-3">
            {siteAnalysis.sections.map((sec, i) => {
              if (mode === 'resumo' && i >= 3) return null;
              const Icon = sec.icon;
              return (
                <Card key={sec.title}>
                  <div className="flex items-start gap-3">
                    <div className="w-[32px] h-[32px] rounded-[8px] bg-[#eff6ff] flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-[#1d4ed8]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-[700] uppercase tracking-[0.07em] text-[var(--color-text-tertiary)] mb-1.5">{sec.title}</div>
                      {sec.type === 'text' ? (
                        <p className="text-[13px] text-[var(--color-text-primary)] leading-relaxed">{sec.content as string}</p>
                      ) : (
                        <ul className="flex flex-col gap-1.5">
                          {(sec.content as string[]).map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-[12px] text-[var(--color-text-primary)]">
                              <div className="w-[5px] h-[5px] rounded-full bg-[#1d4ed8] shrink-0 mt-[5px]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────── */
function TabPipeline() {
  return (
    <div className="flex flex-col gap-4">
      {/* Deal progress */}
      <Card>
        <Label>Negócio · {deal.dealName}</Label>
        <div className="flex items-center gap-0 mb-5">
          {deal.stages.map((s,i)=>{
            const done=i<deal.stageIdx, active=i===deal.stageIdx;
            return (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-1 min-w-0">
                  <div className={`w-[9px] h-[9px] rounded-full ${done?'bg-[var(--color-success)]':active?'bg-[var(--color-accent)] ring-4 ring-[var(--color-accent)]/20':'bg-[var(--color-border-strong)]'}`} />
                  <span className={`text-[10px] whitespace-nowrap font-[${active?'700':'400'}] ${active?'text-[var(--color-accent)]':done?'text-[var(--color-success)]':'text-[var(--color-text-tertiary)]'}`}>{s}</span>
                </div>
                {i<deal.stages.length-1&&<div className={`flex-1 h-[2px] mb-4 mx-1 ${i<deal.stageIdx?'bg-[var(--color-success)]':'bg-[var(--color-border)]'}`}/>}
              </React.Fragment>
            );
          })}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label:'Valor do deal',    val:R$(deal.value),         mono:true  },
            { label:'Probabilidade',    val:`${deal.prob}%`,        mono:true  },
            { label:'Forecast',         val:deal.forecast,          mono:false },
            { label:'Dias nesta etapa', val:`${deal.daysInStage}d`, mono:true, warn:deal.daysInStage>14 },
          ].map(f=>(
            <div key={f.label}>
              <div className="text-[10px] font-[600] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-1">{f.label}</div>
              <div className={`text-[18px] font-[700] ${f.mono?'font-mono':''} ${(f as any).warn?'text-[var(--color-warning)]':'text-[var(--color-text-primary)]'}`}>{f.val}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 h-[32px] bg-[var(--color-accent)] text-white text-[12px] font-[600] rounded-[7px] hover:bg-[var(--color-accent-hover)] flex items-center justify-center gap-1.5 transition-colors">Avançar para Negociação <ChevronRight size={12} /></button>
          <button className="h-[32px] px-3 border border-[var(--color-border-strong)] rounded-[7px] text-[11px] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center gap-1.5 transition-colors"><Edit3 size={12} /> Editar deal</button>
        </div>
      </Card>

      {/* Proposals */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Propostas Vinculadas</Label>
          <button className="h-[26px] px-3 bg-[var(--color-accent)] text-white text-[10px] font-[700] rounded-[6px] flex items-center gap-1 hover:bg-[var(--color-accent-hover)] transition-colors"><Plus size={10} /> Nova proposta</button>
        </div>
        <div className="flex flex-col gap-3">
          {proposals.map(p=>(
            <Card key={p.id} className="hover:bg-[var(--color-subtle)] cursor-pointer transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-[var(--color-text-tertiary)]">{p.id}</span>
                    <span className={`text-[10px] font-[600] px-1.5 py-0.5 rounded-full ${propBadge[p.status].cls}`}>{propBadge[p.status].label}</span>
                    <span className="text-[10px] text-[var(--color-text-tertiary)]">· vista {p.viewCount}×</span>
                  </div>
                  <div className="text-[13px] font-[600] text-[var(--color-text-primary)] mb-2">{p.name}</div>
                  <div className="flex items-center gap-4 text-[10px] text-[var(--color-text-tertiary)]">
                    <span className="flex items-center gap-1"><Send size={9} /> Enviada: {p.sent}</span>
                    <span className={`flex items-center gap-1 ${p.status==='enviada'?'text-[var(--color-warning)] font-[600]':''}`}><Clock size={9} /> Expira: {p.expires}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[18px] font-[700] font-mono text-[var(--color-text-primary)]">{R$(p.value)}</div>
                  <button className="text-[11px] font-[500] text-[var(--color-accent)] mt-1 flex items-center gap-1 ml-auto">Ver <ExternalLink size={10} /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
function TabAtividades() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label>Timeline completa — {timeline.length} eventos</Label>
        <button className="h-[28px] px-3 bg-[var(--color-accent)] text-white text-[11px] font-[600] rounded-[6px] flex items-center gap-1.5 hover:bg-[var(--color-accent-hover)] transition-colors"><Plus size={11} /> Nova atividade</button>
      </div>
      <Card>
        <div className="relative flex flex-col gap-0">
          <div className="absolute left-[13px] top-[8px] bottom-[8px] w-[1px] bg-[var(--color-border)]" />
          {timeline.map((a,i)=>{
            const meta=actMeta[a.type]; const Icon=meta.icon;
            return (
              <div key={i} className="relative flex items-start gap-3 py-3 border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-subtle)] -mx-4 px-4 transition-colors cursor-pointer">
                <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center shrink-0 z-10 ${meta.bg} ${a.future?'ring-2 ring-offset-1 ring-[var(--color-border-strong)]':''}`}><Icon size={10} className={meta.color} /></div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2 mb-0.5">
                    {a.future&&<span className="text-[9px] font-[700] uppercase tracking-wider text-[var(--color-warning)] bg-[var(--color-warning-soft)] px-1.5 py-0.5 rounded-full">Agendado</span>}
                    <span className="text-[12px] font-[600] text-[var(--color-text-primary)]">{a.title}</span>
                  </div>
                  <div className="text-[11px] text-[var(--color-text-tertiary)]">{a.desc}</div>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-[var(--color-text-tertiary)]"><Clock size={8}/> {a.date} · <User size={8}/> {a.by}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────── */
function TabNotas() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label>Notas — {notes.length} registros</Label>
        <button onClick={()=>setOpen(n=>!n)} className="h-[28px] px-3 bg-[var(--color-accent)] text-white text-[11px] font-[600] rounded-[6px] flex items-center gap-1.5 hover:bg-[var(--color-accent-hover)] transition-colors"><Plus size={11}/> Adicionar nota</button>
      </div>
      {open&&(
        <Card>
          <textarea className="w-full border border-[var(--color-border-strong)] rounded-[8px] p-3 text-[13px] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)] bg-white" rows={3} placeholder="Escreva uma nota..." />
          <div className="flex justify-end gap-2 mt-2">
            <button onClick={()=>setOpen(false)} className="h-[28px] px-3 text-[11px] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] rounded-[6px]">Cancelar</button>
            <button className="h-[28px] px-3 bg-[var(--color-accent)] text-white text-[11px] font-[600] rounded-[6px] hover:bg-[var(--color-accent-hover)]">Salvar nota</button>
          </div>
        </Card>
      )}
      <div className="flex flex-col gap-3">
        {notes.map((n,i)=>(
          <Card key={i} className="border-l-[3px] border-l-[var(--color-accent)] rounded-l-none">
            <p className="text-[13px] text-[var(--color-text-primary)] leading-relaxed italic mb-2">{n.text}</p>
            <div className="text-[10px] text-[var(--color-text-tertiary)] font-mono">{n.date} · {n.author}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ */
export default function ContactPanel() {
  const { back, navigate } = useNav();
  const [tab, setTab] = useState<Tab>('geral');

  const tabs: { id: Tab; label: string; icon: React.FC<{size:number;className?:string}> }[] = [
    { id:'geral',      label:'Visão Geral',      icon: BarChart2  },
    { id:'analise',    label:'◇ Análise Digital', icon: Activity   },
    { id:'pipeline',   label:'Pipeline',          icon: Target     },
    { id:'atividades', label:'Atividades',         icon: Clock      },
    { id:'notas',      label:'Notas',              icon: Edit3      },
  ];

  return (
    <div className="flex h-screen bg-[#F7F7F5] overflow-hidden" style={{ fontFamily: 'var(--font-ui, "Inter Tight", Inter, sans-serif)' }}>

      {/* ── Left sidebar ── */}
      <div className="w-[260px] bg-white border-r border-[var(--color-border)] flex flex-col shrink-0 overflow-y-auto">

        {/* Top bar */}
        <div className="h-[44px] border-b border-[var(--color-border)] px-4 flex items-center justify-between shrink-0">
          <button onClick={() => back()} className="flex items-center gap-1.5 text-[11px] font-[500] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"><ArrowLeft size={13} /> Voltar</button>
          <button className="w-[26px] h-[26px] flex items-center justify-center rounded-[6px] hover:bg-[var(--color-subtle)] text-[var(--color-text-tertiary)]"><X size={14}/></button>
        </div>

        {/* Identity */}
        <div className="px-5 pt-5 pb-4 border-b border-[var(--color-border)]">
          <div className="flex flex-col items-center text-center mb-4">
            <div className="w-[60px] h-[60px] rounded-full bg-[#1e40af] flex items-center justify-center text-white text-[20px] font-[700] mb-3">MO</div>
            <h2 className="text-[16px] font-[700] text-[var(--color-text-primary)] tracking-[-0.01em]">Marina Oliveira</h2>
            <div className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">Diretora Financeira</div>
            <div className="flex items-center gap-1 text-[12px] text-[var(--color-accent)] font-[600] mt-1 cursor-pointer"><Building2 size={11}/> Andrade Contábil</div>
          </div>
          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-2">
            <button className="h-[30px] flex items-center justify-center gap-1.5 text-[11px] font-[600] border border-[var(--color-border-strong)] rounded-[7px] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors"><Mail size={11}/> E-mail</button>
            <button className="h-[30px] flex items-center justify-center gap-1.5 text-[11px] font-[600] border border-[var(--color-border-strong)] rounded-[7px] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors"><Phone size={11}/> Ligar</button>
            <button className="h-[30px] flex items-center justify-center gap-1.5 text-[11px] font-[600] bg-[#dcfce7] border border-[#16A34A]/30 rounded-[7px] text-[#16A34A] hover:bg-[#bbf7d0] transition-colors"><MessageCircle size={11}/> WhatsApp</button>
            <button className="h-[30px] flex items-center justify-center gap-1.5 text-[11px] font-[600] bg-[var(--color-accent)] border border-[var(--color-accent)] rounded-[7px] text-white hover:bg-[var(--color-accent-hover)] transition-colors"><Calendar size={11}/> Agendar</button>
          </div>
        </div>

        {/* AI score compact */}
        <div className="px-5 py-4 border-b border-[var(--color-border)] bg-[#FEF5F2]/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-[700] uppercase tracking-wider text-[var(--color-accent)]">◇ Score IA</span>
            <span className="text-[13px] font-[800] font-mono text-[var(--color-success)]">78/100</span>
          </div>
          <div className="h-[5px] bg-[var(--color-accent)]/15 rounded-full overflow-hidden mb-2"><div className="h-full rounded-full bg-[var(--color-accent)]" style={{width:'78%'}}/></div>
          <div className="text-[11px] text-[var(--color-text-secondary)] leading-snug">Alta probabilidade de fechamento · Envolver CEO antes de fechar</div>
        </div>

        {/* Key info */}
        <div className="px-5 py-4 flex flex-col gap-3">
          {[
            { label:'Email',         val:'marina@andrade.com.br' },
            { label:'Telefone',      val:'(11) 98423-1122' },
            { label:'Responsável',   val:'Ana Beatriz' },
            { label:'Segmento',      val:'Contabilidade · Médio porte' },
            { label:'Receita anual', val:R$(2400000), mono:true },
            { label:'Funcionários',  val:'80–150' },
            { label:'Cidade',        val:'São Paulo, SP' },
            { label:'Origem',        val:'Indicação — Carlos Mendes' },
            { label:'Criado em',     val:'28 Jan 2025' },
          ].map(f=>(
            <div key={f.label}>
              <div className="text-[10px] font-[600] uppercase tracking-wider text-[var(--color-text-tertiary)]">{f.label}</div>
              <div className={`text-[12px] font-[500] mt-0.5 text-[var(--color-text-primary)] ${(f as any).mono?'font-mono':''} break-all`}>{f.val}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-auto border-t border-[var(--color-border)] p-4">
          <button className="w-full h-[34px] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[12px] font-[700] rounded-[8px] flex items-center justify-center gap-2 transition-colors">
            <Send size={13}/> Enviar Proposta Revisada
          </button>
        </div>
      </div>

      {/* ── Right: tabs + content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Tab bar */}
        <div className="bg-white border-b border-[var(--color-border)] px-6 flex items-center gap-1 h-[44px] shrink-0">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={()=>setTab(t.id)}
                className={`h-[34px] px-4 flex items-center gap-1.5 text-[12px] font-[600] rounded-[7px] transition-all whitespace-nowrap ${tab===t.id?'bg-[var(--color-accent-soft)] text-[var(--color-accent)]':'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]'}`}>
                <Icon size={12} className={tab===t.id?'text-[var(--color-accent)]':''} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'geral'      && <TabGeral />}
          {tab === 'analise'    && <TabAnalise />}
          {tab === 'pipeline'   && <TabPipeline />}
          {tab === 'atividades' && <TabAtividades />}
          {tab === 'notas'      && <TabNotas />}
        </div>
      </div>
    </div>
  );
}
