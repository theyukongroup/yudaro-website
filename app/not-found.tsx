import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="section-shell search-hero">
      <div>
        <span className="section-index">404 / PAGE NOT FOUND</span>
        <h1>Let’s find the right place.</h1>
        <p>
          This address does not match a Yudaro page. Explore our services,
          browse the resource library, or contact the team.
        </p>
        <div className="actions">
          <Link className="button primary" href="/solutions">
            Explore solutions
          </Link>
          <Link className="button secondary" href="/resources">
            Browse resources
          </Link>
          <Link href="/contact">Contact Yudaro</Link>
        </div>
      </div>
    </main>
  );
}
