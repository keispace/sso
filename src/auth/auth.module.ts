import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { NaverStrategy } from './strategy/naver.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({}),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  providers: [
    AuthService,
    NaverStrategy,
    KakaoStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}

/*
인증 프로세스
1.토큰 존재여부 체크(앱) 
-  미존재시
  1. sso 로그인 
  2. 인증 정보 디비 조회 (email, provider, name 구분 필요할 듯)
  3.1. 정보 미존재시
    - 디비 입력. 토큰 발급 처리. 
  3.2. 정보 존재시 
    - 토큰 발급처리 
- 존재시 
  - one 토큰 verify
    - 성공시
      >> done
    - 실패
      >> 미존재시 로 이동
    - 만료 || 만료예정 
      >> 토큰 갱신
  - two 토큰 (access, refresh) verify
    - acc, ref 성공
      >> done
    - acc 성공, ref 실패(만료)
      >> ref 갱신 후 done
    - acc 실패(만료), ref 성공
      >> acc 갱신 후 done
    - acc, ref 실패(만료)
      >> 미존재시 로 이동
*/
