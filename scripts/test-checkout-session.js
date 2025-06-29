require('dotenv').config({ path: '.env.local' });

console.log('🧪 Test de création de session de paiement Stripe...\n');

// Configuration Stripe côté serveur
const Stripe = require('stripe');

if (!process.env.STRIPE_SECRET_KEY) {
  console.log('❌ STRIPE_SECRET_KEY non définie');
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-05-28.basil',
});

// Ticket de test
const testTicket = {
  id: 'test_ticket_123',
  title: 'Concert de Jazz Test',
  description: 'Un concert de jazz exceptionnel pour tester le système',
  price: 2500, // 25€ en centimes
  sellerId: 'seller_123',
  eventDate: '2024-12-25T20:00:00Z',
  location: 'Sunset Jazz Club, Paris',
  quantity: 10,
  image: 'https://example.com/jazz-concert.jpg'
};

console.log('📋 Ticket de test :');
console.log(`- Titre: ${testTicket.title}`);
console.log(`- Prix: ${testTicket.price / 100}€`);
console.log(`- Quantité disponible: ${testTicket.quantity}`);
console.log('');

async function testCheckoutSession() {
  try {
    console.log('🔄 Création de la session de paiement...');
    
    // Calculs
    const commissionAmount = Math.round(testTicket.price * 0.10); // 10%
    const totalAmount = testTicket.price + commissionAmount;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: testTicket.title,
              description: `${testTicket.description} - ${testTicket.location} - ${new Date(testTicket.eventDate).toLocaleDateString('fr-FR')}`,
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Commission BilletLibre (10%)',
              description: 'Frais de service de la plateforme',
            },
            unit_amount: commissionAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tickets`,
      metadata: {
        ticketId: testTicket.id,
        sellerId: testTicket.sellerId,
        quantity: '1',
        commission: commissionAmount.toString(),
        originalPrice: testTicket.price.toString(),
        totalAmount: totalAmount.toString(),
      },
    });
    
    console.log('✅ Session créée avec succès !');
    console.log(`Session ID: ${session.id}`);
    console.log(`URL de paiement: ${session.url}`);
    console.log(`Montant total: ${session.amount_total / 100}€`);
    console.log('');
    console.log('🎉 Test de création de session réussi !');
    console.log('L\'achat de billet devrait maintenant fonctionner.');
    
  } catch (error) {
    console.log('❌ Erreur lors de la création de la session :');
    console.log(error.message);
    console.log('');
    console.log('🔧 Détails de l\'erreur :');
    console.log(error);
  }
}

testCheckoutSession(); 