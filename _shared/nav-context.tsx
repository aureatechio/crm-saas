import React, { createContext, useContext, useState, useCallback } from 'react';

export type Route =
  | 'login'
  | 'dashboard'
  | 'pipeline'
  | 'pipeline-boards'
  | 'contatos'
  | 'contact-panel'
  | 'propostas'
  | 'proposta-editor'
  | 'contratos'
  | 'contrato-detalhe'
  | 'modelo-lista'
  | 'modelo-contrato'
  | 'lead-detail'
  | 'deal-detail'
  | 'relatorios'
  | 'cobranca'
  | 'pos-venda'
  | 'configuracoes';

export interface NavParams {
  contactId?: number;
  dealId?: string;
  contratoId?: string;
  [key: string]: unknown;
}

interface NavContextValue {
  route: Route;
  params: NavParams;
  navigate: (route: Route, params?: NavParams) => void;
  back: () => void;
  canGoBack: boolean;
}

const NavContext = createContext<NavContextValue>({
  route: 'dashboard',
  params: {},
  navigate: () => {},
  back: () => {},
  canGoBack: false,
});

export function NavProvider({ children, initial = 'dashboard' }: { children: React.ReactNode; initial?: Route }) {
  const [history, setHistory] = useState<Array<{ route: Route; params: NavParams }>>([
    { route: initial, params: {} }
  ]);

  const current = history[history.length - 1];

  const navigate = useCallback((route: Route, params: NavParams = {}) => {
    setHistory(h => [...h, { route, params }]);
    window.scrollTo(0, 0);
  }, []);

  const back = useCallback(() => {
    setHistory(h => h.length > 1 ? h.slice(0, -1) : h);
  }, []);

  return (
    <NavContext.Provider value={{
      route: current.route,
      params: current.params,
      navigate,
      back,
      canGoBack: history.length > 1,
    }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  return useContext(NavContext);
}
