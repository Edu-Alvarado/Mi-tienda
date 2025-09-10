import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  originalPrice?: number;
  discountPercentage?: number;
  freeShipping?: boolean;
  installments?: {
    quantity: number;
    amount: number;
  };
}

interface OfferCarouselProps {
  products: Product[];
}

const OfferCarousel: React.FC<OfferCarouselProps> = ({ products }) => {
  console.log("OfferCarousel: products prop", products);
  return (
    <section className="offer-carousel-section">
      <div className="offer-carousel-container">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} passHref>
            <div className="offer-item">
              <div className="offer-image-wrapper">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover" // Use cover for rectangular images
                />
              </div>
              <div className="offer-details">
                <p className="offer-product-name">{product.name}</p>
                <div className="offer-price-container">
                  {product.originalPrice && (
                    <span className="offer-price-original">${product.originalPrice.toFixed(2)}</span>
                  )}
                  <span className="offer-price-discounted">${product.price.toFixed(2)}</span>
                  {product.discountPercentage && (
                    <span className="offer-discount-badge">{product.discountPercentage}% OFF</span>
                  )}
                </div>
                {product.freeShipping && (
                  <p className="offer-shipping-free">ENVÍO GRATIS</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OfferCarousel;
