import React from 'react';
import { useSearchJamendoTrackQuery } from '../../redux/services/deezerApi';

const Track = ({ isPlaying, isActive, activeSong }) => {
  const spotifyPreview = activeSong?.hub?.actions?.[0]?.uri;
  const shouldSearchDeezer = !spotifyPreview && activeSong?.title && activeSong?.subtitle;
  
  const { data: deezerTrack } = useSearchJamendoTrackQuery(
    { title: activeSong?.title, artist: activeSong?.subtitle },
    { skip: !shouldSearchDeezer }
  );
  
  const audioSource = spotifyPreview ? 'spotify' : deezerTrack?.audioUrl ? 'deezer' : null;
  
  return (
    <div className="flex-1 flex items-center justify-start">
      <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
        <img src={activeSong?.images?.coverart} alt="cover art" className="rounded-full" />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">
          {activeSong?.title ? activeSong?.title : 'No active Song'}
        </p>
        <p className="truncate text-gray-300">
          {activeSong?.subtitle ? activeSong?.subtitle : 'No active Song'}
        </p>
        {activeSong?.title && audioSource && (
          <p className="text-xs mt-1 flex items-center gap-1">
            {audioSource === 'spotify' ? (
              <span className="text-green-400">♫ Playing from Spotify</span>
            ) : (
              <span className="text-blue-400">♫ Playing from Deezer</span>
            )}
          </p>
        )}
        {activeSong?.title && !audioSource && (
          <p className="text-xs text-yellow-400 mt-1">
            ⚠️ Searching for preview...
          </p>
        )}
      </div>
    </div>
  );
};

export default Track;
