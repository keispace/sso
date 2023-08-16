import { Strategy } from 'passport-naver';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IStrategyUser } from './strategy.interface';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
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
      email: profile._json.email,
      name: profile._json.nickname,
      provider: profile.provider,
      accessToken,
      refreshToken,
    };
    const veriUser = await this.authService.validateUser(user);
    return done(null, veriUser);
  }
}
