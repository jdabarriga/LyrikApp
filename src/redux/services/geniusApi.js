import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const geniusApi = createApi({
  reducerPath: 'geniusApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.genius.com',
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_GENIUS_ACCESS_TOKEN;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Search for a song on Genius to get its ID
    searchSong: builder.query({
      query: ({ title, artist }) => `/search?q=${encodeURIComponent(`${title} ${artist}`)}`,
      transformResponse: (response) => {
        if (response.response.hits.length > 0) {
          return response.response.hits[0].result;
        }
        return null;
      },
    }),

    // Get song details including lyrics URL
    getSongLyrics: builder.query({
      query: (songId) => `/songs/${songId}`,
      transformResponse: (response) => {
        const song = response.response.song;
        return {
          title: song.title,
          artist: song.primary_artist.name,
          lyricsUrl: song.url,
          thumbnail: song.song_art_image_thumbnail_url,
          // Note: Genius API doesn't provide lyrics directly due to licensing
          // We'll need to scrape or show a link to view lyrics
          sections: [
            {
              type: 'LYRICS',
              text: [
                'Lyrics are available on Genius.com',
                `Visit: ${song.url}`,
              ],
            },
          ],
        };
      },
    }),
  }),
});

export const {
  useSearchSongQuery,
  useGetSongLyricsQuery,
} = geniusApi;
