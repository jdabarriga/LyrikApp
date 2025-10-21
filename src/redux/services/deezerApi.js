import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deezerApi = createApi({
  reducerPath: 'deezerApi',
  baseQuery: fetchBaseQuery({
    // Use CORS proxy to bypass CORS restrictions
    baseUrl: 'https://corsproxy.io/?https://api.deezer.com',
  }),
  endpoints: (builder) => ({
    // Search for a track on Deezer to get audio preview URL
    searchDeezerTrack: builder.query({
      query: ({ title, artist }) => {
        const searchQuery = `${artist} ${title}`.trim();
        return `/search?q=${encodeURIComponent(searchQuery)}&limit=1`;
      },
      transformResponse: (response) => {
        if (response.data && response.data.length > 0) {
          const track = response.data[0];
          return {
            audioUrl: track.preview, // 30-second preview URL
            duration: track.duration,
            name: track.title,
            artist: track.artist.name,
            albumCover: track.album.cover_xl,
          };
        }
        return null;
      },
    }),

    // Get popular/chart tracks from Deezer
    getDeezerChart: builder.query({
      query: () => '/chart/0/tracks?limit=50',
      transformResponse: (response) => {
        return response.data.map(track => ({
          key: track.id,
          title: track.title,
          subtitle: track.artist.name,
          images: { coverart: track.album.cover_xl },
          hub: {
            actions: [{
              uri: track.preview, // 30-second preview
            }],
          },
          artists: [{ id: track.artist.id, name: track.artist.name }],
          albumId: track.album.id,
          duration: track.duration,
        }));
      },
    }),
  }),
});

export const {
  useSearchDeezerTrackQuery,
  useGetDeezerChartQuery,
} = deezerApi;

// Keep old export names for backward compatibility
export const jamendoApi = deezerApi;
export const useSearchJamendoTrackQuery = useSearchDeezerTrackQuery;
export const useGetJamendoPopularQuery = useGetDeezerChartQuery;