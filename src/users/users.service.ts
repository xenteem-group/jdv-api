import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { saltOrRounds } from 'src/auth/constants';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    
    constructor( @InjectModel(User.name) private readonly userModel: Model<UserDocument> ) { }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(username: string): Promise<any> {
        return await this.userModel.findOne({ username: username }, 'name username role image deleted');
    }

    async findOneForLogin(username: string): Promise<any> {
        return await this.userModel.findOne({ username: username }, 'username password role image deleted');
    }

    async create(user: User): Promise<User> {
        const hash = await bcrypt.hash(user.password, saltOrRounds);
        user.password = hash;
        
        const newuser = new this.userModel(user);
        return await newuser.save();
    }

    async update(id: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id: string): Promise<User> {
        return await this.userModel.findByIdAndRemove(id);
    }

}
