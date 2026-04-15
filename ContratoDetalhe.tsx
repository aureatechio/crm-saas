import React, { useState } from 'react';
import {
  ChevronRight, CheckCircle2, Clock, Download, Send,
  Share2, MoreHorizontal, RefreshCw, ExternalLink,
  Shield, AlertTriangle, FileText, Link2, Building2,
  CalendarDays, RotateCcw, TrendingUp, ChevronDown, X
} from 'lucide-react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';

const fmt = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(v);

const parcelas = [
  { n: 1,  due: '12/05/2025', paid: '10/05/2025', status: 'pago' },
  { n: 2,  due: '12/06/2025', paid: '11/06/2025', status: 'pago' },
  { n: 3,  due: '12/07/2025', paid: null,          status: 'pendente' },
  { n: 4,  due: '12/08/2025', paid: null,          status: 'pendente' },
  { n: 5,  due: '12/09/2025', paid: null,          status: 'futuro' },
  { n: 6,  due: '12/10/2025', paid: null,          status: 'futuro' },
];

const auditLog = [
  { ts: '2025-04-14 11:23:07', color: '#16A34A', label: 'Assinado — Ana Beatriz (Contratada)' },
  { ts: '2025-04-14 10:47:33', color: '#D97706', label: 'Visualizado — Roberto Ferreira (link único)' },
  { ts: '2025-04-14 10:31:22', color: '#0891B2', label: 'Enviado para assinatura — por Ana Beatriz' },
  { ts: '2025-04-12 09:15:04', color: '#A8A29E', label: 'Contrato criado — da proposta #2024-047' },
];

