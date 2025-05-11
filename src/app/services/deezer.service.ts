// src/app/services/deezer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {
  private baseUrl = 'https://api.deezer.com';

  constructor(private http: HttpClient) {}

  searchArtist(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/artist?q=${encodeURIComponent(query)}`);
  }

  getArtist(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/artist/${id}`);
  }

  getArtistAlbums(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/artist/${id}/albums`);
  }

  getTopTracks(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/artist/${id}/top`);
  }

  searchAlbum(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/album?q=${encodeURIComponent(query)}`);
  }

  getAlbum(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/album/${id}`);
  }

  getTrack(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/track/${id}`);
  }
}
