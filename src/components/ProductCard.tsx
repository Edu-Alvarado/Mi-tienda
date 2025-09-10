'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Props actualizadas para el nuevo diseño
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    // Campos opcionales inspirados en Mercado Libre
    originalPrice?: number;
    discountPercentage?: number;
    freeShipping?: boolean;
    installments?: {
      quantity: number;
      amount: number;
    };
  };
  isAdmin?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAdmin = false }) => {
  return (
    <div className="ml-product-card">
      <div className="product-image-container">
        <Image 
          src={product.imageUrl || '/placeholder.png'} 
          alt={product.name} 
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="card-body">
        <p className="product-name">{product.name}</p>
        
        <div className="mt-auto">
          <div className="ml-price-container">
            {product.originalPrice && (
              <span className="ml-price-original">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="ml-price-discounted">${product.price.toFixed(2)}</span>
            {product.discountPercentage && (
              <span className="ml-discount-badge">{product.discountPercentage}% OFF</span>
            )}
          </div>

          {product.freeShipping && (
            <p className="ml-shipping-free">ENVÍO GRATIS</p>
          )}

          {product.installments && (
            <p className="ml-installments">
              en {product.installments.quantity}x ${product.installments.amount.toFixed(2)} sin interés
            </p>
          )}

          <div className="d-grid gap-2 mt-3">
            {isAdmin ? (
              <>
                <button className="ml-button-add">Editar</button>
                <button className="ml-button-buy" style={{backgroundColor: '#f73e3e'}}>Eliminar</button>
              </>
            ) : (
              <>
                <button className="ml-button-buy">Comprar</button>
                <button className="ml-button-add">Añadir al carrito</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;