import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import Mail, { Options } from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  private transporter: Mail;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(options: Options): Promise<void> {
    await this.transporter.sendMail({
      ...options,
      envelope: {
        from: `<${this.configService.get('EMAIL_SERVICE')}>`,
        to: options.to.toString(),
      },
    });
  }
}
