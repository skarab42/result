const successSymbol = Symbol('result:success');
const failureSymbol = Symbol('result:failure');

type SuccessSymbol = typeof successSymbol;
type FailureSymbol = typeof failureSymbol;

export type Success<SuccessValue> = { readonly [K in SuccessSymbol]: SuccessValue } & {
  readonly [K in FailureSymbol]?: never;
};

export type Failure<FailureValue> = { readonly [K in FailureSymbol]: FailureValue } & {
  readonly [K in SuccessSymbol]?: never;
};

export type Result<SuccessValue, FailureValue> = Success<SuccessValue> | Failure<FailureValue>;

export function success<SuccessValue>(value: SuccessValue): Success<SuccessValue> {
  return { [successSymbol]: value };
}

export function failure<FailureValue>(value: FailureValue): Failure<FailureValue> {
  return { [failureSymbol]: value };
}

export function isSuccess<SuccessValue>(result: Result<SuccessValue, unknown>): result is Success<SuccessValue> {
  return result[successSymbol] !== undefined;
}

export function isFailure<FailureValue>(result: Result<unknown, FailureValue>): result is Failure<FailureValue> {
  return result[failureSymbol] !== undefined;
}

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
