import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './auth/mail/mail.module';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './commande/commande.module';
import { RepasModule } from './repas/repas.module';
import { UserModule } from './users/user.module';
import { CategorieModule } from './catégorie/categorie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MulterModule.register({
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    AuthModule,
    MailModule,
    RepasModule,
    CategorieModule,
    MenuModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
