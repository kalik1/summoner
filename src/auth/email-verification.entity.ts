import { Entity, PrimaryColumn, Column, Unique, Index } from 'typeorm';

@Entity('email-verification')
@Unique('unique_email-verification_userId', ['userId'])
@Index('index_email-verification__userId', ['userId'])
export class EmailVerification {
  @PrimaryColumn('character', { length: 21 })
  token: string;

  @Column('integer')
  userId: number;

  @Column('timestamp')
  validUntil: Date;
}