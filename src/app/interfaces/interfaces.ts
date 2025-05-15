// interfaces.ts

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

export interface DeezerArtist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  tracklist: string;
  type: 'artist';
}

export interface DeezerAlbum {
  id: number;
  title: string;
  link: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  genre_id: number;
  nb_tracks: number;
  record_type: string;
  tracklist: string;
  explicit_lyrics: boolean;
  artist: DeezerArtist;
  type: string;
}

export interface DeezerTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  preview: string;
  artist: DeezerArtist;
  album: DeezerAlbum;
  type: string;
}

export interface DeezerAlbumDetail extends DeezerAlbum {
  tracks: {
    data: DeezerTrack[];
  };
}

export interface DeezerArtistDetail extends DeezerArtist {
  albums?: DeezerAlbum[];
}
