import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly gameRepo: Repository<Game>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateGameDto) {
    const owner = await this.userRepo.findOne({ where: { id: dto.ownerId } });
    if (!owner) throw new BadRequestException('Owner user not found');
    const game = this.gameRepo.create({ title: dto.title, description: dto.description, owner });
    return this.gameRepo.save(game);
  }

  findAll() {
    return this.gameRepo.find();
  }

  async findOne(id: number) {
    const game = await this.gameRepo.findOne({ where: { id } });
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async update(id: number, dto: UpdateGameDto) {
    if (dto.ownerId) {
      const owner = await this.userRepo.findOne({ where: { id: dto.ownerId } });
      if (!owner) throw new BadRequestException('Owner user not found');
      await this.gameRepo.update(id, { ...dto, owner });
    } else {
      await this.gameRepo.update(id, dto);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.gameRepo.delete(id);
    if (!res.affected) throw new NotFoundException('Game not found');
    return { id };
  }
}
