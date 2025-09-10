'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !address || !phone) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name,
        address,
        phone,
        role: 'user',
      });
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user profile to check their role
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data().role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        if (userDoc.data().role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      } else {
        // If the user does not exist in Firestore, create a new user entry
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || '',
          address: '', // Google Sign-In doesn't provide address
          phone: user.phoneNumber || '', // Or phone number
          role: 'user',
        });
        router.push('/');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="p-4 shadow-sm" style={{ maxWidth: '450px', width: '100%' }}>
        <Card.Body>
          <h2 className="text-center mb-4">{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={(e) => e.preventDefault()}>
            {isRegister && (
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu nombre" value={name} onChange={(e) => setName(e.target.value)} required />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña (mín. 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            {isRegister && (
              <>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>Dirección de Envío</Form.Label>
                  <Form.Control type="text" placeholder="Tu dirección" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control type="text" placeholder="Tu número de teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </Form.Group>
              </>
            )}

            <div className="d-grid gap-2">
              <Button variant="primary" onClick={isRegister ? handleRegister : handleLogin} disabled={loading}>
                {loading ? 'Cargando...' : (isRegister ? 'Registrarse' : 'Ingresar')}
              </Button>
              <Button variant="outline-danger" onClick={handleGoogleSignIn} disabled={loading}>
                Continuar con Google
              </Button>
            </div>
          </Form>
          <div className="text-center mt-3">
            <Button variant="link" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? '¿Ya tienes una cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
