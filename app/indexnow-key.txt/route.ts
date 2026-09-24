export const dynamic = 'force-dynamic';
export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key))
    return new Response('Not found', { status: 404 });
  // Public ownership proof required by IndexNow; never use an account password here.
  return new Response(key, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      'X-Robots-Tag': 'noindex',
    },
  });
}
