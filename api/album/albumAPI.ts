import axios, { AxiosError, AxiosResponse } from "axios";

import { AlbumResponse } from "./album.types";
import { api } from "../../config/axiosInstance";


export const getAlbum = async (id: string): Promise<AlbumResponse> => {
    try {
        const response: AxiosResponse = await api.get(`albums/?id=${id}`);

        if (response.status !== 200) {
            throw new Error(response.data['error'])
        }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {

            const err = new Error();
            err.message = error.response.status === 401 ? 
                "Server error. Unable to fetch albums' data." : "Network error";

            throw err;
        }
        throw new Error("couldn't fetch albums data.");
    }
}
