'use client';
import { useState, FormEvent, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import { CornerDownLeft, MessageCircle, X } from "lucide-react"; // Iconos

export interface Message { id: string; role: "user" | "assistant" | "system"; content: string; }

const getSimulatedResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  if (lowerMessage.includes("hola") || lowerMessage.includes("saludos")) return "¡Hola! Soy NexusBot, tu asistente virtual. ¿Cómo puedo ayudarte hoy con nuestros innovadores productos?";
  if (lowerMessage.includes("producto") && (lowerMessage.includes("ejemplo 1") || lowerMessage.includes("3d"))) return "El Producto Ejemplo 1 es uno de nuestros destacados. Cuenta con un visor 3D interactivo para que lo explores a detalle. Su precio es $99.99. ¿Te gustaría saber algo más sobre él?";
  if (lowerMessage.includes("producto") && lowerMessage.includes("ejemplo 2")) return "El Producto Ejemplo 2 es una excelente opción si buscas algo más tradicional. Su precio es $49.50. ¡Es muy popular!";
  if (lowerMessage.includes("precio")) return "Los precios varían según el producto. Por ejemplo, el 'Producto Ejemplo 1 (con 3D)' cuesta $99.99 y el 'Producto Ejemplo 2 (solo imagen)' cuesta $49.50. ¿Tienes alguno en mente?";
  if (lowerMessage.includes("gracias") || lowerMessage.includes("agradezco")) return "¡De nada! Ha sido un placer ayudarte. Si tienes más preguntas, no dudes en consultarme.";
  if (lowerMessage.includes("adios") || lowerMessage.includes("hasta luego")) return "¡Hasta pronto! Que tengas un excelente día explorando NexusCommerce.";
  if (lowerMessage.includes("modelos 3d") || lowerMessage.includes("visor 3d")) return "¡Claro! El Producto Ejemplo 1 cuenta con un visor 3D. Puedes interactuar con él directamente en su página de detalle. Es una forma fantástica de ver el producto desde todos los ángulos.";
  return "Lo siento, soy un bot en desarrollo y mi conocimiento es limitado. Intenta preguntarme sobre el 'Producto Ejemplo 1' o el 'visor 3D'.";
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "assistant", content: "¡Bienvenido a NexusCommerce (Prototipo Estudiantil)! Soy NexusBot. ¿En qué puedo ayudarte?"}
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const botResponseContent = getSimulatedResponse(currentInput);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: botResponseContent };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);
    }, 800 + Math.random() * 400);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 text-3xl shadow-lg z-50 flex items-center justify-center"
        aria-label="Abrir chat"
        variant="default"
      >
        <MessageCircle size={30} />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-96 h-[calc(100%-4rem)] sm:h-[550px] bg-white border border-gray-300 rounded-none sm:rounded-lg shadow-xl flex flex-col z-50">
      <div className="p-3 bg-primary text-primary-foreground border-b border-gray-300 rounded-t-none sm:rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold text-lg">NexusBot Asistente</h3>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary/80">
          <X size={20} />
        </Button>
      </div>
      <ScrollArea className="flex-grow p-4" viewportRef={scrollViewportRef}>
        <div className="space-y-4">
          {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
          {isLoading && <ChatMessage message={{id: "loading", role: "assistant", content: "..."}} />}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex items-center space-x-2 bg-gray-50 rounded-b-none sm:rounded-b-lg">
        <Input
          ref={inputRef}
          type="text" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..." className="flex-grow"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !input.trim()} size="icon" aria-label="Enviar mensaje">
          <CornerDownLeft size={20}/>
        </Button>
      </form>
    </div>
  );
}
