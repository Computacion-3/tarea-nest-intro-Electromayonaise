import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesService } from '../roles/roles.service';

describe('UsersController', () => {
        let controller: UsersController;

        // Mock del servicio de roles
        const mockRolesService = {
                findByName: jest.fn(),
        };

        beforeEach(async () => {
                const module: TestingModule = await Test.createTestingModule({
                        controllers: [UsersController],
                        providers: [
                                UsersService,
                                { provide: RolesService, useValue: mockRolesService },
                        ],
                }).compile();

                controller = module.get<UsersController>(UsersController);
        });

        it('should be defined', () => {
                expect(controller).toBeDefined();
        });
});