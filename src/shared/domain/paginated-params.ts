import {ValueObject} from '../domain/value-object.abstract';
import {Result} from './result';

export type PageParamsDto = {
    pageNum: number;
    pageLimit: number;
};

type PageParamsProps = {
    pageNum: number;
    pageLimit: number;
};

export class PageParams extends ValueObject<PageParamsProps> {
    static pageMinValue = 1;
    static pageLimitMinValue = 1;

    get pageLimit(): number {
        return this.props?.pageLimit || 25;
    }

    get pageNum(): number {
        return this.props?.pageNum || 1;
    }

    static create(props: PageParamsProps): Result<PageParams> {
        props.pageLimit = props?.pageLimit || 25;
        props.pageNum = props?.pageNum || 1;

        return Result.Ok(new PageParams(props));
    }
}
