import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('customer')
  async createCustomer(@Body('email') email: string) {
    return this.stripeService.createCustomer(email);
  }

  @Post('subscribe')
  async createSubscription(@Body('customerId') customerId: string) {
    return this.stripeService.createSubscription(customerId);
  }

  @Get('subscription')
  async getSubscription(@Query('id') subscriptionId: string) {
    return this.stripeService.getSubscription(subscriptionId);
  }
}
