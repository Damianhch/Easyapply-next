import type { ComponentType, ReactElement } from 'react';
import Hero from './sections/Hero';
import CTA from './sections/CTA';
import FeatureList from './sections/FeatureList';

export const SectionRegistry: Record<string, ComponentType> = {
  hero: Hero,
  cta: CTA,
  features: FeatureList,
};

export function getSection(slug: string): ReactElement | null {
  const Cmp = SectionRegistry[slug];
  return Cmp ? <Cmp /> : null;
}


