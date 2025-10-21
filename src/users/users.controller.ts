import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserResponseDto } from './dto/response-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { HashPasswordPipe } from './pipes/hash-password.pipe';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @UseGuards(JwtAuthGuard)
    findAll(): Promise<UserResponseDto[] | null> {
        return this.usersService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    async create(
        @Body() { password, ...createUserDto }: CreateUserDto,
        @Body('password', HashPasswordPipe) passwordHashed: string,
    ) {
        return this.usersService.create({
            ...createUserDto,
            password: passwordHashed,
        });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find user by id' })
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: string): Promise<UserResponseDto | null> {
        return this.usersService.findOne(id);
    }
}
