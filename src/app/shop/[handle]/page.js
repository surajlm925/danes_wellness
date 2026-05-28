import products from '@/lib/products.json';
import ProductDetailClient from '@/components/ProductDetailClient';

export function generateStaticParams() {
  return products
    .filter(p => p.slug)
    .map(p => ({ handle: p.slug }));
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const product = products.find((p) => p.slug === handle);

  return <ProductDetailClient product={product} handle={handle} />;
}
