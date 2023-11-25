import { Injectable } from '@nestjs/common';
const nodeMailer = require('nodemailer');

@Injectable()
export class Requests {
  private readonly transporter;

  constructor() {
    this.transporter = nodeMailer.createTransport({
      service: 'Yandex',
      auth: {
        user: 'artemysapin@yandex.ru',
        pass: 'lhmchswwtqbexrhr',
      },
    });
  }

  async sendEmailCode(code: string, email: string): Promise<void> {
    const mailOptions = {
      from: 'artemysapin@yandex.ru',
      to: email,
      subject: 'Авторизация на сервисе',
      text: `Код для авторизации емае: ${code}`,
    };
    this.transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Сообщение sended');
      }
    });
  }
}
