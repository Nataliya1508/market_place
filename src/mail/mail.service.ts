import { MailData } from '@app/mail/types/mailData.interface';
import { VerificationTemplateContext } from '@app/mail/types/verificationTemplateContext.interface';
import { MailerService } from '@app/mailer/mailer.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import handlebars from 'handlebars';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendVerificationLetter(
    mailData: MailData<{ token: string }>,
  ): Promise<void> {
    const verificationLink = this.getVerificationLink(mailData.data.token);
    const letter = await this.createLetter<VerificationTemplateContext>(
      'email-confirmation',
      { url: verificationLink },
    );

    return await this.mailer.sendMail({
      to: mailData.to,
      subject: 'Email confirmation',
      html: letter,
    });
  }

  public async sendForgotPasswordLetter(
    mailData: MailData<{ token: string }>,
  ): Promise<void> {
    const resetLink = this.getResetPasswordLink(mailData.data.token);
    const letter = await this.createLetter<VerificationTemplateContext>(
      'reset-password',
      { url: resetLink },
    );

    return await this.mailer.sendMail({
      to: mailData.to,
      subject: 'Password reset',
      html: letter,
    });
  }

  private async createLetter<T>(
    templateFileName: string,
    context: T,
  ): Promise<string> {
    const templatePath = path.join(
      __dirname,
      `templates/${templateFileName}.html`,
    );

    const template = await fs.promises.readFile(templatePath, 'utf-8');
    const html = handlebars.compile(template);

    return html(context);
  }

  private getVerificationLink(token: string): string {
    return `${this.configService.get('EMAIL_VERIFICATION_URL')}?token=${token}`;
  }

  private getResetPasswordLink(token: string): string {
    return `${this.configService.get('RESET_PASSWORD_URL')}?token=${token}`;
  }
}
