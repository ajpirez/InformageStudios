import {Domain} from "../../../shared/domain/domain.abstract";
import {Result} from "../../../shared/domain/result";
import {AppError} from "../../../shared/domain/errors/app.error";

type ProductProps = {
    _id?: string;
    name: string;
    quantity: number;
    warehouse: any;
    createdAt: Date;
    updatedAt: Date;
};

export type NewProductProps = Omit<ProductProps, '_id' | 'createdAt' | 'updatedAt'>;

export class Product extends Domain<ProductProps> {

    get _id(): string {
        return this.props._id;
    }

    get name(): string {
        return this.props.name;
    }

    get quantity(): number {
        return this.props.quantity;
    }

    get warehouse() {
        return this.props.warehouse;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    public static new(props: NewProductProps): Result<Product> {
        return this.create({
            ...props,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

    }

    public static create(props: ProductProps): Result<Product> {
        return Result.Ok(new Product(props));
    }

    public updateUnits(amount: number): Result<Product> {

        if (this.props.quantity + amount < 0)
            return Result.Fail(new AppError.ValidationError(`Product(${this.props.name}) is not enough`));

        this.props.quantity += amount;
        this.props.updatedAt = new Date();

        return Result.Ok(this);
    }

}
