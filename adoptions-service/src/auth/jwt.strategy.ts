// En pets-service/src/auth/jwt.strategy.ts
// Y también en adoptions-service/src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'TU_CLAVE_SECRETA_SUPER_SEGURA', // La clave debe ser la misma en todos los servicios
    });
  }

  async validate(payload: any) {
    // El microservicio ahora confía en el payload del token
    // y puede usarlo para propósitos de autorización.
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}