import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import CartDrawer from "@/components/Cart/CartDrawer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Product Showcase | Premium Products",
    template: "%s | Product Showcase",
  },
  description:
    "Discover our curated collection of premium products. Shop the latest arrivals with best prices and fast delivery.",
  keywords: ["products", "ecommerce", "online shopping", "best deals"],
  openGraph: {
    title: "Product Showcase",
    description: "Premium products at the best prices",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Showcase",
    description: "Premium products at the best prices",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased font-nunito`} suppressHydrationWarning>
        <AntdRegistry>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

