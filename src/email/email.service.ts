import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { resourceUsage } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
@Injectable()
export class EmailService {
  currentMap: Map<string, string>;
  customerEmail: string;
  teamEmail: string;
  constructor(private readonly prisma: PrismaService) {
    this.currentMap = new Map();
  }
  init() {
    const transporter = createTransport({
      host: 'smtp.office365.com',
      port: 587,
      requireTLS: true,
      auth: {
        user: 'chron-team@outlook.com',
        pass: 'Qy5211314',
      },
    });
    return transporter;
  }
  async send() {
    let transporter = this.init();
    let customerEmail = '1904231450@qq.com';
    let senderEmail = 'chron-team@outlook.com';
    let generatedValue = v4();
    await transporter.sendMail({
      from: senderEmail,
      to: customerEmail,
      subject: 'nifty account activication',
      html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                #app {
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                }
                .title {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    color: #333
                }
                .section {
                    padding: 30px;
                    width: 100%;
                }
                span {
                    font-weight: bold;
                    font-size: large;
                }
                .account-link {
                    border: solid 1px black;
                    padding: 10px;
                    text-align: center;
                    border-radius: 5px;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div id="app">
                <div class="title">
                    <h1>Welcome to use nifty</h1>
                    <img src="mikes.oss-cn-beijing.aliyuncs.com/uPic/nifty.png" width="50">
                </div>
                <section class="section">
                    <p>Welcome to use nifty,the email verification code is at the below,you can use the code
                        to activate your account</p>
                    <div class="account-link">
                    ${generatedValue}
                    </div>
                </section>
            </div>
        </body>
        </html>`,
    });
    await this.prisma.verification.create({
      data: {
        email: customerEmail,
        verifyCode: generatedValue,
      },
    });
    return generatedValue;
  }
  async validate(account: string, verification: string) {
    const result = await this.prisma.verification.findUnique({
      where: {
        email: account,
        verifyCode: verification,
      },
    });
    return result ? true : false;
  }
}
