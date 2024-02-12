import {Either, left, right} from "../../../shared/domain/either";
import {AppError} from "../../../shared/domain/errors/app.error";
import {User} from "../../domain/entities/user";
import {Result} from "../../../shared/domain/result";
import {IUseCase} from "../../../shared/domain/interfaces/IUseCase";
import {UserRepository} from "../../infra/repositories/user.repository";
import {Injectable} from "@nestjs/common";
import {compareSync} from 'bcrypt';
import {UserMapper} from "../../infra/mappers/user.mapper";

export type ValidateUserUseCaseResponse = Either<AppError.UnexpectedErrorResult<User>
    | AppError.ValidationErrorResult<User>,
    Result<User>>;

@Injectable()
export class UserValidateUseCase implements IUseCase<{ email: string, password: string }, Promise<ValidateUserUseCaseResponse>> {


    constructor(private readonly userRepository: UserRepository) {
    }

    async execute(request: { email: string, password: string }): Promise<ValidateUserUseCaseResponse> {

        try {
            const user = await this.userRepository.findOneUserByEmail(request.email);

            if (!user)
                return left(Result.Fail(new AppError.ValidationError('User not found')));

            if (!compareSync(request.password, user.password))
                return left(Result.Fail(new AppError.ValidationError('Wrong email or password')));

            return right(Result.Ok(UserMapper.PersistToDomain(user)));
        } catch (error) {
            return left(Result.Fail(new AppError.UnexpectedError(error)));
        }
    }
}
