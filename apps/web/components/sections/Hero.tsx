export default function Hero() {
  return (
    <section className="container stack" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <h2 style={{ fontSize: '2rem', margin: 0 }}>EasyApply</h2>
      <p style={{ color: 'var(--muted)', maxWidth: 640 }}>
        Generate and send job applications in minutes.
      </p>
      <div>
        <a className="btn" href="/home">Get started</a>
      </div>
    </section>
  );
}


