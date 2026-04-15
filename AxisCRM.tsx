import React, { lazy, Suspense } from 'react';
import { NavProvider, useNav } from './_shared/nav-context';
import './_shared/_group.css';

const Dashboard        = lazy(() => import('./Dashboard'));
const Pipeline         = lazy(() => import('./Pipeline'));
const PipelineBoards   = lazy(() => import('./PipelineBoards'));
const Contatos         = lazy(() => import('./Contatos'));
const ContactPanel     = lazy(() => import('./ContactPanel'));
const PropostaEditor   = lazy(() => import('./PropostaEditor'));
const Contratos        = lazy(() => import('./Contratos'));
const ContratoDetalhe  = lazy(() => import('./ContratoDetalhe'));
const ModeloContrato   = lazy(() => import('./ModeloContrato'));
const ModeloLista      = lazy(() => import('./ModeloContratoLista'));
const LeadDetail       = lazy(() => import('./LeadDetail'));
const DealDetail       = lazy(() => import('./DealDetail'));
const Relatorios       = lazy(() => import('./Relatorios'));
const Cobranca         = lazy(() => import('./Cobranca'));
const Configuracoes    = lazy(() => import('./Configuracoes'));
const Login            = lazy(() => import('./Login'));

function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center" style={{ background: 'var(--color-canvas)' }}>
      <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  const { route } = useNav();

  const screens: Record<string, React.ReactNode> = {
    login:             <Login />,
    dashboard:         <Dashboard />,
    pipeline:          <Pipeline />,
    'pipeline-boards': <PipelineBoards />,
    contatos:          <Contatos />,
    'contact-panel':   <ContactPanel />,
    propostas:         <PropostaEditor />,
    'proposta-editor': <PropostaEditor />,
    contratos:         <Contratos />,
    'contrato-detalhe':<ContratoDetalhe />,
    'modelo-contrato': <ModeloContrato />,
    'modelo-lista':    <ModeloLista />,
    'lead-detail':     <LeadDetail />,
    'deal-detail':     <DealDetail />,
    relatorios:        <Relatorios />,
    cobranca:          <Cobranca />,
    'pos-venda':       <Cobranca />,
    configuracoes:     <Configuracoes />,
  };

  return (
    <Suspense fallback={<Loader />}>
      {screens[route] ?? <Dashboard />}
    </Suspense>
  );
}

export default function AxisCRM() {
  return (
    <NavProvider initial="dashboard">
      <Router />
    </NavProvider>
  );
}
