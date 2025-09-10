import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import AppNavbar from "../components/Navbar"; // Import the Navbar component
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mi Tienda",
  description: "Venta de celulares y accesorios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <AppNavbar /> {/* Render the Navbar here */}
          {children}
          <footer className="bg-dark text-white text-center py-3 mt-5">
            <div className="container">
              <p>&copy; 2025 Mercado Ventas. Todos los derechos reservados.</p>
              <p>
                <a href="#" className="text-white mx-2">Acerca de</a> |
                <a href="#" className="text-white mx-2">Términos y Condiciones</a> |
                <a href="#" className="text-white mx-2">Política de Privacidad</a>
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
