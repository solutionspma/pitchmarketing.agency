import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCustomer(email, name) {
  return await stripe.customers.create({ email, name });
}

export async function createCheckoutSession(customerId, priceId, successUrl, cancelUrl) {
  return await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl
  });
}

export async function createPaymentLink(priceId) {
  return await stripe.paymentLinks.create({
    line_items: [{ price: priceId, quantity: 1 }]
  });
}

export async function getSubscription(subscriptionId) {
  return await stripe.subscriptions.retrieve(subscriptionId);
}

export async function cancelSubscription(subscriptionId) {
  return await stripe.subscriptions.cancel(subscriptionId);
}

export async function createInvoice(customerId, items) {
  const invoice = await stripe.invoices.create({
    customer: customerId,
    auto_advance: true
  });
  
  for (const item of items) {
    await stripe.invoiceItems.create({
      customer: customerId,
      invoice: invoice.id,
      amount: item.amount,
      currency: 'usd',
      description: item.description
    });
  }
  
  return await stripe.invoices.finalizeInvoice(invoice.id);
}

export { stripe };
