import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from '../roles/roles.module'; // Importar el módulo de roles

@Module({
        imports: [RolesModule], // Importar aquí
        controllers: [UsersController],
        providers: [UsersService],
})
export class UsersModule {}