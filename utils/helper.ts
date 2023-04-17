import { PlatformOSType } from "react-native";
import { ArtistAsItem, IArtist } from "../types/artist";


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

export const getArtistNameText = (artists: ArtistAsItem[]) => {
    let artistNames = artists.map((artist) => artist.name);

    return artistNames.join(", ");
}

export const getMonthName = (monthNumber: string, platform: PlatformOSType): string => {
    console.log({ monthNumber })
    let months = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    return months[+monthNumber];

    // platform === "ios" ? 
    //     new Date(`${+monthNumber}`).toLocaleDateString(undefined, { month: 'long' })
    //     :
}

export const isEmpty = <T>(arg: T): boolean => {
    if (Array.isArray(arg)) {
        return arg.length === 0;
    }

    if (typeof(arg) == "string") {
        return arg.length === 0;
    }

    if (typeof(arg) === "undefined") {
        return true;
    }

    if (typeof(arg) === "object") {
        return Object.keys(arg as object).length === 0;
    }
    // other type checks here
    return true;
}

export const millisToMinutesAndSeconds = (millis: number) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    let formatSeconds = (parseInt(seconds) < 10 ? '0' : '') + seconds

    return minutes + ":" + formatSeconds;
}