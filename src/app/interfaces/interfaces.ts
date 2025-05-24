export interface Playlist {
  id?: string;
  name: string;
  description?: string;
  createdAt: number;
  tracks: string[]; 
}

export interface DeezerArtistSearchResponse {
  data: DeezerArtist[];
  total?: number;
  next?: string;
}

export interface DeezerAlbumSearchResponse {
  data: DeezerAlbum[];
  total?: number;
  next?: string;
}

export interface DeezerTrackSearchResponse {
  data: DeezerTrack[];
  total?: number;
  next?: string;
}
export interface DeezerSearchResult {
  artists: { data: DeezerArtist[] };
  albums: { data: DeezerAlbum[] };
  tracks: { data: DeezerTrack[] };
}

export interface DeezerGenre {
  id: number;
  name: string;
  picture: string;
  type: string;
}

export interface DeezerArtist {
  id: number;
  name: string;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  tracklist: string;
  type: string;
}

export interface DeezerTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  preview: string;
  artist: {
    id: number;
    name: string;
  };
  album: {
    id: number;
    title: string;
    cover: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    cover_xl: string;
  };
  type: string;
  track_position?: number; 
}

export interface DeezerContributor {
  id: number;
  name: string;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  radio: boolean;
  tracklist: string;
  type: string;
  role: string;
}

export interface DeezerAlbum {
  id: number;
  title: string;
  upc: string;
  link: string;
  share: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  genre_id: number;
  genres: { data: DeezerGenre[] };
  label: string;
  nb_tracks: number;
  duration: number;
  fans: number;
  release_date: string;
  record_type: string;
  available: boolean;
  alternative?: DeezerAlbum;
  tracklist: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  contributors: DeezerContributor[];
  fallback?: {
    id: number;
    status: string;
  };
  artist: {
    id: number;
    name: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
  };
  tracks: {
    data: DeezerTrack[];
  };
  type: string;
}

export interface DeezerAlbumDetail extends DeezerAlbum {
release_date: any;
  tracks: {
    data: DeezerTrack[];
  };
}

export interface DeezerArtistDetail extends DeezerArtist {
  albums?: DeezerAlbum[];
}

export interface DiscogsSearchResult {
  pagination: {
    items: number;
    page: number;
    pages: number;
    per_page: number;
  };
  results: DiscogsSearchItem[];
}

export interface DiscogsSearchItem {
  id: number;
  type: string;
  title: string;
  thumb: string;
  resource_url: string;
}

export interface DiscogsArtistReleases {
  pagination: {
    items: number;
    page: number;
    pages: number;
    per_page: number;
  };
  releases: DiscogsRelease[];
}

export interface DiscogsRelease {
  id: number;
  title: string;
  year: number;
  format: string | string[]; 
  label: string[];
  type: string;
  role: string;
  thumb: string;
  resource_url: string;
  status?: string;

}

export interface DiscogsArtist {
  id: number;
  name: string;
  resource_url: string;
  uri: string;
  releases_url: string;
  profile: string;
  data_quality: string;
  images: DiscogsImage[];
  urls: string[];
  namevariations: string[];
  aliases: DiscogsAlias[];
  members: DiscogsMember[];
}

export interface DiscogsImage {
  type: string;
  uri: string;
  resource_url: string;
  uri150: string;
  width: number;
  height: number;
}

export interface DiscogsAlias {
  id: number;
  name: string;
  resource_url: string;
}

export interface DiscogsMember {
  id: number;
  name: string;
  resource_url: string;
  active: boolean;
}

export interface DiscogsReleaseDetail {
  id: number;
  title: string;
  year: number;
  format: string[];
  label: string[];
  type: string;
  role: string;
  thumb: string;
  resource_url: string;
  artists: {
    id: number;
    name: string;
    resource_url: string;
    role?: string;
  }[];
  images?: {
    uri: string;
    uri150: string;
    width: number;
    height: number;
    type: string;
  }[];
}
