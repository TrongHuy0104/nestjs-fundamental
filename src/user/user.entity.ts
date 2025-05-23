import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from 'src/playlist/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Jane',
    description: 'provide the firstName of the user',
  })
  @Column({ unique: true })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'provide the firstName of the user',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'jane_doe@gmail.com',
    description: 'provide the email of the user',
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'provide the password of the user',
  })
  @Column()
  password?: string;

  @Column()
  apiKey: string;

  /**
   * A user can create many playLists
   */
  @OneToMany(() => Playlist, (playList) => playList.user)
  playLists: Playlist[];

  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;

  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;
}
