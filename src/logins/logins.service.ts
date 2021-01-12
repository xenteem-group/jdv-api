import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Login, LoginDocument } from './logins.schema';
import { getClientIp } from 'request-ip';
import { LoginDto } from './logins.dto';
const DeviceDetector = require('node-device-detector');

@Injectable()
export class LoginsService {

    constructor( @InjectModel(Login.name) private readonly loginModel: Model<LoginDocument> ) {}

    async findAll(): Promise<Login[]> {
        return await this.loginModel.find().exec();
    }

    async create(id: string, tokenExpiresIn: Date, req: any): Promise<Login> {
        const deviceDetector = new DeviceDetector;
        const device = deviceDetector.detect(req.headers['user-agent']);

        const newlogin = new this.loginModel();
        newlogin.user = Types.ObjectId(id);
        newlogin.tokenExpiresIn = tokenExpiresIn;
        newlogin.ipAddress = getClientIp(req);
        newlogin.userAgent = {
            os: device.os.name,
            device: device.device.type,
            client: device.client.name
        }

        return await newlogin.save();
    }

    async update(login: LoginDto, user): Promise<Login> {
        return await this.loginModel.findByIdAndUpdate(user.id, login, { new: true });
    }

}
