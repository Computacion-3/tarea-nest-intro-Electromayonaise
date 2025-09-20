import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(dto: CreateUserDto) {
    const role = await this.rolesService.findByName(dto.roleName);
    if (!role) throw new BadRequestException('Role not found');

    const user = this.userRepo.create({
      username: dto.username,
      email: dto.email,
      passwordHash: dto.passwordHash,
      bio: dto.bio,
      role,
    });
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find({ relations: ['role'] });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id }, relations: ['role'] });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    if (dto.roleName) {
      const role = await this.rolesService.findByName(dto.roleName);
      if (!role) throw new BadRequestException('Role not found');
      await this.userRepo.update(id, { ...dto, role });
    } else {
      await this.userRepo.update(id, dto);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.userRepo.delete(id);
    if (!res.affected) throw new NotFoundException('User not found');
    return { id };
  }
}
