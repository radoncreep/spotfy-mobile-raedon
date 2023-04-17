import { AndroidImageColors, IOSImageColors } from "react-native-image-colors/lib/typescript/types";

export type RecommendationParams = {
    artistId: string;
    tracksId: string[];
    genres: string[];
    frequency?: number;
}

export type ColorStateValue = { 
    value: string;
    name: string;
}

export type ColorState = {
    colorOne: ColorStateValue;
    colorTwo: ColorStateValue;
    colorThree: ColorStateValue;
    colorFour: ColorStateValue;
    // rawResult: ""
}