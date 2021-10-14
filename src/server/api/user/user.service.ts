import {
  BadRequestException, ConflictException, Injectable, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { SignupRequest } from '../auth/models';
import { UpdateUserRequest } from './models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  public async getUserEntityById(id: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(id);
  }

  public async getUserEntityByUsername(username: string): Promise<UserEntity | undefined> {
    const normalizedUsername = username.toLowerCase();
    return this.userRepository.findOne({ where: { username: normalizedUsername } });
  }

  public async getUserEntityByEmail(email: string): Promise<UserEntity | undefined> {
    const normalizedEmail = email.toLowerCase();
    return this.userRepository.findOne({ where: { email: normalizedEmail } });
  }

  public async getUserEntityByUsernameOrEmail(
    identifier: string,
  ): Promise<UserEntity | undefined> {
    const normalizedIdentifier = identifier.toLowerCase();
    return this.userRepository.findOne({
      where: [{ username: normalizedIdentifier }, { email: normalizedIdentifier }],
    });
  }

  public async createUser(
    signupRequest: SignupRequest,
    passwordHash: string,
  ): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.username = signupRequest.username.toLowerCase();
    newUser.email = signupRequest.email.toLowerCase();
    newUser.passwordHash = passwordHash;
    newUser.firstName = signupRequest.firstName;
    newUser.lastName = signupRequest.lastName;
    try {
      // insert also updates id of newUser, we can directly return newUser
      await this.userRepository.insert(newUser);
      return newUser;
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }

  public async updatePassword(
    userId: string,
    passwordHash: string,
  ): Promise<void> {
    const userEntity = await this.userRepository.findOne(userId);
    if (userEntity === null || userEntity === undefined) {
      Logger.warn(
        `Password change of non-existent account with id ${userId} is rejected.`,
      );
      throw new NotFoundException();
    }
    await this.userRepository.update(userEntity.id, { passwordHash });
  }

  async updateUser(userId: string, updateRequest: UpdateUserRequest): Promise<void> {
    try {
      await this.userRepository.update(userId, updateRequest);
    } catch (err) {
      Logger.warn(JSON.stringify(err));
      throw new BadRequestException();
    }
  }

  async updateEmail(userId: string, email: string): Promise<void> {
    await this.userRepository.update(userId, { email });
  }

  async verifyEmail(userId: string) : Promise<void> {
    await this.userRepository.update(userId, { emailVerified: true });
  }
}
