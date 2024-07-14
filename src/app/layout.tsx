import { Inter } from "next/font/google";
import "@/app/css/style.css";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Recipe Creator",
  description: "Create tasty dishes with the groceries you have at home!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}