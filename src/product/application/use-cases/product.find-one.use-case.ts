import {Either, left, right} from "../../../shared/domain/either";
import {AppError} from "../../../shared/domain/errors/app.error";
import {Product} from "../../domain/entities/product";
import {Result} from "../../../shared/domain/result";
import {IUseCase} from "../../../shared/domain/interfaces/IUseCase";
import {ProductRepository} from "../../infra/repositories/product.repository";
import {Injectable} from "@nestjs/common";
import {ProductMappers} from "../../infra/mappers/product.mappers";

export type ProductFindOneUseCaseResponse = Either<AppError.UnexpectedErrorResult<Product>
    | AppError.ValidationErrorResult<Product>,
    Result<Product>>;

@Injectable()
export class ProductFindOneUseCase implements IUseCase<{ id: string }, ProductFindOneUseCaseResponse> {

    constructor(private readonly productRepository: ProductRepository) {
    }

    async execute(req: { id: string }): Promise<ProductFindOneUseCaseResponse> {

        let p = await this
            .productRepository
            .findOne({id: req.id}, ["warehouse"]);

        if (!p)
            return left(Result.Fail(new AppError.ValidationError("Product not found")));

        return right(Result.Ok(ProductMappers.PersistToDomain(p)));
    }
}



