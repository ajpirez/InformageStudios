import {Product} from "../../domain/entities/product";
import {ProductPersistence} from "../entities/product.persistence";
import {ProductDto} from "../../application/dtos/product.dto";

export class ProductMappers {
    public static PersistToDomain(p: ProductPersistence): Product {
        return Product.create({
            _id: p._id,
            name: p.name,
            quantity: p.quantity,
            warehouse: p.warehouse,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt
        }).getValue();
    }

    public static DomainToPersist(d: Product): ProductPersistence {
        return {
            name: d.name,
            quantity: d.quantity,
            warehouse: d.warehouse,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt
        };
    }

    public static DomainToDto(d: Product): ProductDto {
        return {
            _id: d._id,
            name: d.name,
            quantity: d.quantity,
            warehouse: d.warehouse,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt
        };
    }
}