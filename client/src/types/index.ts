export type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;
export type Pick<T, K extends keyof T> = { [P in K]: T[P] };
