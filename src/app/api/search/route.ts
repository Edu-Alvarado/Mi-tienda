
import { NextResponse } from 'next/server';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { app } from '@/lib/firebase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
      return NextResponse.json({ message: 'Query parameter "q" is required' }, { status: 400 });
    }

    const db = getFirestore(app);
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);
    
    const allProducts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const lowerCaseQuery = q.toLowerCase();

    const filteredProducts = allProducts.filter(product => 
      (product.name as string).toLowerCase().includes(lowerCaseQuery)
    );

    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.error("Error searching products:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
