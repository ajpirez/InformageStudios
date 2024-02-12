import {Injectable, OnModuleInit} from "@nestjs/common";
import {Either, left, right} from "../../../shared/domain/either";
import {NewUserProps, User} from "../../domain/entities/user";
import {AppError} from "../../../shared/domain/errors/app.error";
import {Result} from "../../../shared/domain/result";
import {IUseCase} from "../../../shared/domain/interfaces/IUseCase"
import {UserRepository} from "../../infra/repositories/user.repository";
import {UserMapper} from "../../infra/mappers/user.mapper";
import {UserRol} from "../../domain/enums/user.rol";


export type UserCreateUseCaseResponse = Either<AppError.UnexpectedErrorResult<User>
    | AppError.ValidationErrorResult<User>,
    Result<User>>;


@Injectable()
export class UserCreateUseCase implements IUseCase<NewUserProps, UserCreateUseCaseResponse>, OnModuleInit {

    constructor(private readonly userRepository: UserRepository) {
    }

    async execute(req: NewUserProps
    ): Promise<UserCreateUseCaseResponse> {

        const exist = await this
            .userRepository
            .findOneUserByEmail(req.email);

        if (exist != null)
            return left(Result.Fail(new AppError.ValidationError("User already exist")));

        const user = await User.new(req);

        if (!user.isSuccess)
            return left(Result.Fail(user.error));

        await this
            .userRepository
            .create(UserMapper.DomainToPersist(user.unwrap()));


        return right(Result.Ok(user.unwrap()));
    }

    async onModuleInit() {
        const exist = await this.userRepository.findOneUserByEmail('admin@admin.com');

        if (!exist) {
            const userAdmin: NewUserProps = {
                name: 'admin',
                lastName: 'admin',
                password: 'Admin@123!',
                email: 'admin@admin.com',
                rol: UserRol.ADMIN
            };

            await this.execute(userAdmin);
        }
    }
}