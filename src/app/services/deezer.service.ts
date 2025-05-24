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
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  searchTracks(query: string): Observable<DeezerTrackSearchResponse> {
    const encoded = encodeURIComponent(query);
    return this.http.get<DeezerTrackSearchResponse>(
      `${this.baseUrl}/search/track?q=${encoded}`
    );
  }

  search(query: string): Observable<{
    artists: DeezerArtistSearchResponse;
    albums: DeezerAlbumSearchResponse;
    tracks: DeezerTrackSearchResponse;
  }> {
    const encoded = encodeURIComponent(query);
    const searchArtists = this.http.get<DeezerArtistSearchResponse>(
      `${this.baseUrl}/search/artist?q=${encoded}`
    );
    const searchAlbums = this.http.get<DeezerAlbumSearchResponse>(
      `${this.baseUrl}/search/album?q=${encoded}`
    );
    const searchTracks = this.http.get<DeezerTrackSearchResponse>(
      `${this.baseUrl}/search/track?q=${encoded}`
    );

    return forkJoin({ artists: searchArtists, albums: searchAlbums, tracks: searchTracks });
  }

  getArtist(id: number): Observable<DeezerArtist> {
    return this.http.get<DeezerArtist>(`${this.baseUrl}/artist/${id}`);
  }

  getArtistAlbums(id: number): Observable<DeezerAlbumSearchResponse> {
    return this.http.get<DeezerAlbumSearchResponse>(`${this.baseUrl}/artist/${id}/albums`);
  }

  getAlbum(id: number): Observable<DeezerAlbumDetail> {
    return this.http.get<DeezerAlbumDetail>(`${this.baseUrl}/album/${id}`);
  }

  getTrack(id: number): Observable<DeezerTrack> {
    return this.http.get<DeezerTrack>(`${this.baseUrl}/track/${id}`);
  }

  getArtistTopTracks(id: number): Observable<DeezerTrackSearchResponse> {
    return this.http.get<DeezerTrackSearchResponse>(`${this.baseUrl}/artist/${id}/top?limit=5`);
  }
  getTrackById(id: string): Promise<DeezerTrack> {
  return fetch(`${this.baseUrl}/track/${id}`)
    .then(res => res.json())
    .catch(() => null);
}

}
