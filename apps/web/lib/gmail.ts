type SendEmailInput = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
};

function getBaseUrl(): string {
  const url = process.env.GMAIL_BACKEND_URL;
  if (!url) throw new Error('GMAIL_BACKEND_URL is not set');
  return url.replace(/\/$/, '');
}

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const key = process.env.GMAIL_BACKEND_API_KEY;
  if (key) headers['Authorization'] = `Bearer ${key}`;
  return headers;
}

export async function listMessages(params: { q?: string; pageToken?: string } = {}) {
  const base = getBaseUrl();
  const query = new URLSearchParams();
  if (params.q) query.set('q', params.q);
  if (params.pageToken) query.set('pageToken', params.pageToken);
  const res = await fetch(`${base}/emails/list?${query.toString()}`, {
    method: 'GET',
    headers: authHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`GmailBackend list failed: ${res.status}`);
  return res.json();
}

export async function getMessage(id: string) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/emails/${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: authHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`GmailBackend get failed: ${res.status}`);
  return res.json();
}

export async function sendEmail(input: SendEmailInput) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/emails/send`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`GmailBackend send failed: ${res.status}`);
  return res.json();
}


