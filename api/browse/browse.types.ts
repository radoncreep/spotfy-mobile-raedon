import { Markets } from "../../types/markets";

export type NewReleaseApiParams = {
    country: Markets[keyof Markets];
    limit: number;
}

export type CategoriesParams = NewReleaseApiParams & { locale: string };


interface ExternalUrls {
    spotify: string;
}

interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface ExternalUrls2 {
    spotify: string;
}

interface Image {
    height: number;
    url: string;
    width: number;
}

export interface NewReleaseItem {
    album_type: string | "album" | "single" | "ep";
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrls2;
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

export interface NewReleaseAlbums {
    href: string;
    items: NewReleaseItem[];
    limit: number;
    next: string;
    offset: number;
    previous?: any;
    total: number;
}

export interface NewReleaseResponse {
    albums: NewReleaseAlbums;
}

interface Icon {
    height?: number;
    url: string;
    width?: number;
}

export interface CategoriesItem {
    href: string;
    icons: Icon[];
    id: string;
    name: string;
}

export interface Categories {
    href: string;
    items: CategoriesItem[];
    limit: number;
    next: string;
    offset: number;
    previous?: any;
    total: number;
}

export interface CategoriesResponse {
    categories: Categories;
}
