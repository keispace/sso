import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(profile) {
    const { name, email } = profile;
    // const { res, code } = await this.userService.findOnebyEmail(email);
    const token = this.createJwt({ name, email });

    // if (code === 'NoUser') {
    //   // 디비에 없으면 create
    //   this.userService.create(profile);
    // } else {
    //   // 있으면 혹시모를 변동 반영 update
    //   this.userService.update(res.user.uid, profile);
    // }
    return { name, email, token };
  }
  createJwt(payload): string {
    console.log(process.env.JWT_SECRET);
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15d', //15일
    });
  }
  verifyJwt(token: string) {
    /* 
    현재는 one 토큰. 
    refresh 토큰 도입시 case
    case1: access token과 refresh token 모두가 만료된 경우 -> 에러 발생
    case2: access token은 만료됐지만, refresh token은 유효한 경우 ->  access token 재발급
    case3: access token은 유효하지만, refresh token은 만료된 경우 ->  refresh token 재발급
    case4: accesss token과 refresh token 모두가 유효한 경우 -> pass
    */
    try {
      let newToken = token?.split('Baerer ')[1] || '';
      console.log('newToken', newToken);
      console.log(process.env.JWT_SECRET);

      const veri = this.jwtService.verify(newToken, {
        secret: process.env.JWT_SECRET,
      });
      console.log('veri', veri);
      // jwt 1일 미만이면 갱신
      newToken =
        veri.exp.toString() - Number(Date.now().toString().slice(0, -3)) < 86400
          ? this.createJwt({ name: veri.name, email: veri.email })
          : newToken;
      return { statusCode: 200, message: 'verified', token: newToken };
    } catch (error) {
      console.log(error);
      switch (error.name) {
        case 'TokenExpiredError':
          //main access jwt expired
          throw new HttpException(error.message, 401);
        case 'JsonWebTokenError':
          //message for detail info
          throw new HttpException(error.message, 403);
        default:
          throw new HttpException(error.message, 500);
      }
    }
  }
}
