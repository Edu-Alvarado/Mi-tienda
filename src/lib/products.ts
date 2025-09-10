import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export async function getProducts(): Promise<Product[]> {
  const productsCollectionRef = collection(db, "products");
  const productSnapshot = await getDocs(productsCollectionRef);
  const productsList = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
  return productsList;
}
