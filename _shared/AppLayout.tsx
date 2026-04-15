import React, { useState } from 'react';
import {
  LayoutGrid, Columns, Users, FileText, PenLine,
  CreditCard, HeartHandshake, BarChart2, Settings,
  Bell, Plus, Search, ChevronDown, ChevronRight,
} from 'lucide-react';
import { useNav, type Route } from './nav-context';

export type PageType =
  | 'dashboard' | 'pipeline' | 'pipeline-boards' | 'contatos' | 'relatorios'
  | 'propostas' | 'contratos' | 'cobranca' | 'pos-venda' | 'configuracoes';

interface AppLayoutProps {
  currentPage: PageType;
  children: React.ReactNode;
  pageTitle?: string;
  pageSub?: string;
  actions?: React.ReactNode;
}

const PAGE_LABELS: Record<string, string> = {
  dashboard:        'Dashboard',
  pipeline:         'Pipeline',
  'pipeline-boards':'Pipeline',
  contatos:         'Contatos',
  propostas:        'Propostas',
  contratos:        'Contratos',
  cobranca:         'Cobrança',
  'pos-venda':      'Pós-venda',
  relatorios:       'Relatórios',
  configuracoes:    'Configurações',
};

function NavItem({
  item, active, collapsed, onClick
}: {
  item: { id: string; label: string; icon: React.FC<{size:number;className?:string}>; badge?: number };
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={`group w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-[7px] transition-all text-left
        ${active
          ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)] text-[var(--color-text-primary)]'
          : 'text-[var(--color-text-secondary)] hover:bg-white/60 hover:text-[var(--color-text-primary)]'
        }`}
    >
      <Icon size={15} className={active ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-secondary)] transition-colors'} />
      {!collapsed && (
        <>
          <span className={`flex-1 text-[13px] font-[${active ? '600' : '500'}] truncate`}>{item.label}</span>
          {item.badge !== undefined && (
            <span className={`text-[10px] font-[600] px-1.5 py-0.5 rounded-full min-w-[18px] text-center
              ${active ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]' : 'bg-[var(--color-inset)] text-[var(--color-text-tertiary)]'}`}>
              {item.badge}
            </span>
          )}
        </>
      )}
    </button>
  );
}

function SectionGroup({
  label, children, collapsed
}: { label: string; children: React.ReactNode; collapsed: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      {!collapsed && (
        <div className="px-2.5 pt-3 pb-1 text-[10px] font-[700] uppercase tracking-[0.08em] text-[var(--color-text-disabled)] select-none">
          {label}
        </div>
      )}
      {collapsed && <div className="h-3" />}
      {children}
    </div>
  );
}

