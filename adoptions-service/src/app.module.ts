import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Adoption } from './entities/adoption.entity';
import { AdoptionsController } from './controllers/adoptions.controller';
import { AdoptionsService } from './services/adoptions.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. Configura TypeORM de forma asíncrona
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbOptions = {
          type: configService.get<string>('DB_TYPE') || 'postgres', // Añadimos un valor por defecto
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
          database: configService.get<string>('DB_NAME'),
          entities: [Adoption],
          synchronize: true,
        };

        // ¡Este log es clave para depurar!
        console.log('Connecting to database with options:', dbOptions);

        return dbOptions as any; // Usamos 'as any' para evitar problemas de tipado con 'type'
      },
    }),
    TypeOrmModule.forFeature([Adoption]),
  ],
  controllers: [AdoptionsController],
  providers: [AdoptionsService, JwtStrategy],
})
export class AppModule {}