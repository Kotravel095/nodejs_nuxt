import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, use } from "passport";
import { Strategy, VerifyFunction } from "passport-facebook";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('FACEBOOK_APP_ID'),
      clientSecret: configService.get('FACEBOOK_SECRET_ID'),
      callbackURL: configService.get('FACEBOOK_URL_CALLBACK'),
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyFunction,
  ): Promise<any> {
    const { id, emails, photos } = profile;
    const { givenName, familyName } = profile.name || {};
  
    const email = (emails && emails[0] && emails[0].value) || null;
    const picture = (photos && photos[0] && photos[0].value) || null;
  
    const user = {
      facebookId: id,
      email,
      name: `${givenName} ${familyName}`,
      picture,
      accessToken,
    };
    
    done(null, user);
  }
  
}
