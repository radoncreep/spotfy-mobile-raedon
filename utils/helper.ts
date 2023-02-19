import { IArtist } from "../types/artist";


export const catchAsyncError = (fn: () => Promise<any>, args: any) => {
    const caughtError = fn.apply(this, args);
    // if (caughtError.catch) {

    // }
}

export const joinArrayOfStrings = <T extends any[]>(param: T) => {
    return param.join(", ")
}

export const firstCharToUpper = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getArtistNameText = (artists: IArtist[]) => {
    let artistNames = artists.map((artist) => artist.name);

    return artistNames.join(", ");
}

export const getMonthName = (monthNumber: string): string => {
    return new Date(`${+monthNumber + 1}`).toLocaleDateString(undefined, { month: 'long' });
}

export const isEmpty = <T>(arg: T): boolean => {
    if (Array.isArray(arg)) {
        return arg.length === 0;
    }
    // other type checks here
    return true;
}