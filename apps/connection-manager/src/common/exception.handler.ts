import type ResponseType from './response.js';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export default class ExceptionHandler implements ExceptionFilter {
  public constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message =
      exception.message.error || exception.message || 'Something went wrong!';

    if (exception instanceof HttpException) {
      const errorResponse: string | object = exception.getResponse();

      statusCode = exception.getStatus();
      message =
        (typeof errorResponse === 'object' &&
          Reflect.get(errorResponse, 'error')) ||
        message;
    }

    const responseBody: ResponseType = {
      statusCode,
      message,
      error: exception.message,
    };

    httpAdapter.reply(response, responseBody, statusCode);
  }
}
