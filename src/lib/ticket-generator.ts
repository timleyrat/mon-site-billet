import jsPDF from 'jspdf';
import QRCode from 'qrcode';

// Types pour les billets générés
export interface GeneratedTicket {
  id: string;
  ticketId: string;
  sessionId: string;
  buyerEmail?: string;
  buyerName?: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  price: number;
  quantity: number;
  ticketNumber: string;
  qrCode: string;
  pdfUrl?: string;
  createdAt: Date;
  isDownloaded: boolean;
}

// Types pour les données de session Stripe
interface StripeSessionData {
  id: string;
  customer_details?: {
    email?: string;
    name?: string;
  };
  amount_total: number;
}

// Types pour les données de ticket
interface TicketData {
  ticketId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  quantity: string | number;
}

// Simulation de base de données en mémoire pour les billets générés
export const generatedTickets: Map<string, GeneratedTicket> = new Map();

// Génération d'un numéro de billet unique
export const generateTicketNumber = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `BL-${timestamp}-${random}`.toUpperCase();
};

// Génération d'un QR code pour le billet
export const generateQRCode = async (ticketData: GeneratedTicket): Promise<string> => {
  const qrData = JSON.stringify({
    ticketId: ticketData.ticketId,
    sessionId: ticketData.sessionId,
    ticketNumber: ticketData.ticketNumber,
    eventTitle: ticketData.eventTitle,
    eventDate: ticketData.eventDate,
    buyerEmail: ticketData.buyerEmail,
  });

  try {
    return await QRCode.toDataURL(qrData, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
  } catch (error) {
    console.error('Erreur lors de la génération du QR code:', error);
    return '';
  }
};

// Génération du PDF du billet
export const generateTicketPDF = async (ticket: GeneratedTicket): Promise<string> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Couleurs
  const primaryColor = '#059669'; // emerald-600
  const secondaryColor = '#6B7280'; // gray-500

  // En-tête
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('BilletLibre', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Votre billet d\'événement', 105, 30, { align: 'center' });

  // Informations de l'événement
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ÉVÉNEMENT', 20, 60);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(ticket.eventTitle, 20, 75);
  
  doc.setFontSize(12);
  doc.setTextColor(secondaryColor);
  doc.text(`Date: ${new Date(ticket.eventDate).toLocaleDateString('fr-FR')}`, 20, 85);
  doc.text(`Lieu: ${ticket.eventLocation}`, 20, 95);

  // Informations du billet
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMATIONS BILLET', 20, 120);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Numéro de billet: ${ticket.ticketNumber}`, 20, 135);
  doc.text(`Quantité: ${ticket.quantity}`, 20, 145);
  doc.text(`Prix: ${ticket.price / 100}€`, 20, 155);
  
  if (ticket.buyerName) {
    doc.text(`Acheteur: ${ticket.buyerName}`, 20, 165);
  }
  if (ticket.buyerEmail) {
    doc.text(`Email: ${ticket.buyerEmail}`, 20, 175);
  }

  // QR Code
  if (ticket.qrCode) {
    try {
      const qrImage = new Image();
      qrImage.src = ticket.qrCode;
      
      await new Promise<void>((resolve) => {
        qrImage.onload = () => {
          doc.addImage(qrImage, 'PNG', 140, 120, 40, 40);
          resolve();
        };
      });
      
      doc.setFontSize(10);
      doc.setTextColor(secondaryColor);
      doc.text('Scannez ce QR code', 140, 170);
      doc.text('pour vérifier le billet', 140, 175);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du QR code:', error);
    }
  }

  // Pied de page
  doc.setFillColor(primaryColor);
  doc.rect(0, 250, 210, 47, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('BilletLibre - Plateforme de billetterie sécurisée', 105, 260, { align: 'center' });
  doc.text('Ce billet est valide uniquement pour l\'événement et la date indiqués', 105, 270, { align: 'center' });
  doc.text('En cas de problème, contactez notre support', 105, 280, { align: 'center' });
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`, 105, 290, { align: 'center' });

  // Générer le PDF
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  
  return pdfUrl;
};

// Création d'un nouveau billet
export const createTicket = async (sessionData: StripeSessionData, ticketData: TicketData): Promise<GeneratedTicket> => {
  const ticketNumber = generateTicketNumber();
  
  const ticket: GeneratedTicket = {
    id: `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ticketId: ticketData.ticketId,
    sessionId: sessionData.id,
    buyerEmail: sessionData.customer_details?.email,
    buyerName: sessionData.customer_details?.name,
    eventTitle: ticketData.eventTitle,
    eventDate: ticketData.eventDate,
    eventLocation: ticketData.eventLocation,
    price: sessionData.amount_total,
    quantity: typeof ticketData.quantity === 'string' ? parseInt(ticketData.quantity) : ticketData.quantity,
    ticketNumber,
    qrCode: '',
    isDownloaded: false,
    createdAt: new Date(),
  };

  // Générer le QR code
  ticket.qrCode = await generateQRCode(ticket);
  
  // Générer le PDF
  ticket.pdfUrl = await generateTicketPDF(ticket);
  
  // Sauvegarder le billet
  generatedTickets.set(ticket.id, ticket);
  
  return ticket;
};

// Récupération d'un billet par session ID
export const getTicketBySessionId = (sessionId: string): GeneratedTicket | undefined => {
  return Array.from(generatedTickets.values()).find(ticket => ticket.sessionId === sessionId);
};

// Récupération de tous les billets d'un utilisateur
export const getUserTickets = (email: string): GeneratedTicket[] => {
  return Array.from(generatedTickets.values()).filter(ticket => ticket.buyerEmail === email);
};

// Marquer un billet comme téléchargé
export const markTicketAsDownloaded = (ticketId: string): void => {
  const ticket = generatedTickets.get(ticketId);
  if (ticket) {
    ticket.isDownloaded = true;
    generatedTickets.set(ticketId, ticket);
  }
}; 