import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWindow from "@/components/shared/chatbot/ChatWindow";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "NexusCommerce Prototipo",
  description: "Prototipo de e-commerce con IA para estudiantes - Nexus Architect Ultra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`min-h-screen bg-background font-sans antialiased \${inter.variable}`}>
        {children}
        <ChatWindow />
      </body>
    </html>
  );
}
