import { Body, Controller, Get, Patch, Request } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { LoginDto } from './logins.dto';
import { Login } from './logins.schema';
import { LoginsService } from './logins.service';

@Controller('logins')
export class LoginsController {

    constructor(private readonly loginsService: LoginsService) {}

    @Roles('admin')
    @Get()
    findAll(): Promise<Login[]> {
        return this.loginsService.findAll();
    }

    @Patch()
    update(@Body() loginDto: LoginDto, @Request() req): Promise<Login> {
        return this.loginsService.update(loginDto, req.user);
    }

}
