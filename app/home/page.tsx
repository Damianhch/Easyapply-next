import GmailScrape from '../../components/sections/GmailScrape';
export const metadata = {
  title: 'EasyApply — Apply to jobs in minutes',
  description: 'A fast, embeddable application flow for WordPress and full-page experiences.',
};

export default function HomePage() {
  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <h1 style={{ fontSize: '3rem', lineHeight: 1.1, margin: 0 }}>EasyApply</h1>
      <p style={{ color: 'var(--muted)', maxWidth: 720 }}>
        Welcome to EasyApply. A clean starting point — we’ll add features next.
      </p>
      <GmailScrape />
    </main>
  );
}


