import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permRepo: Repository<Permission>,
  ) {}

  create(dto: CreatePermissionDto) {
    const p = this.permRepo.create(dto);
    return this.permRepo.save(p);
  }

  findAll() {
    return this.permRepo.find();
  }

  async findOne(id: number) {
    const p = await this.permRepo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Permission not found');
    return p;
  }

  async update(id: number, dto: UpdatePermissionDto) {
    await this.permRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.permRepo.delete(id);
    if (!res.affected) throw new NotFoundException('Permission not found');
    return { id };
  }
}
