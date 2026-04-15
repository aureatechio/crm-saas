import React, { useState } from 'react';
import AppLayout from './_shared/AppLayout';
import './_shared/_group.css';
import {
  Building2, Users, ShieldCheck, CreditCard, Plug, Bell, Lock,
  Upload, Check, X, ChevronRight, Plus, Search, MoreHorizontal,
  AlertTriangle, Copy, Eye, EyeOff, Trash2, Mail, Webhook,
  RefreshCw, ToggleLeft, ToggleRight, Info, Crown, Zap, Globe,
  UserCheck, LogOut, Key, Activity, ArrowUpRight, Download
} from 'lucide-react';

/* ─────────────────────────────────────────── */
/* Data                                         */
/* ─────────────────────────────────────────── */

const BRAND_COLORS = [
  '#E85D2F','#C0392B','#8E44AD','#2980B9','#16A34A','#D97706','#0891B2','#1F2937',
];

const users = [
  { id:1, name:'Ana Beatriz',    email:'ana@contabilandrade.com.br',  role:'admin',       status:'ativo',     last:'Há 2 min',   avatar:'AB', color:'#1e40af' },
  { id:2, name:'Carlos Mendes',  email:'carlos@contabilandrade.com.br',role:'gerente',     status:'ativo',     last:'Há 1 hora',  avatar:'CM', color:'#047857' },
  { id:3, name:'Juliana Costa',  email:'juliana@contabilandrade.com.br',role:'vendedor',   status:'ativo',     last:'Há 3 horas', avatar:'JC', color:'#b45309' },
  { id:4, name:'Ricardo Lemos',  email:'ricardo@contabilandrade.com.br',role:'vendedor',   status:'ativo',     last:'Ontem',      avatar:'RL', color:'#7c3aed' },
  { id:5, name:'Fernanda Nunes', email:'fernanda@contabilandrade.com.br',role:'visualizador',status:'ativo',   last:'3 dias atrás',avatar:'FN', color:'#be185d' },
  { id:6, name:'Marcos Vieira',  email:'marcos@contabilandrade.com.br', role:'vendedor',  status:'pendente',  last:'—',          avatar:'MV', color:'#64748b' },
  { id:7, name:'Patrícia Sousa', email:'patricia@contabilandrade.com.br',role:'gerente',  status:'inativo',   last:'15 dias atrás',avatar:'PS', color:'#64748b' },
];

const roleLabels: Record<string, string> = {
  admin: 'Administrador', gerente: 'Gerente', vendedor: 'Vendedor', visualizador: 'Visualizador',
};
const roleColors: Record<string, string> = {
  admin:        'bg-[var(--color-accent-soft)] text-[var(--color-accent)]',
  gerente:      'bg-[var(--color-info-soft,#DBEAFE)] text-[var(--color-info,#1d4ed8)]',
  vendedor:     'bg-[var(--color-success-soft)] text-[var(--color-success)]',
  visualizador: 'bg-[var(--color-subtle)] text-[var(--color-text-secondary)]',
};
const statusColors: Record<string, string> = {
  ativo:    'bg-[var(--color-success-soft)] text-[var(--color-success)]',
  pendente: 'bg-[var(--color-warning-soft)] text-[var(--color-warning)]',
  inativo:  'bg-[var(--color-subtle)] text-[var(--color-text-tertiary)]',
};

const permMatrix = [
  { feature: 'Ver dashboard',           admin: true,  gerente: true,  vendedor: true,  visualizador: true  },
  { feature: 'Criar / editar leads',    admin: true,  gerente: true,  vendedor: true,  visualizador: false },
  { feature: 'Excluir leads',           admin: true,  gerente: true,  vendedor: false, visualizador: false },
  { feature: 'Criar propostas',         admin: true,  gerente: true,  vendedor: true,  visualizador: false },
  { feature: 'Aprovar propostas',       admin: true,  gerente: true,  vendedor: false, visualizador: false },
  { feature: 'Gerenciar contratos',     admin: true,  gerente: true,  vendedor: false, visualizador: false },
  { feature: 'Ver contatos (todos)',    admin: true,  gerente: true,  vendedor: false, visualizador: false },
  { feature: 'Ver contatos (próprios)', admin: true,  gerente: true,  vendedor: true,  visualizador: false },
  { feature: 'Configurar kanbans',      admin: true,  gerente: true,  vendedor: false, visualizador: false },
  { feature: 'Gerenciar usuários',      admin: true,  gerente: false, vendedor: false, visualizador: false },
  { feature: 'Acessar configurações',   admin: true,  gerente: false, vendedor: false, visualizador: false },
  { feature: 'Ver relatórios',          admin: true,  gerente: true,  vendedor: false, visualizador: true  },
  { feature: 'Exportar dados',          admin: true,  gerente: true,  vendedor: false, visualizador: false },
  { feature: 'Cobranças e plano',       admin: true,  gerente: false, vendedor: false, visualizador: false },
];

