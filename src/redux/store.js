import { configureStore } from '@reduxjs/toolkit';

import { spotifyApi } from './services/spotifyApi';
import { geniusApi } from './services/geniusApi';
import { deezerApi } from './services/deezerApi';
import playerReducer from './features/playerSlice';

export const store = configureStore({
  reducer: {
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    [geniusApi.reducerPath]: geniusApi.reducer,
    [deezerApi.reducerPath]: deezerApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(spotifyApi.middleware)
      .concat(geniusApi.middleware)
      .concat(deezerApi.middleware),
});
