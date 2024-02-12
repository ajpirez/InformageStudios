import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {WarehousePersistence, WarehousePersistenceSchema} from "./infra/entites/warehouse.persistence";
import {WarehouseCreateUseCase} from "./application/use-cases/warehouse.create.use-case";
import {WarehouseRepository} from "./infra/repositories/warehouse.repository";
import {WarehouseController} from "./presentation/warehouse.controller";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature(
            [{name: WarehousePersistence.name, schema: WarehousePersistenceSchema}]
        )
    ],
    providers: [
        WarehouseCreateUseCase,
        WarehouseRepository
    ],
    controllers: [WarehouseController]
})
export class WarehouseModule {
}