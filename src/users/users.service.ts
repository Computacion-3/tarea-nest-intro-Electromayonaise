// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
        private users: User[] = [];
        private idCounter = 1;

        constructor(private rolesService: RolesService) {}

        create(createUserDto: CreateUserDto) {
                // Buscar el rol por nombre
                const role = this.rolesService.findByName(createUserDto.roleName);
                if (!role) {
                        throw new Error('Role not found');
                }

                const newUser: User = new User(
                        this.idCounter++,
                        createUserDto.username,
                        createUserDto.email,
                        createUserDto.passwordHash,
                        createUserDto.bio,
                        role.id, // Asignar el ID del rol
                );
                this.users.push(newUser);
                return newUser;
        }


        /**
         * Retorna todos los usuarios.
         */
        findAll() {
                return this.users;
        }

        /**
         * Busca un usuario por su ID.
         */
        findOne(id: number) {
                return this.users.find((user) => user.id === id);
        }

        /**
         * Actualiza un usuario existente.
         */
        update(id: number, updateUserDto: UpdateUserDto) {
                const userIndex = this.users.findIndex((user) => user.id === id);
                if (userIndex === -1) return null;
                this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
                return this.users[userIndex];
        }

        /**
         * Elimina un usuario por su ID.
         */
        remove(id: number) {
                const userIndex = this.users.findIndex((user) => user.id === id);
                if (userIndex === -1) return null;
                const removedUser = this.users.splice(userIndex, 1)[0];
                return removedUser;
        }
}