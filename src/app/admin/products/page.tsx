
import { getProducts, Product } from "@/lib/products";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Administración de Productos</h1>
        <Link href="/admin/products/new" passHref>
          <Button variant="primary">Agregar Producto</Button>
        </Link>
      </div>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} isAdmin={true} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
