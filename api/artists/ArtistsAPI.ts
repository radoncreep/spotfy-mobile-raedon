import axios, { AxiosError, AxiosResponse } from "axios";

import { api } from "../config"
import artistsJson from "../../lib/data/artists.data.json";
import { IArtist } from "../../types/artist";
import { ITrack, TracksResponse } from "../../types/tracks";
import { Markets } from "../../types/markets";


export const getArtist = async (id: string): Promise<IArtist> => {
    try {
        const ids = [...new Set(artistsJson)].slice(0, 40);

        const response: AxiosResponse = await api.get(`artists/?id=${id}`);

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

export const getManyArtists = async (): Promise<IArtist[]> => {
    try {
        const ids = [...new Set(artistsJson)].slice(0, 40);

        const response: AxiosResponse = await api.get(`artists/many?ids=${ids}`);

        if (response.status !== 200) {
            throw new Error(response.data['error'])
        }
        return response.data['artists'];
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

export const getArtistTopTracks = async (artistId: string): Promise<TracksResponse> => {
    try {
        const response: AxiosResponse = await api.get(`artists/top-tracks/?id=${artistId}&market=US`);

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

export const getRelatedArtist = async (seedArtistId: string, market: Markets[keyof Markets] = 'US'): Promise<IArtist[]> => {
    try {
        const response: AxiosResponse = await api.get(`artists/related/?id=${seedArtistId}&market=${market}}`);

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
