# jittoku

Tiny TypeScript utility

## Install

```shell
npm install jittoku
```

## Usage

## `values(object)`

returns an array of object values

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = values(obj); // ['1', '2', '3']
```

## `keys(object)`

returns an array of object keys

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = keys(obj); // ['a', 'b', 'c']
```

## `isObject(value)`

checks if the given value is an object

```typescript
const result1 = isObject({}); // true
const result2 = isObject([]); // true
const result3 = isObject(null); // false
```

## `isNullish(value)`

checks if the given value is null or undefined

```typescript
const result1 = isNullish(null); // true
const result2 = isNullish(undefined); // true
const result3 = isNullish(0); // false
```

## `oLength(object)`

returns the number of keys in an object

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = oLength(obj); // 3
```

## `oForEach(object, function)`

executes a function for each entry in an object

```typescript
const obj = { a: 1, b: 2, c: 3 };
oForEach(obj, ([key, value], index) => {
  console.log(`Key: ${key}, Value: ${value}`);
});
```

## `oForEachK(object, function)`

executes a function for each key in an object

```typescript
const obj = { a: 1, b: 2, c: 3 };
oForEachK(obj, (key, index) => {
  console.log(`Key: ${key}`);
});
```

## `oForEachV(object, function)`

executes a function for each value in an object

```typescript
const obj = { a: 1, b: 2, c: 3 };
oForEachV(obj, (value, index) => {
  console.log(`Value: ${value}`);
});
```

## `oMap(object, function)`

applies a function to each entry in an object and returns an array of the results

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = oMap(obj, ([key, value], index) => key + value); // ['a1', 'b2', 'c3']
```

## `oReduce(object, function, initialValue)`

executes a cumulative function for each entry in an object and returns the result

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = oReduce(obj, (acc, [key, value], index) => acc + value, 0); // 6
```

## `oMapO(object, function)`

applies a function to each entry in an object and returns a new object

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = oMapO(obj, ([key, value], index) => [key + 'x', value * 2]); // { ax: 2, bx: 4, cx: 6 }
```

## `aToO(array, function)`

applies a function to each element in an array and returns an object

```typescript
const array = ['a', 'b', 'c'];
const result = aToO(array, (item, index) => [item, index + 1]); // { a: 1, b: 2, c: 3 }
```

## `partition(array, function)`

splits the elements of an array based on a condition

```typescript
const array = [1, 2, 3, 4, 5];
const result = partition(array, (cur, index) => cur % 2 === 0); // [[2, 4], [1, 3, 5]]
```

## `shake(object)`

removes null or undefined values from an object

```typescript
const obj = { a: 1, b: null, c: undefined, d: 4 };
const result = shake(obj); // { a: 1, d: 4 }
```

## `range(number)`

returns an array of integers within a specified range

```typescript
const result = range(5); // [0, 1, 2, 3, 4]
```

## `times(iterations, function)`

executes a function a specified number of times

```typescript
times(3, index => {
  console.log(`Iteration ${index + 1}`);
});
```

## `unique(array)`

returns a new array with duplicate elements removed

```typescript
const array = [1, 2, 2, 3, 3, 4, 5];
const result = unique(array); // [1, 2, 3, 4, 5]
```

## `arrayed(value)`

converts a value to an array, or returns the value if it's already an array

```typescript
const result1 = arrayed(1); // [1]
const result2 = arrayed([1, 2, 3]); // [1, 2, 3]
```

## `firstEntry(object)`

returns the first entry of an object

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = firstEntry(obj); // ['a', 1]
```

## `pick(object, function)`

selects entries from an object based on a specified condition

```typescript
const obj = { a: 1, b: 'two', c: true };
const picker = (key: unknown, value: unknown) : value is number => typeof value === 'number'
const result = pick(obj, picker); // { a: 1 }
```

## `random(min: number, max: number)`

returns a random floating-point number within a specified range

```typescript
const result = random(10, 20); // random floating-point number between 10 and 20
```

## `clamp(x: number, min: number, max: number)`

returns min if x is less than min, max if x is greater than max, and x itself if it is within the range.

```typescript
const result1 = clamp(-5, 0, 10); // 0
const result2 = clamp(5, 0, 10);  // 5
const result3 = clamp(15, 0, 10); // 10
```

## `truncate(value: number, digits: number)`

truncates a number to the specified number of significant digits.

```typescript
const result1 = truncate(1234.5678, 2);  // 1234.56
const result2 = truncate(1234.5678, 0);  // 1234
const result3 = truncate(1234.5678, -1); // 1230
const result4 = truncate(1234.5678, -2); // 1200
```
