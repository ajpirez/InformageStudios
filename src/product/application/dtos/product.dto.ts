export type ProductDto = {
    _id: string;
    name: string;
    quantity: number;
    warehouse?: any;
    createdAt: Date;
    updatedAt: Date;
}