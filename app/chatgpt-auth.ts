import 'server-only';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export type ChatGPTUser = { id: string; email: string; name?: string };

export async function getChatGPTUser(): Promise<ChatGPTUser | null> {
  const values = await headers();
  const id = values.get('oai-authenticated-user-id');
  const email = values.get('oai-authenticated-user-email');
  if (!id || !email) return null;
  let name: string | undefined;
  if (values.get('oai-authenticated-user-full-name-encoding') === 'percent-encoded-utf-8') {
    const encoded = values.get('oai-authenticated-user-full-name');
    if (encoded) try { name = decodeURIComponent(encoded); } catch { name = undefined; }
  }
  return { id, email, name };
}

export function chatGPTSignInPath(returnTo = '/account') {
  const safe = returnTo.startsWith('/') && !returnTo.startsWith('//') ? returnTo : '/account';
  return `/signin-with-chatgpt?return_to=${encodeURIComponent(safe)}`;
}

export async function requireChatGPTUser(returnTo = '/account') {
  const user = await getChatGPTUser();
  if (!user) redirect(chatGPTSignInPath(returnTo));
  return user;
}
