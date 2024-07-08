// auth.controller.ts

import { Body, Controller, Post, Get, Param, HttpException, HttpStatus, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { randomBytes } from 'crypto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

 
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<{ token: string, role: string }> {
    try {
      const result = await this.authService.signIn(signInDto);
      const decodedToken = await this.authService.decodeToken(result.token);
      return { token: result.token, role: decodedToken.role };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    try {
      await this.authService.forgotPassword(body.email);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Body() body: PasswordResetDto,
    @Param('token') token: string,
  ) {
    try {
      await this.authService.resetPassword(token, body); // Pass the PasswordResetDto object instead of just newPassword
      return { message: 'Password reset successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  @Get('/decode-token/:token')
  async decodeToken(@Param('token') token: string): Promise<any> {
    try {
      return this.authService.decodeToken(token);
    } catch (error) {

      throw new UnauthorizedException(error.message);
    }
  } 

  
  @Post('/refresh')
  async refresh(@Body() body: { refreshToken: string }): Promise<{ token: string }> {
    try {
      const newAccessToken = await this.authService.refreshToken(body.refreshToken);
      return { token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
  

}
