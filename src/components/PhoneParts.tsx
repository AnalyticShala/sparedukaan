// Vector drawings of each phone layer. All share one coordinate space
// (260 x 540) so they line up when stacked. Generic phone, no brand.
// Each drawing can later be swapped for a cut-out photo of the real part.

const VB = '0 0 260 540';

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
        <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.06" />
        <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.22" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1c2230" />
        <stop offset="0.5" stopColor="#0b0d12" />
        <stop offset="1" stopColor="#151a24" />
      </linearGradient>
      <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0.3" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.09" />
        <stop offset="0.7" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#6b7078" />
        <stop offset="0.15" stopColor="#c9ced6" />
        <stop offset="0.5" stopColor="#8d939c" />
        <stop offset="0.85" stopColor="#c3c8d0" />
        <stop offset="1" stopColor="#5f646c" />
      </linearGradient>
      <linearGradient id={`${id}-back`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#3a4048" />
        <stop offset="0.4" stopColor="#1d2126" />
        <stop offset="0.6" stopColor="#262b31" />
        <stop offset="1" stopColor="#0f1114" />
      </linearGradient>
      <linearGradient id={`${id}-pcb`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1f5a3c" />
        <stop offset="1" stopColor="#123a27" />
      </linearGradient>
      <linearGradient id={`${id}-batt`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#2c3036" />
        <stop offset="0.5" stopColor="#40454c" />
        <stop offset="1" stopColor="#24282d" />
      </linearGradient>
      <linearGradient id={`${id}-flex`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#b86a1c" />
        <stop offset="0.5" stopColor="#e39a3d" />
        <stop offset="1" stopColor="#a85f16" />
      </linearGradient>
      <radialGradient id={`${id}-lens`} cx="0.4" cy="0.35" r="0.7">
        <stop offset="0" stopColor="#5a6a8a" />
        <stop offset="0.35" stopColor="#1a2235" />
        <stop offset="0.8" stopColor="#05070b" />
        <stop offset="1" stopColor="#2a2f3a" />
      </radialGradient>
      <pattern id={`${id}-grille`} width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.3" fill="#0a0c0f" />
      </pattern>
    </defs>
  );
}

export function TemperedGlass() {
  return (
    <svg viewBox={VB} className="part-svg">
      <Defs id="tg" />
      <rect x="12" y="12" width="236" height="516" rx="34" fill="url(#tg-glass)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.5" />
      <path d="M40 24 L220 24" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
      <path d="M30 60 L30 480" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function DisplayPanel() {
  return (
    <svg viewBox={VB} className="part-svg">
      <Defs id="dp" />
      <rect x="92" y="520" width="76" height="16" rx="3" fill="url(#dp-flex)" />
      <rect x="100" y="530" width="60" height="6" rx="1" fill="#2b1a08" />
      <rect x="14" y="14" width="232" height="512" rx="32" fill="url(#dp-screen)" />
      <rect x="14" y="14" width="232" height="512" rx="32" fill="url(#dp-sheen)" />
      <rect x="20" y="20" width="220" height="500" rx="28" fill="none" stroke="#ffffff" strokeOpacity="0.08" />
      <circle cx="130" cy="34" r="6" fill="#05070b" stroke="#2a2f3a" strokeWidth="1" />
      <circle cx="128" cy="32" r="1.5" fill="#4d5a78" />
    </svg>
  );
}

export function MidFrame() {
  return (
    <svg viewBox={VB} className="part-svg">
      <Defs id="mf" />
      <path
        fillRule="evenodd"
        d="M44 4 H216 A40 40 0 0 1 256 44 V496 A40 40 0 0 1 216 536 H44 A40 40 0 0 1 4 496 V44 A40 40 0 0 1 44 4 Z M44 16 A28 28 0 0 0 16 44 V496 A28 28 0 0 0 44 524 H216 A28 28 0 0 0 244 496 V44 A28 28 0 0 0 216 16 Z"
        fill="url(#mf-metal)"
      />
      <rect x="254" y="140" width="5" height="34" rx="2" fill="#9aa0a8" />
      <rect x="254" y="190" width="5" height="62" rx="2" fill="#9aa0a8" />
      <rect x="1" y="150" width="5" height="26" rx="2" fill="#9aa0a8" />
      <rect x="100" y="533" width="60" height="4" rx="2" fill="#2a2e33" />
      <circle cx="80" cy="535" r="1.6" fill="#2a2e33" />
      <circle cx="180" cy="535" r="1.6" fill="#2a2e33" />
    </svg>
  );
}

export function MainBoard() {
  return (
    <svg viewBox={VB} className="part-svg">
      <Defs id="mb" />
      <path d="M34 30 H226 A8 8 0 0 1 234 38 V170 A8 8 0 0 1 226 178 H150 V150 H34 Z" fill="url(#mb-pcb)" stroke="#3f8a63" strokeWidth="1" />
      <rect x="58" y="52" width="46" height="46" rx="3" fill="#0b0d10" />
      <rect x="64" y="58" width="34" height="34" rx="2" fill="#1a1d22" />
      <rect x="118" y="52" width="34" height="26" rx="2" fill="#0b0d10" />
      <rect x="160" y="52" width="48" height="30" rx="3" fill="#0b0d10" />
      <rect x="118" y="90" width="90" height="22" rx="2" fill="#0b0d10" />
      <rect x="58" y="112" width="48" height="24" rx="2" fill="#0b0d10" />
      <g fill="#d9b24a">
        <rect x="40" y="40" width="6" height="2" />
        <rect x="40" y="46" width="6" height="2" />
        <rect x="40" y="52" width="6" height="2" />
        <rect x="40" y="58" width="6" height="2" />
        <rect x="160" y="124" width="2" height="6" />
        <rect x="166" y="124" width="2" height="6" />
        <rect x="172" y="124" width="2" height="6" />
        <rect x="178" y="124" width="2" height="6" />
      </g>
      <rect x="170" y="150" width="40" height="18" rx="3" fill="#d9d9d9" />
      <rect x="176" y="154" width="28" height="10" rx="1" fill="#8a8f96" />
      <circle cx="46" cy="140" r="3" fill="#d9b24a" />
      <circle cx="222" cy="40" r="3" fill="#d9b24a" />
    </svg>
  );
}

export function Battery() {
  return (
    <svg viewBox={VB} className="part-svg">
      <Defs id="bt" />
      <rect x="34" y="188" width="192" height="258" rx="10" fill="url(#bt-batt)" stroke="#5a5f66" strokeWidth="1" />
      <rect x="34" y="188" width="192" height="258" rx="10" fill="url(#bt-sheen)" />
      <rect x="48" y="206" width="164" height="60" rx="4" fill="#d6d9de" />
      <text x="130" y="230" textAnchor="middle" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="13" fill="#1d2126">
        Li-ion 5000 mAh
      </text>
      <text x="130" y="250" textAnchor="middle" fontFamily="Nunito, sans-serif" fontWeight="700" fontSize="9" fill="#4a4f56">
        3.87 V · 19.35 Wh
      </text>
      <rect x="60" y="300" width="140" height="2" fill="#6a6f76" />
      <rect x="60" y="320" width="100" height="2" fill="#6a6f76" />
      <rect x="112" y="176" width="36" height="16" rx="3" fill="url(#bt-flex)" />
      <rect x="118" y="172" width="24" height="8" rx="1" fill="#1a1d22" />
    </svg>
  );
}

export function CameraModule() {
  return (
    <svg viewBox={VB} className="part-svg">
      <Defs id="cm" />
      <rect x="24" y="24" width="70" height="104" rx="18" fill="#101317" stroke="#3a3f47" strokeWidth="1.5" />
      <circle cx="46" cy="48" r="13" fill="url(#cm-lens)" stroke="#4a5160" strokeWidth="1" />
      <circle cx="46" cy="48" r="5" fill="#070a10" />
      <circle cx="43" cy="44" r="1.6" fill="#8fa4d6" />
      <circle cx="72" cy="48" r="11" fill="url(#cm-lens)" stroke="#4a5160" strokeWidth="1" />
      <circle cx="72" cy="48" r="4" fill="#070a10" />
      <circle cx="46" cy="84" r="11" fill="url(#cm-lens)" stroke="#4a5160" strokeWidth="1" />
      <circle cx="46" cy="84" r="4" fill="#070a10" />
      <circle cx="72" cy="84" r="5" fill="#f4e7b8" stroke="#8a7a3a" strokeWidth="1" />
      <circle cx="59" cy="112" r="3" fill="#2a2f3a" />
      <rect x="94" y="60" width="26" height="12" rx="2" fill="url(#cm-flex)" />
    </svg>
  );
}

export function Speaker() {
  return (
    <svg viewBox={VB} className="part-svg">
      <Defs id="sp" />
      <rect x="178" y="452" width="56" height="64" rx="8" fill="#15181c" stroke="#3a3f47" strokeWidth="1.5" />
      <rect x="186" y="462" width="40" height="44" rx="4" fill="#2a2e34" />
      <rect x="186" y="462" width="40" height="44" rx="4" fill="url(#sp-grille)" />
      <rect x="160" y="470" width="20" height="10" rx="2" fill="url(#sp-flex)" />
    </svg>
  );
}

export function ChargingPort() {
  return (
    <svg viewBox={VB} className="part-svg">
      <Defs id="cp" />
      <rect x="40" y="456" width="128" height="52" rx="8" fill="url(#cp-pcb)" stroke="#3f8a63" strokeWidth="1" />
      <rect x="86" y="490" width="36" height="14" rx="7" fill="#0b0d10" stroke="#8d939c" strokeWidth="1.5" />
      <rect x="92" y="495" width="24" height="4" rx="2" fill="#d9b24a" />
      <circle cx="60" cy="482" r="3" fill="#0b0d10" />
      <rect x="130" y="466" width="26" height="14" rx="2" fill="#0b0d10" />
      <rect x="48" y="466" width="18" height="8" rx="1" fill="#0b0d10" />
      <rect x="150" y="448" width="26" height="10" rx="2" fill="url(#cp-flex)" />
    </svg>
  );
}

export function BackGlass() {
  return (
    <svg viewBox={VB} className="part-svg">
      <Defs id="bg" />
      <rect x="4" y="4" width="252" height="532" rx="40" fill="url(#bg-back)" />
      <rect x="4" y="4" width="252" height="532" rx="40" fill="url(#bg-sheen)" />
      <rect x="4" y="4" width="252" height="532" rx="40" fill="none" stroke="#ffffff" strokeOpacity="0.12" />
      <rect x="20" y="20" width="78" height="112" rx="20" fill="#1a1e24" stroke="#ffffff" strokeOpacity="0.1" />
      <circle cx="46" cy="48" r="15" fill="#0b0d12" stroke="#3a4150" strokeWidth="1.5" />
      <circle cx="72" cy="48" r="13" fill="#0b0d12" stroke="#3a4150" strokeWidth="1.5" />
      <circle cx="46" cy="84" r="13" fill="#0b0d12" stroke="#3a4150" strokeWidth="1.5" />
      <circle cx="72" cy="84" r="6" fill="#0b0d12" stroke="#3a4150" strokeWidth="1" />
    </svg>
  );
}
