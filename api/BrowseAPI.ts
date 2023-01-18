import axios, { AxiosError, AxiosResponse } from "axios";
import { RecommendationsResponse } from "../types/recommendations";
import { RecommendationParams } from "../types/shared";

import { api } from "./config"




export const getRecommendations = async ({ artistId, genres, tracksId}: RecommendationParams): 
    Promise<RecommendationsResponse> => {
    try {
        // let qGrenres = genres.join(',');
        // let qTracksId = tracksId.length <= 3 ? tracksId.join(',') : tracksId.slice(0,3).join(',');

        const response: AxiosResponse = await api.get(
            `/browse/recommendations?seed_artists=${artistId}&market=US&limit=${1}&seed_tracks=${tracksId[0]}&seed_genres=${genres[0]}`
        );

        if (response.status !== 200) {
            throw new Error(response.data['error'])
        }
        console.log("DATA ", response.data);
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
