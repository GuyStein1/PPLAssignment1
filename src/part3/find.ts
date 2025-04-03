import { Result, makeFailure, makeOk, bind, either } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

// The findResult function takes a predicate function and an array, and returns a Result type
export const findResult = <T>(pred: (x: T) => boolean, a: T[]): Result<T> =>
    a.reduce<Result<T>>(
        (acc, current) => 
            // If the accumulator is already an Ok result, return it, Otherwise, check if the current element satisfies the predicate
            acc.tag === "Ok" ? acc : pred(current) ? makeOk(current) : acc,
        // Initial value is a Failure result
        makeFailure("No element found")
    );

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2: (a: number[]) => Result<number> = (a) =>
    bind(
        findResult((x) => x % 2 === 0, a),
        (x) => makeOk(x * x)
    );


export const returnSquaredIfFoundEven_v3 : (a: number[]) => number = (a) => 
    either(
        findResult(x => x % 2 === 0, a),
        (value: number) => value * value, // ifOk: square the value
        (message: string) => -1 // ifFailure: return -1
    )

