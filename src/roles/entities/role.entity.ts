import { User } from 'src/users/entities/user.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  // Un rol puede estar asociado a muchos usuarios
  @OneToMany(() => User, (user) => user.role)
  users: User[];

  // TODO del MD: muchos-a-muchos con permissions
  @ManyToMany(() => Permission, (perm) => perm.roles, { cascade: true })
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];
}
