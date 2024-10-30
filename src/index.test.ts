import {expect, test, describe} from 'vitest'
import {values, keys, isObject, oLength, oForEach, oForEachK, oForEachV, oMap, oReduce, oMapO, aToO,
  shake, range, unique, arrayed, times, pick, isNullish, firstEntry, random, clamp} from '../src/'

const object = {
  1: 4,
  2: 5,
  3: 6
}

test('values', () => {
  expect(values(object).reduce((acc, cur) => {
    acc += cur
    return acc
  })).toBe(15)
})

test('keys', () => {
  expect(keys(object).reduce((acc, cur) => {
    acc += Number(cur)
    return acc
  }, 0)).toBe(6)
})

describe.each([
  [object, true], [null, false], [undefined, false], [1, false], ['a', false]
])('isObject', (value, expected) => {
  test(`${value} is ${expected}`, () => expect(isObject(value)).toBe(expected))
})

describe.each([
  [0, false], [null, true], [undefined, true], [1, false], ['a', false], [{}, false]
])('isNullish', (value, expected) => {
  test(`${value} is ${expected}`, () => expect(isNullish(value)).toBe(expected))
})

test('oLength', () => {
  expect(oLength(object)).toBe(3)
})

test('oForEach', () => {
  const tmp = [0, 0]
  oForEach(object, ([k, v]) => {
    tmp[0] += Number(k)
    tmp[1] += v
  })
  expect(tmp.join('')).toBe('615')
})

test('oForEachK', () => {
  let result = 0
  oForEachK(object, (k) => {
    result += Number(k)
  })
  expect(result).toBe(6)
})

test('oForEachV', () => {
  let result = 0
  oForEachV(object, (k) => {
    result += k
  })
  expect(result).toBe(15)
})

test('oMap', () => {
  const tmp = oMap(object, ([k, v]) => Number(k) + v)
  expect(tmp.reduce((a, b) => a + b)).toBe(21)
})

test('oReduce', () => {
  const result = oReduce(object, (acc, [k, v]) => acc + Number(k) + v, 0)
  expect(result).toBe(21)
})

test('oMapO', () => {
  const tmp = oMapO(object, ([k, v]) => [v, k])
  expect(Object.keys(tmp).reduce((a, b) => a + Number(b), 0)).toBe(15)
})

test('aToO', () => {
  const tmp = aToO([1, 2, 3, 4, 5], (v) => [v, v * 2])
  expect(Object.values(tmp).reduce(((a, b) => a + b))).toBe(30)
})

test('shake', () => {
  const tmp = shake({
    1: true,
    2: undefined,
    3: null,
    4: false,
    5: '',
    6: 0
  })
  expect(Object.keys(tmp).reduce((a, b) => a + Number(b), 0)).toBe(16)
})

test('range', () => {
  range(5).forEach((v, i) => {
    expect(v).toBe(i)
  })
})

test('times', () => {
  let result = 0
  times(5, (i) => result += i)
  expect(result).toBe(10)
})

test('unique', () => {
  const target = [1, 2, 3, 4, 'a', 'b', null]
  unique([1, 1, 2, 2, 2, 3, 4, 'a', 'b', 'b', null, null]).forEach((v, i) => {
    expect(v).toBe(target[i])
  })
})

describe.each(['a', 'abc', 1, null])('arrayed', (v) => {
  test(`${v} arrayed is ${arrayed(v)}`, () => {
    expect(arrayed(v)[0]).toBe(v)
    expect(arrayed([v, 'dummy'])[0]).toBe(v)
  })
})

test('firstEntry', () => {
  const [k, v] = firstEntry({
    a: 1,
    b: 2
  })
  expect(k).toBe('a')
  expect(v).toBe(1)
})

test('pick', () => {
  const target = {
    a: 'string',
    b: 0,
    c: null,
    d: undefined,
    e: 2,
    f: 3
  }
  const picker = (_: unknown, v: unknown) : v is number => typeof v === 'number'
  const piked = pick(target, picker)
  const result = oReduce(piked, (acc, [, v]) => {
    acc *= v + 1
    return acc
  }, 1)
  expect(result).toBe(12)
})

describe.each([[undefined, undefined], [10, 100], [-1, 1]])('random', (min, max) => {
  const result = random(min, max)
  const targetMax = max ?? 1
  const targetMin = min ?? 0
  test(`${targetMin} < ${result} < ${targetMax}`, () => {
    expect(targetMin < result && targetMax > result).toBe(true)
  })
})

describe.each([
  {x: -5, min: 0, max: 10, expected: 0},
  {x: 15, min: 0, max: 10, expected: 10},
  {x: 5, min: 0, max: 10, expected: 5},
  {x: 0, min: 0, max: 10, expected: 0},
  {x: 10, min: 0, max: 10, expected: 10}
])('clamp($x, $min, $max)', ({x, min, max, expected}) => {
  test(`returns ${expected}`, () => {
    expect(clamp(x, min, max)).toBe(expected)
  })
})