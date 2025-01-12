import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum EmployeeGroup {
  HR = 'HR',
  NORMAL = 'NORMAL',
}

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: EmployeeGroup,
    default: EmployeeGroup.NORMAL,
  })
  @ApiProperty({ enum: EmployeeGroup })
  group: EmployeeGroup;

  @Column({ default: true })
  @ApiProperty()
  isActive: boolean;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
