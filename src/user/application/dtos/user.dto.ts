import {UserRol} from "../../domain/enums/user.rol";

export class UserDto {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    role: UserRol;
    createdAt: Date;
    updatedAt: Date;
}