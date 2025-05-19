// deezer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import {
  DeezerArtistSearchResponse,
  DeezerAlbumSearchResponse,
  DeezerTrackSearchResponse,
  DeezerArtist,
  DeezerAlbumDetail,
  DeezerTrack,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DeezerService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<{
    artists: DeezerArtistSearchResponse;
    albums: DeezerAlbumSearchResponse;
    tracks: DeezerTrackSearchResponse;
  }> {
    const encoded = encodeURIComponent(query);
    const searchArtists = this.http.get<DeezerArtistSearchResponse>(`/api/search/artist?q=${encoded}`);
    const searchAlbums = this.http.get<DeezerAlbumSearchResponse>(`/api/search/album?q=${encoded}`);
    const searchTracks = this.http.get<DeezerTrackSearchResponse>(`/api/search/track?q=${encoded}`);

    return forkJoin({ artists: searchArtists, albums: searchAlbums, tracks: searchTracks });
  }

  getArtist(id: number): Observable<DeezerArtist> {
    return this.http.get<DeezerArtist>(`/api/artist/${id}`);
  }

  getArtistAlbums(id: number): Observable<DeezerAlbumSearchResponse> {
    return this.http.get<DeezerAlbumSearchResponse>(`/api/artist/${id}/albums`);
  }

  getAlbum(id: number): Observable<DeezerAlbumDetail> {
    return this.http.get<DeezerAlbumDetail>(`/api/album/${id}`);
  }

  getTrack(id: number): Observable<DeezerTrack> {
    return this.http.get<DeezerTrack>(`/api/track/${id}`);
  }
  getArtistTopTracks(id: number): Observable<DeezerTrackSearchResponse> {
  return this.http.get<DeezerTrackSearchResponse>(`/api/artist/${id}/top?limit=5`);
}

}
