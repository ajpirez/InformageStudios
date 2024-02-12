import {AppError} from "../domain/errors/app.error";
import {Either} from "../domain/either";
import {Result} from "../domain/result";
import {Response} from "express";
import {IResultError} from "../domain/interfaces/IResultError";

export type ErrorsTypes<T> =
    AppError.UnexpectedErrorResult<T>
    | AppError.ValidationErrorResult<T>;

export class ProcessResponse {
    public static setResponse<T>(res: Response, data: Either<ErrorsTypes<T>, Result<T, IResultError>>, funcMapper: (domain: T) => any = a => a) {

        if (!data.isLeft()) {
            const value = data.value.unwrap();
            return res.status(200).json(funcMapper(value));
        }

        const error = data.value.unwrapError();

        if (error.name === AppError.UnexpectedError.name) {
            return res.status(500).json({
                code: 500,
                error: error.message,
            });

        }

        if (error.name === AppError.ValidationError.name) {
            return res.status(400).json({
                code: 400,
                error: error.message,
            });
        }

        return res.status(500).json({
            code: 500,
            error: error.message,
        });
    }
}