import {Either, left, right} from "../../../shared/domain/either";
import {AppError} from "../../../shared/domain/errors/app.error";
import {Product} from "../../domain/entities/product";
import {Result} from "../../../shared/domain/result";
import {Injectable} from "@nestjs/common";
import {IUseCase} from "../../../shared/domain/interfaces/IUseCase";
import {ProductRepository} from "../../infra/repositories/product.repository";
import {ProductMappers} from "../../infra/mappers/product.mappers";

export type ProductUpdateUnitsUseCaseResponse = Either<AppError.UnexpectedErrorResult<Product>
    | AppError.ValidationErrorResult<Product>,
    Result<Product>>;

@Injectable()
export class ProductUpdateUnitsUseCase implements IUseCase<{ id: string, amount: number }, ProductUpdateUnitsUseCaseResponse> {

    constructor(
        private readonly productRepository: ProductRepository) {
    }

    async execute(req: { id: string, amount: number }): Promise<ProductUpdateUnitsUseCaseResponse> {
        let p = await this
            .productRepository
            .findOne({id: req.id}, ["warehouse"]);

        if (!p)
            return left(Result.Fail(new AppError.ValidationError("Product not found")));

        const d = ProductMappers.PersistToDomain(p);
        const ans = d.updateUnits(req.amount);

        if (!ans.isSuccess)
            return left(Result.Fail(ans.unwrapError()));

        await this.productRepository.updateOne({id: req.id}, ProductMappers.DomainToPersist(ans.unwrap()));

        return right(Result.Ok(ans.unwrap()));
    }
}

