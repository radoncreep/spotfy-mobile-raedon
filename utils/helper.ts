

export const catchAsyncError = (fn: () => Promise<any>, args: any) => {
    const caughtError = fn.apply(this, args);
    // if (caughtError.catch) {

    // }
}

export const joinArrayOfStrings = <T extends any[]>(param: T) => {
    return param.join(", ")
}