import {UserRol} from "../enums/user.rol";

export type JWTClaims = {
    _id: string;
    email: string;
    role: UserRol
};

export type JWTToken = string;
