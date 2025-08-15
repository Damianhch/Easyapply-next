import type { ComponentType, ReactElement } from 'react';
import Hero from './sections/Hero';
import CTA from './sections/CTA';
import GmailScrape from './sections/GmailScrape';

export const SectionRegistry: Record<string, ComponentType> = {
  hero: Hero,
  cta: CTA,
  gmail: GmailScrape,
};

export function getSection(slug: string): ReactElement | null {
  const Cmp = SectionRegistry[slug];
  return Cmp ? <Cmp /> : null;
}


