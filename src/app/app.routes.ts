import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { AlbumComponent } from './pages/album/album.component';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'artist/:id', component: ArtistComponent },
  { path: 'album/:id', component: AlbumComponent },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'favorites',
        loadComponent: () =>
          import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent)
      },
      {
        path: 'playlists',
        loadComponent: () =>
          import('./pages/playlists/playlists.component').then(m => m.PlaylistsComponent)
      },
      {
        path: '',
        redirectTo: 'favorites',
        pathMatch: 'full'
      }
    ]
  }
];
