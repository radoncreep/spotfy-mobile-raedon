import axios, { AxiosError, AxiosResponse } from "axios";

import { RecommendationsResponse } from "../../types/recommendations";
import { RecommendationParams } from "../../types/shared";
import { api } from "../../config/axiosInstance";
import { CategoriesParams, CategoriesResponse, NewReleaseApiParams, NewReleaseResponse } from "./browse.types";


export const getRecommendations = async ({ artistId, genres, tracksId}: RecommendationParams): 
    Promise<RecommendationsResponse> => {
        console.log("fetching")
    try {
        // let qGrenres = genres.join(',');
        // let qTracksId = tracksId.length <= 3 ? tracksId.join(',') : tracksId.slice(0,3).join(',');

        const response: AxiosResponse = await api.get(
            `/browse/recommendations?seed_artists=${artistId}&market=US&limit=${1}&seed_tracks=${tracksId[0]}&seed_genres=${genres[0]}`
        );

        if (response.status !== 200) {
            throw new Error(response.data['error'])
        }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {

            const err = new Error();
            err.message = error.response.status === 401 ? 
                "Server error. Unable to fetch artists' data." : "Network error";

            throw err;
        }
        throw new Error("couldn't fetch artist data.");
    }
}


export const getNewReleases = async({ country, limit }: NewReleaseApiParams): Promise<NewReleaseResponse> => {
    try {
        const response: AxiosResponse = await api.get(
            `/browse/new-releases?country=${country}&limit=${limit}`
        );
        if (response.status !== 200) {
            throw new Error(response.data['error'])
        }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {

            const err = new Error();
            err.message = error.response.status === 401 ? 
                "Server error. Unable to fetch artists' data." : "Network error";

            throw err;
        }
        throw new Error("couldn't fetch artist data.");
    }
}

export const getCategories = async({ country="NG", limit=2, locale="en" }: CategoriesParams): Promise<CategoriesResponse> => {
    try {
        const response: AxiosResponse = await api.get(
            `/browse/categories?country=${country}&locale=${locale}&limit=${limit}`
        );
        if (response.status !== 200) {
            throw new Error(response.data['error'])
        }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {

            const err = new Error();
            err.message = error.response.status === 401 ? 
                "Server error. Unable to fetch artists' data." : "Network error";

            throw err;
        }
        throw new Error("couldn't fetch artist data.");
    }
}