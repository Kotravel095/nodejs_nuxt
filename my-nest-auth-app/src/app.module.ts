import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // mongo
    MongooseModule.forRoot('mongodb://localhost:27017', {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      dbName: process.env.DB_DATABASE,
    }),
    AuthModule, 
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
