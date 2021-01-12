import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserDto } from './users.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':username')
    findOne(@Param('username') username: string): Promise<User> {
        return this.usersService.findOne(username);
    }

    @Roles('admin')
    @Post()
    create(@Body() userDto: UserDto): Promise<User> {
        return this.usersService.create(userDto);
    }

    @Roles('admin', 'user')
    @Patch(':id')
    update(@Body() userDto: UserDto, @Param('id') id: string): Promise<User> {
        return this.usersService.update(id, userDto);
    }

    @Roles('admin')
    @Delete(':id')
    delete(@Param('id') id: string): Promise<User> {
        return this.usersService.delete(id);
    }

}
