import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPasswordEmail(email: string, resetLink: string): Promise<void> {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Password Reset Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="center" style="padding: 50px 0 50px 0;">
                        <!-- Main Table -->
                        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <!-- Logo Section -->
                            <tr>
                                <td align="center" style="padding: 40px 0 30px 0;">
                                    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <rect width="54" height="54" fill="url(#pattern0)"/>
                                        <!-- Define your logo SVG content here -->
                                    </svg>
                                </td>
                            </tr>
                            <!-- Button Section -->
                            <tr>
                                <td align="center" style="padding: 0 30px 30px 30px;">
                                    <a href="${resetLink}" style="background-color: #007bff; border-radius: 25px; color: #ffffff; display: inline-block; font-size: 14px; line-height: 44px; text-align: center; text-decoration: none; width: 200px;">Reset Password</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset',
      html: htmlContent,
    });
  }
}
