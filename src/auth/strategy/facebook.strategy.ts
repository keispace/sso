import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IStrategyUser } from './strategy.interface';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const user: IStrategyUser = {
      id: profile.id,
      email: profile.emails[0].value,
      name: `${profile._json.first_name} ${profile._json.last_name}`,
      accessToken,
      refreshToken,
      provider: profile.provider,
    };
    const veriUser = await this.authService.validateUser(user);
    return done(null, veriUser);
  }
}
