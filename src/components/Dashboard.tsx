"use client";

import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCard from "@/components/ProductCard";
import OfferCarousel from "./OfferCarousel";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

interface DashboardProps {
  products: Product[];
  isAdmin?: boolean;
}

export default function Dashboard({ products, isAdmin = false }: DashboardProps) {
  return (
    <main>
      {!isAdmin && (
        <div className="jumbotron-custom m-3">
          <Container>
            <h1 className="display-4">¡Bienvenido a nuestra tienda!</h1>
            <p className="lead">
              Descubre productos increíbles y ofertas que no querrás perderte.
            </p>
            <hr className="my-4 bg-white" />
            <p>
              Explora nuestro catálogo completo y encuentra lo que estás buscando.
            </p>
            <Button variant="primary" size="lg" href="#productos">
              Explorar productos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-arrow-right-short ms-2"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                />
              </svg>
            </Button>
          </Container>
        </div>
      )}

      <Container className="my-4">
        {!isAdmin && <OfferCarousel products={products} />}

        <h1 id="productos" className="mb-4 text-center">
          {isAdmin ? "Administración de Productos" : "Nuestros Productos"}
        </h1>

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} isAdmin={isAdmin} />
            </Col>
          ))}
        </Row>

        {products.length === 0 && (
          <p className="text-center mt-5">
            {"No hay productos disponibles en este momento."}
          </p>
        )}
      </Container>
    </main>
  );
}
