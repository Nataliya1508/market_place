import { VerificationTemplateContext } from '@app/mail/types/verificationTemplateContext.interface';
import { VerificationTokenPayload } from '@app/mail/types/verificationTokenPayload.interface';
import { MailerService } from '@app/mailer/mailer.service';
import { UserService } from '@app/user/user.service';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import handlebars from 'handlebars';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async sendVerificationMessage(email: string): Promise<void> {
    const payload: VerificationTokenPayload = { email };
    const secret = this.configService.get<string>('JWT_VERIFICATION_SECRET');
    const expiresIn = this.configService.get<string>(
      'JWT_VERIFICATION_EXPIRATION',
    );
    const token = jwt.sign(payload, secret, { expiresIn });

    const letter = await this.createLetter<VerificationTemplateContext>(
      'email-confirmation',
      {
        url: this.getVerificationLink(token),
      },
    );

    const subject = 'Email confirmation';

    return await this.mailer.sendMail({ to: email, subject, html: letter });
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

  public async verifyEmail(email: string): Promise<void> {
    const user = await this.userService.findOneByEmail(email);

    if (user.emailVerified) {
      throw new BadRequestException('Email is already confirmed');
    }

    await this.userService.verifyEmail(email);
  }

  public async decodeToken(token: string): Promise<string> {
    try {
      const secret = this.configService.get('JWT_VERIFICATION_SECRET');

      const payload = await jwt.verify(token, secret);

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }

      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email verification token expired');
      }

      throw new BadRequestException('Bad verification token');
    }
  }
}
