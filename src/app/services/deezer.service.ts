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
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeezerService {
  private baseUrl = environment.deezerApi;

  constructor(private http: HttpClient) {}

  searchTracks(query: string): Observable<DeezerTrackSearchResponse> {
    return this.http.get<DeezerTrackSearchResponse>(
      `${this.baseUrl}/search/track`, {
        params: { q: query }
      }
    );
  }

  search(query: string): Observable<{
    artists: DeezerArtistSearchResponse;
    albums: DeezerAlbumSearchResponse;
    tracks: DeezerTrackSearchResponse;
  }> {
    return forkJoin({
      artists: this.http.get<DeezerArtistSearchResponse>(
        `${this.baseUrl}/search/artist`, { params: { q: query } }
      ),
      albums: this.http.get<DeezerAlbumSearchResponse>(
        `${this.baseUrl}/search/album`, { params: { q: query } }
      ),
      tracks: this.http.get<DeezerTrackSearchResponse>(
        `${this.baseUrl}/search/track`, { params: { q: query } }
      )
    });
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
    return this.http.get<DeezerTrackSearchResponse>(
      `${this.baseUrl}/artist/${id}/top`,
      { params: { limit: 6 } }
    );
  }

  getTrackById(id: string): Promise<DeezerTrack> {
    return fetch(`${this.baseUrl}/track/${id}`)
      .then(res => res.json())
      .catch(() => null);
  }
}
