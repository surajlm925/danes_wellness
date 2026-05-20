import { products } from '@/lib/mockdata';
import ProductDetailClient from '@/components/ProductDetailClient';

export function generateStaticParams() {
  return products
    .filter(p => p.handle)
    .map(p => ({ handle: p.handle }));
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const product = products.find((p) => p.handle === handle);

  return <ProductDetailClient product={product} handle={handle} />;
}
