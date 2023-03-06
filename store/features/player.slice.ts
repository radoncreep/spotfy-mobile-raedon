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
        createPlaylist: (state: PlayerState = initialState, action: PayloadAction<ITrack[]>): PlayerState => {
            console.log(action.payload)
            state.tracks = action.payload;
            return state;
        },
        updatePlaylist: (state: PlayerState = initialState, action: PayloadAction<ITrack>): PlayerState => {
            const { payload } = action;
            const filterTracks = state.tracks.filter((track) => track.id === payload.id);

            state.tracks = [...filterTracks, payload];

            return state;
        }
    }
})

export const { createPlaylist, updatePlaylist } = playerSlice.actions;

export default playerSlice.reducer;