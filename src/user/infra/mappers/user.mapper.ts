import {UserPersistence} from "../entities/user.persistence";
import {User} from "../../domain/entities/user";
import {UserPassword} from "../../domain/value-objects/user.password";
import {UserDto} from "../../application/dtos/user.dto";

export class UserMapper {

    public static PersistToDomain(persistEntity: UserPersistence): User {

        return User.create({
            name: persistEntity.name,
            lastName: persistEntity.lastname,
            email: persistEntity.email,
            rol: persistEntity.role,
            password: UserPassword.create({value: persistEntity.password}).getValue(),
            _id: persistEntity._id,
            createdAt: persistEntity.createdAt,
            updatedAt: persistEntity.updatedAt,
        }).unwrap();
    }

    public static DomainToPersist(domainEntity: User): UserPersistence {
        return {
            _id: domainEntity._id,
            createdAt: domainEntity.createdAt,
            updatedAt: domainEntity.updatedAt,
            name: domainEntity.name,
            lastname: domainEntity.lastName,
            email: domainEntity.email,
            password: domainEntity.password.value,
            role: domainEntity.rol,
        }
    }

    public static DomainToDto(domainEntity: User): UserDto {
        return {
            _id: domainEntity._id,
            createdAt: domainEntity.createdAt,
            updatedAt: domainEntity.updatedAt,
            name: domainEntity.name,
            lastname: domainEntity.lastName,
            email: domainEntity.email,
            role: domainEntity.rol,
        }
    }
}