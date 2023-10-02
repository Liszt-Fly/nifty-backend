import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Stripe } from 'stripe';
@Injectable()
export class StripeService {
  stripe: Stripe;
  constructor(private readonly prismaService: PrismaService) {
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
  async getCustomerEmail(id: string) {
    let customer = await this.stripe.customers.retrieve('cus_OjPwDKmB67taVj');
    return customer['email'];
  }
  async getCustomerIDByEmail(email: string) {
    let customer = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    return customer.customer_id;
  }
}
