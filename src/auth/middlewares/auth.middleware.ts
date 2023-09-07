import { ExpressRequestInterfase } from '@app/types/expressRequest.interface';
import { UserService } from '@app/user/user.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}
  async use(req: ExpressRequestInterfase, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();

      return;
    }
    const token = req.headers.authorization.split(' ')[1];

    try {
      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      const decode = verify(token, jwtSecret);

      const decodedUserId = typeof decode === 'object' ? decode.id : decode;

      const user = await this.userService.findOne({ id: decodedUserId });
      req.user = user;
    } catch (err) {
      req.user = null;
    }

    next();
  }
}
