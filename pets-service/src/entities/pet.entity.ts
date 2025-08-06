import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other';

  @Column()
  breed: string;

  @Column()
  size: 'small' | 'medium' | 'large';

  @Column()
  age: 'puppy' | 'young' | 'adult' | 'senior';

  @Column()
  description: string;

  @Column({ name: 'isavailable', default: true })
  isAvailable: boolean;

  @Column({ name: 'imageurl', nullable: true })
  imageUrl: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  weight: string;

  @Column({ name: 'healthnotes', nullable: true })
  healthNotes: string;

  @Column({ name: 'behaviornotes', nullable: true })
  behaviorNotes: string;

  @Column('text', { name: 'specialneeds', array: true, nullable: true })
  specialNeeds: string[];

  @Column({ name: 'isvaccinated', nullable: true })
  isVaccinated: boolean;

  @Column({ name: 'isneutered', nullable: true })
  isNeutered: boolean;

  @Column({ name: 'ismicrochipped', nullable: true })
  isMicrochipped: boolean;

  @Column({ name: 'shelterid' })
  shelterId: string;

  @CreateDateColumn({ name: 'createdat' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedat' })
  updatedAt: Date;
}
