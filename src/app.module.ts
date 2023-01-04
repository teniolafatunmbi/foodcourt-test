import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { KnexModule } from 'nest-knexjs';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS } = process.env;

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: '.env',
    }),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        useNullAsDefault: true,
        connection: {
          host: DB_HOST,
          port: parseInt(DB_PORT, 10),
          user: DB_USER,
          password: DB_PASS,
          database: 'foodcourt',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
