import {Either, left, right} from "../../../shared/domain/either";
import {AppError} from "../../../shared/domain/errors/app.error";
import {Product} from "../../domain/entities/product";
import {Result} from "../../../shared/domain/result";
import {Injectable} from "@nestjs/common";
import {IUseCase} from "../../../shared/domain/interfaces/IUseCase";
import {ProductRepository} from "../../infra/repositories/product.repository";
import {ProductMappers} from "../../infra/mappers/product.mappers";

export type ProductFindAllUseCaseResponse = Either<AppError.UnexpectedErrorResult<Product[]>
    | AppError.ValidationErrorResult<Product[]>,
    Result<Product[]>>;

@Injectable()
export class ProductFindAllUseCase implements IUseCase<{ warehouse: string }, ProductFindAllUseCaseResponse> {

    constructor(private readonly productRepository: ProductRepository) {
    }

    async execute(req: { warehouse: string }): Promise<ProductFindAllUseCaseResponse> {
        let p = await this
            .productRepository
            .find({warehouse: req.warehouse}, ["warehouse"]);

        if (!p)
            return left(Result.Fail(new AppError.ValidationError("Product not found")));

        const ans = p.map(ProductMappers.PersistToDomain);
        return right(Result.Ok(ans));
    }
}
