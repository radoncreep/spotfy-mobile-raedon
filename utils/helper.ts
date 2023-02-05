import { Artist } from "../api/browse/browse.types";


export const catchAsyncError = (fn: (args: any) => Promise<any>, args: any) => (
    (args: any) => {
        const catchError = fn(args);

        // if (catchError.catch)
    }
)

export const joinArrayOfStrings = <T extends any[]>(param: T) => {
    return param.join(", ")
}

export const firstCharToUpper = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getArtistNameText = (artists: Artist[]) => {
    let artistNames = artists.map((artist) => artist.name);

    return artistNames.join(", ");
}

export const getMonthName = (monthNumber: string): string => {
    return new Date(`${+monthNumber + 1}`).toLocaleDateString(undefined, { month: 'long' });
}

export const isEmpty = (param: any) => {
    if (Array.isArray(param)) {
        return param.length === 0;
    }
}