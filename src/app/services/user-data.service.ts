import { Injectable, computed } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  collectionData,
  getDocs,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { DeezerTrack } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  private userId = computed(() => this.authService.currentUser()?.uid ?? null);

  private favoritesCollection() {
    const uid = this.userId();
    if (!uid) throw new Error('Usuario no autenticado');
    return collection(this.firestore, `users/${uid}/favorites`);
  }

  async addFavorite(track: DeezerTrack) {
    const uid = this.userId();
    if (!uid) return;
    const ref = doc(this.favoritesCollection(), track.id.toString());
    await setDoc(ref, track);
  }

  async removeFavorite(trackId: string | number) {
    const uid = this.userId();
    if (!uid) return;
    const ref = doc(this.favoritesCollection(), trackId.toString());
    await deleteDoc(ref);
  }

  getFavorites$(): Observable<DeezerTrack[]> {
    const uid = this.userId();
    if (!uid) throw new Error('Usuario no autenticado');
    const q = query(this.favoritesCollection());
    return collectionData(q, { idField: 'firebaseId' }) as Observable<DeezerTrack[]>;
  }

}
