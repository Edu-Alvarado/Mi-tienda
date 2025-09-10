import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBkV1n2CcD5BwvmAsgtQGkx7YrBbxr6brs",
  authDomain: "mi-tienda-d620f.firebaseapp.com",
  projectId: "mi-tienda-d620f",
  storageBucket: "mi-tienda-d620f.firebasestorage.app",
  messagingSenderId: "847383963862",
  appId: "1:847383963862:web:0ea0335e5e3feedaba4177",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Datos de Ejemplo ---

const users = [
  {
    uid: 'pMDSocbws4QAwke1kn1cIJi7ze03',
    name: 'Administrador Principal',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    uid: 'VCblwrC3b7Y6NELqzeXEKcMuVpu1',
    name: 'Usuario de Prueba',
    email: 'user@example.com',
    role: 'user',
  },
];

// --- Función de Carga ---

const seedUsers = async () => {
  console.log('Iniciando la carga de usuarios de prueba...');

  try {
    for (const user of users) {
      if (user.uid.startsWith('REEMPLAZAR')) {
        console.error(`
ERROR: Reemplaza el UID para el usuario ${user.name} en el script seed-users.mjs.
`);
        continue; // Salta este usuario si el UID no ha sido reemplazado
      }
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, user);
      console.log(`Usuario '${user.name}' añadido con el rol '${user.role}'.`);
    }
    console.log('\n--- ¡Carga de usuarios completada con éxito! ---');

  } catch (error) {
    console.error('Error durante la carga de usuarios:', error);
  }
};

seedUsers().then(() => {
  console.log("Script de carga de usuarios finalizado.");
  process.exit(0);
});
