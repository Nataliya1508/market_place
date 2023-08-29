import { ForgotPasswordTokenPayload } from '@app/auth/types/forgotPasswordTokenPayload.interface';
import { VerificationTokenPayload } from '@app/auth/types/verificationTokenPayload.interface';
import { MailService } from '@app/mail/mail.service';
import { UserService } from '@app/user/user.service';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  public async sendVerificationMessage(email: string): Promise<void> {
    const payload: VerificationTokenPayload = { email };
    const secret = this.configService.get<string>('JWT_VERIFICATION_SECRET');
    const expiresIn = this.configService.get<string>(
      'JWT_VERIFICATION_EXPIRATION',
    );
    const token = jwt.sign(payload, secret, { expiresIn });

    await this.mailService.sendVerificationLetter({
      to: email,
      data: { token },
    });
  }

  public async verifyEmail(token: string): Promise<void> {
    const email = await this.decodeVerificationToken(token);
    const user = await this.userService.findOneByEmail(email);

    if (user.emailVerified) {
      throw new BadRequestException('Email is already confirmed');
    }

    await this.userService.markEmailVerified(email);
  }

  private async decodeVerificationToken(token: string): Promise<string> {
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

  public async forgotPassword(email: string): Promise<void> {
    const payload: ForgotPasswordTokenPayload = { email };
    const secret = this.configService.get<string>('JWT_RESET_PASSWORD_SECRET');

    const expiresIn = this.configService.get<string>(
      'JWT_RESET_PASSWORD_EXPIRATION',
    );
    const token = jwt.sign(payload, secret, { expiresIn });

    await this.mailService.sendForgotPasswordLetter({
      to: email,
      data: { token },
    });
  }

  public async resetPassword(token: string, password: string): Promise<void> {
    const email = await this.decodeResetPasswordToken(token);
    const user = await this.userService.findOneByEmail(email);

    await this.userService.update(user.id, { password });
  }

  private async decodeResetPasswordToken(token: string): Promise<string> {
    try {
      const secret = this.configService.get('JWT_RESET_PASSWORD_SECRET');
      const payload = await jwt.verify(token, secret);

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }

      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Password reset token has expired');
      }

      throw new BadRequestException('Bad password reset token');
    }
  }
}
