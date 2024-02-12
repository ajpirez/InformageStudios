import {Injectable} from "@nestjs/common";
import {BaseRepository} from "../../../shared/infra/base.repository";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ProductPersistence, ProductPersistenceDocument} from "../entities/product.persistence";

@Injectable()
export class ProductRepository extends BaseRepository<ProductPersistence> {
    constructor(
        @InjectModel(ProductPersistence.name)
        private readonly product: Model<ProductPersistenceDocument>,
    ) {
        super(product);
    }
}
