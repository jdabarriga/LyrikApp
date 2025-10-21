import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Spotify API token management
let spotifyToken = null;
let tokenExpiry = null;

const getSpotifyToken = async () => {
  // Check if we have a valid token
  if (spotifyToken && tokenExpiry && Date.now() < tokenExpiry) {
    return spotifyToken;
  }

  // Get new token
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    // console.error('Spotify credentials missing! Check your .env file');
    throw new Error('Spotify API credentials not configured');
  }

  // console.log('Requesting Spotify token...');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorData = await response.json();
    // console.error('Spotify token error:', errorData);
    throw new Error(`Failed to get Spotify token: ${errorData.error_description || errorData.error}`);
  }

  const data = await response.json();
  spotifyToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 min before expiry

  // console.log('Spotify token obtained successfully');
  return spotifyToken;
};

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1',
    prepareHeaders: async (headers) => {
      const token = await getSpotifyToken();
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get top charts (using Spotify search for popular recent tracks)
    getTopCharts: builder.query({
      query: () => '/search?q=year:2024&type=track&limit=50',
      transformResponse: (response) => {
        // console.log('Top Charts Response:', response);
        const transformed = response.tracks.items.map(track => ({
          key: track.id,
          title: track.name,
          subtitle: track.artists[0].name,
          images: { coverart: track.album.images[0]?.url },
          hub: {
            actions: track.preview_url ? [{
              uri: track.preview_url,
            }] : [],
          },
          artists: track.artists,
          albumId: track.album.id,
        }));
        // console.log('Transformed songs:', transformed[0]);
        return transformed;
      },
    }),

    // Get songs by genre
    getSongsByGenre: builder.query({
      query: (genre) => {
        // Map genre codes to Spotify search terms
        const genreMap = {
          'POP': 'pop',
          'HIP_HOP_RAP': 'hip hop',
          'DANCE': 'dance',
          'ELECTRONIC': 'electronic',
          'SOUL_RNB': 'r&b soul',
          'ALTERNATIVE': 'alternative',
          'ROCK': 'rock',
          'LATIN': 'latin',
          'FILM_TV': 'soundtrack',
          'COUNTRY': 'country',
          'WORLDWIDE': 'pop',
          'REGGAE_DANCE_HALL': 'reggae',
          'HOUSE': 'house',
          'K_POP': 'k-pop',
        };
        const spotifyGenre = genreMap[genre] || 'pop';
        return `/search?q=genre:${encodeURIComponent(spotifyGenre)}&type=track&limit=50`;
      },
      transformResponse: (response) => ({
        tracks: response.tracks.items.map(track => ({
          key: track.id,
          title: track.name,
          subtitle: track.artists[0].name,
          images: { coverart: track.album.images[0]?.url },
          hub: {
            actions: track.preview_url ? [{
              uri: track.preview_url,
            }] : [],
          },
          artists: track.artists,
          albumId: track.album.id,
        })),
      }),
    }),

    // Get songs by country
    getSongsByCountry: builder.query({
      query: (countryCode) => {
        const market = countryCode || 'US';
        return `/search?q=year:2024&type=track&market=${market}&limit=50`;
      },
      transformResponse: (response) => response.tracks.items.map(track => ({
        key: track.id,
        title: track.name,
        subtitle: track.artists[0].name,
        images: { coverart: track.album.images[0]?.url },
        hub: {
          actions: track.preview_url ? [{
            uri: track.preview_url,
          }] : [],
        },
        artists: track.artists,
        albumId: track.album.id,
      })),
    }),

    // Search for songs
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=50`,
      transformResponse: (response) => ({
        tracks: {
          hits: response.tracks.items.map(track => ({
            key: track.id,
            title: track.name,
            subtitle: track.artists[0].name,
            images: { coverart: track.album.images[0]?.url },
            hub: {
              actions: track.preview_url ? [{
                uri: track.preview_url,
              }] : [],
            },
            artists: track.artists,
            albumId: track.album.id,
          })),
        },
      }),
    }),

    // Get song details
    getSongDetails: builder.query({
      query: ({ songid }) => `/tracks/${songid}`,
      transformResponse: (response) => ({
        key: response.id,
        title: response.name,
        subtitle: response.artists[0].name,
        images: { coverart: response.album.images[0]?.url },
        hub: {
          actions: response.preview_url ? [{
            uri: response.preview_url,
          }] : [],
        },
        artists: response.artists,
        albumId: response.album.id,
        album: response.album,
        sections: [], // Lyrics will come from Genius API
      }),
    }),

    // Get related songs (recommendations based on a track)
    getSongRelated: builder.query({
      query: ({ songid }) => `/recommendations?seed_tracks=${songid}&limit=20`,
      transformResponse: (response) => response.tracks.map(track => ({
        key: track.id,
        title: track.name,
        subtitle: track.artists[0].name,
        images: { coverart: track.album.images[0]?.url },
        hub: {
          actions: track.preview_url ? [{
            uri: track.preview_url,
          }] : [],
        },
        artists: track.artists,
        albumId: track.album.id,
      })),
    }),

    // Get artist details
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/${artistId}`,
      async queryFn(artistId, _queryApi, _extraOptions, fetchWithBQ) {
        // Get artist info
        const artistResult = await fetchWithBQ(`/artists/${artistId}`);
        if (artistResult.error) return { error: artistResult.error };

        // Get artist's top tracks
        const topTracksResult = await fetchWithBQ(`/artists/${artistId}/top-tracks?market=US`);
        if (topTracksResult.error) return { error: topTracksResult.error };

        const artist = artistResult.data;
        const topTracks = topTracksResult.data.tracks;

        return {
          data: {
            data: [{
              id: artist.id,
              attributes: {
                name: artist.name,
                artwork: { url: artist.images[0]?.url },
                genreNames: artist.genres,
              },
              views: {
                'top-songs': {
                  data: topTracks.map(track => ({
                    key: track.id,
                    title: track.name,
                    subtitle: track.artists[0].name,
                    images: { coverart: track.album.images[0]?.url },
                    hub: {
                      actions: track.preview_url ? [{
                        uri: track.preview_url,
                      }] : [],
                    },
                    artists: track.artists,
                    albumId: track.album.id,
                  })),
                },
              },
            }],
          },
        };
      },
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
} = spotifyApi;
