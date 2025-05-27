# TfgMusicHub

**TfgMusicHub** es una aplicación web desarrollada con **Angular 19** que permite explorar música a través de las APIs de **Deezer** y **Discogs**, escuchar previews, gestionar canciones favoritas, crear playlists y mucho más. El proyecto fue desarrollado como Trabajo de Fin de Grado del ciclo DAW.

## Características principales

- Búsqueda de artistas, álbumes y canciones.
- Reproducción de previews de Deezer.
- Añadir canciones a favoritos.
- Crear y gestionar playlists personalizadas.
- Autenticación con Firebase (email y Google).
- Diseño responsive con Tailwind CSS.
- Inspiración visual en plataformas como Spotify.

## Autor

### Hugo Martín

Trabajo de Fin de Grado – DAW

Contacto: [hugomsf21@gmail.com]

## Página desplegada

Puedes acceder a la aplicación desplegada en Firebase Hosting desde el siguiente enlace:

👉 [https://musichub-e4bab.web.app](https://musichub-e4bab.web.app)

## Requisitos previos

- Node.js v18 o superior
- Angular CLI 19.2
- Cuenta de Firebase configurada (auth + Firestore + hosting)

---

## 🛠️ Instalación y ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/TfgMusicHub.git
```

2. Instala las dependencias:

```bash

npm install
```

3. Crea el archivo de entorno:

Copia y pega esto en src/environments/environment.ts:

```
export const environment = {
  firebase: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_DOMINIO.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT_ID.appspot.com",
    messagingSenderId: "XXXXXX",
    appId: "APP_ID"
  }
};
```

Inicia el servidor de desarrollo:

```
npm start
```

Visita http://localhost:4200 en tu navegador.
