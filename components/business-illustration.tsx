/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG needs an image role for its accessible label. */
import {
  ArrowRight,
  BarChart3,
  Blocks,
  BookOpen,
  Boxes,
  BrainCircuit,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  Code2,
  CreditCard,
  Database,
  FileCheck2,
  FileText,
  Gauge,
  GraduationCap,
  Handshake,
  LayoutTemplate,
  Link2,
  MessageSquare,
  Monitor,
  Package,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Truck,
  Users,
  Workflow,
  Wrench,
} from 'lucide-react';
import motion from './ai-illustration.module.css';
import styles from './business-illustration.module.css';

const scenes = {
  planning: { layout: 'flow', icons: [MessageSquare, Workflow, Check] },
  modules: { layout: 'modules', icons: [Blocks, Boxes, Settings] },
  sales: { layout: 'flow', icons: [Users, Handshake, FileCheck2] },
  inventory: { layout: 'shelves', icons: [ShoppingCart, Package, Truck] },
  finance: { layout: 'dashboard', icons: [CreditCard, BarChart3, FileCheck2] },
  service: { layout: 'workspace', icons: [CalendarDays, Wrench, Check] },
  subscriptions: { layout: 'flow', icons: [Users, RefreshCw, CreditCard] },
  reporting: {
    layout: 'dashboard',
    icons: [ChartNoAxesCombined, Gauge, Check],
  },
  development: { layout: 'workspace', icons: [Code2, Blocks, Settings] },
  integration: { layout: 'modules', icons: [Link2, Database, ShoppingCart] },
  migration: { layout: 'flow', icons: [Database, ShieldCheck, GraduationCap] },
  support: { layout: 'workspace', icons: [Monitor, Wrench, ShieldCheck] },
  design: { layout: 'workspace', icons: [LayoutTemplate, Users, Check] },
  responsive: { layout: 'devices', icons: [Monitor, Smartphone, Check] },
  search: { layout: 'workspace', icons: [Search, FileText, BarChart3] },
  performance: {
    layout: 'dashboard',
    icons: [Gauge, ChartNoAxesCombined, ShieldCheck],
  },
  knowledge: { layout: 'modules', icons: [BrainCircuit, BookOpen, Users] },
  approval: { layout: 'flow', icons: [FileText, ShieldCheck, FileCheck2] },
  feedback: { layout: 'flow', icons: [MessageSquare, Users, RefreshCw] },
  automation: { layout: 'flow', icons: [FileText, Workflow, Check] },
} as const;
export type BusinessScene = keyof typeof scenes;

