import { HttpException } from '@nestjs/common';

export class HttpErrorException extends HttpException {
  constructor(httpError: HttpException, moreInfo?: any) {
    super(httpError.message, httpError.getStatus(), moreInfo);
  }
}
