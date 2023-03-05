import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrack } from "../../types/tracks";


interface PlayerState {
    tracks: ITrack[];
}

const initialState: PlayerState = {
    tracks: []
}


const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        create: (state: PlayerState = initialState, action: PayloadAction<ITrack[]>): PlayerState => {
            state.tracks = action.payload;
            return state;
        },
        update: (state: PlayerState = initialState, action: PayloadAction<ITrack>): PlayerState => {
            const { payload } = action;
            const filterTracks = state.tracks.filter((track) => track.id === payload.id);

            state.tracks = [...filterTracks, payload];

            return state;
        }
    }
})

export const { create, update } = playerSlice.actions;

export default playerSlice.reducer;