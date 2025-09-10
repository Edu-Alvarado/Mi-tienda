import PrivateRoute from '@/components/PrivateRoute';
import { Container, Button } from 'react-bootstrap';
import { getProducts, Product } from "@/lib/products";
import Dashboard from "@/components/Dashboard";
import ProductLoader from '@/components/ProductLoader';
import Link from 'next/link';

const AdminDashboardPage = async () => {
  const products = await getProducts();

  return (
    <PrivateRoute roles={['admin']}>
      <ProductLoader products={products} />
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-center">Panel de Administración</h1>
          <Link href="/admin/products" passHref>
            <Button variant="primary">Administrar Productos</Button>
          </Link>
        </div>
        <Dashboard products={products} isAdmin={true} />
      </Container>
    </PrivateRoute>
  );
};

export default AdminDashboardPage;
