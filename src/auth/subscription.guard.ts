import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private stripeService: StripeService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // supondo que você já tenha autenticação
    if (!user.stripeSubscriptionId) return false;

    const subscription = await this.stripeService.getSubscription(
      user.stripeSubscriptionId,
    );
    return subscription.status === 'active';
  }
}
