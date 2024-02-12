import {Warehouse} from "../../domain/entities/warehouse";
import {WarehousePersistence} from "../entites/warehouse.persistence";
import {WarehouseDto} from "../../application/dtos/warehouse.dto";

export class WarehouseMappers {
    public static PersistToDomain(p: WarehousePersistence): Warehouse {
        return Warehouse.create({
            _id: p._id,
            name: p.name,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
        }).getValue();
    }

    public static DomainToPersist(d: Warehouse): WarehousePersistence {

        return {
            name: d.name,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt
        };
    }

    public static DomainToDto(d: Warehouse): WarehouseDto {
        return {
            _id: d._id,
            name: d.name,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt
        };
    }
}