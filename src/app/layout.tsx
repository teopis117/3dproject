// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import ChatWindow from "@/components/shared/chatbot/ChatWindow"; // Asumiendo que este componente existe y está estilizado
import { cn } from "@/lib/utils";
// import { ThemeProvider } from "@/components/theme-provider"; // Si añades un ThemeProvider

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Nexus Prototipo E-commerce",
    template: "%s | Nexus Prototipo",
  },
  description: "Prototipo de e-commerce con enfoque administrativo y funcionalidades de IA.",
  icons: {
    icon: "/favicon.ico", // Asegúrate de tener favicon.ico en la carpeta public/
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
          {children}
          <ChatWindow /> {/* Chatbot global */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}