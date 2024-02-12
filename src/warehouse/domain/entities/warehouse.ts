import {Domain} from "../../../shared/domain/domain.abstract";
import {Result} from "../../../shared/domain/result";

type WarehouseProps = {
    _id?: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

export type NewWarehouseProps = Omit<WarehouseProps, '_id' | 'createdAt' | 'updatedAt'>;

export class Warehouse extends Domain<WarehouseProps> {

    get _id(): string {
        return this.props._id;
    }

    get name(): string {
        return this.props.name;
    }


    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    public static new(props: NewWarehouseProps): Result<Warehouse> {
        return this.create({
            ...props,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

    }

    public static create(props: WarehouseProps): Result<Warehouse> {
        return Result.Ok(new Warehouse(props));
    }
}