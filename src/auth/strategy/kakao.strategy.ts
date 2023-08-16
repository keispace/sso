import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { IStrategyUser } from './strategy.interface';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.KAKAO_KEY,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
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
      name: profile._json.properties.nickname,
      email: profile._json.kakao_account.email,
      provider: profile._json.kakao_account.provider,
      accessToken,
      refreshToken,
    };
    const veriUser = await this.authService.validateUser(user);
    return done(null, veriUser);
  }
}
