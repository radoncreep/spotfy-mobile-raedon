import { Album, Artist2, ExternalIds, ExternalUrls4, ITrack } from "../types/tracks";

interface IPlayer {
    tracks: ITrack[] | null;
    // getCurrentTrack: () => void;
    // getPlaylistLength: () => number;
    // isNewPlaylist: () => boolean;
}


class Player implements IPlayer {
    public tracks: ITrack[] = [];

    constructor(tracks: ITrack[]) {
        this.tracks = tracks;
    }

    public getCurrentTrack() {
        return 
    };

    public get PlaylistLength() {
        return this.tracks.length;
    };

    // public get isNewPlaylist(): boolean {

    //     return true;
    // }

}