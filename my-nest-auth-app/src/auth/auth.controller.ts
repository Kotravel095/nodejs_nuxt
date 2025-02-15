import { Controller, Post, UseGuards, Request, Res, Get, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';
import { GoogleAuthGuard } from './google.auth.guard';
import { FacebookAuthGuard } from './facebook-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('logout')
  async logout(@Request() req, @Res() res: Response) {
    res.clearCookie('jwt token', {
      httpOnly: true,
    });
    return res.json({ message: 'Successfully logged out' });
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {
    // return HttpStatus.OK;
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Res() res: Response) {
    const { accessToken } = await this.authService.googleLogin(req);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    res.redirect('/user/profile');
  }

  @Get("facebook")
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(@Request() req): Promise<any> {
    // return HttpStatus.OK;
  }

  @Get("facebook/callback")
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Request() req, @Res() res: Response){
    const { accessToken } = await this.authService.facebookLogin(req);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    res.redirect('/user/profile');
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.authService.login(req.user);
    res.cookie('access_token', access_token, {
      httpOnly: true,
    });
    return { message: 'Successfully logged in' };
  }

}