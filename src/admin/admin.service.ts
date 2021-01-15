import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { saltOrRounds } from 'src/auth/constants';
import { Admin, AdminDocument } from './admin.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
    
    constructor( @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument> ) { }

    async findAll(): Promise<Admin[]> {
        return await this.adminModel.find().exec();
    }

    async findOne(adminname: string): Promise<any> {
        return await this.adminModel.findOne({ adminname: adminname }, 'name adminname role image deleted');
    }

    async findOneForLogin(adminname: string): Promise<any> {
        return await this.adminModel.findOne({ adminname: adminname }, 'adminname password role image deleted');
    }

    async create(admin: Admin): Promise<Admin> {
        const hash = await bcrypt.hash(admin.password, saltOrRounds);
        admin.password = hash;
        
        const newadmin = new this.adminModel(admin);
        return await newadmin.save();
    }

    async update(id: string, admin: Admin): Promise<Admin> {
        return await this.adminModel.findByIdAndUpdate(id, admin, { new: true });
    }

    async delete(id: string): Promise<Admin> {
        return await this.adminModel.findByIdAndRemove(id);
    }

}
