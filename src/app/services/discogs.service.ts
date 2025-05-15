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


}
