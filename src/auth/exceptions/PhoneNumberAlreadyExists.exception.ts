import { HttpException, HttpStatus } from '@nestjs/common';

export class PhoneNumberAlreadyExistsException extends HttpException {
  constructor(phoneNumber: string) {
    super(
      `Phone number '${phoneNumber}' already exists.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
