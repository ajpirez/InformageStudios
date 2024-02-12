import {Prop} from "@nestjs/mongoose";

/**
 * @description Class base for persist entities in DB only
 */

export abstract class PersistEntity {
    _id?: string;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}
