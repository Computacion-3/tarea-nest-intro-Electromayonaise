import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { User } from 'src/users/entities/user.entity';

const gameRepoMock = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const userRepoMock = {
  findOneBy: jest.fn(),
};

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        { provide: getRepositoryToken(Game), useValue: gameRepoMock },
        { provide: getRepositoryToken(User), useValue: userRepoMock },
      ],
    }).compile();

    service = module.get(GamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
