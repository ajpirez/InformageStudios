import {PaginatedFindResult} from '../paginated-find.result';
import {PageParams} from '../paginated-params';

export interface IRepository<T> {
    paginatedFind(
        paginatorParams: PageParams,
        where,
        select?,
        populate?,
        sort?,
    ): Promise<PaginatedFindResult<T>>;

    find(where, populate?, select?, sort?): Promise<T[] | any>;

    findOne(where, populate?, select?): Promise<T>;

    findById(id: string): Promise<T>;

    create(item: T | any): Promise<T>;

    delete(where): Promise<{ ok?: number; n?: number }>;

    deleteOne(where): Promise<T>;

    update(where, item: T | any): Promise<any>;

    updateOne(where, item: T | any, upsert): Promise<T>;

    aggregate(pipe: any[]): Promise<any>;

    countDocuments(where): Promise<number>;
}
