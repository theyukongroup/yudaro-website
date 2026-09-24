export function ArchitectureDiagram({
  variant,
}: {
  variant: 'read' | 'write';
}) {
  const steps =
    variant === 'read'
      ? [
          ['Employee', 'Authenticated request and company scope'],
          ['Policy gateway', 'Validate allowed tool and arguments'],
          ['Evidence sources', 'Permission-filtered documents + live ERP API'],
          ['Answer', 'Source references, filters and retrieval time'],
        ]
      : [
          ['Draft proposal', 'Exact target, values and record version'],
          ['Human approval', 'Authorized reviewer, scope and expiry'],
          ['Revalidation', 'Check rights, current state and retry key'],
          ['ERP execution', 'Apply approved operation and retain receipt'],
        ];
  return (
    <figure className="architecture-diagram">
      <figcaption>
        {variant === 'read'
          ? 'Read path: identity → permitted evidence → grounded answer'
          : 'Write path: proposal → approval → revalidation → execution'}
      </figcaption>
      <ol>
        {steps.map(([title, body], i) => (
          <li key={title}>
            <span className="section-index">0{i + 1}</span>
            <strong>{title}</strong>
            <p>{body}</p>
            {i < steps.length - 1 && (
              <span className="architecture-arrow" aria-hidden="true">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="architecture-note">
        {variant === 'read'
          ? 'The model receives only approved results. A tool request does not grant permission.'
          : 'Approval authorizes a specific proposal. Changed records or revoked access require a new decision.'}
      </p>
    </figure>
  );
}