const integrations = [
  { name: 'Gmail / Google Workspace', desc: 'Sincronize e-mails automaticamente com leads e deals', icon: '📧', status: 'conectado', category: 'Email' },
  { name: 'WhatsApp Business API',    desc: 'Envie mensagens e registre conversas no CRM',          icon: '💬', status: 'conectado', category: 'Mensagens' },
  { name: 'RD Station Marketing',     desc: 'Importe leads qualificados do marketing automaticamente',icon: '🚀', status: 'desconectado', category: 'Marketing' },
  { name: 'Zapier',                   desc: 'Automatize fluxos com mais de 5.000 apps',              icon: '⚡', status: 'conectado', category: 'Automação' },
  { name: 'Asaas',                    desc: 'Cobranças e boletos diretamente no pipeline',           icon: '💰', status: 'desconectado', category: 'Financeiro' },
  { name: 'Slack',                    desc: 'Receba alertas de deals e atividades no Slack',         icon: '🔔', status: 'desconectado', category: 'Notificações' },
  { name: 'DocuSign',                 desc: 'Assina contratos digitalmente direto do CRM',           icon: '✍️', status: 'desconectado', category: 'Contratos' },
  { name: 'Webhook genérico',         desc: 'Envie eventos para qualquer endpoint HTTP',             icon: '🔗', status: 'configurar', category: 'Dev' },
];

const auditLog = [
  { user:'Ana Beatriz',   action:'Alterou plano para PRO',               time:'Hoje 09:14',     type:'billing' },
  { user:'Ana Beatriz',   action:'Convidou marcos@contabilandrade.com.br',time:'Hoje 08:52',     type:'user' },
  { user:'Carlos Mendes', action:'Exportou lista de leads',               time:'Ontem 17:33',    type:'export' },
  { user:'Ana Beatriz',   action:'Alterou cor principal para #E85D2F',    time:'Ontem 14:11',    type:'config' },
  { user:'Juliana Costa', action:'Login via dispositivo novo (São Paulo)',  time:'12/04 11:20',  type:'security' },
  { user:'Sistema',       action:'Backup automático concluído',            time:'12/04 03:00',   type:'system' },
];

/* ─────────────────────────────────────────── */
/* Sub-components                               */
/* ─────────────────────────────────────────── */

function SectionTitle({ title, desc, action }: { title: string; desc?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h2 className="text-[16px] font-[700] text-[var(--color-text-primary)] tracking-[-0.01em]">{title}</h2>
        {desc && <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-[var(--color-border)] rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.03)] ${className}`}>
      {children}
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`w-[36px] h-[20px] rounded-full transition-colors relative ${on ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-strong)]'}`}>
      <div className={`absolute top-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-all ${on ? 'left-[18px]' : 'left-[2px]'}`} />
    </button>
  );
}

/* ─────────────────────────────────────────── */
/* Sections                                     */
/* ─────────────────────────────────────────── */

