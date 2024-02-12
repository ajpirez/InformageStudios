import {PersistEntity} from "src/shared/domain/entity.abstract";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {UserRol} from "../../domain/enums/user.rol";
import {HydratedDocument} from "mongoose";

@Schema()
export class UserPersistence extends PersistEntity {
    @Prop()
    name: string;

    @Prop()
    lastname: string;

    @Prop({index: true, unique: true})
    email: string;

    @Prop()
    password: string;

    @Prop()
    role: UserRol;
}

export type UserPersistenceDocument = HydratedDocument<UserPersistence>;
export const UserPersistenceSchema = SchemaFactory.createForClass(UserPersistence);
