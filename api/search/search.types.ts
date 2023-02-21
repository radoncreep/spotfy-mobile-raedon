import { Markets } from "../../types/markets";

interface ExternalUrls {
    spotify: string;
}

interface SearchArtist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface Image {
    height: number;
    url: string;
    width: number;
}

interface SearchAlbumItem {
    album_type: string;
    artists: SearchArtist[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

interface SearchAlbums {
    href: string;
    items: SearchAlbumItem[];
    limit: number;
    next: string;
    offset: number;
    previous?: any;
    total: number;
}

interface Followers {
    href?: any;
    total: number;
}

interface SearchArtistItem {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

interface Artists {
    href: string;
    items: SearchArtistItem[];
    limit: number;
    next: string;
    offset: number;
    previous?: any;
    total: number;
}

interface SearchTrackAlbum {
    album_type: string;
    artists: SearchArtist[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

interface ExternalIds {
    isrc: string;
}

interface SearchTrackItem {
    album: SearchTrackAlbum;
    artists: SearchArtist[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

interface SearchTracks {
    href: string;
    items: SearchTrackItem[];
    limit: number;
    next: string;
    offset: number;
    previous?: any;
    total: number;
}

export interface SearchResponse {
    albums?: SearchAlbums;
    artists?: Artists;
    tracks?: SearchTracks;
}

export type SearchParams = {
    searchQuery: string;
    type: string[];
    limit: number;
    market: Markets[keyof Markets];
}