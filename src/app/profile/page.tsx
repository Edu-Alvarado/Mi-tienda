'use client';

import PrivateRoute from '@/components/PrivateRoute';
import { useAuth } from '@/context/AuthContext';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';

const ProfilePage = () => {
  const { user, userProfile, loading } = useAuth();

  return (
    <PrivateRoute roles={['admin', 'user']}>
      <Container className="py-5">
        <h1 className="text-center mb-4">Mi Perfil</h1>
        <Card className="p-4 shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Card.Body>
            {loading && (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            )}
            {userProfile && (
              <div>
                <p><strong>Nombre:</strong> {userProfile.name}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Rol:</strong> {userProfile.role}</p>
              </div>
            )}
            {!userProfile && !loading && (
              <Alert variant="warning">No se pudo cargar el perfil.</Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </PrivateRoute>
  );
};

export default ProfilePage;
