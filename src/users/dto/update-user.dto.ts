// src/users/dto/update-user.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * DTO para actualizar usuarios, permite actualizar parcialmente los campos.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}