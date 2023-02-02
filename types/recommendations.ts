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

interface Album {
    album_type: string;
    artists: Artist[];
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

interface ExternalUrls3 {
    spotify: string;
}

interface Artist2 {
    external_urls: ExternalUrls3;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface ExternalIds {
    isrc: string;
}

interface ExternalUrls4 {
    spotify: string;
}

interface Track {
    album: Album;
    artists: Artist2[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls4;
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

interface Seed {
    initialPoolSize: number;
    afterFilteringSize: number;
    afterRelinkingSize: number;
    id: string;
    type: string;
    href: string;
}

export interface RecommendationsResponse {
    tracks: Track[];
    seeds: Seed[];
}