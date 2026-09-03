import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Check, Database, Gauge, HardDrive, Network, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Business Server Equipment',
  description: 'The practical on-premises server platforms Nexavoris recommends for Odoo ERP and private AI workloads.',
};

const aiLink = 'https://www.gmktec.com/products/amd-ryzen%E2%84%A2-ai-max-395-evo-x2-ai-mini-pc';

const sizing = [
  ['01', 'Workload', 'We map users, modules, integrations, automation, and expected peak activity.'],
  ['02', 'Data', 'We account for database growth, document storage, model size, and backup retention.'],
  ['03', 'Resilience', 'We define recovery targets, storage protection, power protection, and remote management.'],
  ['04', 'Headroom', 'We leave practical capacity for new users, larger models, and future workflows.'],
];

export default function Page() {
  return <main>
    <section className="equipment-hero section-shell">
      <div>
        <span className="section-index">OUR EQUIPMENT</span>
        <h1>Practical hardware for systems that stay under your control.</h1>
      </div>
      <p>We match each workload to business-ready equipment—from dependable Odoo hosting to high-memory local AI. Every final configuration is sized around your operation, data, and availability requirements.</p>
    </section>

    <section className="equipment-showcase section-shell">
      <article className="equipment-card equipment-card-odoo">
        <div className="equipment-number">01 / ERP INFRASTRUCTURE</div>
        <div className="equipment-product">
          <Image src="/equipment/hpe-proliant-ml30-gen11.png" alt="HPE ProLiant ML30 Gen11 tower server" width={800} height={600} sizes="(max-width: 800px) 100vw, 330px"/>
          <small>HPE ProLiant ML30 Gen11 shown</small>
        </div>
        <div className="equipment-copy">
          <span className="equipment-tag">Representative server class</span>
          <h2>HPE ProLiant-class Odoo server</h2>
          <p className="equipment-lead">A serviceable, enterprise-oriented platform for the database, applications, files, and integrations that keep Odoo available to your team.</p>
          <div className="equipment-features">
            <span><ShieldCheck size={18}/><b>Business reliability</b><small>ECC memory, protected storage, and a chassis designed for sustained use.</small></span>
            <span><HardDrive size={18}/><b>Storage resilience</b><small>RAID-ready storage and a planned backup path for operational data.</small></span>
            <span><Network size={18}/><b>Serviceability</b><small>Remote administration and room to expand as users and records grow.</small></span>
          </div>
        </div>
      </article>

      <article className="equipment-card equipment-card-ai">
        <div className="equipment-number">02 / PRIVATE AI</div>
        <div className="equipment-product">
          <Image src="/equipment/gmktec-evo-x2.png" alt="GMKtec EVO-X2 compact AI workstation" width={1000} height={1000} sizes="(max-width: 800px) 100vw, 330px"/>
          <small>GMKtec EVO-X2 shown</small>
        </div>
        <div className="equipment-copy">
          <span className="equipment-tag">Recommended reference configuration</span>
          <h2>GMKtec EVO-X2 AI workstation</h2>
          <p className="equipment-lead">A compact local-AI system built around the AMD Ryzen AI Max+ 395, giving private assistants and knowledge tools a capable foundation without a full-size GPU server.</p>
          <div className="spec-strip">
            <span><b>16 cores</b><small>32 threads</small></span>
            <span><b>64 GB</b><small>LPDDR5X unified memory</small></span>
            <span><b>2 TB</b><small>PCIe 4.0 SSD</small></span>
            <span><b>50+ TOPS</b><small>XDNA 2 NPU</small></span>
          </div>
          <ul className="equipment-checks">
            <li><Check size={16}/> Radeon 8060S integrated graphics with 40 RDNA 3.5 compute units</li>
            <li><Check size={16}/> 2.5 GbE, Wi-Fi 7, Bluetooth 5.4, and USB4 connectivity</li>
            <li><Check size={16}/> Well suited to private chat, retrieval, document search, and local inference</li>
          </ul>
          <a className="equipment-link" href={aiLink} target="_blank" rel="noreferrer">View the EVO-X2 on GMKtec <ArrowRight size={16}/></a>
        </div>
      </article>
    </section>

    <section className="workload-band">
      <div className="section-shell workload-grid">
        <div>
          <span className="section-index">ONE NETWORK, DISTINCT JOBS</span>
          <h2>Separate platforms protect performance.</h2>
          <p>ERP is a steady, transaction-heavy system of record. AI is a bursty, memory-intensive compute workload. Running them on purpose-built equipment keeps an AI task from competing with the system your team depends on all day.</p>
        </div>
        <div className="workload-map">
          <span><Database size={21}/><b>Odoo & database</b><small>ProLiant-class server</small></span>
          <i>Secure business network</i>
          <span><Gauge size={21}/><b>Private AI</b><small>EVO-X2 workstation</small></span>
        </div>
      </div>
    </section>

    <section className="section-shell sizing-section">
      <div className="section-head">
        <span className="section-index">RIGHT-SIZED, NOT OVER-SPECIFIED</span>
        <h2>How we select the final configuration.</h2>
        <p>The links above are useful starting points. Before procurement, we validate four things so the equipment fits the business rather than a generic specification sheet.</p>
      </div>
      <div className="sizing-grid">{sizing.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      <p className="equipment-note">Product specifications, pricing, and availability may change. The HPE link represents the class of server used for Odoo deployments; the exact model, storage layout, warranty, and backup design are confirmed during solution planning.</p>
    </section>

    <section className="mini-cta section-shell">
      <div><span className="section-index">PLAN YOUR INFRASTRUCTURE</span><h2>Let’s size the right system for your workload.</h2></div>
      <a className="button primary" href="/contact?service=equipment">Discuss your requirements <ArrowRight size={17}/></a>
    </section>
  </main>;
}
