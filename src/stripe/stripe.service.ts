import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
@Injectable()
export class StripeService {
  stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(
      'sk_test_51Nj1eLGrngsfhq5xQksE7dITVisaMlxStVVT1UM66TXEv5iewOSKOBrtPcYWqt0orqf4mvzebNdk1oAupbAWTRrb00BEmkfLhf',
      {
        apiVersion: '2023-08-16',
      },
    );
  }
  async getSub() {
    const subscription = await this.stripe.subscriptions.retrieve(
      'sub_1Ns1ZHGrngsfhq5xt4mKmv8G',
    );
    console.log(subscription);
    console.log(new Date(subscription.current_period_end * 1000));
  }
  async getCustomer(email: string) {}
}
