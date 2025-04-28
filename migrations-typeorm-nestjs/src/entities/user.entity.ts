import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from './booking.entity';
import { QueueEntry } from './queue-entry.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relations
  @OneToMany(() => Booking, booking => booking.user)
  bookings: Booking[];

  @OneToMany(() => QueueEntry, queueEntry => queueEntry.user)
  queueEntries: QueueEntry[];
}