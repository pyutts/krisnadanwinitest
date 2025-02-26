"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import "mediaelement/build/mediaelementplayer.min.css";

declare global {
  interface Window {
    MediaElementPlayer: any;
  }
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false); // 🔥 Menyimpan status musik

  useEffect(() => {
    if (typeof window !== "undefined" && audioRef.current && window.MediaElementPlayer) {
      playerRef.current = new window.MediaElementPlayer(audioRef.current, {
        startVolume: 0.8,
        success: function (mediaElement: any, domObject: any) {
          mediaElement.load();

          // ✅ Coba autoplay, jika gagal tunggu interaksi pengguna
          const playPromise = mediaElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              console.log("Autoplay dicegah, menunggu interaksi pengguna.");
            });
          }

          // ✅ Sembunyikan elemen pemutar agar tidak mengganggu layout
          setTimeout(() => {
            if (domObject) {
              domObject.style.display = "none";
              domObject.style.visibility = "hidden";
              domObject.style.height = "0px";
              domObject.style.width = "0px";
              domObject.style.opacity = "0";
              domObject.style.overflow = "hidden";
            }
            const mejsContainers = document.querySelectorAll(".mejs__container");
            mejsContainers.forEach((el) => {
              (el as HTMLElement).style.display = "none";
              (el as HTMLElement).style.visibility = "hidden";
              (el as HTMLElement).style.opacity = "0";
              (el as HTMLElement).style.height = "0px";
              (el as HTMLElement).style.width = "0px";
              (el as HTMLElement).style.overflow = "hidden";
            });
          }, 500);
        },
      });
    }

    // ✅ Event listener untuk memastikan audio bisa dimainkan
    const handleAudioReady = () => {
      console.log("Audio siap diputar!");
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("canplay", handleAudioReady);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("canplay", handleAudioReady);
      }
      
      if (playerRef.current && typeof playerRef.current.remove === "function") {
        try {
          playerRef.current.remove();
        } catch (error) {
          console.error("Error saat menghapus MediaElementPlayer:", error);
        }
      }
    };
  }, []);

  // ✅ Fungsi untuk memainkan atau menjeda musik
  const toggleMusic = () => {
    if (playerRef.current?.media) {
      if (playerRef.current.media.paused) {
        playerRef.current.media.play();
        setIsPlaying(true);
      } else {
        playerRef.current.media.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio
        ref={audioRef}
        className="absolute -left-full w-0 h-0 overflow-hidden invisible"
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
        {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </Button>
    </div>
  );
}
