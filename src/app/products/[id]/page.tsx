
"use client";

import { useEffect, useState } from 'react';
import { doc, getDoc, getDocs, collection, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;
      setLoading(true);
      try {
        const productRef = doc(db, 'products', params.id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = { id: productSnap.id, ...productSnap.data() } as Product;
          setProduct(productData);
          fetchRelatedProducts(productData.category, productData.id);
        } else {
          setError('Producto no encontrado.');
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar el producto.');
      }
      setLoading(false);
    };

    const fetchRelatedProducts = async (category: string, currentProductId: string) => {
      try {
        const q = query(
          collection(db, 'products'),
          where('category', '==', category),
          where('__name__', '!=', currentProductId), // Exclude the current product
          limit(4)
        );
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setRelatedProducts(products);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <Container className="my-5 text-center"><p>Cargando...</p></Container>;
  }

  if (error) {
    return <Container className="my-5 text-center"><p>{error}</p></Container>;
  }

  if (!product) {
    return <Container className="my-5 text-center"><p>Producto no disponible.</p></Container>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
          </Card>
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p className="lead text-muted">{product.category}</p>
          <h3 className="mb-3">${product.price.toFixed(2)}</h3>
          <p>{product.description}</p>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg">Agregar al carrito</Button>
            <Button variant="success" size="lg">Comprar ahora</Button>
          </div>
        </Col>
      </Row>

      {relatedProducts.length > 0 && (
        <div className="mt-5">
          <hr />
          <h3 className="mb-4">Productos Relacionados</h3>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {relatedProducts.map((relatedProduct) => (
              <Col key={relatedProduct.id}>
                <ProductCard product={relatedProduct} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default ProductPage;
