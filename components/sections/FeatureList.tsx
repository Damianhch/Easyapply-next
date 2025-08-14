const features = [
  { title: 'Embeddable', desc: 'Works seamlessly inside WordPress via iframe loader.' },
  { title: 'Server-driven', desc: 'Server routes generate and send applications.' },
  { title: 'Persisted', desc: 'Store submissions in Supabase via Prisma.' },
];

export default function FeatureList() {
  return (
    <section className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="grid grid-3">
        {features.map((f) => (
          <div key={f.title} className="card">
            <strong>{f.title}</strong>
            <p style={{ color: 'var(--muted)' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


