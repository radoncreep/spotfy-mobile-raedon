import { ExternalUrls, Followers, ArtistImage } from "./common";


export interface IArtist {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: any[];
    href: string;
    id: string;
    images: ArtistImage[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface ArtistAsItem {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}