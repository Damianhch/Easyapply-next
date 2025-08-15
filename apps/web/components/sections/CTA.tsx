export default function CTA() {
  return (
    <section className="container card" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h3 style={{ marginTop: 0, marginBottom: 8 }}>Ready to apply?</h3>
          <p style={{ color: 'var(--muted)', margin: 0 }}>Start the short flow and we take care of the rest.</p>
        </div>
        <a className="btn" href="/sections/hero">Open</a>
      </div>
    </section>
  );
}


