import { expect, it } from 'vitest';

import { failure, isFailure, isSuccess, type Result, success, unwrap } from '../source/index.js';

function test(condition: boolean): Result<true, false> {
  return condition ? success(true) : failure(false);
}

it('should unwrap success value', () => {
  const result = test(true);
  const expectTrue = isSuccess(result);
  const expectFalse = isFailure(result);

  expect(expectTrue).toStrictEqual(true);
  expect(expectFalse).toStrictEqual(false);
  expect(unwrap(result)).toStrictEqual(true);
  expect(result).toMatchInlineSnapshot(`
    {
      Symbol(result:success): true,
    }
  `);
});

it('should unwrap failure value', () => {
  const result = test(false);
  const expectTrue = isFailure(result);
  const expectFalse = isSuccess(result);

  expect(expectTrue).toStrictEqual(true);
  expect(expectFalse).toStrictEqual(false);
  expect(unwrap(result)).toStrictEqual(false);
  expect(result).toMatchInlineSnapshot(`
    {
      Symbol(result:failure): false,
    }
  `);
});
