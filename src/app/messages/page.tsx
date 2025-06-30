import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

// Stockage en mémoire partagé (doit être identique à celui du Header)
const messageStore = typeof window !== 'undefined' ? (window as any)._msgStore || ((window as any)._msgStore = new Map()) : new Map();

export default function MessagesPage() {
  const { isAuthenticated, user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;
    // Récupère toutes les conversations où l'utilisateur est acheteur ou vendeur
    const convs: any[] = [];
    messageStore.forEach((msgs: any[], key: string) => {
      if (key.includes(user.id)) {
        const lastMsg = msgs[msgs.length - 1];
        const unread = msgs.some(m => m.senderId !== user.id && !m.read);
        convs.push({
          key,
          ticketId: key.split('_')[0],
          otherUser: key.includes(user.id) ? (key.split('_')[1] === user.id ? key.split('_')[2] : key.split('_')[1]) : '',
          lastMsg,
          unread,
        });
      }
    });
    setConversations(convs);
  }, [isAuthenticated, user?.id]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 sm:p-8 rounded shadow text-center mx-4">
          <p className="text-gray-700 mb-4 text-sm sm:text-base">Vous devez être connecté pour accéder à la messagerie.</p>
          <Link href="/connexion" className="text-blue-600 font-semibold text-sm sm:text-base">Se connecter</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-6 sm:py-10 px-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          Messagerie
        </h1>
        {conversations.length === 0 ? (
          <div className="text-gray-500 text-center mt-10 sm:mt-20 text-sm sm:text-base">Aucune conversation pour l'instant.</div>
        ) : (
          <ul className="divide-y divide-gray-200 bg-white rounded shadow">
            {conversations.map((conv, i) => (
              <li key={i} className="flex items-center justify-between px-3 sm:px-4 py-3 hover:bg-blue-50 transition">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">Annonce : {conv.ticketId}</div>
                  <div className="text-xs sm:text-sm text-gray-500 truncate max-w-xs">{conv.lastMsg?.text || "(aucun message)"}</div>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  {conv.unread && <span className="inline-block w-2 h-2 rounded-full bg-red-600" title="Nouveau message"></span>}
                  <Link href={`/tickets/${conv.ticketId}?msg=1`} className="text-blue-600 font-semibold text-xs sm:text-sm hover:underline whitespace-nowrap">Ouvrir</Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 