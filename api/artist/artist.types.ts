interface ExternalUrls {
    spotify: string;
}

interface Followers {
    href?: any;
    total: number;
}

interface Image {
    height: number;
    url: string;
    width: number;
}

export interface IArtistResponse {
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