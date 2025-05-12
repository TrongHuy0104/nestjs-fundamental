import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const user = new User();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;
    user.apiKey = uuid4();

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(userDTO.password, salt);

    const savedUser = await this.userRepository.save(user);
    delete savedUser.password;
    return savedUser;
  }

  async findOne(data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  async updateSecretKey(userId, secret: string): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        twoFASecret: secret,
        enable2FA: true,
      },
    );
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        enable2FA: false,
        twoFASecret: undefined,
      },
    );
  }

  async findByApiKey(apiKey: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ apiKey });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
