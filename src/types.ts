export type Key = string | number | symbol

export type ValueOf<T> = T[keyof T]
