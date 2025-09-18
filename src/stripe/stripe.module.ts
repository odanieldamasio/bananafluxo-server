import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';

@Module({
  imports: [ConfigModule],
  providers: [
    StripeService,
    {
      provide: 'STRIPE_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const key = config.get<string>('STRIPE_SECRET_KEY');
        if (!key) throw new Error('STRIPE_SECRET_KEY não definida');
        return new Stripe(key, { apiVersion: '2025-08-27.basil' });
      },
    },
  ],
  exports: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
