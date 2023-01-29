import { Artist } from "../api/browse/browse.types";


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

export const getArtistNameText = (artists: Artist[]) => {
    let artistNames = artists.map((artist) => artist.name);

    return artistNames.join(", ");
}