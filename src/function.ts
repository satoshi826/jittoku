import type {Key, PickType, ValueOf} from './types.ts'

export const values = <T>(obj: Record<Key, T>) => Object.values(obj)

export const keys = <T extends Key>(obj: Record<T, unknown>) => Object.keys(obj)

export const isObject = (v: unknown): v is object => v !== null && typeof v === 'object'

export const oLength = (obj: object): number => Object.keys(obj).length

export const oForEach = <TKey extends Key, TValue>
  (object: Record<TKey, TValue>, f: (keyValue: [TKey, TValue]) => void) => {
  (Object.entries(object) as Array<[TKey, TValue]>).forEach(f)
}

export const oForEachK = <T extends Key>
  (object: Record<T, unknown>, f: (key: T) => void) => {
  (Object.keys(object) as T[]).forEach(f)
}

export const oForEachV = <T>
  (object: Record<Key, T>, f: (value: T) => void) => {
  Object.values(object).forEach(f)
}

export const oMap = <TKey extends Key, TValue, K>
  (object: Record<TKey, TValue>, f: (keyValue: [TKey, TValue]) => K): K[] =>
    (Object.entries(object) as Array<[TKey, TValue]>).map(f)

export const oReduce = <TKey extends Key, TValue, Acc, Return extends Acc>
  (
    object: Record<TKey, TValue>,
    f: (
      acc: Acc,
      cur: [TKey, TValue],
      index: number,
      arr: Array<[TKey, TValue]>
    )
    => Return, int: Acc): Return =>
    (Object.entries(object) as Array<[TKey, TValue]>).reduce(f, int) as Return

export const oMapO = <TKey extends Key, TValue, K extends Key, U>
  (object: Record<TKey, TValue>, f: (keyValue: [TKey, TValue]) => [K, U]) =>
    Object.entries(object).reduce((obj, [k, v]) => {
      const [newK, newV] = f([k, v] as [TKey, TValue])
      obj[newK] = newV
      return obj
    }, {} as Record<K, U>)

export const aToO = <T, K extends Key, U>
  (array: T[], f: (item: T) => [K, U]): Record<K, U> => array.reduce((obj, cur) => {
    const [k, v] = f(cur)
    obj[k] = v
    return obj
  }, {} as Record<K, U>)

export const partition = <T>
  (array: T[], f: (cur: T) => unknown) => array.reduce<[T[], T[]]>((res, cur) => {
    res[f(cur) ? 0 : 1].push(cur)
    return res
  }, [[], []])

export const shake = <TKey extends Key, TValue>
  (object: Record<TKey, TValue | null | undefined>): Record<TKey, TValue> => Object?.keys(object).reduce((obj, cur) => {
    if (!(object[cur as TKey] === undefined || object[cur as TKey] === null)) obj[cur as TKey] = object[cur as TKey] as TValue
    return obj
  }, {} as Record<TKey, TValue>)

export const range = (num: number) => [...Array(num).keys()]

export const times = (i :number, f: (index: number) => void) => {
  for (let index = 0; index < i; index++) f(index)
}

export const unique = <T>(array: T[]) => [...new Set(array)]

export const arrayed = <T>(v: T | T[]) => Array.isArray(v) ? v : [v]

export const pick = <T extends object, K extends ValueOf<T>>
  (obj : T, picker : (k: keyof T, v : ValueOf<T>) => v is K) : PickType<T, K> =>
    oReduce(obj, (acc, [k, v]) => {
      if (picker(k, v)) acc[k] = v
      return acc
    }, {} as PickType<T, K>)

