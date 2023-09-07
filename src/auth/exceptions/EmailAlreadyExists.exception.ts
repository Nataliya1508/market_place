import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(`Email address ${email} is already in use`, HttpStatus.BAD_REQUEST);
  }
}
