import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

   
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;


  
    response.status(status).json({
      success: false,
      statusCode: status,
      message: exception.message || 'Internal Server Error',
      error: exception.getResponse(), 
      // path: request.url, 
      // timestamp: new Date().toISOString(), 
    });
  }
}
