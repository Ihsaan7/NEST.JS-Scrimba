import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate
{
    constructor( private readonly  requiredRole: string){}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()

        const userRole = request.headers['x-user-role']

        if(userRole !== this.requiredRole){
            throw new ForbiddenException("Access denied.")
        }
        return true
    }
}