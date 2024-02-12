import {PersistEntity} from "../../../shared/domain/entity.abstract";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

@Schema()
export class WarehousePersistence extends PersistEntity {
    @Prop()
    name: string;
}

export type WarehousePersistenceDocument = HydratedDocument<WarehousePersistence>;
export const WarehousePersistenceSchema = SchemaFactory.createForClass(WarehousePersistence);

