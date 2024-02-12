import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {UserDto} from '../../../user/application/dtos/user.dto';
import {ConfigService} from "@nestjs/config";
import {UserRepository} from "../../../user/infra/repositories/user.repository";
import {UserMapper} from "../../../user/infra/mappers/user.mapper";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly userRepository: UserRepository,
        configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: any): Promise<UserDto> {
        try {
            const user = await this.userRepository.findOneUserByEmail(payload.email);

            if (!user)
                throw new UnauthorizedException('error');

            const domain = UserMapper.PersistToDomain(user);

            return UserMapper.DomainToDto(domain);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}