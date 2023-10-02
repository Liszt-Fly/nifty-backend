import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { checkoutDto } from 'src/dto/CheckoutDto';
import { VERSION, VERSION_CODE } from 'src/enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { StripeService } from './stripe.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('webhook')
  async handleWebhook(@Body() body: any, @Req() request: any) {
    const event = request.body;
    let subscription_id: string;
    let customer_id: string;
    if (event.type === 'customer.subscription.created') {
      //关联邮箱帐号,id
      subscription_id = event.data.object.id;
      customer_id = event.data.object.customer;

      let user = await this.prismaService.user.findUnique({
        where: {
          customer_id,
        },
      });
      if (!user) throw new BadRequestException('不存在该用户');
      await this.prismaService.user.update({
        data: {
          subscription_id,
        },
        where: {
          customer_id,
        },
      });
    }
  }

  @Post('checkout')
  @UseGuards(AuthGuard('jwt'))
  async createCheckout(@Body() checkoutdto: checkoutDto) {
    if (checkoutdto.type == VERSION.MONTHLY) {
      let session = await this.stripeService.stripe.checkout.sessions.create({
        customer: await this.stripeService.getCustomerIDByEmail(
          checkoutdto.email,
        ),
        success_url: 'http://localhost:1421/#/paySuccess',
        cancel_url: 'http://localhost:1421//#/payFail',
        mode: 'subscription',
        line_items: [{ price: VERSION_CODE['MONTHLY'], quantity: 1 }],
      });
      return session.url;
    } else if (checkoutdto.type === VERSION.YEARLY) {
      let session = await this.stripeService.stripe.checkout.sessions.create({
        customer_email: checkoutdto.email,
        success_url: 'http://localhost:1421/#/paySuccess',
        cancel_url: 'http://localhost:1421//#/payFail',
        mode: 'subscription',
        line_items: [{ price: VERSION_CODE['YEARLY'], quantity: 1 }],
      });
      return session.url;
    }
  }
  @Get('subscription')
  async getState() {
    let item = await this.stripeService.stripe.subscriptions.retrieve(
      'sub_1NvzImGrngsfhq5xru28RItJ',
    );
    return item;
  }
  @Get('customer')
  async getCustomer() {
    let customer = await this.stripeService.stripe.customers.retrieve(
      'cus_OjpHlWQE9HgR72',
    );

    return customer;
  }
  @Post('active')
  async hasSubscription(@Body() body: any) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: body.email,
      },
    });
    const subscription = await this.stripeService.stripe.subscriptions.retrieve(
      user.subscription_id,
    );
    if (subscription) {
      return subscription.status === 'active';
    }
    return false;
  }
}
