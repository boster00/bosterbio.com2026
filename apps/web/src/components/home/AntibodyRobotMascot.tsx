/**
 * Placeholder mascot inspired by Figma asset-library “blue antibody robot” —
 * friendly lab character with Y-shaped antibody motif, antenna, and panel details.
 * Replace file contents with exported SVG from Figma when available.
 */
export function AntibodyRobotMascot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 300"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="BosterBio antibody robot mascot"
    >
      <title>Antibody robot mascot</title>
      <defs>
        <linearGradient id="robot-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#15294a" />
          <stop offset="100%" stopColor="#1a365d" />
        </linearGradient>
        <linearGradient id="robot-metal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2eaf3" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Ground */}
      <ellipse cx="140" cy="278" rx="100" ry="14" fill="rgba(255,255,255,0.15)" />
      {/* Legs */}
      <rect x="108" y="210" width="22" height="56" rx="8" fill="url(#robot-metal)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <rect x="150" y="210" width="22" height="56" rx="8" fill="url(#robot-metal)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <ellipse cx="119" cy="268" rx="18" ry="8" fill="#1e293b" opacity="0.35" />
      <ellipse cx="161" cy="268" rx="18" ry="8" fill="#1e293b" opacity="0.35" />
      {/* Torso */}
      <rect x="88" y="128" width="104" height="92" rx="22" fill="url(#robot-body)" stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" />
      {/* Chest panel */}
      <rect x="108" y="148" width="64" height="52" rx="12" fill="rgba(15,23,42,0.25)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      {/* Y core — antibody motif */}
      <g filter="url(#soft-glow)">
        <circle cx="140" cy="168" r="20" fill="#f97316" stroke="white" strokeWidth="2" opacity="0.95" />
        <text x="140" y="175" textAnchor="middle" fill="white" fontSize="16" fontWeight="800" fontFamily="system-ui, sans-serif">
          Y
        </text>
        <path d="M140 188 L140 210" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
        <path d="M140 200 L118 222 M140 200 L162 222" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* Side bolts */}
      <circle cx="98" cy="168" r="5" fill="#64748b" stroke="white" strokeWidth="1" />
      <circle cx="182" cy="168" r="5" fill="#64748b" stroke="white" strokeWidth="1" />
      {/* Arms */}
      <path
        d="M88 148 L52 118 M88 168 L48 168"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M192 148 L228 118 M192 168 L232 168"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="112" r="10" fill="url(#robot-metal)" stroke="white" strokeWidth="1.5" />
      <circle cx="232" cy="112" r="10" fill="url(#robot-metal)" stroke="white" strokeWidth="1.5" />
      {/* Head */}
      <circle cx="140" cy="88" r="46" fill="#1a365d" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
      {/* Visor */}
      <rect x="96" y="72" width="88" height="36" rx="14" fill="rgba(15,23,42,0.45)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="118" cy="90" r="9" fill="#f0f7fc" />
      <circle cx="162" cy="90" r="9" fill="#f0f7fc" />
      <circle cx="120" cy="92" r="4" fill="#1a365d" />
      <circle cx="164" cy="92" r="4" fill="#1a365d" />
      {/* Smile */}
      <path d="M118 108 Q140 122 162 108" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
      {/* Antenna */}
      <line x1="140" y1="42" x2="140" y2="22" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
      <circle cx="140" cy="14" r="8" fill="#f97316" stroke="white" strokeWidth="2" />
      {/* Ear modules */}
      <rect x="78" y="78" width="14" height="24" rx="4" fill="#15294a" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <rect x="188" y="78" width="14" height="24" rx="4" fill="#15294a" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    </svg>
  )
}
