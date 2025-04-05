import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ITokenizationService } from '../../domain/contracts/infrastructure/services/tokenization.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(ITokenizationService)
    private readonly jwtService: ITokenizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token ausente ou inválido');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = await this.jwtService.decodeToken(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException(`Token inválido ${error}`);
    }
  }
}
