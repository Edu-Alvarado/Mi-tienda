"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSearch } from '@/context/SearchContext';
import { auth } from '@/lib/firebase';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const AppNavbar: React.FC = () => {
  const { user, userProfile } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsDropdownVisible(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/search?q=${searchQuery}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
          setIsDropdownVisible(true);
        } else {
          setSearchResults([]);
          setIsDropdownVisible(false);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
        setIsDropdownVisible(false);
      }
    };

    const debounceTimeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleLogout = async () => {
    await auth.signOut();
  };

  const handleResultClick = (productId: string) => {
    setSearchQuery('');
    setIsDropdownVisible(false);
    router.push(`/products/${productId}`);
  };

  return (
    <header className="ml-navbar">
      <Container fluid>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <Link href="/" passHref>
              <span style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.5rem' }}>Mercado Ventas</span>
            </Link>
            <div className="ml-search-container" style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Buscar productos, marcas y más..." 
                className="ml-search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsDropdownVisible(searchQuery.length > 0 && searchResults.length > 0)}
                onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
              />
              <button className="ml-search-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
              {isDropdownVisible && (
                <div className="search-results-dropdown">
                  {searchResults.length > 0 ? (
                    searchResults.map(product => (
                      <div key={product.id} className="search-result-item" onMouseDown={() => handleResultClick(product.id)}>
                        <img src={product.imageUrl} alt={product.name} width={40} height={40} />
                        <div className="product-info">
                          <span>{product.name}</span>
                          <span>${product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-results">No se encontraron resultados.</div>
                  )}
                </div>
              )}
            </div>
            {user && (
              <div className="d-flex align-items-center">
                <span className="me-3">Hola, {userProfile?.name || user.email}</span>
                <Button variant="light" size="sm" onClick={handleLogout}>Salir</Button>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center align-items-center mt-2">
            <nav className="ml-nav-links">
              {userProfile?.role === 'admin' ? (
                <>
                  <Link href="/admin/dashboard" className="ml-nav-link">Dashboard</Link>
                  <Link href="/admin/products" className="ml-nav-link">Productos</Link>
                  <Link href="/admin/orders" className="ml-nav-link">Órdenes</Link>
                  <Link href="/admin/users" className="ml-nav-link">Clientes</Link>
                </>
              ) : (
                <>
                  <Link href="#categories" className="ml-nav-link">Categorías</Link>
                  {user ? (
                    <Link href="/profile" className="ml-nav-link">Mi Perfil</Link>
                  ) : (
                    <Link href="/login" className="ml-nav-link">Mi Cuenta</Link>
                  )}
                  <Link href="#cart" className="ml-nav-link">Carrito</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </Container>
      <style jsx>{`
        .search-results-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: white;
          border: 1px solid #ccc;
          border-top: none;
          z-index: 1000;
          max-height: 300px;
          overflow-y: auto;
        }
        .search-result-item {
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
        }
        .search-result-item:hover {
          background-color: #f0f0f0;
        }
        .search-result-item img {
          margin-right: 10px;
          border-radius: 4px;
        }
        .product-info {
          display: flex;
          flex-direction: column;
          color: black;
        }
        .product-info span:first-child {
          font-weight: bold;
        }
        .no-results {
          padding: 10px;
          color: #666;
        }
      `}</style>
    </header>
  );
};

export default AppNavbar;