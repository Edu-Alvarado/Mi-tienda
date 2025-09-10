"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, products, setProducts }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
