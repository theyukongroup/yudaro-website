import Link from 'next/link';
const cycle = [
  ['Ask', 'Employee questions and workplace situations'],
  ['Answer', 'Corporate AI provides source-based guidance'],
  ['Review', 'Employees and managers offer corrections or ratings'],
  ['Approve', 'Authorized leaders review important feedback'],
  ['Improve', 'Approved knowledge is refined and versioned'],
  ['Share', 'Future answers become more consistent and company-aligned'],
] as const;
export function CultureCycle() {
  return (
    <section id="how-it-works" className="culture-process section-shell">
      <span className="section-index">A GOVERNED IMPROVEMENT CYCLE</span>
      <h2>Good questions become better shared guidance.</h2>
      <p>
        Feedback enters a review queue. Authorized approval is the checkpoint
        before organizational knowledge changes.
      </p>
      <ol className="culture-cycle">
        {cycle.map(([title, body], i) => (
          <li key={title} className={i === 3 ? 'culture-approval' : ''}>
            <span aria-hidden="true">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
      <p className="culture-note">
        Learns from governed feedback and approved organizational knowledge.
        Conversations are not automatically added to shared knowledge.
      </p>
    </section>
  );
}
export function CultureHub() {
  return (
    <div
      className="culture-hub"
      aria-label="Departments contribute eligible knowledge through authorized review to role-appropriate guidance"
    >
      <div className="culture-roles">
        {[
          'Sales',
          'Operations',
          'HR',
          'Finance',
          'Customer service',
          'Management',
        ].map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>
      <div className="culture-gate">
        Authorized review &amp; approval <span aria-hidden="true">↓</span>
      </div>
      <div className="culture-core">
        <small>PERMISSION-CONTROLLED</small>
        <strong>Corporate Intelligence</strong>
        <p>Approved knowledge • company values • ERP context</p>
      </div>
      <div className="culture-gate">
        <span aria-hidden="true">↓</span> Source-based guidance for each role
      </div>
    </div>
  );
}
export function CorporateCultureFeature() {
  return (
    <section className="culture-feature section-shell" id="corporate-culture">
      <div>
        <span className="section-index">
          PRIVATE AI + ERP / YOUR COMPANY’S BEST THINKING
        </span>
        <h2>Corporate Culture Intelligence</h2>
        <p className="culture-lead">
          Turn your company’s experience, values, and way of solving problems
          into intelligence every employee can use.
        </p>
        <p>
          Capture your organization’s approved knowledge, leadership principles,
          employee feedback, and proven ways of solving problems. Yudaro helps
          your Corporate AI deliver guidance that sounds less like a generic
          chatbot and more like your company at its best.
        </p>
        <Link className="button primary" href="/corporate-culture-intelligence">
          Explore Corporate Culture Intelligence{' '}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
      <CultureHub />
    </section>
  );
}
export function CultureContext() {
  return (
    <section className="section-shell culture-context">
      <span className="section-index">CORPORATE CULTURE INTELLIGENCE</span>
      <h2>Bring your company’s way of working into everyday guidance.</h2>
      <p>
        Connect approved procedures, leadership principles and operating
        experience with role-appropriate Private AI and ERP context. Yudaro
        scopes a governed review process so authorized people can approve,
        correct or retire shared knowledge. Healthy culture can evolve as your
        business grows.
      </p>
      <Link className="text-link" href="/corporate-culture-intelligence">
        Explore Corporate Culture Intelligence →
      </Link>
    </section>
  );
}
