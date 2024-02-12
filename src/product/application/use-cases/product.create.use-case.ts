import {AppError} from "../../../shared/domain/errors/app.error";
import {Injectable} from "@nestjs/common";
import {NewProductProps, Product} from "../../domain/entities/product";
import {Either, left, right} from "../../../shared/domain/either";
import {IUseCase} from "../../../shared/domain/interfaces/IUseCase";
import {ProductMappers} from "../../infra/mappers/product.mappers";
import {Result} from "../../../shared/domain/result";
import {ProductRepository} from "../../infra/repositories/product.repository";

export type ProductCreateUseCaseResponse = Either<AppError.UnexpectedErrorResult<Product>
    | AppError.ValidationErrorResult<Product>,
    Result<Product>>;


@Injectable()
export class ProductCreateUseCase implements IUseCase<NewProductProps, ProductCreateUseCaseResponse> {

    constructor(private readonly productRepository: ProductRepository) {
    }

    async execute(req: NewProductProps
    ): Promise<ProductCreateUseCaseResponse> {

        const exist = await this
            .productRepository
            .findOne({name: req.name});

        if (exist != null)
            return left(Result.Fail(new AppError.ValidationError("Product already exist")));

        const product = await Product.new(req);

        if (!product.isSuccess)
            return left(Result.Fail(product.unwrapError()));

        await this
            .productRepository
            .create(ProductMappers.DomainToPersist(product.unwrap()));


        return right(Result.Ok(product.unwrap()));
    }
}
