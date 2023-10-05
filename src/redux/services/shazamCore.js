import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core7.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '3a0e7fa15dmsh74d36bf0b58025ap11fab0jsn528a92ee82d5');
      headers.set('X-RapidAPI-Host','shazam-core7.p.rapidapi.com' )

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'charts/get-top-songs-in_country_by_genre?country_code=US&genre_code=${genre}' }),
    getSongsByGenre: builder.query({ query: (genre) => `/charts/get-top-songs-in_country_by_genre?country_code=US&genre=${genre}&limit=50` }),
    //getSongsByCountry: builder.query({ query: (countryCode) => `charts/get-top-songs-in-country?country_code=${countryCode}` }),
    getSongsByCountry: builder.query({ query: (countryCode) => `charts/get-top-songs-in-country?country_code=US&limit=50` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `search?query=${searchTerm}&limit=50` }),
    //getArtistDetails: builder.query({ query: (artistId) => `v2/artists/details?artist_id=${artistId}` }),
    //getSongDetails: builder.query({ query: ({ songid }) => `v1/tracks/details?track_id=${songid}` }),
    //getSongRelated: builder.query({ query: ({ songid }) => `v1/tracks/related?track_id=${songid}` }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;
