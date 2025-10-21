/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useState } from 'react';
import { useSearchJamendoTrackQuery } from '../../redux/services/deezerApi';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);
  const [audioSrc, setAudioSrc] = useState('');
  
  // Get Spotify preview URL
  const spotifyPreview = activeSong?.hub?.actions?.[0]?.uri;
  
  // Only search Deezer if no Spotify preview and we have song info
  const shouldSearchDeezer = !spotifyPreview && activeSong?.title && activeSong?.subtitle;
  
  const { data: deezerTrack } = useSearchJamendoTrackQuery(
    { title: activeSong?.title, artist: activeSong?.subtitle },
    { skip: !shouldSearchDeezer }
  );

  // Update audio source when song changes
  useEffect(() => {
    // console.log('Active Song:', activeSong?.title, 'by', activeSong?.subtitle);
    // console.log('Spotify Preview:', spotifyPreview);
    // console.log('Deezer Track Data:', deezerTrack);
    
    if (spotifyPreview) {
      setAudioSrc(spotifyPreview);
      // console.log('✅ Using Spotify preview:', spotifyPreview);
    } else if (deezerTrack?.audioUrl) {
      setAudioSrc(deezerTrack.audioUrl);
      // console.log('✅ Using Deezer preview:', deezerTrack.audioUrl);
    } else {
      setAudioSrc('');
      // console.log('❌ No audio available for this track');
    }
  }, [spotifyPreview, deezerTrack, activeSong]);

  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play().catch(err => {
        // console.log('Playback error:', err);
      });
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);
  
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={audioSrc}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
