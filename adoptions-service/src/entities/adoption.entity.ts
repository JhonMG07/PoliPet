import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('adoptions')
export class Adoption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'petid' })
  petId: string;

  @Column({ name: 'userid' })
  userId: string;

  @Column({ name: 'shelterid', nullable: true })
  shelterId: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  reason: string;

  @CreateDateColumn({ name: 'createdat' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedat' })
  updatedAt: Date;
}
