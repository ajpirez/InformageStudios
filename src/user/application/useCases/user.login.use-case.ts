import {Either, left, right} from "../../../shared/domain/either";
import {AppError} from "../../../shared/domain/errors/app.error";
import {Result} from "../../../shared/domain/result";
import {Injectable} from "@nestjs/common";
import {IUseCase} from "../../../shared/domain/interfaces/IUseCase";
import {User} from "../../domain/entities/user";
import {JwtService} from '@nestjs/jwt';

export type ReturnLoginDto = {
    token: string;
}

export type LoginUseCaseResponse = Either<AppError.UnexpectedErrorResult<ReturnLoginDto>
    | AppError.ValidationErrorResult<ReturnLoginDto>,
    Result<ReturnLoginDto>>;

@Injectable()
export class LoginUseCase implements IUseCase<User, Promise<LoginUseCaseResponse>> {

    constructor(private readonly jwtService: JwtService) {
    }

    async execute(request: User): Promise<LoginUseCaseResponse> {
        try {
            const payload = {email: request.email, _id: request._id.toString(), role: request.rol};
            const token: string = await this.jwtService.signAsync(payload);
            return right(Result.Ok({token: token}));
        } catch (error) {
            return left(Result.Fail(new AppError.UnexpectedError(error)));
        }
    }
}
