import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { TaskStatus } from './task-status.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The name of the task
   * @example Shopping
   */

  @Column()
  @ApiProperty({
    example: 'shopping',
    description: 'title of the task',
  })
  title: string;

  @Column()
  @ApiProperty({
    example: 'shopping list',
    description: 'description of the task',
  })
  description: string;

  @Column({ nullable: false, type: 'varchar' })
  @ApiProperty({
    example: 'IN_PROGRESS',
    enum: ['OPEN', 'IN_PROGRESS', 'DONE']
  })
  @ApiProperty({  })
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
