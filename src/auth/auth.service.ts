// auth.service.ts

import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/SignIn.dto';
import { MailService } from './mail/mail.service';
import { UserService } from 'src/users/user.service';
import { User, UserDocument } from 'src/users/entity/user.entity';
import { PasswordResetDto } from './dto/password-reset.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  async createDefaultAdmin(): Promise<void> {
    const adminUser = {
      email: 'adminadmin@gmail.com',
      password: 'admin123',
      name: 'admin',
      role: 'admin',
    };

    const existingAdmin = await this.userModel.findOne({ email: adminUser.email });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminUser.password, 10);
      await this.userModel.create({
        ...adminUser,
        password: hashedPassword,
      });
    }
  }

  async registerUser(userDto: any): Promise<void> {
    const { email, password, name, role } = userDto;

    const existingUser = await this.userModel.findOne({ email });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.userModel.create({
        email,
        password: hashedPassword,
        name,
        role,
      });
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;
  
    const user = await this.userModel.findOne({ email: email.trim() });
  
    if (user) {
      const passwordMatches = await bcrypt.compare(password, user.password);
  
      if (passwordMatches) {
        const { _id, name, email, role } = user;
        const token = this.jwtService.sign({ id: _id, name, email, role });
        return { token };
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } else {
      throw new UnauthorizedException('User not found');
    }
  }
  

  async findUserByResetToken(token: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new NotFoundException('Invalid or expired token');
    }

    return user;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const token = this.jwtService.sign({ email }, { expiresIn: '1h' });
  
    const resetLink = `http://localhost:3003/reset-password/${token}`;
  
    await this.mailService.sendResetPasswordEmail(email, resetLink);
  }

  async resetPassword(token: string, passwordResetDto: PasswordResetDto): Promise<void> {
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      const email = decoded.email;
      if (!email) {
        throw new NotFoundException('User not found');
      }

      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const hashedPassword = await bcrypt.hash(passwordResetDto.newPassword, 10);
      user.password = hashedPassword;
      await user.save();
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }

  async generateResetToken(email: string): Promise<string> {
    const payload = { email };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }

  async decodeToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  generateAccessToken(user: UserDocument): string {
    const { _id, name, email, role } = user;
    return this.jwtService.sign({ id: _id, name, email, role });
  }

  async refreshToken(refreshToken: string): Promise<string> {
    const user = await this.userModel.findOne({ refreshToken });
  
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  
    const newAccessToken = this.generateAccessToken(user);
    return newAccessToken;
  }
}
