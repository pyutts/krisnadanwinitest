"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5; // Volume diatur ke 50%
      audio.play().catch(() => console.log("aman"));
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;''
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Audio akan Autoplay dan akan di looping */}
      <audio ref={audioRef} src="/music/background-music.mp3" autoPlay loop />

      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 flex items-center">
        <button
          className="h-16 w-2 bg-yellow-500 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        ></button>

        {/* Tombol Volume */}
        <AnimatePresence>
          {isOpen && (
            <motion.button
              onClick={toggleMute}
              className="absolute left-2 p-3 bg-[#B8860B] text-white rounded-r-lg shadow-md"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 10, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
