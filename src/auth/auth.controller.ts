import { Controller, Get, Headers, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FacebookAuthGuard } from './guard/facebook.guard';
import { GoogleAuthGuard } from './guard/google.guard';
import { KakaoAuthGuard } from './guard/kakao-auth.guard';
import { NaverAuthGuard } from './guard/naver.guard';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('verify')
  async verifyJwt(@Headers('authorization') token) {
    console.log(token);
    const res = this.authService.verifyJwt(token);
    return res;
  }
  @UseGuards(NaverAuthGuard)
  @Get('naver')
  async naverlogin() {
    return;
  }
  @UseGuards(NaverAuthGuard)
  @Get('naver/callback')
  async naverCallback(@Req() req): Promise<any> {
    // console.log(req.user)
    return req.user;
  }

  @UseGuards(KakaoAuthGuard)
  @Get('kakao')
  async kakaologin() {
    return;
  }
  @UseGuards(KakaoAuthGuard)
  @Get('kakao/callback')
  async kakaoCallback(@Req() req): Promise<any> {
    // console.log(req.user)
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googlelogin() {
    return;
  }
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req): Promise<any> {
    // console.log(req.user)
    return req.user;
  }

  @UseGuards(FacebookAuthGuard)
  @Get('facebook')
  async facebooklogin() {
    return;
  }
  @UseGuards(FacebookAuthGuard)
  @Get('facebook/callback')
  async facebookCallback(@Req() req): Promise<any> {
    // console.log(req.user)
    return req.user;
  }
}