function SecEmpresa() {
  const [accentColor, setAccentColor] = useState('#E85D2F');
  const [companyName, setCompanyName] = useState('Contábil Andrade');
  const [subdomain, setSubdomain] = useState('contabilandrade');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="Identidade da Empresa" desc="Personalize a aparência do CRM com a identidade visual da sua empresa." />

      {/* Logo */}
      <Card className="p-5">
        <div className="text-[12px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-4">Logo</div>
        <div className="flex items-center gap-5">
          <div className="w-[72px] h-[72px] rounded-[12px] bg-[var(--color-accent)] flex items-center justify-center text-white font-[800] text-[22px] shrink-0">
            C
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button className="h-[32px] px-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[12px] font-[600] rounded-[7px] flex items-center gap-1.5 transition-colors">
                <Upload size={12} /> Fazer upload
              </button>
              <button className="h-[32px] px-3 border border-[var(--color-border-strong)] text-[12px] font-[500] text-[var(--color-text-secondary)] rounded-[7px] hover:bg-[var(--color-subtle)] transition-colors">
                Remover
              </button>
            </div>
            <p className="text-[11px] text-[var(--color-text-tertiary)]">PNG ou SVG. Máximo 2 MB. Recomendado: 200×200px</p>
          </div>
          <div className="ml-auto text-right">
            <div className="text-[11px] text-[var(--color-text-tertiary)] mb-1">Preview no login</div>
            <div className="w-[120px] h-[40px] border border-[var(--color-border)] rounded-[8px] bg-[var(--color-subtle)] flex items-center gap-2 px-3">
              <div className="w-[20px] h-[20px] rounded-[5px] bg-[var(--color-accent)] flex items-center justify-center text-white text-[9px] font-[800]">C</div>
              <span className="text-[10px] font-[600] text-[var(--color-text-secondary)] truncate">{companyName}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Nome e subdomínio */}
      <Card className="p-5">
        <div className="text-[12px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-4">Dados da empresa</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Nome da empresa</label>
            <input
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              className="h-[36px] px-3 border border-[var(--color-border)] rounded-[7px] text-[13px] text-[var(--color-text-primary)] bg-white focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Segmento</label>
            <select className="h-[36px] px-3 border border-[var(--color-border)] rounded-[7px] text-[13px] text-[var(--color-text-primary)] bg-white focus:outline-none focus:border-[var(--color-accent)]">
              <option>Contabilidade e Assessoria</option>
              <option>Consultoria de Gestão</option>
              <option>Tecnologia e SaaS</option>
              <option>Serviços Profissionais</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5 col-span-2">
            <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Subdomínio do CRM</label>
            <div className="flex items-center">
              <input
                value={subdomain}
                onChange={e => setSubdomain(e.target.value.toLowerCase().replace(/\s/g,''))}
                className="h-[36px] px-3 border border-[var(--color-border)] rounded-l-[7px] border-r-0 text-[13px] font-mono text-[var(--color-text-primary)] bg-white focus:outline-none focus:border-[var(--color-accent)] flex-1"
              />
              <div className="h-[36px] px-3 border border-[var(--color-border)] rounded-r-[7px] bg-[var(--color-subtle)] text-[13px] font-mono text-[var(--color-text-tertiary)] flex items-center">.axiscrm.com.br</div>
              <button className="ml-2 h-[36px] px-3 border border-[var(--color-border-strong)] rounded-[7px] text-[11px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors flex items-center gap-1.5">
                <Copy size={11} /> Copiar
              </button>
            </div>
            <p className="text-[11px] text-[var(--color-text-tertiary)]">Acesso em: <span className="font-mono">{subdomain}.axiscrm.com.br</span></p>
          </div>
        </div>
      </Card>

      {/* Cores */}
      <Card className="p-5">
        <div className="text-[12px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-4">Paleta de cores</div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Cor principal (accent)</label>
            <div className="flex items-center gap-3">
              <div className="w-[36px] h-[36px] rounded-[8px] border-2 border-white shadow-md" style={{ backgroundColor: accentColor }} />
              <div className="flex flex-wrap gap-1.5">
                {BRAND_COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setAccentColor(c)}
                    className="w-[24px] h-[24px] rounded-full border-2 transition-all"
                    style={{ backgroundColor: c, borderColor: accentColor === c ? '#0F0F0E' : 'transparent' }}
                  />
                ))}
              </div>
              <input
                type="text"
                value={accentColor}
                onChange={e => setAccentColor(e.target.value)}
                className="w-[90px] h-[32px] px-2 border border-[var(--color-border)] rounded-[6px] text-[12px] font-mono text-[var(--color-text-primary)] bg-white focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Preview aplicado</label>
            <div className="border border-[var(--color-border)] rounded-[8px] p-3 bg-[var(--color-subtle)] flex flex-col gap-2">
              <button className="h-[28px] px-3 rounded-[6px] text-white text-[11px] font-[600]" style={{ backgroundColor: accentColor }}>
                Botão primário
              </button>
              <div className="flex items-center gap-2">
                <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="text-[11px]" style={{ color: accentColor }}>Link de ação</span>
              </div>
              <div className="h-[6px] rounded-full bg-[var(--color-border)] overflow-hidden">
                <div className="h-full rounded-full w-[72%]" style={{ backgroundColor: accentColor }} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Domínio personalizado */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-1">
          <div className="text-[12px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)]">Domínio personalizado</div>
          <span className="text-[10px] font-[600] text-[var(--color-accent)] bg-[var(--color-accent-soft)] px-2 py-0.5 rounded-full flex items-center gap-1"><Crown size={9} /> Plano PRO</span>
        </div>
        <p className="text-[12px] text-[var(--color-text-tertiary)] mb-3">Conecte seu próprio domínio: <span className="font-mono">crm.suaempresa.com.br</span></p>
        <div className="flex items-center gap-2">
          <input placeholder="crm.suaempresa.com.br" className="h-[36px] px-3 border border-[var(--color-border)] rounded-[7px] text-[13px] font-mono text-[var(--color-text-primary)] bg-white focus:outline-none flex-1" />
          <button className="h-[36px] px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[12px] font-[600] rounded-[7px] transition-colors">Conectar</button>
        </div>
        <p className="text-[11px] text-[var(--color-text-tertiary)] mt-2 flex items-center gap-1"><Info size={10} /> Aponte um CNAME para <span className="font-mono">cname.axiscrm.com.br</span> e aguarde propagação (até 24h).</p>
      </Card>

      <div className="flex justify-end">
        <button onClick={handleSave} className={`h-[36px] px-5 rounded-[8px] text-[13px] font-[600] flex items-center gap-2 transition-all ${saved ? 'bg-[var(--color-success)] text-white' : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white'}`}>
          {saved ? <><Check size={14} /> Salvo!</> : 'Salvar alterações'}
        </button>
      </div>
    </div>
  );
}

