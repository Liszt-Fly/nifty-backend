import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { SessionService } from './session.service';
@Global()
@Module({
  providers: [StripeService, PrismaService, SessionService],
  exports: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
