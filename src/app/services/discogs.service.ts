import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscogsService {
  private baseUrl = 'https://api.discogs.com';
  private token = 'wERLsXgsndqSTZEDWaZhKlAOhObZIPgXxsHOwTLG';

  constructor(private http: HttpClient) {}

  searchArtist(query: string): Observable<any> {
    const params = new HttpParams()
      .set('type', 'artist')
      .set('q', query)
      .set('token', this.token);
    return this.http.get(`${this.baseUrl}/database/search`, { params });
  }

  searchRelease(query: string): Observable<any> {
    const params = new HttpParams()
      .set('type', 'release')
      .set('q', query)
      .set('token', this.token);
    return this.http.get(`${this.baseUrl}/database/search`, { params });
  }

  getArtist(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/artists/${id}`);
  }

  getArtistReleases(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/artists/${id}/releases`);
  }

  getRelease(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/releases/${id}`);
  }
}
