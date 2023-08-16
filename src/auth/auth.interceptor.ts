import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { headers } = context.getArgByIndex(0);
    // console.log(headers.authorization)
    this.authService.verifyJwt(headers.authorization);
    return next.handle();
  }
}
