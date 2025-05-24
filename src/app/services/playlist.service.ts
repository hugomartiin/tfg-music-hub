import { Injectable, signal } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  collectionData,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { Playlist } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  // Signal para el userId
  private userId = signal<string | null>(null);

  constructor(private firestore: Firestore, private authService: AuthService) {
    // Actualizamos userId cada vez que cambia el usuario actual
    this.userId.set(this.authService.currentUser()?.uid ?? null);
  }

  // Devuelve la referencia a la colección de playlists del usuario actual
  private playlistsCollection() {
    const uid = this.userId();
    if (!uid) throw new Error('Usuario no autenticado');
    return collection(this.firestore, `users/${uid}/playlists`);
  }

  // Observable que devuelve las playlists del usuario actual
  getPlaylists$(): Observable<Playlist[]> {
    const uid = this.userId();
    if (!uid) return of([]); // Usuario no logueado, devuelve vacía

    const ref = collection(this.firestore, `users/${uid}/playlists`);
    return collectionData(ref, { idField: 'id' }) as Observable<Playlist[]>;
  }

  // Crear nueva playlist en la subcolección del usuario
  async createPlaylist(playlist: Playlist) {
    const playlistsRef = this.playlistsCollection();
    const docRef = doc(playlistsRef);
    await setDoc(docRef, playlist);
  }

  // Actualizar playlist por id
  async updatePlaylist(id: string, data: Partial<Playlist>) {
    const uid = this.userId();
    if (!uid) throw new Error('Usuario no autenticado');

    const ref = doc(this.firestore, `users/${uid}/playlists/${id}`);
    await updateDoc(ref, data);
  }

  // Borrar playlist por id
  async deletePlaylist(id: string) {
    const uid = this.userId();
    if (!uid) throw new Error('Usuario no autenticado');

    const ref = doc(this.firestore, `users/${uid}/playlists/${id}`);
    await deleteDoc(ref);
  }
}