export function BusinessIllustration({
  scene,
  label,
  wide = false,
}: {
  scene: BusinessScene;
  label: string;
  wide?: boolean;
}) {
  const {
    layout,
    icons: [Primary, Secondary, Final],
  } = scenes[scene];
  return (
    <div className={`${motion.frame} ${styles.art} ${wide ? styles.wide : ''}`}>
      {/* Inline SVG needs the image role to expose its accessible description. */}
      {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role */}
      <svg
        viewBox="0 0 480 280"
        role="img"
        aria-label={`Animated illustration: ${label}`}
      >
        <rect width="480" height="280" fill="#f0f7fb" />
        <circle cx="240" cy="140" r="108" fill="#e3f4f7" />
        <path d="M40 236h400" stroke="#c9dfe9" strokeWidth="2" />
        <g className={motion.drift}>
          {layout === 'flow' && (
            <g>
              <path
                className={motion.flow}
                d="M122 140h237"
                stroke="#008c9e"
                strokeWidth="3"
                strokeDasharray="7 7"
              />
              {[Primary, Secondary, Final].map((Icon, i) => (
                <g key={i}>
                  <rect
                    x={68 + i * 125}
                    y={i === 1 ? 82 : 102}
                    width="94"
                    height={i === 1 ? 116 : 76}
                    rx="16"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <Icon
                    x={92 + i * 125}
                    y={i === 1 ? 103 : 117}
                    width="46"
                    height="46"
                  />
                  <path
                    d={`M${88 + i * 125} ${i === 1 ? 172 : 194}h54`}
                    stroke="#b4d4e2"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </g>
              ))}
              <ArrowRight x="176" y="128" width="24" height="24" />
              <ArrowRight x="301" y="128" width="24" height="24" />
            </g>
          )}
          {layout === 'modules' && (
            <g>
              <path
                className={motion.flow}
                d="M240 140 122 77m118 63 122-63m-122 63-118 65m118-65 122 65"
                stroke="#008c9e"
                strokeWidth="3"
                strokeDasharray="6 6"
              />
              {[Secondary, Final, Database, FileCheck2].map((Icon, i) => (
                <g key={i}>
                  <rect
                    x={i % 2 ? 328 : 88}
                    y={i < 2 ? 45 : 173}
                    width="66"
                    height="62"
                    rx="12"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <Icon
                    x={i % 2 ? 344 : 104}
                    y={i < 2 ? 59 : 187}
                    width="34"
                    height="34"
                  />
                </g>
              ))}
              <rect
                x="186"
                y="88"
                width="108"
                height="104"
                rx="24"
                fill="white"
                stroke="#008c9e"
                strokeWidth="3"
              />
              <Primary x="213" y="113" width="54" height="54" />
            </g>
          )}
          {(layout === 'workspace' ||
            layout === 'dashboard' ||
            layout === 'devices') && (
            <g>
              <rect
                x="103"
                y="47"
                width="270"
                height="171"
                rx="14"
                fill="white"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path d="M103 75h270" stroke="#c9dfe9" strokeWidth="2" />
              <circle cx="121" cy="61" r="4" fill="#008c9e" />
              <circle cx="135" cy="61" r="4" fill="#b4d4e2" />
              {layout === 'dashboard' ? (
                <g>
                  <path d="M127 194h133" stroke="#c9dfe9" strokeWidth="2" />
                  {[48, 76, 100].map((h, i) => (
                    <rect
                      key={h}
                      className={motion.pulse}
                      x={137 + i * 38}
                      y={194 - h}
                      width="24"
                      height={h}
                      rx="5"
                      fill={i === 2 ? '#008c9e' : '#b1d7e8'}
                      style={{ animationDelay: `${i * 0.6}s` }}
                    />
                  ))}
                  <path
                    d="m133 135 35-18 36 8 44-34"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </g>
              ) : (
                <g>
                  <rect
                    x="121"
                    y="91"
                    width="139"
                    height="105"
                    rx="8"
                    fill="#e3f4f7"
                  />
                  <Primary x="164" y="105" width="52" height="52" />
                  <path
                    d="M142 173h94m-94 12h65"
                    stroke="#b4d4e2"
                    strokeWidth="4"
                  />
                </g>
              )}
              <Secondary x="290" y="94" width="43" height="43" />
              <path
                d="M281 157h62m-62 16h45m-45 16h55"
                stroke="#b4d4e2"
                strokeWidth="4"
              />
              <path
                d="M192 231h92"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {layout === 'devices' && (
                <g>
                  <rect
                    x="325"
                    y="127"
                    width="53"
                    height="103"
                    rx="10"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <rect
                    x="333"
                    y="141"
                    width="37"
                    height="64"
                    rx="4"
                    fill="#e3f4f7"
                  />
                  <Smartphone x="338" y="155" width="26" height="33" />
                  <circle cx="352" cy="216" r="3" fill="#008c9e" />
                </g>
              )}
            </g>
          )}
          {layout === 'shelves' && (
            <g>
              <path
                d="M109 79v151m260-151v151M109 148h260M109 222h260"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <g key={i}>
                  <rect
                    x={125 + (i % 3) * 79}
                    y={i < 3 ? 88 : 163}
                    width="59"
                    height="49"
                    rx="6"
                    fill={i % 2 ? 'white' : '#cee9ef'}
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d={`M${145 + (i % 3) * 79} ${i < 3 ? 89 : 164}v14h18v-14`}
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </g>
              ))}
              <circle
                cx="354"
                cy="183"
                r="34"
                fill="white"
                stroke="#008c9e"
                strokeWidth="2"
              />
              <Truck x="334" y="163" width="40" height="40" />
            </g>
          )}
        </g>
        <g transform="translate(378 24)">
          <rect width="51" height="51" rx="15" fill="white" stroke="#c9dfe9" />
          <Primary x="12" y="12" width="27" height="27" />
        </g>
        <circle
          className={motion.pulse}
          cx="64"
          cy="83"
          r="6"
          fill="#008c9e"
          opacity=".6"
        />
        <circle cx="416" cy="210" r="4" fill="#08649e" opacity=".3" />
      </svg>
    </div>
  );
}
export function IllustratedFeatures({
  title,
  items,
}: {
  title: string;
  items: { title: string; body: string; scene: BusinessScene }[];
}) {
  return (
    <section className={`section-shell ${styles.section}`} aria-label={title}>
      <h2>{title}</h2>
      <div className={styles.grid}>
        {items.map((item) => (
          <article key={item.title}>
            <BusinessIllustration scene={item.scene} label={item.title} />
            <div className={styles.copy}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
