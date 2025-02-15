import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {

    /* แนบ header Bearer */
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   secretOrKey: configService.get('JWT_SECRET'), // Use the secret from environment variables
    //   ignoreExpiration: false,
    // });

    /* ใช้ cookie */
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
    });

  }

  async validate(payload: any) {
    // This payload will be the decrypted token payload you provided when signing the token
    return { userId: payload.sub, email: payload.email };
  }
  
}