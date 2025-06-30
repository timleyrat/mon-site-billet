import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

// Stockage en mémoire pour la démo
const messageStore = new Map();

interface MessagingModalProps {
  open: boolean;
  onClose: () => void;
  ticketId: string;
  sellerId: string;
  buyerId: string;
}

function MessagingModal({ open, onClose, ticketId, sellerId, buyerId }: MessagingModalProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ senderId: string; text: string; timestamp: string; read: boolean }>>(() => {
    const key = `${ticketId}_${buyerId}_${sellerId}`;
    return messageStore.get(key) || [];
  });

  const handleSend = () => {
    if (!input.trim()) return;
    const key = `${ticketId}_${buyerId}_${sellerId}`;
    const newMsg = {
      senderId: buyerId,
      text: input,
      timestamp: new Date().toISOString(),
      read: false,
    };
    const updated = [...messages, newMsg];
    messageStore.set(key, updated);
    setMessages(updated);
    setInput("");
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><MessageCircle className="w-5 h-5" /> Messagerie avec le vendeur</h2>
        <div className="h-48 overflow-y-auto border rounded p-2 mb-4 bg-gray-50">
          {messages.length === 0 && <div className="text-gray-400 text-sm text-center mt-12">Aucun message pour l'instant.</div>}
          {messages.map((msg, i) => (
            <div key={i} className={`mb-2 flex ${msg.senderId === buyerId ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-3 py-2 rounded-lg text-sm ${msg.senderId === buyerId ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700'}`}>
                {msg.text}
                <div className="text-xs text-gray-400 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2 text-sm"
            placeholder="Écrire un message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white">Envoyer</Button>
        </div>
      </div>
    </div>
  );
}

export default function EventDetailPage() {
  const { isAuthenticated, user } = useAuth();
  // Pour la démo, on simule un ticketId et un sellerId
  const ticketId = "demo-ticket-1";
  const sellerId = "demo-seller-1";
  const buyerId = user?.id || "";
  const [showMsg, setShowMsg] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              BilletLibre
            </Link>
            <nav className="flex gap-6">
              <Link href="/tickets" className="text-gray-600 hover:text-blue-600">
                Événements
              </Link>
              <Link href="/mes-billets" className="text-gray-600 hover:text-blue-600">
                Mes Billets
              </Link>
              <Link href="/support" className="text-gray-600 hover:text-blue-600">
                Support
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Bouton retour */}
          <Link href="/tickets">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Retour aux événements
            </button>
          </Link>

          {/* Bouton messagerie */}
          {isAuthenticated && (
            <Button onClick={() => setShowMsg(true)} className="mb-6 bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 hover:text-blue-900 font-semibold flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Contacter le vendeur
            </Button>
          )}
          <MessagingModal open={showMsg} onClose={() => setShowMsg(false)} ticketId={ticketId} sellerId={sellerId} buyerId={buyerId} />

          {/* État vide */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🎫</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Événement non trouvé
              </h1>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                L'événement que vous recherchez n'existe pas ou a été supprimé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tickets">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Voir tous les événements
                  </Button>
                </Link>
                <Link href="/creer-evenement">
                  <Button variant="outline">
                    Créer un événement
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 