'use client';
import { getSection } from '../../../components/SectionRegistry';
import { notFound } from 'next/navigation';
import React, { useEffect } from 'react';

type Params = { params: { slug: string } };

export default function EmbedPage({ params }: Params) {
  const section = getSection(params.slug);
  if (!section) return notFound();

  // Auto-resize for iframe embedding
  useEffect(() => {
    function sendHeight() {
      const height = document.body.scrollHeight;
      window.parent?.postMessage({ type: 'easyapply-embed:resize', height }, '*');
    }
    sendHeight();
    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ padding: 0, margin: 0 }}>
      {section}
    </div>
  );
}


