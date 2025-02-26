"use client";

import { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import 'mediaelement/build/mediaelementplayer.min.css';

declare global {
  interface Window {
    MediaElementPlayer: any;
  }
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && audioRef.current && window.MediaElementPlayer) {
      playerRef.current = new window.MediaElementPlayer(audioRef.current, {
        features: ['playpause'],
        startVolume: 0.8,
        success: function (mediaElement: any, domObject: any) {
          mediaElement.load();
          const playPromise = mediaElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              console.log('Autoplay prevented. Waiting for user interaction.');
            });
          }
          
          if (domObject) {
            domObject.style.display = 'none';
          }
        }
      });
    }
  

    const handleInvitationOpen = () => {
      if (playerRef.current?.media) {
        const playPromise = playerRef.current.media.play();
        if (playPromise !== undefined) {
          playPromise.catch((error: any) => {
            console.error("Autoplay failed:", error);
          });
        }
      }
    };

    window.addEventListener('invitationOpened', handleInvitationOpen);

    return () => {
      window.removeEventListener('invitationOpened', handleInvitationOpen);
      
      if (playerRef.current && typeof playerRef.current.remove === 'function') {
        try {
          playerRef.current.remove();
        } catch (error) {
          console.error("Error removing MediaElementPlayer:", error);
        }
      }
    };
  }, []);

  const toggleMusic = () => {
    if (playerRef.current?.media) {
      if (playerRef.current.media.paused) {
        playerRef.current.media.play();
      } else {
        playerRef.current.media.pause();
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio 
        ref={audioRef}
        style={{ display: 'none' }}
        preload="auto"
        loop
      >
        <source src="/music/background-music.mp3" type="audio/mp3" />
      </audio>
      <Button
        onClick={toggleMusic}
        className="rounded-full w-12 h-12 bg-[#B8860B] hover:bg-[#8B6508] p-0 flex items-center justify-center"
        aria-label="Toggle music"
      >
        {playerRef.current?.media?.paused ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}
