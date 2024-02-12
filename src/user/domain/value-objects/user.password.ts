import * as bcript from 'bcrypt';
import {ValueObject} from "../../../shared/domain/value-object.abstract";
import {Result} from "../../../shared/domain/result";
import {AppError} from "../../../shared/domain/errors/app.error";

type UserPasswordProps = {
    value: string;
};

export class UserPassword extends ValueObject<UserPasswordProps> {
    get value(): string {
        return this.props.value;
    }

    /**
     * Compares as plain-text and hashed password.
     *
     * @param {string} plainTextPassword
     * @returns  {Promise<boolean>}
     * @memberof UserPassword
     */
    async compareWith(plainTextPass: string): Promise<boolean> {
        return bcript.compare(plainTextPass, this.props.value);
    }

    private static async hashPassword(plainPass: string): Promise<string> {
        return await bcript.hash(plainPass, 10);
    }

    private static itComplex(password: string): boolean {
        const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d].{8,}/;
        return re.test(password);
    }

    public static create({value}: UserPasswordProps): Result<UserPassword> {
        if (!this.itComplex(value))
            return Result.Fail(
                new AppError.ValidationError(`password ${value} is not complex`),
            );

        return Result.Ok(new UserPassword({value}));
    }

    public static async createFromPlain({
                                            value,
                                        }: UserPasswordProps): Promise<Result<UserPassword>> {

        if (!this.itComplex(value))
            return Result.Fail(
                new AppError.ValidationError(`password ${value} is not complex`),
            );

        value = await this.hashPassword(value);
        return Result.Ok(new UserPassword({value}));
    }
}
