import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
        controllers: [RolesController],
        providers: [RolesService],
        exports: [RolesService], // Exportar el servicio
})
export class RolesModule {}