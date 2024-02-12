import {Either, left, right} from "../../../shared/domain/either";
import {AppError} from "../../../shared/domain/errors/app.error";
import {User} from "../../domain/entities/user";
import {Result} from "../../../shared/domain/result";
import {IUseCase} from "../../../shared/domain/interfaces/IUseCase";
import {Injectable} from "@nestjs/common";
import {UserRepository} from "../../infra/repositories/user.repository";
import {UserMapper} from "../../infra/mappers/user.mapper";

export type UserUpdateRolUseCaseResponse = Either<AppError.UnexpectedErrorResult<User>
    | AppError.ValidationErrorResult<User>,
    Result<User>>;

@Injectable()
export class UserUpdateRolUseCase implements IUseCase<{ id: string }, UserUpdateRolUseCaseResponse> {
    constructor(private readonly userRepository: UserRepository) {
    }

    async execute(req: { id: string }): Promise<UserUpdateRolUseCaseResponse> {

        const user = await this.userRepository.findById(req.id);

        if (user == null)
            return left(Result.Fail(new AppError.ValidationError("User not exist")));

        const domain = UserMapper.PersistToDomain(user);
        domain.updateRol();

        await this.userRepository.updateOne({_id: req.id}, UserMapper.DomainToPersist(domain));

        return right(Result.Ok(domain));
    }
}
