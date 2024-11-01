import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorators';

@Injectable()
export class ApikeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  /**
   *
   * @param context
   * @returns
   */
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // valvula public
    if (this.isPublic(context)) {
      return true;
    }
    // valvula de apikey
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const [apiKey] = authHeader?.split(' ') || [];
    if (!apiKey) {
      throw new UnauthorizedException('No autorizado');
    }
    return true;
  }
  /**
   *
   * @param context
   * @returns
   */
  private isPublic(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
  }
}
