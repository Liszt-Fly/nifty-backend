import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class LoginService {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async Login(email: string, password: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
  }
  async Register(email: string, password: string) {
    //TODO: 如果用户重复
    console.log(email, password);
    await this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }
}