export default function AppLayout({ currentPage, children, pageTitle, pageSub, actions }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { navigate, route } = useNav();

  const activeId = route === 'pipeline-boards' ? 'pipeline' : (route as string);

  const salesItems: { id: Route; label: string; icon: React.FC<{size:number;className?:string}>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard',   icon: LayoutGrid },
    { id: 'pipeline',  label: 'Pipeline',    icon: Columns },
    { id: 'contatos',  label: 'Contatos',    icon: Users },
    { id: 'propostas', label: 'Propostas',   icon: FileText },
    { id: 'contratos', label: 'Contratos',   icon: PenLine, badge: 3 },
  ];

  const serviceItems: { id: Route; label: string; icon: React.FC<{size:number;className?:string}> }[] = [
    { id: 'cobranca',   label: 'Cobrança',   icon: CreditCard },
    { id: 'pos-venda',  label: 'Pós-venda',  icon: HeartHandshake },
  ];

  const analyticsItems: { id: Route; label: string; icon: React.FC<{size:number;className?:string}> }[] = [
    { id: 'relatorios', label: 'Relatórios', icon: BarChart2 },
  ];

  const resolvedTitle = pageTitle ?? PAGE_LABELS[currentPage] ?? '';
  const today = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  const resolvedSub = pageSub ?? (currentPage === 'dashboard' ? `${today.charAt(0).toUpperCase() + today.slice(1)}` : undefined);

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: 'var(--color-canvas)', fontFamily: 'var(--font-ui)' }}>

      {/* ── Sidebar ── */}
      <aside className={`flex flex-col bg-[#FAFAF8] border-r border-[var(--color-border)] shrink-0 transition-all duration-200 overflow-hidden ${collapsed ? 'w-[56px]' : 'w-[var(--sidebar-width,248px)]'}`}>

        {/* Logo */}
        <div className={`h-[var(--topbar-height,52px)] border-b border-[var(--color-border)] flex items-center shrink-0 ${collapsed ? 'justify-center px-3' : 'px-4'}`}>
          {collapsed ? (
            <div
              onClick={() => navigate('dashboard')}
              className="w-[28px] h-[28px] rounded-[7px] bg-[var(--color-accent)] flex items-center justify-center text-white font-[800] text-[13px] cursor-pointer"
            >A</div>
          ) : (
            <button onClick={() => navigate('dashboard')} className="flex items-center gap-2.5 w-full min-w-0">
              <div className="w-[28px] h-[28px] rounded-[7px] bg-[var(--color-accent)] flex items-center justify-center text-white font-[800] text-[13px] shrink-0">A</div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[13px] font-[700] text-[var(--color-text-primary)] truncate leading-tight">Axis CRM</div>
                <div className="text-[10px] text-[var(--color-text-tertiary)] truncate leading-tight">Contábil Andrade</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-[9px] font-[700] bg-[var(--color-accent-soft)] text-[var(--color-accent)] px-1.5 py-0.5 rounded-[4px]">PRO</span>
                <ChevronDown size={12} className="text-[var(--color-text-tertiary)]" />
              </div>
            </button>
          )}
        </div>

        {/* Search */}
        {!collapsed && (
          <div className="px-3 pt-3 pb-1">
            <button className="w-full flex items-center gap-2 bg-white border border-[var(--color-border)] rounded-[7px] px-2.5 py-1.5 text-[12px] text-[var(--color-text-tertiary)] hover:border-[var(--color-border-strong)] transition-colors shadow-[var(--shadow-xs)]">
              <Search size={12} />
              <span className="flex-1 text-left">Buscar...</span>
              <kbd className="text-[9px] font-mono bg-[var(--color-subtle)] border border-[var(--color-border)] px-1 py-0.5 rounded-[3px]">⌘K</kbd>
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 pb-3 pt-1 flex flex-col gap-0">
          <SectionGroup label="Vendas" collapsed={collapsed}>
            {salesItems.map(item => (
              <NavItem
                key={item.id}
                item={item}
                active={activeId === item.id}
                collapsed={collapsed}
                onClick={() => navigate(item.id)}
              />
            ))}
          </SectionGroup>

          <SectionGroup label="Serviços" collapsed={collapsed}>
            {serviceItems.map(item => (
              <NavItem
                key={item.id}
                item={item}
                active={activeId === item.id}
                collapsed={collapsed}
                onClick={() => navigate(item.id)}
              />
            ))}
          </SectionGroup>

          <SectionGroup label="Análise" collapsed={collapsed}>
            {analyticsItems.map(item => (
              <NavItem
                key={item.id}
                item={item}
                active={activeId === item.id}
                collapsed={collapsed}
                onClick={() => navigate(item.id)}
              />
            ))}
          </SectionGroup>
        </nav>

        {/* Bottom */}
        <div className="border-t border-[var(--color-border)] px-2 py-2 flex flex-col gap-1 shrink-0">
          <NavItem
            item={{ id: 'configuracoes', label: 'Configurações', icon: Settings }}
            active={activeId === 'configuracoes'}
            collapsed={collapsed}
            onClick={() => navigate('configuracoes')}
          />
          <button
            onClick={() => setCollapsed(c => !c)}
            className="w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-[7px] text-[var(--color-text-tertiary)] hover:bg-white/60 hover:text-[var(--color-text-secondary)] transition-all"
            title={collapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            <ChevronRight size={15} className={`transition-transform ${collapsed ? '' : 'rotate-180'}`} />
            {!collapsed && <span className="text-[12px] font-[500]">Recolher menu</span>}
          </button>
        </div>

        {/* User */}
        <div className="border-t border-[var(--color-border)] p-2 shrink-0">
          <button className={`w-full flex items-center gap-2.5 p-2 rounded-[7px] hover:bg-white/70 transition-colors ${collapsed ? 'justify-center' : ''}`}>
            <div className="relative shrink-0">
              <div className="w-[30px] h-[30px] rounded-full bg-[#1e40af] text-white flex items-center justify-center text-[11px] font-[700]">AB</div>
              <div className="absolute bottom-0 right-0 w-[8px] h-[8px] rounded-full bg-[var(--color-success)] border-2 border-[#FAFAF8]" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[12px] font-[600] text-[var(--color-text-primary)] truncate">Ana Beatriz</div>
                <div className="text-[10px] text-[var(--color-text-tertiary)] truncate">Gerente Comercial</div>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="h-[var(--topbar-height,52px)] bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center justify-between px-6 shrink-0 shadow-[0_1px_0_var(--color-border)]">
          <div className="flex items-center gap-1.5 text-[13px]">
            <span
              onClick={() => navigate('dashboard')}
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] cursor-pointer transition-colors"
            >Axis CRM</span>
            <ChevronRight size={12} className="text-[var(--color-text-disabled)]" />
            <span className="font-[600] text-[var(--color-text-primary)]">{PAGE_LABELS[currentPage] ?? resolvedTitle}</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden lg:flex items-center gap-2 h-[32px] px-3 bg-[var(--color-subtle)] border border-[var(--color-border)] rounded-[7px] text-[12px] text-[var(--color-text-tertiary)] hover:border-[var(--color-border-strong)] transition-colors min-w-[200px]">
              <Search size={13} />
              <span className="flex-1 text-left">Buscar negócios, contatos...</span>
              <kbd className="text-[9px] font-mono bg-white border border-[var(--color-border)] px-1 py-0.5 rounded-[3px]">⌘K</kbd>
            </button>

            <button className="relative w-[32px] h-[32px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-subtle)] rounded-[7px] transition-colors">
              <Bell size={16} />
              <span className="absolute top-[7px] right-[7px] w-[6px] h-[6px] bg-[var(--color-danger)] rounded-full border border-white" />
            </button>

            <button className="h-[32px] px-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[12px] font-[600] rounded-[7px] flex items-center gap-1.5 transition-colors shadow-[var(--shadow-xs)]">
              <Plus size={14} />
              Novo
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto w-full px-8 py-7">
            {(resolvedTitle || actions) && (
              <div className="flex items-start justify-between gap-4 mb-7">
                <div>
                  <h1 className="text-[22px] font-[700] text-[var(--color-text-primary)] tracking-[-0.025em] leading-tight">{resolvedTitle}</h1>
                  {resolvedSub && <p className="text-[13px] text-[var(--color-text-tertiary)] mt-0.5">{resolvedSub}</p>}
                </div>
                {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
              </div>
            )}
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
