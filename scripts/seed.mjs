import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, writeBatch, Timestamp } from 'firebase/firestore';

// IMPORTANT: This uses the configuration from your request.
const firebaseConfig = {
  apiKey: "AIzaSyBkV1n2CcD5BwvmAsgtQGkx7YrBbxr6brs",
  authDomain: "mi-tienda-d620f.firebaseapp.com",
  projectId: "mi-tienda-d620f",
  storageBucket: "mi-tienda-d620f.firebasestorage.app",
  messagingSenderId: "847383963862",
  appId: "1:847383963862:web:0ea0335e5e3feedaba4177",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Sample Data ---

const products = [
  // Celulares
  {
    name: 'Smartphone X Pro',
    description: 'El último modelo con cámara de 108MP, pantalla AMOLED de 6.7 pulgadas y 256GB de almacenamiento.',
    price: 999.99,
    stock: 50,
    category: 'Celulares',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Smartphone+X+Pro',
    createdAt: Timestamp.now()
  },
  {
    name: 'Smartphone Gama Media Z',
    description: 'Excelente relación calidad-precio. Pantalla de 6.5 pulgadas, 128GB de almacenamiento y batería de larga duración.',
    price: 450.00,
    stock: 120,
    category: 'Celulares',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Smartphone+Z',
    createdAt: Timestamp.now()
  },
  // Accesorios
  {
    name: 'Auriculares Inalámbricos TWS',
    description: 'Auriculares con cancelación de ruido activa, hasta 24 horas de batería con el estuche de carga.',
    price: 89.90,
    stock: 200,
    category: 'Accesorios',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Auriculares+TWS',
    createdAt: Timestamp.now()
  },
  {
    name: 'Cargador Rápido 65W GaN',
    description: 'Carga tus dispositivos a máxima velocidad. Compatible con portátiles, tablets y smartphones. Puertos USB-C y USB-A.',
    price: 45.50,
    stock: 150,
    category: 'Accesorios',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Cargador+65W',
    createdAt: Timestamp.now()
  },
  {
    name: 'Funda de Silicona para Smartphone X Pro',
    description: 'Protege tu Smartphone X Pro con esta funda de silicona suave al tacto y resistente a los golpes.',
    price: 19.99,
    stock: 300,
    category: 'Accesorios',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Funda+Silicona',
    createdAt: Timestamp.now()
  },
  {
    name: 'Smartwatch Fit 3',
    description: 'Monitoriza tu actividad física, ritmo cardíaco y sueño. Recibe notificaciones de tu smartphone. Resistente al agua.',
    price: 129.00,
    stock: 80,
    category: 'Accesorios',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Smartwatch+Fit+3',
    createdAt: Timestamp.now()
  }
];

// --- Seeding Function ---

const seedDatabase = async () => {
  console.log('Iniciando la carga de datos de prueba (seeding)...');
  const batch = writeBatch(db);

  try {
    // Seed Products
    console.log('Cargando productos...');
    products.forEach(product => {
      const docRef = doc(collection(db, 'products'));
      batch.set(docRef, product);
    });

    await batch.commit();
    console.log('--- ¡Carga de datos completada con éxito! ---');

  } catch (error) {
    console.error('Error durante la carga de datos:', error);
  }
};

seedDatabase().then(() => {
    console.log("Script de seeding finalizado.");
    // Forzamos la salida del proceso porque la conexión de Firestore lo mantiene activo.
    process.exit(0);
});
