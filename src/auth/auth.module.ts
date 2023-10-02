import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  imports: [
    ConfigModule,
    EmailModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('TOKEN_SECRET'),
          signOptions: { expiresIn: '1m' },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    ConfigService,
    EmailService,
    PrismaService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
