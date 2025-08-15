'use client';
import React from 'react';

export default function GmailScrape() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);

  async function handleScrape() {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch('/api/gmail/list?q=in:inbox', { cache: 'no-store' });
      if (!res.ok) throw new Error('Scrape failed with status ' + res.status);
      const data = await res.json();
      const count = Array.isArray(data?.messages)
        ? data.messages.length
        : Array.isArray(data?.items)
        ? data.items.length
        : typeof data?.total === 'number'
        ? data.total
        : 0;
      setMessage(`Scrape succeeded. Found ${count} messages.`);
    } catch (e: any) {
      setError(e?.message || 'Something went wrong while scraping.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card" style={{ marginTop: '2rem' }}>
      <h3 style={{ marginTop: 0 }}>Gmail Scrape</h3>
      <p style={{ color: 'var(--muted)', marginTop: 0 }}>Click the button to fetch inbox data via your Gmail backend.</p>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button className="btn" onClick={handleScrape} disabled={loading}>
          {loading ? 'Running…' : 'Run scrape'}
        </button>
        {message && <span style={{ color: '#22c55e' }}>{message}</span>}
        {error && <span style={{ color: '#f87171' }}>{error}</span>}
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: '0.5rem' }}>
        Tip: ensure GMAIL_BACKEND_URL is set in your environment.
      </p>
    </section>
  );
}


