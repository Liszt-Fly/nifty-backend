import {
  BadRequestException,
  Body,
  Controller,
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

    if (event.type === 'customer.subscription.created') {
      console.log(event);
      //关联邮箱帐号,id
      subscription_id = event.data.object.id;
      let user = await this.prismaService.user.findUnique({
        where: {
          email: '1904231450@qq.com',
        },
      });

      if (!user) throw new BadRequestException('不存在该用户');
      this.prismaService.user
        .update({
          data: {
            status: event.data.object.status,
          },
          where: {
            email: '1904231450@qq.com',
          },
        })
        .then(() => {
          console.log('update success');
        });
    }
  }

  @Post('checkout')
  @UseGuards(AuthGuard('jwt'))
  async createCheckout(@Body() checkoutdto: checkoutDto) {
    if (checkoutdto.type == VERSION.MONTHLY) {
      let session = await this.stripeService.stripe.checkout.sessions.create({
        customer_email: checkoutdto.email,
        success_url: 'https://baidu.com',
        mode: 'subscription',
        line_items: [{ price: VERSION_CODE['MONTHLY'], quantity: 1 }],
      });
      return session.url;
    } else if (checkoutdto.type === VERSION.YEARLY) {
      let session = await this.stripeService.stripe.checkout.sessions.create({
        customer_email: checkoutdto.email,
        success_url: 'https://baidu.com',
        mode: 'subscription',
        line_items: [{ price: VERSION_CODE['YEARLY'], quantity: 1 }],
      });
      return session.url;
    }
  }
}
