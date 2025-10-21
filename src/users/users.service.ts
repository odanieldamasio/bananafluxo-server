import { Injectable } from '@nestjs/common';
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
  
  create(createUserDto: CreateUserDto): Promise<User> {
    console.log('Creating user with data:', createUserDto);
    const user = this.usersRepository.create({
      ...createUserDto,
      passwordHash: createUserDto.password,
    });
    return this.usersRepository.save(user);
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
