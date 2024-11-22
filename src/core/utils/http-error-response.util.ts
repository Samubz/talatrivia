import { HttpErrorException } from '@core/exceptions/http-error.exception';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

export const DEFAULT_ERROR = 'DEFAULT_ERROR';
export const validateErrors = (
  error: any,
  serviceName: string,
  ResponseMessage: { [key: string]: string },
) => {
  if (existMessageInError(error) && ResponseMessage[error.message]) {
    getCustomError(error.message, serviceName);
  } else {
    getDefaultError(serviceName, error);
  }
};

const existMessageInError = (error: any) => {
  return error !== null && typeof error === 'object' && 'message' in error;
};

export const getDefaultError = (serviceName: string, error?: any) => {
  throw new HttpErrorException(
    new HttpException(
      new InternalServerErrorException(DEFAULT_ERROR),
      HttpStatus.INTERNAL_SERVER_ERROR,
    ),
    {
      source: serviceName,
      error: error,
    },
  );
};

export const getCustomError = (message: string, serviceName: string) => {
  throw new HttpErrorException(
    new HttpException(
      new BadRequestException(message),
      HttpStatus.UNPROCESSABLE_ENTITY,
    ),
    { source: serviceName, error: message },
  );
};
