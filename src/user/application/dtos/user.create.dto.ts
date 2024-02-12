import {UserDto} from "./user.dto";

export type UserCreateDto = UserDto & {
    password: string;
}