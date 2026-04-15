import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './_shared/_group.css';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(val);
};

export default function PropostaPublica() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] font-[var(--font-ui)] py-12">
      <div className="max-w-[800px] mx-auto bg-[var(--color-surface)] shadow-sm border border-[var(--color-border)] px-[40px] py-[60px] rounded-[4px]">
        
        {/* Letterhead */}
        <div className="flex justify-between items-start border-b border-[var(--color-border)] pb-[32px] mb-[40px]">
          <div>
            <div className="text-[16px] font-[700] text-[var(--color-text-primary)] tracking-[-0.03em] mb-1">Axis</div>
            <div className="text-[13px] text-[var(--color-text-secondary)] font-[500]">Contábil Andrade</div>
            <div className="text-[11px] text-[var(--color-text-tertiary)] font-mono mt-0.5">CNPJ: 12.345.678/0001-90</div>
          </div>
          <div className="flex flex-col items-end text-right">
            <div className="w-[32px] h-[32px] rounded-[6px] bg-[var(--color-accent)] flex items-center justify-center text-white font-[700] text-[14px] tracking-tight mb-2">
              CA
            </div>
            <div className="text-[11px] text-[var(--color-text-tertiary)] font-mono">Proposta Comercial #2024-047</div>
            <div className="text-[11px] text-[var(--color-text-tertiary)] font-mono">Válida até: 30 de abril de 2025</div>
          </div>
        </div>

        {/* Hero */}
        <div className="mb-[40px]">
          <div className="text-[11px] uppercase tracking-widest text-[var(--color-text-tertiary)] font-[600] mb-2">Proposta para</div>
          <h1 className="text-[32px] font-[600] text-[var(--color-text-primary)] tracking-[-0.02em] leading-tight mb-1">Assessoria Tributária Completa</h1>
          <h2 className="text-[16px] text-[var(--color-text-secondary)] mb-4">Metalúrgica RJ Indústria e Comércio Ltda.</h2>
          
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-[var(--color-warning-soft)] text-[var(--color-warning)] text-[12px] font-[500] rounded-full">Negociação</span>
            <span className="text-[13px] text-[var(--color-text-secondary)] border-l border-[var(--color-border)] pl-3">Roberto Ferreira, CFO</span>
            <span className="text-[13px] text-[var(--color-text-secondary)] border-l border-[var(--color-border)] pl-3">Enviada em 14 de abril de 2025</span>
          </div>
        </div>

        {/* Introdução */}
        <div className="mb-[32px]">
          <h3 className="text-[14px] font-[600] text-[var(--color-text-primary)] mb-3">Introdução</h3>
          <p className="text-[14px] text-[var(--color-text-secondary)] leading-[1.7]">
            Apresentamos a seguir nossa proposta para prestação de serviços de assessoria tributária e fiscal para a Metalúrgica RJ. Com base no diagnóstico realizado em reunião no dia 8 de abril, identificamos oportunidades de recuperação fiscal estimadas em R$ 180.000 no período de 12 meses.
          </p>
        </div>

        {/* Escopo de Serviços */}
        <div className="mb-[32px]">
          <h3 className="text-[14px] font-[600] text-[var(--color-text-primary)] mb-3">Escopo de Serviços</h3>
          <div className="flex flex-col gap-3">
            {[
              { title: "Revisão de obrigações acessórias (SPED, EFD, DCTF)", desc: "Análise profunda dos últimos 5 anos buscando inconsistências e oportunidades de crédito." },
              { title: "Planejamento tributário anual (IRPJ, CSLL, PIS/COFINS)", desc: "Modelagem de cenários para definição do regime tributário mais eficiente." },
              { title: "Acompanhamento de autuações fiscais em andamento", desc: "Defesa administrativa e alinhamento com equipe jurídica em processos vigentes." },
              { title: "Relatórios mensais de compliance tributário", desc: "Dashboard com KPIs de risco fiscal e status de certidões." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[var(--color-accent)] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[14px] font-[500] text-[var(--color-text-primary)] mb-0.5">{item.title}</div>
                  <div className="text-[12px] text-[var(--color-text-tertiary)]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabela de Investimento */}
        <div className="mb-[40px]">
          <h3 className="text-[14px] font-[600] text-[var(--color-text-primary)] mb-3">Investimento</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--color-subtle)] border-b border-[var(--color-border)]">
                <th className="py-2.5 px-3 text-left text-[11px] font-[600] text-[var(--color-text-tertiary)] tracking-wider">SERVIÇO</th>
                <th className="py-2.5 px-3 text-left text-[11px] font-[600] text-[var(--color-text-tertiary)] tracking-wider">PERÍODO</th>
                <th className="py-2.5 px-3 text-right text-[11px] font-[600] text-[var(--color-text-tertiary)] tracking-wider">VALOR MENSAL</th>
                <th className="py-2.5 px-3 text-right text-[11px] font-[600] text-[var(--color-text-tertiary)] tracking-wider">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-3 px-3 text-[14px] text-[var(--color-text-primary)]">Assessoria Tributária Completa</td>
                <td className="py-3 px-3 text-[14px] text-[var(--color-text-secondary)]">12 meses</td>
                <td className="py-3 px-3 text-[14px] text-[var(--color-text-primary)] font-mono text-right">{formatCurrency(2875)}</td>
                <td className="py-3 px-3 text-[14px] text-[var(--color-text-primary)] font-mono text-right">{formatCurrency(34500)}</td>
              </tr>
              <tr className="border-b border-[var(--color-border)]">
                <td className="py-3 px-3 text-[14px] text-[var(--color-text-secondary)]">Gestão de Autuações</td>
                <td className="py-3 px-3 text-[14px] text-[var(--color-text-secondary)]">12 meses</td>
                <td className="py-3 px-3 text-[14px] text-[var(--color-text-tertiary)] text-right">Incluso</td>
                <td className="py-3 px-3 text-[14px] text-[var(--color-text-tertiary)] text-right">—</td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-[14px] text-[var(--color-text-secondary)]">Relatórios de Compliance</td>
                <td className="py-3 px-3 text-[14px] text-[var(--color-text-secondary)]">Mensal</td>
                <td className="py-3 px-3 text-[14px] text-[var(--color-text-tertiary)] text-right">Incluso</td>
                <td className="py-3 px-3 text-[14px] text-[var(--color-text-tertiary)] text-right">—</td>
              </tr>
              <tr className="border-t-2 border-[var(--color-text-primary)] bg-[var(--color-canvas)]">
                <td colSpan={3} className="py-3 px-3 text-[14px] font-[700] text-[var(--color-text-primary)]">TOTAL DO CONTRATO</td>
                <td className="py-3 px-3 text-[14px] font-[700] text-[var(--color-text-primary)] font-mono text-right">{formatCurrency(34500)}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-3 text-[12px] text-[var(--color-text-secondary)] italic">
            <span className="text-[var(--color-accent)]">✦</span> Desconto negociado aplicado: 5% sobre o valor original de {formatCurrency(36315)}
          </div>
        </div>

        {/* Condições */}
        <div className="mb-[40px]">
          <h3 className="text-[14px] font-[600] text-[var(--color-text-primary)] mb-3">Condições</h3>
          <ul className="text-[14px] text-[var(--color-text-secondary)] leading-[1.8] list-none pl-1">
            <li className="flex gap-2 items-center"><span className="text-[var(--color-text-tertiary)]">•</span> Pagamento mensal via boleto ou PIX até dia 10</li>
            <li className="flex gap-2 items-center"><span className="text-[var(--color-text-tertiary)]">•</span> Vigência: 12 meses com renovação automática</li>
            <li className="flex gap-2 items-center"><span className="text-[var(--color-text-tertiary)]">•</span> Início: 01 de maio de 2025</li>
            <li className="flex gap-2 items-center"><span className="text-[var(--color-text-tertiary)]">•</span> Reajuste anual: IPCA</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="border-t border-[var(--color-border)] pt-[32px] text-center">
          <p className="text-[13px] text-[var(--color-text-secondary)] mb-6">Esta proposta é válida até 30 de abril de 2025</p>
          <div className="flex justify-center gap-4 mb-8">
            <button className="h-[44px] w-[200px] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-[500] text-[14px] rounded-[8px] shadow-sm transition-colors">
              Aceitar proposta
            </button>
            <button className="h-[44px] w-[200px] bg-white border border-[var(--color-border-strong)] hover:bg-[var(--color-subtle)] text-[var(--color-text-primary)] font-[500] text-[14px] rounded-[8px] transition-colors">
              Solicitar ajustes
            </button>
          </div>
          <p className="text-[12px] text-[var(--color-text-tertiary)]">
            Dúvidas? Entre em contato: <a href="mailto:ana@axiscrm.com.br" className="text-[var(--color-accent)] hover:underline">ana@axiscrm.com.br</a> | (11) 3847-2200
          </p>
        </div>

        {/* Footer */}
        <div className="mt-[48px] text-center text-[11px] text-[var(--color-text-tertiary)]">
          Gerado pelo Axis CRM · Documento #2024-047 · Conteúdo confidencial
        </div>
        
      </div>
    </div>
  );
}