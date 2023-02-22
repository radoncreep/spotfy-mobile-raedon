import axios, { AxiosResponse } from "axios";

import { api } from "../../config/axiosInstance";
import { SearchParams, SearchResponse } from "./search.types";


export const getSearch = async({ searchQuery, type=["artist"], market="NG", limit=10 }: SearchParams): Promise<SearchResponse> => {
    try {
        const response: AxiosResponse = await api.get(
            `search?searchQuery=${searchQuery}&type=${type.join(",")}&market=${market}&limit=${limit}`
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