import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './_shared/_group.css';
import { useNav } from './_shared/nav-context';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { navigate } = useNav();

  return (
    <div className="min-h-screen w-full bg-[var(--color-canvas)] flex items-center justify-center relative overflow-hidden font-[var(--font-ui)]">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.3
        }}
      />
      
      <div className="relative z-10 w-[420px] bg-[var(--color-surface)] rounded-[12px] border border-[var(--color-border)] p-[40px]" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        
        {/* Top of card */}
        <div className="mb-[32px]">
          <h1 className="font-[700] text-[24px] text-[var(--color-text-primary)] tracking-[-0.03em] leading-none mb-1">Axis</h1>
          <p className="text-[13px] text-[var(--color-text-tertiary)]">CRM para vendas consultivas</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-[16px] mb-[24px]">
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Email</label>
            <input 
              type="email" 
              placeholder="seu@email.com.br"
              className="h-[36px] w-full px-3 rounded-[8px] border border-[var(--color-border-strong)] text-[13px] outline-none focus:border-[var(--color-accent)] focus:ring-[2px] focus:ring-[var(--color-accent)] focus:ring-opacity-20 transition-all placeholder-[var(--color-text-tertiary)]"
            />
          </div>
          
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] font-[500] text-[var(--color-text-secondary)]">Senha</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                className="h-[36px] w-full px-3 pr-10 rounded-[8px] border border-[var(--color-border-strong)] text-[13px] outline-none focus:border-[var(--color-accent)] focus:ring-[2px] focus:ring-[var(--color-accent)] focus:ring-opacity-20 transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[10px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <a href="#" className="text-[12px] text-[var(--color-accent)] hover:underline">Esqueceu a senha?</a>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('dashboard')}
          className="w-full h-[36px] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-[8px] font-[500] text-[13px] transition-colors mb-[24px]"
        >
          Entrar
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-[24px]">
          <div className="h-[1px] flex-1 bg-[var(--color-border)]"></div>
          <span className="text-[12px] text-[var(--color-text-tertiary)]">ou</span>
          <div className="h-[1px] flex-1 bg-[var(--color-border)]"></div>
        </div>

        {/* Google SSO */}
        <button className="w-full h-[36px] bg-white border border-[var(--color-border-strong)] hover:bg-[var(--color-subtle)] text-[var(--color-text-primary)] rounded-[8px] font-[500] text-[13px] flex items-center justify-center gap-2 transition-colors mb-[32px]">
          <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continuar com Google
        </button>

        {/* Bottom */}
        <div className="text-center text-[13px] text-[var(--color-text-secondary)]">
          Não tem conta? <a href="#" className="text-[var(--color-accent)] hover:underline">Solicitar acesso →</a>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center text-[11px] text-[var(--color-text-tertiary)] z-10">
        © 2025 Axis · Privacidade · Termos
      </div>
    </div>
  );
}