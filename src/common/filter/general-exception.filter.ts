import { mongo } from 'mongoose';
import { ExceptionFilter, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';

const DUPLICATE_KEY_MONGO_ERROR_CODE = 11000;

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GeneralExceptionFilter.name);

  catch(exception: unknown) {
    if (exception instanceof HttpException) {
      const httpStatus: HttpStatus = exception.getStatus();

      const response: any = exception.getResponse();

      return {
        status: httpStatus,
        error: [response.message],
        data: null,
      };
    }

    if (exception instanceof mongo.MongoError) {
      if (exception.code == DUPLICATE_KEY_MONGO_ERROR_CODE) {
        return {
          status: HttpStatus.CONFLICT,
          error: [exception.message],
          data: null,
        };
      }

      // Handle generic database errors
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: [exception.message],
        data: null,
      };
    }

    this.logger.error({ exception });

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: ['An unknown error has occurred. Please check the logs.'],
      data: null,
    };
  }
}
