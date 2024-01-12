# @skarab/result

`@skarab/result` is a TypeScript library providing a robust pattern for handling success and failure outcomes in a functional programming style. Utilizing advanced TypeScript features, it allows developers to create expressive, type-safe APIs that clearly distinguish between successful results and errors.

## Features

- **Type-Safe Success and Failure Handling:** Clearly differentiate between success and failure cases using TypeScript types.
- **Functional Approach:** Embrace a functional programming style for handling results.
- **Easy to Use:** Simple API with powerful type inference.

## Installation

To install the package, use pnpm, npm or yarn:

## Installation

```bash
pnpm add @skarab/result
```

## Usage

Here's a basic example of how to use `@skarab/result`:

```ts
import { success, failure, isSuccess, unwrap } from '@skarab/result';

function performOperation(): Result<number, Error> {
  // some operation
  if (/* operation successful */) {
    return success(42);
  } else {
    return failure(new Error('Operation failed'));
  }
}

const result = performOperation();

if (isSuccess(result)) {
  console.log('Success with value:', unwrap(result));
} else {
  console.log('Failure with error:', unwrap(result));
}
```

## API Documentation

### Types

#### `Success<SuccessValue>`

- A type representing a successful result.
- Contains a value of type `SuccessValue`.
- Indexed by a unique success symbol, ensuring type safety and avoiding property clashes.

#### `Failure<FailureValue>`

- A type representing a failure result.
- Contains a value of type `FailureValue`.
- Indexed by a unique failure symbol, providing clear differentiation from the `Success` type.

#### `Result<SuccessValue, FailureValue>`

- A union type representing either a success or a failure.
- Encapsulates `Success<SuccessValue>` and `Failure<FailureValue>`.

### Functions

#### `success<SuccessValue>(value: SuccessValue): Success<SuccessValue>`

- Creates a success result containing the provided value.
- Useful for wrapping successful outcomes in a type-safe manner.
- **Parameters:**
  - `value`: The value to be associated with the success.

#### `failure<FailureValue>(value: FailureValue): Failure<FailureValue>`

- Creates a failure result containing the provided value.
- Ideal for expressing error states or unsuccessful outcomes.
- **Parameters:**
  - `value`: The value to be associated with the failure.

#### `isSuccess<SuccessValue>(result: Result<SuccessValue, unknown>): result is Success<SuccessValue>`

- A type guard function that checks if a given result is a success.
- Returns `true` if the result is a success, otherwise `false`.
- Helps in narrowing down the type of the result to `Success<SuccessValue>` when true.

#### `isFailure<FailureValue>(result: Result<unknown, FailureValue>): result is Failure<FailureValue>`

- A type guard function that checks if a given result is a failure.
- Returns `true` if the result is a failure, otherwise `false`.
- Assists in type narrowing to `Failure<FailureValue>` when the result is a failure.

#### `unwrap<SuccessValue, FailureValue>(result: Result<SuccessValue, FailureValue>): FailureValue | SuccessValue`

- Extracts the value from a success or failure result.
- Simplifies the process of accessing the underlying value of a result.
- **Parameters:**
  - `result`: The `Result` instance from which the value should be unwrapped.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any features or fixes.

## License

This project is licensed under the MIT License.

---

Scaffolded with [@skarab/skaffold](https://www.npmjs.com/package/@skarab/skaffold)
