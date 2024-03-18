export type Key = string | number | symbol

export type ValueOf<T> = T[keyof T]

export type PickType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

export type Falsy = false | 0 | '' | null | undefined

export type Truthy<T> = T extends Falsy ? never : T
