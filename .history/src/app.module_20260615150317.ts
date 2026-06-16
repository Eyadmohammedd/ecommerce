import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { OrderModule } from './modules/order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URI'),
  }),
  inject: [ConfigService],
});
    // MongooseModule.forRoot(process.env.DB_URI as string, {
    //   serverSelectionTimeoutMS: 30000,
    //   onConnectionCreate: (connection: Connection) => {
    //     connection.on('connected', () => console.log('DB Is connected👌🤩'));
    //     connection.on('open', () => console.log('open'));
    //     connection.on('disconnected', () => console.log('disconnected'));
    //     connection.on('reconnected', () => console.log('reconnected'));
    //     connection.on('disconnecting', () => console.log('disconnecting'));

    //     return connection;
    //   },
    // }),
    AuthenticationModule,
    UserModule,
    ProductModule,
    CategoryModule,
    BrandModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
