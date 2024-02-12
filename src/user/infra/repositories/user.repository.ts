import {Injectable} from '@nestjs/common';
import {UserPersistence, UserPersistenceDocument} from "../entities/user.persistence";
import {BaseRepository} from "../../../shared/infra/base.repository";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class UserRepository extends BaseRepository<UserPersistence> {
    constructor(
        @InjectModel(UserPersistence.name)
        private readonly user: Model<UserPersistenceDocument>,
    ) {
        super(user);
    }

    async existUserWithEmail(email: string): Promise<UserPersistence> {
        return await this.findOne({email});
    }

    async findOneUserByEmail(email: string): Promise<UserPersistence> {
        return await this.findOne({email});
    }
}
