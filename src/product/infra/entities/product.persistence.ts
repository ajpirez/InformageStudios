import {PersistEntity} from "../../../shared/domain/entity.abstract";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {HydratedDocument} from "mongoose";
import {WarehousePersistence} from "../../../warehouse/infra/entites/warehouse.persistence";

@Schema()
export class ProductPersistence extends PersistEntity {
    @Prop()
    name: string;

    @Prop()
    quantity: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'WarehousePersistence'})
    warehouse: WarehousePersistence | any;
}

export type ProductPersistenceDocument = HydratedDocument<ProductPersistence>;
export const ProductPersistenceSchema = SchemaFactory.createForClass(ProductPersistence);

