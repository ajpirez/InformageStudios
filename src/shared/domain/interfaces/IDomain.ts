export type BaseProps = {
  [index: string]: unknown;
};

export interface IDomain {
  equals(domain: IDomain): boolean;
}
