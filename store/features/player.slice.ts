import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { ITrack } from "../../types/tracks";


interface PlayerState {
    tracks: ITrack[];
    currentTrackIndex: number;
    playlistType: "single" | "album";
}

const initialState: PlayerState = {
    tracks: [],
    currentTrackIndex: 0,
    playlistType: "single"
}


const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        createPlaylist: (state: PlayerState = initialState, action: PayloadAction<PlayerState>): PlayerState => {
            // console.log(action.payload)
            const { tracks, currentTrackIndex, playlistType } = action.payload;

            let isEqual = false;

            if (state.tracks.length === tracks.length) {
                let oldIds = state.tracks.map((track) => track.id);
                let newIds = tracks.map((track) => track.id);

                isEqual = newIds.every((newId) => oldIds.includes(newId));
            }

            if (isEqual) { 
                console.log({isEqual})
                state.currentTrackIndex = currentTrackIndex
                return state;
            }

            state.tracks = tracks;
            state.currentTrackIndex = currentTrackIndex;
            state.playlistType = playlistType;

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