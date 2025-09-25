import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    const key = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!key) {
      throw new Error('⚠️ STRIPE_SECRET_KEY não encontrado no .env');
    }

    this.stripe = new Stripe(key, {
      apiVersion: '2023-10-16' as any,
    });
  }

  async createCustomer(email: string) {
    return this.stripe.customers.create({ email });
  }

  async createSubscription(customerId: string) {
    return this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
  }

  async getSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.retrieve(subscriptionId);
  }

  async createCheckoutSession(customerId: string, priceId: string) {
    return this.stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
  }
}
