import {Injectable} from "@nestjs/common";
import {BaseRepository} from "../../../shared/infra/base.repository";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {WarehousePersistence, WarehousePersistenceDocument} from "../entites/warehouse.persistence";

@Injectable()
export class WarehouseRepository extends BaseRepository<WarehousePersistence> {
    constructor(
        @InjectModel(WarehousePersistence.name)
        private readonly warehouse: Model<WarehousePersistenceDocument>,
    ) {
        super(warehouse);
    }
}
