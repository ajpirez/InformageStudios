import {Injectable, Logger} from '@nestjs/common';
import {IRepository} from "../domain/interfaces/IRepository";
import {Model} from "mongoose";
import {PersistEntity} from "../domain/entity.abstract";
import {PageParams} from "../domain/paginated-params";
import {getDefaultPaginatedFindResult, PaginatedFindResult} from "../domain/paginated-find.result";

@Injectable()
export class BaseRepository<T extends PersistEntity> implements IRepository<T> {
    protected _logger: Logger;
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
        this._logger = new Logger('Respository..');
    }

    // static toObjectId(id: string): Types.ObjectId {
    //     try {
    //         return Types.ObjectId(id);
    //     } catch (e) {
    //         throw e;
    //     }
    // }

    getModel(): Model<T> {
        return this.model;
    }

    async paginatedFind(
        paginatorParams: PageParams,
        where = {},
        select?: any,
        populate?: any,
        sort?: any,
    ): Promise<PaginatedFindResult<T>> {
        this._logger.log(`Paginated Find. Condition: ${JSON.stringify(where)}`);

        const amount = await this.countDocuments(where);

        if (amount < 0) return getDefaultPaginatedFindResult<T>();

        const pageLimit: number =
            paginatorParams.pageLimit < amount ? paginatorParams.pageLimit : amount;
        const totalPages: number = Math.ceil(amount / pageLimit);
        const currentPage: number =
            paginatorParams.pageNum < totalPages
                ? paginatorParams.pageNum
                : totalPages;

        const items: T[] = await this.model
            .find(where)
            .select(select)
            .populate(populate)
            .limit(pageLimit)
            .skip((currentPage - 1) * pageLimit)
            .sort(sort)
            .lean();

        return {
            items,
            currentPage,
            limit: pageLimit,
            totalPages,
            totalDocuments: amount,
        };
    }

    async find(
        where = {},
        populate?: any,
        select?: any,
        sort?: any,
    ): Promise<T[] | any> {

        this._logger.log(`Find. Condition: ${JSON.stringify(where)}`);

        return await this.model
            .find(where)
            .select(select)
            .populate(populate)
            .sort(sort ?? {createdAt: -1})
            .lean();
    }

    async findOne(where = {}, populate?: any, select?: any): Promise<T> {
        this._logger.log(`Find One. Condition: ${JSON.stringify(where)}`);

        return await this.model
            .findOne(where)
            .select(select)
            .populate(populate)
            .lean();
    }

    async findById(id: string): Promise<T> {
        const where: any = {_id: id};

        this._logger.log(`Find by Id. Condition: ${JSON.stringify(where)}`);

        return await this.model.findOne(where).lean();
    }

    async create(item: T | any): Promise<T> {
        this._logger.log(`Create. Data: ${JSON.stringify(item)}`);
        delete item._id;
        return await this.model.create(item);
    }

    async deleteOne(where = {}): Promise<T | any> {
        this._logger.log(`Delete One. Condition: ${JSON.stringify(where)}`);
        return await this.model.findOneAndDelete(where).lean();
    }


    async delete(where = {}): Promise<{ ok?: number; n?: number }> {
        this._logger.log(`Delete. Condition: ${JSON.stringify(where)}`);
        return this.model.remove(where);
    }

    async deleteById(id: string): Promise<T> {
        this._logger.log(`Delete by Id. Id: ${id}`);
        return await this.model.findByIdAndDelete(id).lean();
    }

    async updateOne(where = {}, item: T | any, upsert = false): Promise<T> {
        this._logger.log(
            `Update One. Condition: ${JSON.stringify(where)}. Data: ${JSON.stringify(
                item,
            )}`,
        );
        return await this.model
            .findOneAndUpdate(where, {...item}, {new: true, upsert: upsert})
            .lean();
    }

    async update(where = {}, item: T | any): Promise<any> {
        this._logger.log(
            `Update. Condition: ${JSON.stringify(where)}. Data: ${JSON.stringify(
                item,
            )}`,
        );
        return this.model.updateMany(where, {...item});
    }

    async aggregate(pipe: any[]): Promise<any[]> {
        this._logger.log(`Aggregate. Pipe: ${JSON.stringify(pipe)}`);
        return this.model.aggregate(pipe);
    }

    async countDocuments(where = {}): Promise<number> {
        this._logger.log(`Count Documents. Condition: ${JSON.stringify(where)}`);
        return await this.model.countDocuments(where);
    }
}