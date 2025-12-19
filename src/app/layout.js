import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Velvetaire",
  description: "The newest cool clothing store",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" }
    ],
  },
};

// export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <p style={{ textAlign: "center" }}>This is not a real store. It's just an educational project!</p>
        <Header />
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
