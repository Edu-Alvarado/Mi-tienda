import { getProducts, Product } from "@/lib/products";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <Dashboard products={products} />
    </div>
  );
}