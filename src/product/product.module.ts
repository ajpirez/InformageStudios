import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {ProductCreateUseCase} from "./application/use-cases/product.create.use-case";
import {ProductPersistence, ProductPersistenceSchema} from "./infra/entities/product.persistence";
import {ProductRepository} from "./infra/repositories/product.repository";
import {ProductController} from "./presentation/product.controller";
import {ProductFindOneUseCase} from "./application/use-cases/product.find-one.use-case";
import {ProductUpdateUnitsUseCase} from "./application/use-cases/product.update-units.use-case";
import {ProductFindAllUseCase} from "./application/use-cases/product.find-all.use-case";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature(
            [{name: ProductPersistence.name, schema: ProductPersistenceSchema}]
        )
    ],
    providers: [
        ProductCreateUseCase,
        ProductRepository,
        ProductFindOneUseCase,
        ProductUpdateUnitsUseCase,
        ProductFindAllUseCase
    ],
    controllers: [ProductController]
})
export class ProductModule {
}