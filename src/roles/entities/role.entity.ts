// src/roles/entities/role.entity.ts

/**
 * Representa un rol en el sistema.
 */
export class Role {
        id: number;
        name: string;
        description: string;

        constructor(id: number, name: string, description: string) {
                this.id = id;
                this.name = name;
                this.description = description;
        }
}