import { getSection } from '../../../components/SectionRegistry';
import { notFound } from 'next/navigation';

type Params = { params: { slug: string } };

export default function SectionPage({ params }: Params) {
  const section = getSection(params.slug);
  if (!section) return notFound();
  return (
    <main className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      {section}
    </main>
  );
}


