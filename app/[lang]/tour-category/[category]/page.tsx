import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryView from '@/components/views/CategoryView';
import { getCategories } from '@/lib/content';
import { PREFIXED_LOCALES, type Lang } from '@/lib/i18n';
import { pageMeta } from '@/lib/meta';
import { categoryAlternates } from '@/lib/routes';

type Params = Promise<{ lang: string; category: string }>;

export function generateStaticParams() {
  return PREFIXED_LOCALES.flatMap((lang) =>
    getCategories().map((c) => ({ lang, category: c.data.slugs[lang] })),
  );
}
export const dynamicParams = false;

function find(lang: Lang, slug: string) {
  return getCategories().find((c) => c.data.slugs[lang] === decodeURIComponent(slug));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: langParam, category: slug } = await params;
  const lang = langParam as Lang;
  const category = find(lang, slug);
  if (!category) return {};
  return pageMeta({
    lang,
    title: category.data.seo.title[lang],
    description: category.data.seo.description[lang],
    alternates: categoryAlternates(category),
  });
}

export default async function Page({ params }: { params: Params }) {
  const { lang: langParam, category: slug } = await params;
  const lang = langParam as Lang;
  const category = find(lang, slug);
  if (!category) notFound();
  return <CategoryView lang={lang} category={category} />;
}
