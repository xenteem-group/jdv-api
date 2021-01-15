import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../admin/admin.module';
import { LocalStrategy } from './stategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './stategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { LoginsModule } from 'src/logins/logins.module';

@Module({
  imports: [
    UsersModule, 
    LoginsModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' }
    })
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy, 
    { provide: APP_GUARD, useClass: JwtAuthGuard }, 
    { provide: APP_GUARD, useClass: RolesGuard }
  ],
  exports: [AuthService],
  controllers: [AuthController]
})

export class AuthModule {}
