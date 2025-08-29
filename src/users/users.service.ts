import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaErrors } from 'src/prisma/prisma-errors.enum';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { password, ...userData } = createUserDto;

    const checkIfUserExists = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      },
    });

    if (checkIfUserExists) {
      throw new BadRequestException(`O usuário ou email já está em uso`);
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...userData,
        passwordHash: passwordHashed,
      },
    });

    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