function SecUsuarios() {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('todos');
  const [invite, setInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('vendedor');

  const filtered = users.filter(u =>
    (filterRole === 'todos' || u.role === filterRole) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle
        title="Usuários"
        desc={`${users.filter(u=>u.status==='ativo').length} usuários ativos · ${users.filter(u=>u.status==='pendente').length} convite pendente`}
        action={
          <button onClick={()=>setInvite(true)} className="h-[34px] px-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[12px] font-[600] rounded-[8px] flex items-center gap-1.5 transition-colors">
            <Plus size={13} /> Convidar usuário
          </button>
        }
      />

      {/* Modal de convite */}
      {invite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)', backdropFilter:'blur(3px)' }}>
          <div className="bg-white rounded-[14px] shadow-2xl w-[440px] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[15px] font-[700] text-[var(--color-text-primary)]">Convidar usuário</h3>
                <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5">O convite será enviado por e-mail</p>
              </div>
              <button onClick={()=>setInvite(false)} className="w-[28px] h-[28px] flex items-center justify-center text-[var(--color-text-tertiary)] hover:bg-[var(--color-subtle)] rounded-[6px]"><X size={14} /></button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">E-mail corporativo *</label>
                <input value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)} placeholder="nome@empresa.com.br" className="h-[36px] px-3 border border-[var(--color-border)] rounded-[7px] text-[13px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Perfil de acesso *</label>
                <select value={inviteRole} onChange={e=>setInviteRole(e.target.value)} className="h-[36px] px-3 border border-[var(--color-border)] rounded-[7px] text-[13px] text-[var(--color-text-primary)] bg-white focus:outline-none focus:border-[var(--color-accent)]">
                  <option value="visualizador">Visualizador — só leitura</option>
                  <option value="vendedor">Vendedor — gerencia próprios leads</option>
                  <option value="gerente">Gerente — vê toda equipe, aprova propostas</option>
                  <option value="admin">Administrador — acesso total</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Mensagem personalizada (opcional)</label>
                <textarea rows={2} placeholder="Ex: Olá! Bem-vindo ao nosso CRM..." className="px-3 py-2 border border-[var(--color-border)] rounded-[7px] text-[13px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] resize-none" />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button onClick={()=>setInvite(false)} className="h-[36px] px-4 border border-[var(--color-border-strong)] rounded-[8px] text-[13px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors">Cancelar</button>
              <button onClick={()=>setInvite(false)} className="h-[36px] px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[13px] font-[600] rounded-[8px] flex items-center gap-1.5 transition-colors">
                <Mail size={13} /> Enviar convite
              </button>
            </div>
          </div>
        </div>
      )}

      <Card>
        <div className="flex items-center gap-3 p-4 border-b border-[var(--color-border)]">
          <div className="relative flex-1 max-w-[280px]">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar usuário..." className="w-full h-[34px] pl-8 pr-3 border border-[var(--color-border)] rounded-[7px] text-[12px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]" />
          </div>
          <div className="flex items-center gap-1">
            {['todos','admin','gerente','vendedor','visualizador'].map(r => (
              <button key={r} onClick={()=>setFilterRole(r)} className={`h-[30px] px-3 rounded-[6px] text-[11px] font-[500] transition-colors capitalize ${filterRole===r ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]'}`}>
                {r === 'todos' ? 'Todos' : roleLabels[r]}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              {['Usuário','Perfil','Status','Último acesso',''].map(h => (
                <th key={h} className="px-4 py-2.5 text-left text-[11px] font-[600] uppercase tracking-wider text-[var(--color-text-tertiary)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-[var(--color-subtle)] transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-white text-[11px] font-[700] shrink-0" style={{ backgroundColor: u.color }}>{u.avatar}</div>
                    <div>
                      <div className="text-[13px] font-[500] text-[var(--color-text-primary)]">{u.name}</div>
                      <div className="text-[11px] text-[var(--color-text-tertiary)]">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-[600] px-2 py-0.5 rounded-full ${roleColors[u.role]}`}>{roleLabels[u.role]}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-[500] px-2 py-0.5 rounded-full capitalize ${statusColors[u.status]}`}>{u.status}</span>
                </td>
                <td className="px-4 py-3 text-[12px] text-[var(--color-text-tertiary)] font-mono">{u.last}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="h-[28px] px-2 text-[11px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] rounded-[5px] transition-colors">Editar</button>
                    <button className="h-[28px] px-2 text-[11px] font-[500] text-[var(--color-danger)] hover:bg-[var(--color-danger-soft)] rounded-[5px] transition-colors">Remover</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Limites do plano */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-[12px] text-[var(--color-text-secondary)]">Usuários ativos</div>
            <div className="w-[140px] h-[6px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-[var(--color-accent)]" style={{ width: `${(5/10)*100}%` }} />
            </div>
            <div className="text-[12px] font-mono font-[600] text-[var(--color-text-primary)]">5 <span className="text-[var(--color-text-tertiary)] font-[400]">/ 10 incluídos</span></div>
          </div>
          <button className="text-[12px] font-[500] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] flex items-center gap-1">Aumentar limite <ArrowUpRight size={12} /></button>
        </div>
      </Card>
    </div>
  );
}

function SecPermissoes() {
  const roles = ['admin','gerente','vendedor','visualizador'];

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="Perfis e Permissões" desc="Controle o que cada perfil pode visualizar e executar no CRM." />

      <div className="grid grid-cols-4 gap-3 mb-2">
        {[
          { role:'admin',        label:'Administrador', desc:'Acesso total ao sistema',           color:'var(--color-accent)' },
          { role:'gerente',      label:'Gerente',       desc:'Equipe, relatórios e aprovações',   color:'var(--color-info,#2563EB)' },
          { role:'vendedor',     label:'Vendedor',      desc:'Leads, propostas e contratos próprios', color:'var(--color-success)' },
          { role:'visualizador', label:'Visualizador',  desc:'Apenas leitura',                    color:'var(--color-text-tertiary)' },
        ].map(r => (
          <Card key={r.role} className="p-4">
            <div className="w-[32px] h-[32px] rounded-[8px] mb-2 flex items-center justify-center" style={{ backgroundColor: r.color, opacity: 0.9 }}>
              <ShieldCheck size={16} className="text-white" />
            </div>
            <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">{r.label}</div>
            <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">{r.desc}</div>
            <div className="mt-2 text-[11px] font-[500] text-[var(--color-text-secondary)]">
              {permMatrix.filter(p => p[r.role as keyof typeof p]).length} permissões
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center gap-2 p-4 border-b border-[var(--color-border)]">
          <div className="text-[12px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] flex-1">Funcionalidade</div>
          {roles.map(r => (
            <div key={r} className="w-[110px] text-center text-[11px] font-[600] text-[var(--color-text-secondary)]">{roleLabels[r]}</div>
          ))}
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {permMatrix.map((row, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2.5 hover:bg-[var(--color-subtle)] transition-colors">
              <div className="text-[12px] text-[var(--color-text-primary)] flex-1">{row.feature}</div>
              {roles.map(r => {
                const has = row[r as keyof typeof row] as boolean;
                return (
                  <div key={r} className="w-[110px] flex justify-center">
                    {has
                      ? <div className="w-[20px] h-[20px] rounded-full bg-[var(--color-success-soft)] flex items-center justify-center"><Check size={11} className="text-[var(--color-success)]" /></div>
                      : <div className="w-[20px] h-[20px] rounded-full bg-[var(--color-subtle)] flex items-center justify-center"><X size={10} className="text-[var(--color-text-tertiary)]" /></div>
                    }
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex items-center gap-2 p-3 bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/30 rounded-[8px]">
        <Info size={13} className="text-[var(--color-accent)] shrink-0" />
        <p className="text-[12px] text-[var(--color-text-primary)]">Permissões granulares por pipeline estão disponíveis no plano Enterprise. <button className="text-[var(--color-accent)] font-[600]">Saiba mais →</button></p>
      </div>
    </div>
  );
}

function SecPlano() {
  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="Plano e Cobrança" desc="Gerencie sua assinatura, faturas e limites de uso." />

      {/* Plano atual */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5 border-[var(--color-accent)] border-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Crown size={16} className="text-[var(--color-accent)]" />
              <span className="text-[14px] font-[700] text-[var(--color-text-primary)]">Plano PRO</span>
            </div>
            <span className="text-[10px] font-[700] text-[var(--color-accent)] bg-[var(--color-accent-soft)] px-2 py-0.5 rounded-full">ATIVO</span>
          </div>
          <div className="text-[28px] font-mono font-[800] text-[var(--color-text-primary)]">R$ 297<span className="text-[14px] font-[400] text-[var(--color-text-tertiary)]">/mês</span></div>
          <p className="text-[12px] text-[var(--color-text-tertiary)] mt-1">Próxima cobrança: <span className="font-mono font-[500] text-[var(--color-text-secondary)]">14 de maio de 2025</span></p>

          <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex flex-col gap-1.5">
            {['Até 10 usuários','Pipelines ilimitados','100.000 leads','5 GB de arquivos','Integrações PRO','Suporte prioritário'].map(f => (
              <div key={f} className="flex items-center gap-2 text-[12px] text-[var(--color-text-secondary)]">
                <Check size={12} className="text-[var(--color-success)] shrink-0" /> {f}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <button className="flex-1 h-[32px] border border-[var(--color-border-strong)] rounded-[7px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors">Gerenciar plano</button>
            <button className="flex-1 h-[32px] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[12px] font-[600] rounded-[7px] flex items-center justify-center gap-1 transition-colors">
              <Zap size={11} /> Fazer upgrade
            </button>
          </div>
        </Card>

        {/* Uso */}
        <Card className="p-5">
          <div className="text-[12px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-4">Uso do plano</div>
          <div className="flex flex-col gap-4">
            {[
              { label:'Usuários ativos',    used: 5,     total: 10,    unit:'usuários' },
              { label:'Leads cadastrados',  used:1840,   total:100000, unit:'leads' },
              { label:'Armazenamento',      used:1.2,    total:5,      unit:'GB' },
              { label:'Integrações ativas', used:4,      total:10,     unit:'conexões' },
            ].map(r => {
              const pct = r.used / r.total;
              return (
                <div key={r.label} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[var(--color-text-secondary)]">{r.label}</span>
                    <span className="font-mono font-[500] text-[var(--color-text-primary)]">
                      {typeof r.used === 'number' && r.used < 10 ? r.used : r.used.toLocaleString('pt-BR')} / {r.total.toLocaleString('pt-BR')} {r.unit}
                    </span>
                  </div>
                  <div className="h-[6px] bg-[var(--color-subtle)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width:`${pct*100}%`, backgroundColor: pct > 0.8 ? 'var(--color-warning)' : 'var(--color-success)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Faturas */}
      <Card>
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">Histórico de faturas</div>
          <button className="h-[30px] px-3 border border-[var(--color-border-strong)] rounded-[7px] text-[11px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center gap-1.5 transition-colors">
            <Download size={11} /> Exportar
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              {['Data','Descrição','Valor','Status',''].map(h => (
                <th key={h} className="px-4 py-2.5 text-left text-[11px] font-[600] uppercase tracking-wider text-[var(--color-text-tertiary)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {[
              { date:'14/04/2025', desc:'Axis CRM PRO — Abril 2025',  val: 297, status:'pago' },
              { date:'14/03/2025', desc:'Axis CRM PRO — Março 2025',  val: 297, status:'pago' },
              { date:'14/02/2025', desc:'Axis CRM PRO — Fevereiro 2025', val: 297, status:'pago' },
              { date:'14/01/2025', desc:'Axis CRM PRO — Janeiro 2025', val: 297, status:'pago' },
            ].map((f, i) => (
              <tr key={i} className="hover:bg-[var(--color-subtle)] transition-colors">
                <td className="px-4 py-3 text-[12px] font-mono text-[var(--color-text-secondary)]">{f.date}</td>
                <td className="px-4 py-3 text-[12px] text-[var(--color-text-primary)]">{f.desc}</td>
                <td className="px-4 py-3 text-[12px] font-mono font-[600] text-[var(--color-text-primary)]">R$ {f.val},00</td>
                <td className="px-4 py-3"><span className="text-[10px] font-[600] bg-[var(--color-success-soft)] text-[var(--color-success)] px-2 py-0.5 rounded-full capitalize">{f.status}</span></td>
                <td className="px-4 py-3"><button className="text-[11px] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] flex items-center gap-1"><Download size={10} /> PDF</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Cartão de crédito */}
      <Card className="p-5">
        <div className="text-[12px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">Método de pagamento</div>
        <div className="flex items-center gap-3">
          <div className="w-[48px] h-[32px] bg-[#1a1f71] rounded-[5px] flex items-center justify-center text-white text-[10px] font-[800]">VISA</div>
          <div>
            <div className="text-[13px] font-[500] text-[var(--color-text-primary)]">•••• •••• •••• 4782</div>
            <div className="text-[11px] text-[var(--color-text-tertiary)]">Expira 09/2027 · Titular: Ana Beatriz Andrade</div>
          </div>
          <button className="ml-auto text-[12px] font-[500] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">Alterar cartão</button>
        </div>
      </Card>
    </div>
  );
}

function SecIntegracoes() {
  const categories = ['Todos', ...Array.from(new Set(integrations.map(i => i.category)))];
  const [cat, setCat] = useState('Todos');

  const filtered = cat === 'Todos' ? integrations : integrations.filter(i => i.category === cat);

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="Integrações" desc="Conecte o Axis CRM com as ferramentas que sua equipe já usa." />

      <div className="flex items-center gap-1 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={()=>setCat(c)} className={`h-[28px] px-3 rounded-[6px] text-[11px] font-[500] transition-colors ${cat===c ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]'}`}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((intg, i) => (
          <Card key={i} className="p-4 flex items-center gap-4">
            <div className="w-[40px] h-[40px] rounded-[10px] bg-[var(--color-subtle)] flex items-center justify-center text-[20px] shrink-0">{intg.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-[600] text-[var(--color-text-primary)]">{intg.name}</div>
                <span className={`text-[9px] font-[700] uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                  intg.status === 'conectado' ? 'bg-[var(--color-success-soft)] text-[var(--color-success)]' :
                  intg.status === 'configurar' ? 'bg-[var(--color-warning-soft)] text-[var(--color-warning)]' :
                  'bg-[var(--color-subtle)] text-[var(--color-text-tertiary)]'
                }`}>{intg.status}</span>
              </div>
              <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5 truncate">{intg.desc}</div>
            </div>
            <button className={`h-[30px] px-3 rounded-[7px] text-[11px] font-[600] transition-colors shrink-0 ${
              intg.status === 'conectado'
                ? 'border border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]'
                : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white'
            }`}>
              {intg.status === 'conectado' ? 'Gerenciar' : 'Conectar'}
            </button>
          </Card>
        ))}
      </div>

      {/* Webhook section */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Webhook size={14} className="text-[var(--color-text-secondary)]" />
          <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">Chave de API</div>
          <span className="text-[10px] font-[600] text-[var(--color-accent)] bg-[var(--color-accent-soft)] px-2 py-0.5 rounded-full flex items-center gap-1"><Crown size={9} /> PRO</span>
        </div>
        <div className="flex items-center gap-2">
          <input readOnly value="axsk_live_••••••••••••••••••••••••••••4f2a" className="flex-1 h-[36px] px-3 border border-[var(--color-border)] rounded-[7px] text-[12px] font-mono text-[var(--color-text-secondary)] bg-[var(--color-subtle)]" />
          <button className="h-[36px] px-3 border border-[var(--color-border-strong)] rounded-[7px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center gap-1.5 transition-colors"><Eye size={12} /> Revelar</button>
          <button className="h-[36px] px-3 border border-[var(--color-border-strong)] rounded-[7px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center gap-1.5 transition-colors"><RefreshCw size={12} /> Regenerar</button>
        </div>
        <p className="text-[11px] text-[var(--color-text-tertiary)] mt-2 flex items-center gap-1"><AlertTriangle size={10} className="text-[var(--color-warning)]" /> Nunca compartilhe sua chave de API. Regenerar invalida imediatamente a chave atual.</p>
      </Card>
    </div>
  );
}

function SecSeguranca() {
  const [twoFA, setTwoFA] = useState(true);
  const [ssoForce, setSsoForce] = useState(false);
  const [loginNotify, setLoginNotify] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('8h');

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="Segurança e Privacidade" desc="Configure autenticação, sessões e rastreabilidade." />

      {/* Autenticação */}
      <Card className="p-5">
        <div className="text-[12px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-4">Autenticação</div>
        <div className="flex flex-col gap-4">
          {[
            { label:'Autenticação em dois fatores (2FA)', sub:'Obriga todos os usuários a usar 2FA no login', state: twoFA, set: setTwoFA },
            { label:'Notificação de login em dispositivo novo', sub:'Envia alerta por e-mail ao detectar novo acesso', state: loginNotify, set: setLoginNotify },
            { label:'Forçar login via SSO corporativo', sub:'Desabilita login com e-mail/senha para todos', state: ssoForce, set: setSsoForce },
          ].map((s, i) => (
            <div key={i} className={`flex items-center justify-between py-3 ${i > 0 ? 'border-t border-[var(--color-border)]' : ''}`}>
              <div>
                <div className="text-[13px] font-[500] text-[var(--color-text-primary)]">{s.label}</div>
                <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">{s.sub}</div>
              </div>
              <Toggle on={s.state} onChange={() => s.set(!s.state)} />
            </div>
          ))}
        </div>
      </Card>

      {/* Sessões */}
      <Card className="p-5">
        <div className="text-[12px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-4">Sessões</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Expirar sessão após inatividade</label>
            <select value={sessionTimeout} onChange={e=>setSessionTimeout(e.target.value)} className="h-[36px] px-3 border border-[var(--color-border)] rounded-[7px] text-[13px] text-[var(--color-text-primary)] bg-white focus:outline-none">
              <option value="2h">2 horas</option>
              <option value="8h">8 horas</option>
              <option value="24h">24 horas</option>
              <option value="7d">7 dias</option>
              <option value="nunca">Nunca</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-[600] text-[var(--color-text-secondary)]">Sessões ativas agora</label>
            <div className="h-[36px] px-3 border border-[var(--color-border)] rounded-[7px] bg-[var(--color-subtle)] flex items-center justify-between">
              <span className="text-[13px] font-mono font-[600] text-[var(--color-text-primary)]">3 sessões</span>
              <button className="text-[11px] font-[500] text-[var(--color-danger)] hover:text-[var(--color-danger)] flex items-center gap-1"><LogOut size={11} /> Encerrar todas</button>
            </div>
          </div>
        </div>
      </Card>

      {/* SSO Config */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-1">
          <div className="text-[12px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)]">SSO — Single Sign-On</div>
          <span className="text-[10px] font-[600] text-[var(--color-accent)] bg-[var(--color-accent-soft)] px-2 py-0.5 rounded-full flex items-center gap-1"><Crown size={9} /> Enterprise</span>
        </div>
        <p className="text-[12px] text-[var(--color-text-tertiary)] mb-3">Integre com seu provedor de identidade (Azure AD, Okta, Google Workspace).</p>
        <div className="flex items-center gap-2">
          {['Azure AD','Okta','Google Workspace','SAML 2.0'].map(p => (
            <button key={p} className="h-[32px] px-3 border border-[var(--color-border-strong)] rounded-[7px] text-[11px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors">{p}</button>
          ))}
        </div>
      </Card>

      {/* Audit log */}
      <Card>
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-[var(--color-text-secondary)]" />
            <div className="text-[13px] font-[700] text-[var(--color-text-primary)]">Log de Auditoria</div>
          </div>
          <button className="h-[30px] px-3 border border-[var(--color-border-strong)] rounded-[7px] text-[11px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] flex items-center gap-1.5 transition-colors">
            <Download size={11} /> Exportar log
          </button>
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {auditLog.map((entry, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--color-subtle)] transition-colors">
              <div className={`w-[6px] h-[6px] rounded-full shrink-0 ${
                entry.type === 'security' ? 'bg-[var(--color-danger)]' :
                entry.type === 'billing'  ? 'bg-[var(--color-warning)]' :
                entry.type === 'user'     ? 'bg-[var(--color-accent)]' :
                'bg-[var(--color-border-strong)]'
              }`} />
              <div className="text-[12px] font-[500] text-[var(--color-text-secondary)] w-[130px] shrink-0">{entry.user}</div>
              <div className="text-[12px] text-[var(--color-text-primary)] flex-1">{entry.action}</div>
              <div className="text-[11px] font-mono text-[var(--color-text-tertiary)] shrink-0">{entry.time}</div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-[var(--color-border)] text-center">
          <button className="text-[12px] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-[500] flex items-center gap-1 mx-auto">Ver log completo <ChevronRight size={12} /></button>
        </div>
      </Card>

      {/* Zona de perigo */}
      <Card className="p-5 border-[var(--color-danger)]/30">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={14} className="text-[var(--color-danger)]" />
          <div className="text-[12px] font-[700] uppercase tracking-wider text-[var(--color-danger)]">Zona de risco</div>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <div className="text-[13px] font-[500] text-[var(--color-text-primary)]">Exportar todos os dados</div>
            <div className="text-[11px] text-[var(--color-text-tertiary)]">Download completo (LGPD — prazo de até 72h)</div>
          </div>
          <button className="h-[32px] px-3 border border-[var(--color-border-strong)] rounded-[7px] text-[12px] font-[500] text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)] transition-colors">Solicitar</button>
        </div>
        <div className="flex items-center justify-between py-2 border-t border-[var(--color-border)]">
          <div>
            <div className="text-[13px] font-[500] text-[var(--color-danger)]">Encerrar conta e excluir dados</div>
            <div className="text-[11px] text-[var(--color-text-tertiary)]">Ação permanente. Todos os dados serão removidos em 30 dias.</div>
          </div>
          <button className="h-[32px] px-3 border border-[var(--color-danger)]/50 text-[var(--color-danger)] rounded-[7px] text-[12px] font-[600] hover:bg-[var(--color-danger-soft)] transition-colors">Excluir conta</button>
        </div>
      </Card>
    </div>
  );
}

function SecNotificacoes() {
  const [prefs, setPrefs] = useState<Record<string,boolean>>({
    novo_lead: true, proposta_aceita: true, proposta_recusada: true,
    contrato_assinado: true, pagamento_recebido: false, deal_parado: true,
    meta_atingida: true, lembrete_followup: true, novo_usuario: true,
    relatorio_semanal: false,
  });
  const toggle = (k: string) => setPrefs(p => ({ ...p, [k]: !p[k] }));

  const groups = [
    {
      title: 'Pipeline e deals',
      items: [
        { key:'novo_lead',         label:'Novo lead capturado',               desc:'Quando um lead é adicionado ao pipeline' },
        { key:'deal_parado',       label:'Deal parado há mais de 7 dias',      desc:'Alertas de leads sem atividade' },
        { key:'lembrete_followup', label:'Lembretes de follow-up',             desc:'Atividades com prazo chegando' },
      ]
    },
    {
      title: 'Propostas e contratos',
      items: [
        { key:'proposta_aceita',   label:'Proposta aceita',                    desc:'Quando cliente confirma proposta' },
        { key:'proposta_recusada', label:'Proposta recusada',                  desc:'Quando proposta é rejeitada' },
        { key:'contrato_assinado', label:'Contrato assinado',                  desc:'Assinatura digital concluída' },
      ]
    },
    {
      title: 'Financeiro',
      items: [
        { key:'pagamento_recebido',label:'Pagamento recebido',                 desc:'Confirmação de cobrança paga' },
      ]
    },
    {
      title: 'Equipe e sistema',
      items: [
        { key:'meta_atingida',     label:'Meta do mês atingida',               desc:'Quando a equipe bate a meta' },
        { key:'novo_usuario',      label:'Novo usuário convidado',             desc:'Quando um convite é aceito' },
        { key:'relatorio_semanal', label:'Relatório semanal por e-mail',       desc:'Resumo automático toda segunda-feira' },
      ]
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="Notificações" desc="Escolha quando e como receber alertas do CRM." />

      {groups.map(g => (
        <Card key={g.title}>
          <div className="px-4 py-3 border-b border-[var(--color-border)]">
            <div className="text-[12px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)]">{g.title}</div>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {g.items.map(item => (
              <div key={item.key} className="flex items-center justify-between px-4 py-3 hover:bg-[var(--color-subtle)] transition-colors">
                <div>
                  <div className="text-[13px] font-[500] text-[var(--color-text-primary)]">{item.label}</div>
                  <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">{item.desc}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-tertiary)]">
                    <Mail size={11} />
                    <Toggle on={prefs[item.key]} onChange={() => toggle(item.key)} />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-tertiary)]">
                    <Bell size={11} />
                    <Toggle on={prefs[item.key]} onChange={() => toggle(item.key)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* Nav items                                    */
/* ─────────────────────────────────────────── */

const navItems = [
  { id:'empresa',       label:'Empresa',           icon: Building2,    comp: SecEmpresa },
  { id:'usuarios',      label:'Usuários',           icon: Users,        comp: SecUsuarios },
  { id:'permissoes',    label:'Perfis e Permissões',icon: ShieldCheck,  comp: SecPermissoes },
  { id:'plano',         label:'Plano e Cobrança',   icon: CreditCard,   comp: SecPlano },
  { id:'integracoes',   label:'Integrações',        icon: Plug,         comp: SecIntegracoes },
  { id:'notificacoes',  label:'Notificações',       icon: Bell,         comp: SecNotificacoes },
  { id:'seguranca',     label:'Segurança',          icon: Lock,         comp: SecSeguranca },
];

/* ─────────────────────────────────────────── */
/* Main                                         */
/* ─────────────────────────────────────────── */

export default function Configuracoes() {
  const [active, setActive] = useState('empresa');
  const Section = navItems.find(n => n.id === active)?.comp ?? SecEmpresa;

  return (
    <AppLayout currentPage="configuracoes">
      <div className="flex gap-6">

        {/* Left nav */}
        <div className="w-[220px] shrink-0 flex flex-col gap-0.5">
          <div className="text-[10px] font-[700] uppercase tracking-wider text-[var(--color-text-tertiary)] px-3 py-2 mt-1">Workspace</div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[7px] text-[13px] font-[500] text-left transition-colors ${
                  isActive
                    ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-subtle)]'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-tertiary)]'} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Section />
        </div>

      </div>
    </AppLayout>
  );
}
