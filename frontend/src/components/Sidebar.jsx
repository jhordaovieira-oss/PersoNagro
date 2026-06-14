import { useTheme } from '../context/ThemeContext'

const icons = {
  dashboard: (color) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  radar: (color) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h6v6H4z"/><path d="M14 4h6v6h-6z"/><path d="M4 14h6v6H4z"/>
      <circle cx="17" cy="17" r="3"/><path d="M17 14v-1M17 20v1M14 17h-1M20 17h1"/>
    </svg>
  ),
  analise: (color) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  whatsapp: (color) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  calculadora: (color) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <line x1="8" y1="6" x2="16" y2="6"/>
      <line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/>
      <line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/>
      <line x1="8" y1="18" x2="8" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="16" y1="18" x2="16" y2="18"/>
    </svg>
  ),
  planos: (color) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  configuracoes: (color) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
}

export default function Sidebar({ pagina, setPagina, usuario }) {
  const t = useTheme()

  const itens = [
    { id: 'dashboard',     label: 'Dashboard' },
    { id: 'radar',         label: 'Radar da Semana' },
    { id: 'analise',       label: 'Análise Pessoal' },
    { id: 'whatsapp',      label: 'WhatsApp' },
    { id: 'calculadora',   label: 'Calculadora' },
    { id: 'planos',        label: 'Planos' },
    { id: 'configuracoes', label: 'Configurações' },
  ]

  const iniciais = usuario.nome.split(' ').map(n => n[0]).join('').slice(0, 2)

  return (
    <aside style={{
      width: 220, minWidth: 220,
      background: t.surface,
      borderRight: `1px solid ${t.border}`,
      display: 'flex', flexDirection: 'column',
      padding: '20px 0',
      transition: 'background 0.3s, border-color 0.3s'
    }}>

      {/* Logo + toggle */}
      <div style={{ padding: '0 20px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, background: t.green, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🌱</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: t.text1, margin: 0 }}>PersonalAgro</p>
            <p style={{ fontSize: 10, color: t.greenText, margin: 0 }}>Inteligência no campo</p>
          </div>
        </div>

        <button
          onClick={t.toggle}
          title={t.dark ? 'Modo claro' : 'Modo escuro'}
          style={{
            background: t.surfaceAlt, border: `1px solid ${t.border}`,
            borderRadius: 8, width: 28, height: 28, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, flexShrink: 0
          }}
        >
          {t.dark ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {itens.map(item => {
          const ativo = pagina === item.id
          const iconColor = ativo ? t.greenText : t.text2
          return (
            <button
              key={item.id}
              onClick={() => setPagina(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 10,
                border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
                background: ativo ? t.greenDim : 'transparent',
                color: ativo ? t.greenText : t.text2,
                fontSize: 13, fontWeight: ativo ? 600 : 400,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!ativo) e.currentTarget.style.background = t.surfaceAlt }}
              onMouseLeave={e => { if (!ativo) e.currentTarget.style.background = 'transparent' }}
            >
              {icons[item.id]?.(iconColor)}
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Usuário */}
      <div style={{ padding: '14px 12px 0', borderTop: `1px solid ${t.border}`, marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: t.greenDim, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 11, fontWeight: 700, color: t.greenText, flexShrink: 0
          }}>
            {iniciais}
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: t.text1, margin: 0 }}>{usuario.nome}</p>
            <p style={{ fontSize: 10, color: t.text2, margin: 0 }}>{usuario.cultura} · {usuario.estado}</p>
          </div>
        </div>
        <div style={{
          marginTop: 8, marginLeft: 4,
          display: 'inline-block', fontSize: 10, fontWeight: 600,
          background: t.greenDim, color: t.greenText,
          padding: '3px 8px', borderRadius: 20
        }}>
          ✓ Assinante
        </div>
      </div>
    </aside>
  )
}