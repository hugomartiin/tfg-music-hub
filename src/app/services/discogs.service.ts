// discogs.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DiscogsArtist , DiscogsSearchResult, DiscogsArtistReleases } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class DiscogsService {
  private apiUrl = 'https://api.discogs.com';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Discogs token=${environment.discogsToken}`
    });
  }

  //Buscar artistas
  searchArtist(name: string): Observable<DiscogsSearchResult> {
    const params = new HttpParams().set('q', name).set('type', 'artist');
    return this.http.get<DiscogsSearchResult>(`${this.apiUrl}/database/search`, {
      headers: this.getHeaders(),
      params
    });
  }

  //Obtener artista por ID
  getArtistById(id: number): Observable<DiscogsArtist> {
    return this.http.get<DiscogsArtist>(`${this.apiUrl}/artists/${id}`, {
      headers: this.getHeaders()
    });
  }

  //Obbtener releases del artista
  getArtistReleases(id: number, page: number = 1): Observable<DiscogsArtistReleases> {
    const params = new HttpParams().set('page', page).set('per_page', 20);
    return this.http.get<DiscogsArtistReleases>(`${this.apiUrl}/artists/${id}/releases`, {
      headers: this.getHeaders(),
      params
    });
  }
}
