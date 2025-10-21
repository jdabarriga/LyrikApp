import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/spotifyApi';
import { useSearchSongQuery, useGetSongLyricsQuery } from '../redux/services/geniusApi';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching: isFetchinRelatedSongs, error } = useGetSongRelatedQuery({ songid });
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });

  // Search for lyrics on Genius
  const { data: geniusSearchResult } = useSearchSongQuery(
    { title: songData?.title, artist: songData?.subtitle },
    { skip: !songData }
  );
  const { data: lyricsData } = useGetSongLyricsQuery(
    geniusSearchResult?.id,
    { skip: !geniusSearchResult?.id }
  );

  if (isFetchingSongDetails && isFetchinRelatedSongs) return <Loader title="Searching song details" />;

  console.log(songData);

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        songData={songData}
      />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {lyricsData?.sections?.[0]?.text ? (
            lyricsData.sections[0].text.map((line, i) => (
              <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
            ))
          ) : lyricsData?.lyricsUrl ? (
            <div>
              <p className="text-gray-400 text-base my-1">
                Lyrics are available on Genius.com
              </p>
              <a
                href={lyricsData.lyricsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                View Lyrics on Genius →
              </a>
            </div>
          ) : (
            <p className="text-gray-400 text-base my-1">Loading lyrics...</p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />

    </div>
  );
};

export default SongDetails;
