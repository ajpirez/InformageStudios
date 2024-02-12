import {BaseProps} from "./interfaces/IDomain";

/**
 * @description ValueObejcts are objects that we determine their equality
 * through their structural properties.
 */


export abstract class ValueObject<T extends BaseProps> {
    protected readonly props: T;

    protected constructor(props: T) {
        this.props = props;
    }

    public equals(vo?: ValueObject<T>): boolean {
        if (!vo || !vo.props) return false;

        return JSON.stringify(this.props) === JSON.stringify(vo.props);
    }
}
