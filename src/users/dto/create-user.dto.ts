// src/users/dto/create-user.dto.ts

export class CreateUserDto {
        username: string;
        email: string;
        passwordHash: string;
        bio: string;
        roleName: string; // Nuevo campo
}