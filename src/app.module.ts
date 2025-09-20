import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { GamesModule } from './games/games.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 1) Carga .env explícitamente desde el cwd (raíz donde corres npm run start:dev)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [process.cwd() + '/.env', '.env'],
    }),

    UsersModule,
    RolesModule,
    GamesModule,
    PermissionsModule,

    // 2) Config de TypeORM: postgres fijo + saneo de variables
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const host = (cfg.get<string>('DB_HOST') ?? 'localhost').trim();
        const port = Number((cfg.get<string>('DB_PORT') ?? '5432').trim());
        const username = (cfg.get<string>('DB_USERNAME') ?? 'postgres').trim();
        const rawPass = cfg.get<string>('DB_PASSWORD') ?? '';
        const password = rawPass.trim(); // quita CR/LF/espacios invisibles
        const db = (cfg.get<string>('DB_DATABASE') ?? 'nest_intro').trim();
        const sync = (cfg.get<string>('DB_SYNCHRONIZE') ?? 'false').toString().trim() === 'true';

        // DEBUG: imprime cómo quedó (sin exponer la clave en texto)
        console.log('[DB cfg]', {
          host, port, username, db, sync,
          passHex: Buffer.from(rawPass).toString('hex'), // "postgres" => 706f737467726573
          passLen: rawPass.length,
        });

        return {
          type: 'postgres' as const,
          host,
          port,
          username,
          password,
          database: db,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: sync,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
