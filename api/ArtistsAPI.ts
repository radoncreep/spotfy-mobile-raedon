import axios, { AxiosError, AxiosResponse } from "axios";

import { api } from "./config"
import artistsJson from "../lib/data/artists.data.json";


export const getManyArtists = async (): Promise<any> => {
    try {
        const ids = [...new Set(artistsJson)].slice(0, 40);

        const response: AxiosResponse = await api.get(`artists/many?ids=${ids}`);

        // console.log(response)

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

