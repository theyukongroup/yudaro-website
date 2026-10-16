import {
  BrainCircuit,
  ShieldCheck,
  Search,
  GraduationCap,
  ChartNoAxesCombined,
  FileText,
  Workflow,
  Check,
  Users,
  Database,
} from 'lucide-react';
import styles from './ai-illustration.module.css';

type Kind =
  | 'server'
  | 'knowledge'
  | 'search'
  | 'training'
  | 'management'
  | 'documents'
  | 'automation';
const icons = {
  server: ShieldCheck,
  knowledge: BrainCircuit,
  search: Search,
  training: GraduationCap,
  management: ChartNoAxesCombined,
  documents: FileText,
  automation: Workflow,
};
function Document({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width="54"
        height="70"
        rx="8"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 20h30M12 32h22M12 44h30M12 56h18"
        stroke="currentColor"
        strokeWidth="3"
        opacity=".35"
      />
    </g>
  );
}
export function AIIllustration({ kind, label }: { kind: Kind; label: string }) {
  const Icon = icons[kind];
  return (
    <div className={styles.frame}>
      {/* Inline SVG needs an image role to expose its accessible label. */}
      {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role */}
      <svg viewBox="0 0 480 280" role="img" aria-label={label}>
        <rect width="480" height="280" fill="#f0f7fb" />
        <circle cx="240" cy="140" r="109" fill="#e3f4f7" />
        <path d="M40 236h400" stroke="#c9dfe9" strokeWidth="2" />
        <g className={styles.drift}>
          {kind === 'server' && (
            <g>
              <rect
                x="148"
                y="48"
                width="152"
                height="180"
                rx="18"
                fill="white"
                stroke="currentColor"
                strokeWidth="3"
              />
              {[70, 116, 162].map((y) => (
                <g key={y}>
                  <rect
                    x="164"
                    y={y}
                    width="120"
                    height="34"
                    rx="7"
                    fill="#e3f4f7"
                  />
                  <path
                    d={`M178 ${y + 12}h38M178 ${y + 22}h26`}
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <circle
                    className={styles.pulse}
                    cx="268"
                    cy={y + 17}
                    r="4"
                    fill="#008c9e"
                  />
                </g>
              ))}
              <path
                d="M180 228v8m88-8v8"
                stroke="currentColor"
                strokeWidth="4"
              />
            </g>
          )}
          {kind === 'knowledge' && (
            <g>
              <path
                className={styles.flow}
                d="M130 100L240 140l104-56M132 198l108-58 108 66"
                fill="none"
                stroke="#008c9e"
                strokeWidth="3"
                strokeDasharray="7 7"
              />
              <Document x={93} y={49} />
              <Document x={318} y={38} />
              <Document x={96} y={166} />
              <Document x={320} y={164} />
              <circle
                cx="240"
                cy="140"
                r="48"
                fill="white"
                stroke="currentColor"
                strokeWidth="2"
              />
              <BrainCircuit x="214" y="114" width="52" height="52" />
            </g>
          )}
          {kind === 'search' && (
            <g>
              <Document x={132} y={74} />
              <rect
                x="204"
                y="60"
                width="116"
                height="156"
                rx="12"
                fill="white"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M224 88h72m-72 22h54m-54 22h66m-66 22h42m-42 22h58"
                stroke="#b4d4e2"
                strokeWidth="5"
              />
              <g className={styles.scan}>
                <circle
                  cx="264"
                  cy="134"
                  r="43"
                  fill="#e3f4f7"
                  fillOpacity=".8"
                  stroke="#008c9e"
                  strokeWidth="7"
                />
                <path
                  d="m296 166 36 36"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <Check x="244" y="114" width="40" height="40" />
              </g>
            </g>
          )}
          {kind === 'training' && (
            <g>
              <rect
                x="175"
                y="65"
                width="185"
                height="134"
                rx="14"
                fill="white"
                stroke="currentColor"
                strokeWidth="3"
              />
              <GraduationCap x="229" y="82" width="64" height="64" />
              <path
                d="M199 164h136"
                stroke="#c9dfe9"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                className={styles.pulse}
                d="M199 164h94"
                stroke="#008c9e"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle
                cx="134"
                cy="143"
                r="23"
                fill="#c5e4ee"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M90 236v-30c0-40 88-40 88 0v30"
                fill="white"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                d="M219 213h92"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>
          )}
          {kind === 'management' && (
            <g>
              <rect
                x="109"
                y="53"
                width="262"
                height="174"
                rx="14"
                fill="white"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path d="M109 82h262" stroke="#c9dfe9" strokeWidth="2" />
              <circle cx="127" cy="68" r="4" fill="#008c9e" />
              <path d="M130 198h132" stroke="#c9dfe9" strokeWidth="2" />
              {[56, 82, 108].map((h, i) => (
                <rect
                  key={h}
                  className={styles.pulse}
                  x={140 + i * 38}
                  y={198 - h}
                  width="24"
                  height={h}
                  rx="5"
                  fill={i === 2 ? '#008c9e' : '#b1d7e8'}
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
              <path
                d="m137 137 38-22 38 9 42-35"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="312" cy="127" r="26" fill="#e3f4f7" />
              <BrainCircuit x="295" y="110" width="34" height="34" />
              <path
                d="M285 175h54m-54 15h38"
                stroke="#b4d4e2"
                strokeWidth="4"
              />
            </g>
          )}
          {kind === 'documents' && (
            <g>
              <Document x={114} y={58} />
              <Document x={134} y={76} />
              <path
                className={styles.flow}
                d="M197 128h94m-12-10 12 10-12 10"
                fill="none"
                stroke="#008c9e"
                strokeWidth="3"
                strokeDasharray="6 5"
              />
              <rect
                x="302"
                y="58"
                width="76"
                height="72"
                rx="10"
                fill="white"
                stroke="currentColor"
                strokeWidth="2"
              />
              <FileText x="324" y="78" width="32" height="32" />
              <rect
                x="293"
                y="152"
                width="91"
                height="66"
                rx="10"
                fill="#d3edf0"
                stroke="#008c9e"
                strokeWidth="2"
              />
              <Check x="320" y="167" width="32" height="32" />
              <path
                d="M119 198h105m-105 15h74"
                stroke="#b4d4e2"
                strokeWidth="5"
              />
            </g>
          )}
          {kind === 'automation' && (
            <g>
              <path
                className={styles.flow}
                d="M113 140h254M240 140v-63m0 63v65"
                stroke="#008c9e"
                strokeWidth="4"
                strokeDasharray="8 7"
              />
              {[88, 213, 338].map((x, i) => (
                <g key={x}>
                  <rect
                    x={x}
                    y="112"
                    width="56"
                    height="56"
                    rx="13"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  {i === 0 ? (
                    <FileText x={x + 13} y="125" width="30" height="30" />
                  ) : i === 1 ? (
                    <BrainCircuit x={x + 13} y="125" width="30" height="30" />
                  ) : (
                    <Check x={x + 13} y="125" width="30" height="30" />
                  )}
                </g>
              ))}
              <circle
                cx="240"
                cy="65"
                r="26"
                fill="white"
                stroke="currentColor"
                strokeWidth="2"
              />
              <Users x="225" y="50" width="30" height="30" />
              <circle
                cx="240"
                cy="216"
                r="24"
                fill="white"
                stroke="currentColor"
                strokeWidth="2"
              />
              <Database x="226" y="202" width="28" height="28" />
            </g>
          )}
        </g>
        <g transform="translate(370 28)">
          <rect width="52" height="52" rx="16" fill="white" stroke="#c9dfe9" />
          <Icon x="13" y="13" width="26" height="26" />
        </g>
        <circle
          className={styles.pulse}
          cx="68"
          cy="83"
          r="6"
          fill="#008c9e"
          opacity=".6"
        />
        <circle cx="410" cy="210" r="4" fill="#08649e" opacity=".3" />
      </svg>
    </div>
  );
}
