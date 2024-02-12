import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UserPersistence, UserPersistenceSchema} from "./infra/entities/user.persistence";
import {UserRepository} from "./infra/repositories/user.repository";
import {UserController} from "./presentation/user.controller";
import {UserUpdateRolUseCase} from "./application/useCases/user.update-rol.use-case";
import {UserCreateUseCase} from "./application/useCases/user.create.use-case";
import {UserValidateUseCase} from "./application/useCases/user.validate-user.use-case";
import {LoginUseCase} from "./application/useCases/user.login.use-case";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {LocalStrategy} from "../shared/auth/strategies/localStrategy";
import {JwtStrategy} from "../shared/auth/strategies/jwtStrategy";

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRATION')
                    }
                }
            }
        }),
        MongooseModule.forFeature(
            [{name: UserPersistence.name, schema: UserPersistenceSchema}]
        )
    ],
    providers: [
        UserRepository,
        UserUpdateRolUseCase,
        UserCreateUseCase,
        UserValidateUseCase,
        LoginUseCase,
        LocalStrategy,
        JwtStrategy
    ],
    controllers: [UserController],
})
export class UserModule {
}
