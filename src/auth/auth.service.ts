import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, user } from '@prisma/client';
import { hash, verify } from 'argon2';
import { StripeService } from 'src/stripe/stripe.service';
@Injectable()
export class AuthService {
  prisma: PrismaClient;
  constructor(
    private readonly stripService: StripeService,
    private jwt: JwtService,
  ) {
    this.prisma = new PrismaClient();
  }
  async Login(email: string, password: string) {
    let user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new BadRequestException('当前用户不存在');
    } else {
      if (!(await verify(user.password, password)))
        throw new BadRequestException('用户密码错误');
    }
    return {
      token: await this.token(user),
      email: user.email,
      username: user.username,
    };
  }
  async Register(
    email: string,
    password: string,
    username: string,
    verifyCode: string,
  ) {
    //TODO: 如果用户重复
    let user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user)
      throw new BadRequestException(
        'The user exist,if it belongs you, you can try to login',
      );
    //检验验证码
    let verification = await this.prisma.verification.findUnique({
      where: {
        email,
        verifyCode,
      },
    });
    if (!verification) {
      throw new BadRequestException(
        'The verification code is incorrect,please use the correct one',
      );
    }
    let secret_password = await hash(password);
    let customer = await this.stripService.stripe.customers.create({
      email,
      name: username,
    });

    await this.prisma.user.create({
      data: {
        username,
        email,
        password: secret_password,
        customer_id: customer.id,
      },
    });
  }
  async token({ email, id, username, customer_id }: user) {
    let token = await this.jwt.signAsync({
      email,
      id,
      username,
      customer_id,
    });
    return token;
  }
}
