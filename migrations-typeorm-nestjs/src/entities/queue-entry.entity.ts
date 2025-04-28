import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';
import { Ticket } from './ticket.entity';

export enum QueueStatus {
  WAITING = 'waiting',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned'
}

@Entity('queue_entries')
@Index(['ticketId', 'position'], { unique: true })
export class QueueEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'ticket_id' })
  ticketId: string;

  @Column()
  position: number;

  @Column({
    type: 'enum',
    enum: QueueStatus,
    default: QueueStatus.WAITING
  })
  status: QueueStatus;

  @Column({ name: 'joined_at', default: () => 'CURRENT_TIMESTAMP' })
  joinedAt: Date;

  @Column({ name: 'processed_at', nullable: true })
  processedAt?: Date;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.queueEntries)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Ticket, ticket => ticket.queueEntries)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;
}