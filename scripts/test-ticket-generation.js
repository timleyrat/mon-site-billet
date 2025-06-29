const { createTicket, getTicketBySessionId, generatedTickets } = require('../src/lib/ticket-generator.ts');
const QRCode = require('qrcode');
const jsPDF = require('jspdf');

// Types pour les billets générés
class GeneratedTicket {
  constructor(data) {
    this.id = data.id;
    this.ticketId = data.ticketId;
    this.sessionId = data.sessionId;
    this.buyerEmail = data.buyerEmail;
    this.buyerName = data.buyerName;
    this.eventTitle = data.eventTitle;
    this.eventDate = data.eventDate;
    this.eventLocation = data.eventLocation;
    this.price = data.price;
    this.quantity = data.quantity;
    this.ticketNumber = data.ticketNumber;
    this.qrCode = data.qrCode;
    this.pdfUrl = data.pdfUrl;
    this.createdAt = data.createdAt;
    this.isDownloaded = data.isDownloaded;
  }
}

// Simulation de base de données en mémoire pour les billets générés
const generatedTickets = new Map();

// Génération d'un numéro de billet unique
function generateTicketNumber() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `BL-${timestamp}-${random}`.toUpperCase();
}

// Génération d'un QR code pour le billet
async function generateQRCode(ticketData) {
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
}

// Génération du PDF du billet
async function generateTicketPDF(ticket) {
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
}

// Création d'un nouveau billet
async function createTicket(sessionData, ticketData) {
  const ticketNumber = generateTicketNumber();
  
  const ticket = new GeneratedTicket({
    id: `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ticketId: ticketData.ticketId,
    sessionId: sessionData.id,
    buyerEmail: sessionData.customer_details?.email,
    buyerName: sessionData.customer_details?.name,
    eventTitle: ticketData.eventTitle,
    eventDate: ticketData.eventDate,
    eventLocation: ticketData.eventLocation,
    price: sessionData.amount_total,
    quantity: parseInt(ticketData.quantity),
    ticketNumber,
    qrCode: '',
    isDownloaded: false,
    createdAt: new Date(),
  });

  // Générer le QR code
  ticket.qrCode = await generateQRCode(ticket);
  
  // Générer le PDF
  ticket.pdfUrl = await generateTicketPDF(ticket);
  
  // Sauvegarder le billet
  generatedTickets.set(ticket.id, ticket);
  
  return ticket;
}

// Récupération d'un billet par session ID
function getTicketBySessionId(sessionId) {
  return Array.from(generatedTickets.values()).find(ticket => ticket.sessionId === sessionId);
}

async function testTicketGeneration() {
  console.log('🧪 Test de génération de billets...\n');

  try {
    // Données de test
    const sessionData = {
      id: 'cs_test_ticket_generation',
      customer_details: {
        email: 'test@example.com',
        name: 'Utilisateur Test'
      },
      amount_total: 4700
    };

    const ticketData = {
      ticketId: 'ticket_test_1',
      eventTitle: 'Concert de Test',
      eventDate: '2024-12-25T20:00:00Z',
      eventLocation: 'Salle de Test, Paris',
      quantity: 2
    };

    console.log('📋 Données de test:');
    console.log('- Session ID:', sessionData.id);
    console.log('- Email acheteur:', sessionData.customer_details.email);
    console.log('- Événement:', ticketData.eventTitle);
    console.log('- Prix:', (sessionData.amount_total / 100).toFixed(2) + '€');
    console.log('- Quantité:', ticketData.quantity);

    // Générer le billet
    console.log('\n🔄 Génération du billet...');
    const ticket = await createTicket(sessionData, ticketData);

    console.log('\n✅ Billet généré avec succès:');
    console.log('- ID du billet:', ticket.id);
    console.log('- Numéro de billet:', ticket.ticketNumber);
    console.log('- QR Code généré:', ticket.qrCode ? '✅' : '❌');
    console.log('- PDF généré:', ticket.pdfUrl ? '✅' : '❌');
    console.log('- Date de création:', ticket.createdAt.toLocaleString('fr-FR'));

    // Vérifier la récupération
    console.log('\n🔍 Test de récupération du billet...');
    const retrievedTicket = getTicketBySessionId(sessionData.id);
    
    if (retrievedTicket) {
      console.log('✅ Billet récupéré avec succès');
      console.log('- Titre:', retrievedTicket.eventTitle);
      console.log('- Numéro:', retrievedTicket.ticketNumber);
    } else {
      console.log('❌ Erreur: Billet non trouvé');
    }

    // Afficher les statistiques
    console.log('\n📊 Statistiques:');
    console.log('- Nombre total de billets générés:', generatedTickets.size);
    console.log('- Billets en mémoire:', Array.from(generatedTickets.keys()));

    console.log('\n🎉 Test terminé avec succès !');
    console.log('\n💡 Pour tester le téléchargement:');
    console.log('1. Effectuez un achat sur le site');
    console.log('2. Allez sur la page de succès');
    console.log('3. Cliquez sur "Télécharger le billet"');
    console.log('4. Vérifiez que le PDF se télécharge correctement');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
}

// Exécuter le test
testTicketGeneration(); 