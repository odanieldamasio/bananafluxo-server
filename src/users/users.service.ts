import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/response-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.usersRepository.create({
        ...createUserDto,
        passwordHash: createUserDto.password,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Não foi possível criar o usuário.');
    }
  }

  findAll(): Promise<UserResponseDto[] | null> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
