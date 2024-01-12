// Symbols for uniquely identifying success and failure cases.
const successSymbol = Symbol('result:success');
const failureSymbol = Symbol('result:failure');

// Type aliases for the success and failure symbols.
type SuccessSymbol = typeof successSymbol;
type FailureSymbol = typeof failureSymbol;

/**
 * Represents a successful {@link Result} with a value of type `SuccessValue`.
 *
 * - The success value is indexed by the {@link SuccessSymbol}.
 * - A {@link FailureSymbol} will never be present in this type.
 *
 * @template SuccessValue - The type of the value associated with a successful result.
 */
export type Success<SuccessValue> = {
  readonly [K in SuccessSymbol]: SuccessValue;
} & {
  readonly [K in FailureSymbol]?: never;
};

/**
 * Represents a failure {@link Result} with a value of type `FailureValue`.
 *
 * - The failure value is indexed by the {@link FailureSymbol}.
 * - A {@link SuccessSymbol} will never be present in this type.
 *
 * @template FailureValue - The type of the value associated with a failure result.
 */
export type Failure<FailureValue> = {
  readonly [K in FailureSymbol]: FailureValue;
} & {
  readonly [K in SuccessSymbol]?: never;
};

/**
 * Represents a result that can either be a {@link success} or a {@link failure}.
 *
 * @template SuccessValue - The type of the value in case of success.
 * @template FailureValue - The type of the value in case of failure.
 *
 * @example
 * function life(age: number): Result<number, Error> {
 *   return age === 42 ? success(42) : failure(new Error("c'est la vie!"));
 * }
 */
export type Result<SuccessValue, FailureValue> = Success<SuccessValue> | Failure<FailureValue>;

/**
 * Creates a success {@link Result} with the given value.
 *
 * @template SuccessValue - The type of the value to be returned in case of success.
 *
 * @param value - The value to be associated with the success.
 * @returns A success result containing the value.
 *
 * @example
 * // Example usage:
 * const mySuccess = success(100);
 * console.log(mySuccess); // Outputs: { [Symbol(result:success)]: 100 }
 */
export function success<SuccessValue>(value: SuccessValue): Success<SuccessValue> {
  return { [successSymbol]: value };
}

/**
 * Creates a failure {@link Result} with the given value.
 *
 * @template FailureValue - The type of the value to be returned in case of failure.
 *
 * @param value - The value to be associated with the failure.
 * @returns A failure result containing the value.
 *
 * @example
 * // Example usage:
 * const myFailure = failure(new Error('Something went wrong'));
 * console.log(myFailure); // Outputs: { [Symbol(result:failure)]: Error: Something went wrong }
 */
export function failure<FailureValue>(value: FailureValue): Failure<FailureValue> {
  return { [failureSymbol]: value };
}

/**
 * Type guard to determine if the {@link Result} is a success.
 *
 * @template SuccessValue - The type of the success value to be checked.
 *
 * @param result - The result to check.
 * @returns `true` if the result is a success, `false` otherwise.
 *
 * @example
 * // Example usage:
 * const myResult = success(42);
 *
 * if (isSuccess(myResult)) {
 *   // TypeScript knows myResult is Success<number> here
 * }
 */
export function isSuccess<SuccessValue>(result: Result<SuccessValue, unknown>): result is Success<SuccessValue> {
  return result[successSymbol] !== undefined;
}

/**
 * Type guard to determine if the {@link Result} is a failure.
 *
 * @template FailureValue - The type of the failure value to be checked.
 *
 * @param result - The result to check.
 * @returns `true` if the result is a failure, `false` otherwise.
 *
 * @example
 * // Example usage:
 * const myResult = failure(new Error('Failed'));
 *
 * if (isFailure(myResult)) {
 *   // TypeScript knows myResult is Failure<Error> here
 * }
 */
export function isFailure<FailureValue>(result: Result<unknown, FailureValue>): result is Failure<FailureValue> {
  return result[failureSymbol] !== undefined;
}

/**
 * Unwraps the value from a success or failure {@link Result}.
 *
 * - If the result is a success, returns the success value.
 * - If the result is a failure, returns the failure value.
 *
 * @template SuccessValue - The type of the success value to be unwrapped.
 * @template FailureValue - The type of the failure value to be unwrapped.
 *
 * @param result - The {@link Result} to unwrap.
 * @returns The unwrapped value.
 *
 * @example
 * // Basic usage:
 * const successResult = success(10);
 * const failureResult = failure(new Error('Failed'));
 * const value1 = unwrap(successResult); // value1 is 10
 * const value2 = unwrap(failureResult); // value2 is Error: Failed
 *
 * @example
 * // Advenced usage:
 * function life(age: number): Result<number, Error> {
 *   return age === 42 ? success(42) : failure(new Error("c'est la vie!"));
 * }
 *
 * const result = life(42);
 *
 * if (isSuccess(result)) {
 *   const value = unwrap(result);
 *   // result: Success<number>
 *   // value: number
 * } else {
 *   const value = unwrap(result);
 *   // result: Failure<Error>
 *   // value: Error
 * }
 *
 */
export function unwrap<SuccessValue>(result: Success<SuccessValue>): SuccessValue;
export function unwrap<FailureValue>(result: Failure<FailureValue>): FailureValue;
export function unwrap<SuccessValue, FailureValue>(
  result: Result<SuccessValue, FailureValue>,
): FailureValue | SuccessValue;
export function unwrap<SuccessValue, FailureType>(
  result: Result<SuccessValue, FailureType>,
): FailureType | SuccessValue {
  return isSuccess(result) ? result[successSymbol] : result[failureSymbol];
}
