
"use client";

import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const NewProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const db = getFirestore(app);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!name || !price || !stock || !category) {
      setError('Por favor, completa todos los campos obligatorios.');
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'products'), {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        category,
        imageUrl,
        createdAt: new Date(),
      });
      setSuccess('¡Producto agregado con éxito! Redirigiendo...');
      setTimeout(() => {
        router.push('/admin/dashboard'); // Or wherever you list products
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('Error al agregar el producto. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Card>
        <Card.Header as="h2">Agregar Nuevo Producto</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="productPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="productStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="productCategory">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productImageUrl">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Agregando...' : 'Agregar Producto'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewProductPage;
