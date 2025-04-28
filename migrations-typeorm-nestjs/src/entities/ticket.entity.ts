import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Booking } from './booking.entity';
import { QueueEntry } from './queue-entry.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'event_date' })
  eventDate: Date;

  @Column({ name: 'total_slots' })
  totalSlots: number;

  @Column({ name: 'available_slots' })
  availableSlots: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Relations
  bookings: Booking[];
  queueEntries: QueueEntry[];
}