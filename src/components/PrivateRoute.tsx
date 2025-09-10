'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

interface PrivateRouteProps {
  children: ReactNode;
  roles: Array<'admin' | 'user'>;
}

const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for the auth state to be determined

    if (!user) {
      router.push('/login');
      return;
    }

    if (userProfile && !roles.includes(userProfile.role)) {
      router.push('/'); // Redirect to home if role is not authorized
    }
  }, [user, userProfile, loading, router, roles]);

  if (loading || !user || (userProfile && !roles.includes(userProfile.role))) {
    // Show a loading spinner or a placeholder while checking auth
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
