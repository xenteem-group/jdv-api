import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AdminDto } from './admin.dto';
import { Admin } from './admin.schema';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @Get()
    findAll(): Promise<Admin[]> {
        return this.adminService.findAll();
    }

    @Get(':adminname')
    findOne(@Param('adminname') adminname: string): Promise<Admin> {
        return this.adminService.findOne(adminname);
    }

    @Roles('admin')
    @Post()
    create(@Body() adminDto: AdminDto): Promise<Admin> {
        return this.adminService.create(adminDto);
    }

    @Roles('admin', 'admin')
    @Patch(':id')
    update(@Body() adminDto: AdminDto, @Param('id') id: string): Promise<Admin> {
        return this.adminService.update(id, adminDto);
    }

    @Roles('admin')
    @Delete(':id')
    delete(@Param('id') id: string): Promise<Admin> {
        return this.adminService.delete(id);
    }

}
