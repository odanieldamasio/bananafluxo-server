import { Controller, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import Stripe from 'stripe';

@Controller('stripe')
export class StripeWebhookController {
  private stripe: Stripe;

  constructor(private readonly config: ConfigService) {
    const key = this.config.get<string>('STRIPE_SECRET_KEY');
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    this.stripe = new Stripe(key, {
      apiVersion: '2023-10-16' as any, // força cast para evitar erro
    });
  }

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');

    if (!sig || !webhookSecret) {
      return res.status(400).send('Missing Stripe signature or webhook secret');
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.body, // ⚠️ lembre: precisa do bodyParser.raw() no main.ts
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // 🔔 Tratar eventos importantes de assinatura
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('✅ Checkout finalizado:', event.data.object);
        break;

      case 'invoice.paid':
        console.log('💰 Assinatura paga:', event.data.object);
        break;

      case 'customer.subscription.updated':
        console.log('🔄 Assinatura atualizada:', event.data.object);
        break;

      case 'customer.subscription.deleted':
        console.log('❌ Assinatura cancelada:', event.data.object);
        break;

      default:
        console.log(`ℹ️ Evento não tratado: ${event.type}`);
    }

    res.json({ received: true });
  }
}
