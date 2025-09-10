"use client";

import { useEffect } from 'react';
import { useSearch } from '@/context/SearchContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

interface ProductLoaderProps {
  products: Product[];
}

const ProductLoader = ({ products }: ProductLoaderProps) => {
  const { setProducts } = useSearch();

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  return null;
};

export default ProductLoader;
