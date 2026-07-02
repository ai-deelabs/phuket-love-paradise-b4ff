import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryView from '@/components/views/CategoryView';
import { getCategories } from '@/lib/content';
import { pageMeta } from '@/lib/meta';
import { categoryAlternates } from '@/lib/routes';

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.data.slugs.th }));
}
export const dynamicParams = false;

function find(slug: string) {
  return getCategories().find((c) => c.data.slugs.th === decodeURIComponent(slug));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const category = find((await params).category);
  if (!category) return {};
  return pageMeta({
    lang: 'th',
    title: category.data.seo.title.th,
    description: category.data.seo.description.th,
    alternates: categoryAlternates(category),
  });
}

export default async function Page({ params }: { params: Params }) {
  const category = find((await params).category);
  if (!category) notFound();
  return <CategoryView lang="th" category={category} />;
}
