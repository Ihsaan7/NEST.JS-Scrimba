import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers['authorization']

        if(!authHeader) throw new UnauthorizedException("No authorization header provided!")

            return true
    }
}