export default function ContratoDetalhe() {
  const [reminderSent, setReminderSent] = useState(false);
  const [scheduleExpanded, setScheduleExpanded] = useState(false);

  return (
    <AppLayout currentPage="contratos">
      <div className="flex flex-col h-full font-[var(--font-ui)]">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-1 text-[12px] text-[var(--color-text-tertiary)] mb-2">
              <span className="hover:text-[var(--color-text-secondary)] cursor-pointer transition-colors">Contratos</span>
              <ChevronRight size={12} />
              <span>CT-2024-047</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-[20px] font-[600] text-[var(--color-text-primary)] tracking-[-0.015em]">
                Assessoria Tributária Completa
              </h1>
              <span className="px-2.5 py-1 bg-[var(--color-warning-soft)] text-[var(--color-warning)] text-[12px] font-[500] rounded-full">
                Pendente assinatura
              </span>
              <span className="font-mono text-[14px] font-[600] text-[var(--color-text-primary)] border-l border-[var(--color-border)] pl-3">
                {fmt(34500)}
              </span>
              <span className="text-[13px] text-[var(--color-text-secondary)]">Metalúrgica RJ</span>
            </div>
            <div className="text-[12px] text-[var(--color-text-tertiary)] mt-1 font-mono">#CT-2024-047</div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="h-[36px] px-3 border border-[var(--color-border-strong)] rounded-[8px] text-[13px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors flex items-center gap-1.5">
              <Download size={14} /> PDF
            </button>
            <button className="h-[36px] px-3 border border-[var(--color-border-strong)] rounded-[8px] text-[13px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors flex items-center gap-1.5">
              <Share2 size={14} /> Compartilhar
            </button>
            <button className="h-[36px] px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-[8px] text-[13px] font-[500] transition-colors shadow-sm flex items-center gap-1.5">
              <Send size={14} /> Cobrar assinatura
            </button>
            <button className="w-[36px] h-[36px] border border-[var(--color-border-strong)] rounded-[8px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:bg-[var(--color-subtle)] transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex gap-5 flex-1 items-start overflow-hidden">

          {/* ── LEFT — Contract Document ── */}
          <div className="flex-1 bg-white border border-[var(--color-border)] rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-y-auto h-full">
            <div className="p-[44px]">

              {/* Document header */}
              <div className="text-center mb-8">
                <div className="text-[10px] uppercase tracking-[0.18em] font-[600] text-[var(--color-text-tertiary)] mb-3">
                  Contrato de Prestação de Serviços
                </div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-[24px] h-[24px] rounded-[5px] bg-[var(--color-accent)] flex items-center justify-center text-white text-[10px] font-[700]">CA</div>
                  <div className="text-[17px] font-[700] text-[var(--color-text-primary)] tracking-[-0.01em]">Andrade Contábil</div>
                </div>
                <div className="text-[11px] font-mono text-[var(--color-text-tertiary)]">CNPJ: 12.345.678/0001-90</div>
              </div>

              <div className="h-[1px] bg-[var(--color-border)] mb-8" />

              {/* Partes */}
              <div className="mb-7">
                <div className="text-[12px] font-[700] text-[var(--color-text-primary)] uppercase tracking-wider mb-4">Entre as partes</div>
                <div className="flex flex-col gap-3 pl-4 border-l-2 border-[var(--color-border)]">
                  <div className="flex gap-3">
                    <span className="text-[10px] uppercase font-[700] text-[var(--color-text-tertiary)] tracking-wider pt-0.5 w-[76px] shrink-0">Contratante</span>
                    <div className="text-[13px] text-[var(--color-text-primary)] leading-[1.6]">
                      <span className="font-[600]">Metalúrgica RJ Indústria e Comércio Ltda.</span>
                      <span className="text-[var(--color-text-secondary)]">, inscrita no CNPJ 98.765.432/0001-55, com sede à Rua Industrial, 1.200 — Nova Iguaçu/RJ, representada por Roberto Ferreira, CFO.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[10px] uppercase font-[700] text-[var(--color-text-tertiary)] tracking-wider pt-0.5 w-[76px] shrink-0">Contratada</span>
                    <div className="text-[13px] text-[var(--color-text-primary)] leading-[1.6]">
                      <span className="font-[600]">Andrade Contábil Assessoria Tributária Ltda.</span>
                      <span className="text-[var(--color-text-secondary)]">, inscrita no CNPJ 12.345.678/0001-90, com sede à Av. Rio Branco, 156 — Centro/RJ, representada por Ana Beatriz, Sócia.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cláusula 1 */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[10px] font-[700] text-[var(--color-text-tertiary)] uppercase tracking-wider">Cláusula 1</span>
                  <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">Objeto</div>
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-[1.75] pl-4">
                  O presente contrato tem como objeto a prestação de serviços de assessoria tributária e fiscal, contemplando: (i) revisão mensal de obrigações acessórias; (ii) planejamento tributário anual; (iii) acompanhamento de autuações fiscais; (iv) elaboração de pareceres tributários; e (v) treinamento da equipe financeira da Contratante, conforme escopo detalhado no Anexo I.
                </p>
              </div>

              {/* Cláusula 2 */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[10px] font-[700] text-[var(--color-text-tertiary)] uppercase tracking-wider">Cláusula 2</span>
                  <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">Prazo de Vigência</div>
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-[1.75] pl-4">
                  O presente contrato tem vigência de <span className="font-[600] text-[var(--color-text-primary)]">12 (doze) meses</span>, com início em <span className="font-mono text-[var(--color-text-primary)]">12/04/2025</span> e término em <span className="font-mono text-[var(--color-text-primary)]">11/04/2026</span>, renovando-se automaticamente por igual período caso nenhuma das partes manifeste, por escrito, intenção de não renovação com antecedência mínima de 30 dias.
                </p>
              </div>

              {/* Cláusula 3 */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[10px] font-[700] text-[var(--color-text-tertiary)] uppercase tracking-wider">Cláusula 3</span>
                  <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">Valor e Forma de Pagamento</div>
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-[1.75] pl-4">
                  Pelo serviços prestados, a Contratante pagará à Contratada o valor total de{' '}
                  <span className="font-mono font-[600] text-[var(--color-text-primary)]">{fmt(34500)}</span> (trinta e quatro mil e quinhentos reais), divididos em{' '}
                  <span className="font-[600] text-[var(--color-text-primary)]">12 parcelas mensais</span> de{' '}
                  <span className="font-mono font-[600] text-[var(--color-text-primary)]">{fmt(2875)}</span>, com vencimento todo dia 12 de cada mês, mediante boleto bancário ou PIX. Reajuste anual pelo IPCA apurado nos 12 meses anteriores ao vencimento da renovação.
                </p>
              </div>

              {/* Cláusula 4 */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[10px] font-[700] text-[var(--color-text-tertiary)] uppercase tracking-wider">Cláusula 4</span>
                  <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">Obrigações das Partes</div>
                </div>
                <div className="pl-4 flex flex-col gap-2">
                  <div>
                    <div className="text-[12px] font-[600] text-[var(--color-text-primary)] mb-1.5">Da Contratada:</div>
                    <ul className="flex flex-col gap-1">
                      {['Executar os serviços com qualidade técnica e nos prazos acordados.', 'Manter sigilo absoluto sobre informações confidenciais da Contratante.', 'Designar profissional responsável como ponto de contato.'].map(t => (
                        <li key={t} className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)] leading-[1.6]">
                          <span className="mt-[6px] w-[4px] h-[4px] rounded-full bg-[var(--color-text-tertiary)] shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-2">
                    <div className="text-[12px] font-[600] text-[var(--color-text-primary)] mb-1.5">Da Contratante:</div>
                    <ul className="flex flex-col gap-1">
                      {['Fornecer documentos e informações necessárias em até 5 dias úteis.', 'Efetuar os pagamentos nas datas de vencimento.', 'Comunicar alterações societárias ou fiscais em até 48 horas.'].map(t => (
                        <li key={t} className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)] leading-[1.6]">
                          <span className="mt-[6px] w-[4px] h-[4px] rounded-full bg-[var(--color-text-tertiary)] shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cláusula 5 */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[10px] font-[700] text-[var(--color-text-tertiary)] uppercase tracking-wider">Cláusula 5</span>
                  <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">Rescisão</div>
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-[1.75] pl-4">
                  Qualquer das partes poderá rescindir o presente contrato mediante notificação escrita com antecedência mínima de <span className="font-[600] text-[var(--color-text-primary)]">60 (sessenta) dias</span>. Em caso de rescisão imotivada pela Contratante antes do término do prazo, será devida multa equivalente a 2 (duas) mensalidades. A rescisão por justa causa (inadimplência superior a 30 dias) dispensa aviso prévio.
                </p>
              </div>

              {/* Cláusula 6 */}
              <div className="mb-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[10px] font-[700] text-[var(--color-text-tertiary)] uppercase tracking-wider">Cláusula 6</span>
                  <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">Foro</div>
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-[1.75] pl-4">
                  Fica eleito o Foro da Comarca do <span className="font-[600] text-[var(--color-text-primary)]">Rio de Janeiro/RJ</span>, com expressa renúncia a qualquer outro, por mais privilegiado que seja, para dirimir quaisquer questões oriundas do presente contrato.
                </p>
              </div>

              {/* Local e data */}
              <div className="text-center text-[13px] text-[var(--color-text-secondary)] mb-12 pb-8 border-b border-[var(--color-border)]">
                Rio de Janeiro, 12 de abril de 2025.
              </div>

              {/* Signature blocks */}
              <div className="flex justify-between gap-8">
                {/* Left — Contratante (Pending) */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full h-[72px] border-b border-dashed border-[var(--color-border-strong)] flex items-end justify-center pb-2 relative">
                    <div className="absolute top-1 right-0 flex items-center gap-1.5 text-[11px] text-[var(--color-warning)] bg-[var(--color-warning-soft)] px-2 py-0.5 rounded-full border border-[#D97706]/20">
                      <Clock size={10} /> Aguardando
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-[10px] uppercase font-[700] text-[var(--color-text-tertiary)] tracking-wider mb-1">Contratante</div>
                    <div className="text-[13px] font-[600] text-[var(--color-text-primary)]">Roberto Ferreira</div>
                    <div className="text-[12px] text-[var(--color-text-secondary)]">CFO — Metalúrgica RJ</div>
                    <div className="text-[11px] text-[var(--color-text-tertiary)] font-mono mt-1">CPF: 123.456.789-00</div>
                  </div>
                </div>

                {/* Right — Contratada (Signed) */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full h-[72px] border-b border-[var(--color-border-strong)] flex items-end justify-center pb-1 relative">
                    <div className="font-['Georgia',serif] text-[28px] text-[var(--color-accent)] opacity-70 leading-none italic">Ana Beatriz</div>
                    <div className="absolute top-1 right-0 flex items-center gap-1 text-[11px] text-[var(--color-success)] bg-[var(--color-success-soft)] px-2 py-0.5 rounded-full border border-[#16A34A]/20">
                      <CheckCircle2 size={10} /> Assinado
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-[10px] uppercase font-[700] text-[var(--color-text-tertiary)] tracking-wider mb-1">Contratada</div>
                    <div className="text-[13px] font-[600] text-[var(--color-text-primary)]">Ana Beatriz</div>
                    <div className="text-[12px] text-[var(--color-text-secondary)]">Sócia — Andrade Contábil</div>
                    <div className="text-[11px] text-[var(--color-text-tertiary)] font-mono mt-1">CPF: 987.654.321-00</div>
                  </div>
                </div>
              </div>

              {/* Signature metadata */}
              <div className="mt-8 pt-6 border-t border-dashed border-[var(--color-border)] flex flex-col gap-2">
                <div className="text-[10px] uppercase font-[600] text-[var(--color-text-tertiary)] tracking-wider mb-1">Registro de assinatura eletrônica</div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--color-text-tertiary)]">
                  <Shield size={11} className="text-[var(--color-success)] shrink-0" />
                  <span>Ana Beatriz · 14/04/2025 11:23:07 BRT · IP 189.34.72.xx · Chrome/Mac</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--color-text-tertiary)]">
                  <Clock size={11} className="text-[var(--color-warning)] shrink-0" />
                  <span>Roberto Ferreira · Aguardando · Link enviado em 14/04/2025 10:31 BRT</span>
                </div>
                <div className="mt-1.5 text-[10px] text-[var(--color-text-tertiary)] leading-[1.5]">
                  Hash do documento: <span className="font-mono">a3f8c2d1e9b4...</span> · Certificação ICP-Brasil classe A3
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="w-[320px] shrink-0 flex flex-col gap-4 overflow-y-auto h-full pb-2">

            {/* Card 1 — Informações */}
            <div className="bg-white border border-[var(--color-border)] rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.03)] p-4">
              <h3 className="text-[11px] uppercase font-[700] text-[var(--color-text-tertiary)] tracking-wider mb-4">Informações do contrato</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-[var(--color-text-secondary)] flex items-center gap-1.5"><CalendarDays size={12} /> Vigência</span>
                  <span className="text-[12px] font-[500] text-[var(--color-text-primary)] font-mono">12/04/25 → 11/04/26</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-[var(--color-text-secondary)] flex items-center gap-1.5"><RotateCcw size={12} /> Renovação</span>
                  <span className="text-[11px] font-[500] text-[var(--color-success)] bg-[var(--color-success-soft)] px-2 py-0.5 rounded-full">Automática</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-[var(--color-text-secondary)] flex items-center gap-1.5"><TrendingUp size={12} /> Reajuste</span>
                  <span className="text-[12px] font-[500] text-[var(--color-text-primary)]">IPCA anual</span>
                </div>
                <div className="h-[1px] bg-[var(--color-border)]" />
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-[var(--color-text-secondary)] flex items-center gap-1.5"><FileText size={12} /> Proposta</span>
                  <a className="text-[12px] font-[500] text-[var(--color-accent)] flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                    #2024-047 <ExternalLink size={10} />
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-[var(--color-text-secondary)] flex items-center gap-1.5"><Link2 size={12} /> Oportunidade</span>
                  <a className="text-[12px] font-[500] text-[var(--color-accent)] flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                    Metal RJ <ExternalLink size={10} />
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-[var(--color-text-secondary)] flex items-center gap-1.5"><Building2 size={12} /> Empresa</span>
                  <a className="text-[12px] font-[500] text-[var(--color-accent)] flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                    Metalúrgica RJ <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 — Signatários */}
            <div className="bg-white border border-[var(--color-border)] rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.03)] p-4">
              <h3 className="text-[11px] uppercase font-[700] text-[var(--color-text-tertiary)] tracking-wider mb-4">Signatários</h3>

              <div className="flex flex-col gap-4">
                {/* Signer 1 — Pending */}
                <div className="flex items-start gap-3">
                  <div className="w-[36px] h-[36px] rounded-full bg-[var(--color-subtle)] border border-[var(--color-border)] flex items-center justify-center font-[600] text-[13px] text-[var(--color-text-secondary)] shrink-0">R</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[13px] font-[600] text-[var(--color-text-primary)] truncate">Roberto Ferreira</div>
                      <span className="text-[10px] font-[500] text-[var(--color-warning)] bg-[var(--color-warning-soft)] px-1.5 py-0.5 rounded-full shrink-0 border border-[#D97706]/20">Aguardando</span>
                    </div>
                    <div className="text-[11px] text-[var(--color-text-secondary)]">CFO · Metalúrgica RJ</div>
                    <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">Enviado 14 Abr · link por e-mail</div>
                    <button
                      onClick={() => setReminderSent(true)}
                      className={`mt-2 h-[26px] px-2.5 rounded-[6px] text-[11px] font-[500] transition-colors flex items-center gap-1.5 border ${
                        reminderSent
                          ? 'bg-[var(--color-success-soft)] text-[var(--color-success)] border-[#16A34A]/20 cursor-default'
                          : 'border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]'
                      }`}
                    >
                      {reminderSent ? <><CheckCircle2 size={10} /> Lembrete enviado</> : <><RefreshCw size={10} /> Reenviar lembrete</>}
                    </button>
                  </div>
                </div>

                <div className="h-[1px] bg-[var(--color-border)] ml-[48px]" />

                {/* Signer 2 — Signed */}
                <div className="flex items-start gap-3">
                  <div className="w-[36px] h-[36px] rounded-full bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/20 flex items-center justify-center font-[600] text-[13px] text-[var(--color-accent)] shrink-0">A</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[13px] font-[600] text-[var(--color-text-primary)] truncate">Ana Beatriz</div>
                      <span className="text-[10px] font-[500] text-[var(--color-success)] bg-[var(--color-success-soft)] px-1.5 py-0.5 rounded-full shrink-0 border border-[#16A34A]/20 flex items-center gap-1"><CheckCircle2 size={9} /> Assinado</span>
                    </div>
                    <div className="text-[11px] text-[var(--color-text-secondary)]">Sócia · Andrade Contábil</div>
                    <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5 font-mono">14 Abr · 11:23 · IP 189.34.72.xx</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 — Cronograma */}
            <div className="bg-white border border-[var(--color-border)] rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.03)] p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[11px] uppercase font-[700] text-[var(--color-text-tertiary)] tracking-wider">Cronograma</h3>
                <span className="text-[11px] font-mono text-[var(--color-text-tertiary)]">2/12 pagas</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-[4px] bg-[var(--color-subtle)] rounded-full mb-4 overflow-hidden">
                <div className="h-full bg-[var(--color-success)] rounded-full" style={{ width: '16.67%' }} />
              </div>

              <div className="flex flex-col gap-0">
                {(scheduleExpanded ? parcelas : parcelas.slice(0, 4)).map((p, i) => (
                  <div key={p.n} className={`flex items-center justify-between py-2 ${i < (scheduleExpanded ? parcelas.length : 4) - 1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                    <div className="flex items-center gap-2.5">
                      <div className={`w-[6px] h-[6px] rounded-full shrink-0 ${
                        p.status === 'pago' ? 'bg-[var(--color-success)]' :
                        p.status === 'pendente' ? 'bg-[var(--color-warning)]' :
                        'bg-[var(--color-border-strong)]'
                      }`} />
                      <span className="text-[12px] font-mono text-[var(--color-text-secondary)]">Parcela {p.n}</span>
                      <span className="text-[11px] font-mono text-[var(--color-text-tertiary)]">{p.due}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-mono font-[500] text-[var(--color-text-primary)]">{fmt(2875)}</span>
                      <span className={`text-[10px] font-[500] px-1.5 py-0.5 rounded-full ${
                        p.status === 'pago' ? 'text-[var(--color-success)] bg-[var(--color-success-soft)]' :
                        p.status === 'pendente' ? 'text-[var(--color-warning)] bg-[var(--color-warning-soft)]' :
                        'text-[var(--color-text-tertiary)] bg-[var(--color-subtle)]'
                      }`}>
                        {p.status === 'pago' ? 'Paga' : p.status === 'pendente' ? 'Vence' : 'Futura'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setScheduleExpanded(v => !v)}
                className="mt-3 w-full text-[11px] font-[500] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors flex items-center justify-center gap-1"
              >
                {scheduleExpanded ? 'Ver menos' : 'Ver todas (12 parcelas)'}
                <ChevronDown size={11} className={`transition-transform ${scheduleExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Card 4 — ◇ Análise Axis */}
            <div className="bg-[var(--color-accent-soft)] border border-[rgba(232,93,47,0.2)] rounded-[10px] p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[15px] text-[var(--color-accent)] leading-none">◇</span>
                  <h3 className="text-[11px] uppercase font-[700] text-[var(--color-accent)] tracking-wider">Análise do contrato</h3>
                </div>
                <span className="text-[11px] font-[600] text-[var(--color-success)] bg-[var(--color-success-soft)] px-2 py-0.5 rounded-full border border-[#16A34A]/20">
                  Risco baixo
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                  <span className="text-[12px] text-[var(--color-text-secondary)] leading-[1.5]">Cláusulas de rescisão e foro dentro do padrão de mercado.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                  <span className="text-[12px] text-[var(--color-text-secondary)] leading-[1.5]">Prazo de pagamento compatível com o histórico do cliente.</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle size={12} className="text-[var(--color-warning)] shrink-0 mt-0.5" />
                  <span className="text-[12px] text-[var(--color-text-secondary)] leading-[1.5]">Ausência de cláusula de exclusividade — considere adicionar no próximo contrato.</span>
                </div>
              </div>
            </div>

            {/* Card 5 — Trilha de Auditoria */}
            <div className="bg-white border border-[var(--color-border)] rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.03)] p-4">
              <h3 className="text-[11px] uppercase font-[700] text-[var(--color-text-tertiary)] tracking-wider mb-4">Trilha de auditoria</h3>
              <div className="flex flex-col gap-3">
                {auditLog.map((e, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-[4px] leading-none shrink-0" style={{ color: e.color, fontSize: 10 }}>●</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-[var(--color-text-secondary)] leading-[1.5]">{e.label}</div>
                      <div className="text-[10px] font-mono text-[var(--color-text-tertiary)] mt-0.5">{e.ts}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
