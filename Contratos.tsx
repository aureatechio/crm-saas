import React from 'react';
import { ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';

export default function Contratos() {
  return (
    <AppLayout currentPage="contratos">
      <div className="flex flex-col h-full font-[var(--font-ui)]">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-1 text-[12px] text-[var(--color-text-tertiary)] mb-2">
            <span>Contratos</span> <ChevronRight size={12} />
            <span>CT-2024-047</span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-[20px] font-[600] text-[var(--color-text-primary)] tracking-[-0.015em]">Contrato #CT-2024-047</h1>
            <span className="px-2.5 py-1 bg-[var(--color-warning-soft)] text-[var(--color-warning)] text-[12px] font-[500] rounded-full">Pendente assinatura</span>
            <span className="font-mono text-[14px] font-[500] text-[var(--color-text-primary)] border-l border-[var(--color-border)] pl-4">R$ 34.500</span>
            <span className="text-[14px] text-[var(--color-text-secondary)]">Metalúrgica RJ</span>
          </div>
        </div>

        {/* Split Layout */}
        <div className="flex gap-6 h-full items-start">
          
          {/* Left (65%) - Document */}
          <div className="w-[65%] bg-white border border-[var(--color-border)] rounded-[8px] p-[40px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] h-fit">
            <div className="text-[11px] uppercase tracking-widest text-[var(--color-text-tertiary)] font-[600] mb-2 text-center">Contrato de Prestação de Serviços</div>
            <div className="text-[18px] font-[600] text-[var(--color-text-primary)] text-center mb-1">Contábil Andrade</div>
            <div className="text-[12px] font-mono text-[var(--color-text-secondary)] text-center mb-8">CNPJ: 12.345.678/0001-90</div>
            
            <div className="h-[1px] bg-[var(--color-border)] mb-8" />

            <div className="mb-6">
              <div className="text-[13px] font-[600] text-[var(--color-text-primary)] mb-4">Entre as partes:</div>
              <div className="flex flex-col gap-4 pl-4 border-l-2 border-[var(--color-border)] mb-8">
                <div>
                  <span className="text-[11px] uppercase font-[600] text-[var(--color-text-tertiary)] mr-2">Contratante:</span>
                  <span className="text-[13px] text-[var(--color-text-primary)]">Metalúrgica RJ Indústria e Comércio Ltda. | CNPJ: 98.765.432/0001-55 | Roberto Ferreira, CFO</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-[600] text-[var(--color-text-tertiary)] mr-2">Contratada:</span>
                  <span className="text-[13px] text-[var(--color-text-primary)]">Andrade Contábil Assessoria Tributária Ltda. | CNPJ: 12.345.678/0001-90 | Ana Beatriz, Sócia</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-[13px] font-[600] text-[var(--color-text-primary)] mb-2">Objeto</div>
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-[1.6]">
                O presente contrato tem como objeto a prestação de serviços de assessoria tributária e fiscal, contemplando a revisão de obrigações acessórias, planejamento tributário anual e acompanhamento de autuações...
              </p>
            </div>

            <div className="mb-12">
              <div className="text-[13px] font-[600] text-[var(--color-text-primary)] mb-2">Valor</div>
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-[1.6]">
                Pelo serviços prestados, a CONTRATANTE pagará à CONTRATADA o valor anual de <span className="font-mono font-[500] text-[var(--color-text-primary)]">R$ 34.500</span> (trinta e quatro mil e quinhentos reais), divididos em 12 parcelas mensais de <span className="font-mono font-[500] text-[var(--color-text-primary)]">R$ 2.875</span>.
              </p>
            </div>

            {/* Signatures */}
            <div className="flex justify-between gap-8 mt-16 pt-8">
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-[60px] border-b border-dashed border-[var(--color-border-strong)] flex items-end justify-center pb-2 relative">
                  <div className="absolute top-0 right-0 flex items-center gap-1 text-[11px] text-[var(--color-text-tertiary)] bg-[var(--color-canvas)] px-2 py-0.5 rounded border border-dashed border-[var(--color-border)]">
                    <Clock size={10} /> Pendente
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <div className="text-[11px] uppercase font-[600] text-[var(--color-text-tertiary)] mb-1">Contratante</div>
                  <div className="text-[13px] font-[500] text-[var(--color-text-primary)]">Roberto Ferreira</div>
                  <div className="text-[12px] text-[var(--color-text-secondary)]">CFO — Metalúrgica RJ</div>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-[60px] border-b border-[var(--color-border-strong)] flex items-end justify-center pb-2 relative">
                  <div className="font-['Playfair_Display',serif] text-[24px] text-[var(--color-accent)] opacity-80 leading-none italic pr-4">Ana Beatriz</div>
                  <div className="absolute top-0 right-0 flex items-center gap-1 text-[11px] text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#16A34A] border-opacity-20">
                    <CheckCircle2 size={10} /> Assinado
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <div className="text-[11px] uppercase font-[600] text-[var(--color-text-tertiary)] mb-1">Contratada</div>
                  <div className="text-[13px] font-[500] text-[var(--color-text-primary)]">Ana Beatriz</div>
                  <div className="text-[12px] text-[var(--color-text-secondary)]">Sócia — Andrade Contábil</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar (35%) */}
          <div className="w-[35%] bg-white border border-[var(--color-border)] rounded-[8px] p-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] h-fit">
            
            <div className="mb-6">
              <h3 className="text-[12px] uppercase font-[600] text-[var(--color-text-tertiary)] tracking-wider mb-4">Signatários</h3>
              
              <div className="flex flex-col gap-4">
                {/* Signer 1 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-[36px] h-[36px] rounded-full bg-[var(--color-subtle)] text-[var(--color-text-secondary)] flex items-center justify-center font-[600] text-[14px]">R</div>
                    <div>
                      <div className="text-[13px] font-[500] text-[var(--color-text-primary)]">Roberto Ferreira</div>
                      <div className="text-[12px] text-[var(--color-text-secondary)]">CFO</div>
                      <div className="text-[11px] text-[var(--color-text-tertiary)] mt-1">Enviado em 14 Abr · Link por email</div>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-[var(--color-warning-soft)] text-[var(--color-warning)] text-[11px] font-[500] rounded-full whitespace-nowrap">Aguardando</div>
                </div>

                <div className="h-[1px] bg-[var(--color-border)] ml-[48px]" />

                {/* Signer 2 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-[36px] h-[36px] rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center font-[600] text-[14px]">A</div>
                    <div>
                      <div className="text-[13px] font-[500] text-[var(--color-text-primary)]">Ana Beatriz</div>
                      <div className="text-[12px] text-[var(--color-text-secondary)]">Sócia</div>
                      <div className="text-[11px] text-[var(--color-text-tertiary)] mt-1">Assinado em 14 Abr · 11:23</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-[500] rounded-full whitespace-nowrap">
                    <CheckCircle2 size={10} /> Assinado
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-5 h-[36px] border border-[var(--color-border-strong)] rounded-[6px] text-[13px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] hover:text-[var(--color-text-primary)] transition-colors">
                Reenviar link
              </button>
            </div>

            <div className="mt-2 pt-4 border-t border-[var(--color-border)]">
              <h3 className="text-[12px] uppercase font-[600] text-[var(--color-text-tertiary)] tracking-wider mb-4">Trilha de Auditoria</h3>
              
              <div className="flex flex-col gap-3 text-[11px] font-mono">
                <div className="flex items-start gap-2">
                  <span className="text-[var(--color-text-tertiary)] shrink-0 w-[120px]">2025-04-14  11:23:07</span>
                  <span className="text-[#16A34A] mt-[2px] leading-none">●</span>
                  <span className="text-[var(--color-text-secondary)]">Assinado — Ana Beatriz (Contratada)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--color-text-tertiary)] shrink-0 w-[120px]">2025-04-14  10:47:33</span>
                  <span className="text-[var(--color-warning)] mt-[2px] leading-none">●</span>
                  <span className="text-[var(--color-text-secondary)]">Visualizado — Roberto Ferreira (link único)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--color-text-tertiary)] shrink-0 w-[120px]">2025-04-14  10:31:22</span>
                  <span className="text-[#3B82F6] mt-[2px] leading-none">●</span>
                  <span className="text-[var(--color-text-secondary)]">Enviado para assinatura — por Ana Beatriz</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--color-text-tertiary)] shrink-0 w-[120px]">2025-04-12  09:15:04</span>
                  <span className="text-[var(--color-text-tertiary)] mt-[2px] leading-none">●</span>
                  <span className="text-[var(--color-text-secondary)]">Contrato criado — gerado da proposta #2024-047</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}