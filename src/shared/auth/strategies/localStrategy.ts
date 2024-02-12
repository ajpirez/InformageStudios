import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {User} from "../../../user/domain/entities/user";
import {UserValidateUseCase} from "../../../user/application/useCases/user.validate-user.use-case";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly validateUserUseCase: UserValidateUseCase) {
        super({usernameField: 'email'});
    }

    async validate(email: string, password: string): Promise<User> {
        const user = await this.validateUserUseCase.execute({email: email, password: password});
        if (user.isLeft()) {
            throw new UnauthorizedException(user.value.unwrapError());
        }
        return user.value.unwrap();
    }
}