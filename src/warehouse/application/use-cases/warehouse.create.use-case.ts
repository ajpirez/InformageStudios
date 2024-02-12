import {Result} from "src/shared/domain/result";
import {AppError} from "../../../shared/domain/errors/app.error";
import {Injectable} from "@nestjs/common";
import {NewWarehouseProps, Warehouse} from "../../domain/entities/warehouse";
import {WarehouseRepository} from "../../infra/repositories/warehouse.repository";
import {Either, left, right} from "../../../shared/domain/either";
import {IUseCase} from "../../../shared/domain/interfaces/IUseCase";
import {WarehouseMappers} from "../../infra/mappers/warehouse.mappers";

export type WarehouseCreateUseCaseResponse = Either<AppError.UnexpectedErrorResult<Warehouse>
    | AppError.ValidationErrorResult<Warehouse>,
    Result<Warehouse>>;


@Injectable()
export class WarehouseCreateUseCase implements IUseCase<NewWarehouseProps, WarehouseCreateUseCaseResponse> {

    constructor(private readonly warehouseRepository: WarehouseRepository) {
    }

    async execute(req: NewWarehouseProps
    ): Promise<WarehouseCreateUseCaseResponse> {

        const exist = await this
            .warehouseRepository
            .findOne({name: req.name});

        if (exist != null)
            return left(Result.Fail(new AppError.ValidationError("Warehouse already exist")));

        const warehouse = Warehouse.new(req);

        if (!warehouse.isSuccess)
            return left(Result.Fail(warehouse.unwrapError()));

        await this
            .warehouseRepository
            .create(WarehouseMappers.DomainToPersist(warehouse.unwrap()));

        return right(Result.Ok(warehouse.unwrap()));
    }
}
