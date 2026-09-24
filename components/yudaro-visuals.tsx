'use client';
import Image from 'next/image';
import { useId, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Boxes,
  Check,
  Database,
  FileText,
  ShoppingCart,
  Users,
  Workflow,
  ShieldCheck,
  Package,
  ChartNoAxesCombined,
  Truck,
  Store,
  Factory,
  ReceiptText,
  Wrench,
} from 'lucide-react';
import { StepTransition } from './motion-system';

export function FlowLine() {
  return (
    <div className="yudaro-flow" data-flow aria-hidden="true">
      <i />
      <span />
      <i />
      <span />
      <i />
      <span />
      <i />
      <ArrowRight size={18} />
    </div>
  );
}

const nodes = [
  {
    name: 'Employees',
    icon: Users,
    copy: 'Ask questions. Make decisions.',
    detail: 'Give people the knowledge and context to do their best work.',
    x: 50,
    y: 12,
  },
  {
    name: 'Private AI',
    icon: BrainCircuit,
    copy: 'Your company’s knowledge, privately deployed.',
    detail:
      'Ground answers in approved documents, permissions, and business context.',
    x: 83,
    y: 36,
  },
  {
    name: 'ERP',
    icon: Boxes,
    copy: 'One operational source of truth.',
    detail: 'Connect sales, purchasing, inventory, and accounting workflows.',
    x: 71,
    y: 80,
  },
  {
    name: 'Company Data',
    icon: Database,
    copy: 'Turn information into usable intelligence.',
    detail: 'Bring the right records and documents into each decision.',
    x: 29,
    y: 80,
  },
  {
    name: 'Automated Processes',
    icon: Workflow,
    copy: 'Let routine work happen automatically.',
    detail:
      'Move approved actions across systems with clear ownership and oversight.',
    x: 17,
    y: 36,
  },
];
export function Ecosystem() {
  const [active, setActive] = useState(1);
  const id = useId();
  return (
    <div className="ecosystem" data-flow>
      <div className="ecosystem-stage">
        <svg
          className="ecosystem-lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {nodes.map((node, i) => (
            <g key={node.name} className={active === i ? 'selected-line' : ''}>
              <path
                d={`M 50 48 Q 50 ${node.y} ${node.x} ${node.y}`}
                className="connection-base"
              />
              <path
                d={`M 50 48 Q 50 ${node.y} ${node.x} ${node.y}`}
                className="connection-pulse"
                style={{ animationDelay: `${i * -0.7}s` }}
              />
            </g>
          ))}
        </svg>
        <div className="ecosystem-core">
          <Image src="/yudaro-mark.png" alt="" width={56} height={64} />
          <strong>Yudaro</strong>
          <span>CONNECT · UNDERSTAND · ACT</span>
        </div>
        {nodes.map((node, i) => (
          <button
            type="button"
            key={node.name}
            className={`ecosystem-node node-${i} ${active === i ? 'selected' : ''}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            aria-pressed={active === i}
            aria-controls={id}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') setActive(i);
            }}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <node.icon size={24} />
            <strong>{node.name}</strong>
            <span>{node.copy}</span>
          </button>
        ))}
      </div>
      <div className="ecosystem-caption" id={id}>
        <span className="status-dot" />
        <p>
          <strong>{nodes[active].name}</strong> — {nodes[active].detail}
        </p>
      </div>
    </div>
  );
}

export function HeroSignal() {
  return (
    <div className="hero-signal" data-flow>
      <div className="signal-photo">
        <Image
          src="/industries/wholesale-distribution.webp"
          alt="Warehouse team coordinating inventory and daily operations"
          fill
          priority
          sizes="(max-width: 1000px) 92vw, 45vw"
        />
        <span className="signal-photo-shade" />
        <div className="signal-photo-copy">
          <span>REAL PEOPLE. CONNECTED OPERATIONS.</span>
          <strong>
            Technology that
            <br />
            makes business move.
          </strong>
        </div>
      </div>
      <div className="signal-tag signal-tag-top">
        <Boxes size={18} />
        <span>
          ERP<small>Your operation, connected</small>
        </span>
        <Check size={16} />
      </div>
      <div className="signal-console">
        <div className="signal-console-top">
          <BrainCircuit size={22} />
          <span>Intelligence in the workflow</span>
          <span className="status-dot" />
        </div>
        <p>“Which inventory items need attention?”</p>
        <div className="signal-route">
          <span>
            <Database size={14} /> ERP data
          </span>
          <i />
          <span>
            <BrainCircuit size={14} /> Private AI
          </span>
          <i />
          <span>
            <Users size={14} /> Your team
          </span>
        </div>
        <div className="signal-result">
          <Check size={16} />
          <span>
            From operational data to a decision.
            <small>Illustrative workflow · Human-approved action</small>
          </span>
          <ArrowUpRight size={20} />
        </div>
      </div>
      <span className="signal-side-label">
        BUILT AROUND YOUR BUSINESS / YUDARO
      </span>
    </div>
  );
}

const questions = [
  {
    q: 'Which products are running low?',
    source: 'ERP / INVENTORY',
    answer:
      'Review on-hand stock against your reorder rules, then prepare a purchasing recommendation for approval.',
    icon: Package,
  },
  {
    q: 'Summarize yesterday’s sales.',
    source: 'ERP / SALES',
    answer:
      'Bring orders, sales activity, and exceptions into a clear summary for your management team.',
    icon: ChartNoAxesCombined,
  },
  {
    q: 'Show the SOP for receiving inventory.',
    source: 'DOCUMENTS / APPROVED SOPs',
    answer:
      'Find the approved receiving procedure and its source so employees can follow the right steps.',
    icon: FileText,
  },
];
export function AIConsole() {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <div className="ai-console" data-flow>
      <div className="console-heading">
        <span>
          <BrainCircuit size={20} /> Your company, in context
        </span>
        <ShieldCheck size={18} />
      </div>
      <fieldset
        className="console-options"
        aria-label="Example Private AI questions"
      >
        {questions.map((q, i) => (
          <button
            type="button"
            key={q.q}
            aria-pressed={i === active}
            aria-controls={id}
            onClick={() => setActive(i)}
          >
            <q.icon size={16} />
            {q.q}
            <ArrowRight size={14} />
          </button>
        ))}
      </fieldset>
      <StepTransition step={active}>
        <div id={id} className="console-answer">
          <span className="console-source">
            <Database size={13} />
            {questions[active].source}
          </span>
          <p>{questions[active].answer}</p>
          <span className="console-grounding">
            <Check size={13} /> Grounded in approved company sources
          </span>
        </div>
      </StepTransition>
      <small className="demo-label">
        Illustrative experience. Connected sources and permissions depend on
        your implementation.
      </small>
    </div>
  );
}
const modules = [
  {
    name: 'Sales & CRM',
    icon: ShoppingCart,
    copy: 'Connect customer relationships, quotations, orders, and follow-up.',
  },
  {
    name: 'Inventory',
    icon: Package,
    copy: 'Coordinate receipts, stock movements, replenishment, and delivery.',
  },
  {
    name: 'Purchasing',
    icon: Truck,
    copy: 'Give buyers supplier information, demand, and approval workflows.',
  },
  {
    name: 'Accounting',
    icon: ReceiptText,
    copy: 'Bring operational transactions and financial records together.',
  },
  {
    name: 'Manufacturing',
    icon: Factory,
    copy: 'Connect materials, production planning, and work orders.',
  },
  {
    name: 'Retail & POS',
    icon: Store,
    copy: 'Connect products, sales, and stock across your retail operation.',
  },
  {
    name: 'Field service',
    icon: Wrench,
    copy: 'Coordinate technicians, parts, work orders, and service history.',
  },
  {
    name: 'People',
    icon: Users,
    copy: 'Keep employee information and the work they own connected.',
  },
];
export function ERPModules() {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <div className="erp-interactive" data-flow>
      <div className="erp-core">
        <Boxes size={32} />
        <strong>
          One connected
          <br />
          ERP platform.
        </strong>
        <span>BUILT AROUND YOUR WORKFLOWS</span>
        <FlowLine />
      </div>
      <div>
        <fieldset
          className="erp-module-buttons"
          aria-label="Explore ERP modules"
        >
          {modules.map((module, i) => (
            <button
              key={module.name}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              aria-controls={id}
            >
              <module.icon size={20} />
              {module.name}
              <ArrowUpRight size={14} />
            </button>
          ))}
        </fieldset>
        <p className="erp-module-copy" id={id}>
          <strong>{modules[active].name}.</strong> {modules[active].copy}
        </p>
      </div>
    </div>
  );
}
const stages = [
  {
    title: 'Order received',
    icon: ShoppingCart,
    copy: 'Customer activity becomes structured business data.',
  },
  {
    title: 'ERP connected',
    icon: Boxes,
    copy: 'Sales and inventory share the same operational context.',
  },
  {
    title: 'AI understands',
    icon: BrainCircuit,
    copy: 'Approved sources inform a useful recommendation.',
  },
  {
    title: 'Team approves',
    icon: Users,
    copy: 'The responsible person reviews sensitive actions.',
  },
  {
    title: 'Work moves',
    icon: Workflow,
    copy: 'An approved workflow carries the next step forward.',
  },
];
export function WorkflowDemo() {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <div className="workflow-demo" data-flow>
      <fieldset
        className="workflow-stages"
        aria-label="Explore an illustrative order workflow"
      >
        {stages.map((stage, i) => (
          <button
            type="button"
            key={stage.title}
            className={i === active ? 'selected' : ''}
            style={{ animationDelay: `${i * 1.2}s` }}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-controls={id}
          >
            <span className="workflow-number">0{i + 1}</span>
            <stage.icon size={27} />
            <strong>{stage.title}</strong>
            <ArrowRight className="workflow-arrow" size={18} />
          </button>
        ))}
      </fieldset>
      <p id={id}>
        <span className="section-index">FROM INSIGHT TO ACTION</span>
        <strong>{stages[active].copy}</strong>
        <small>
          Illustrative workflow. Permissions and human approvals stay in the
          loop.
        </small>
      </p>
    </div>
  );
}

export function KineticWords() {
  return (
    <>
      <span className="search-sr-only">
        Connect. Understand. Automate. Grow.
      </span>
      <span className="kinetic-words" aria-hidden="true">
        <span>
          {['Connect.', 'Understand.', 'Automate.', 'Grow.'].map((word, i) => (
            <b key={word} style={{ animationDelay: `${i * 3}s` }}>
              {word}
            </b>
          ))}
        </span>
      </span>
    </>
  );
}
