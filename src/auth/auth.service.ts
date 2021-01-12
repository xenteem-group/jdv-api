import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginsService } from 'src/logins/logins.service';

@Injectable()
export class AuthService {
    
    constructor(
        private usersService: UsersService,
        private loginsService: LoginsService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneForLogin(username);
        if (user && !user.deleted && await bcrypt.compare(pass, user.password)) {
            return {
                id: user.id,
                username: user.username,
                role: user.role
            };
        }

        return null;
    }

    async login(req: any) {
        const user = req.user;
        const payload = { username: user.username, sub: user.id, role: user.role }
        const token = this.jwtService.sign(payload);
        const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

        this.loginsService.create(user.id, expiresIn, req);
        return {
            access_token: token,
            expiresIn: expiresIn,
        }
    }

}
