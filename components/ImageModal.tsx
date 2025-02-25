"use client";

import * as Dialog from '@radix-ui/react-dialog';
import { X, ZoomIn, ZoomOut, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  images: string[];
}

export default function ImageModal({ isOpen, onClose, imageSrc, images }: ImageModalProps) {
  const [scale, setScale] = useState(1);
  const currentIndex = images.indexOf(imageSrc);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'wedding-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const handlePrevious = () => {
  //   const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
  //   const newSrc = images[newIndex];
  //   setScale(1);
  //   window.history.replaceState(null, '', `?image=${newIndex}`);
  //   const event = new CustomEvent('changeImage', { detail: { src: newSrc } });
  //   window.dispatchEvent(event);
  // };

  // const handleNext = () => {
  //   const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
  //   const newSrc = images[newIndex];
  //   setScale(1);
  //   window.history.replaceState(null, '', `?image=${newIndex}`);
  //   const event = new CustomEvent('changeImage', { detail: { src: newSrc } });
  //   window.dispatchEvent(event);
  // };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full h-full flex flex-col items-center justify-center">
            {/* Image Container */}
            <div 
              className="relative w-full h-[80vh] overflow-hidden"
              style={{ 
                cursor: 'move',
                touchAction: 'none'
              }}
            >
              <div style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.2s ease-out',
                width: '100%',
                height: '100%',
                position: 'relative'
              }}>
                <Image
                  src={imageSrc}
                  alt="Gallery image"
                  fill
                  className="object-contain"
                  quality={80}
                />
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50 bg-black/50 p-2 rounded-full">
              <Button
                onClick={handleZoomOut}
                className="bg-[#B8860B] hover:bg-[#8B6508] rounded-full w-10 h-10 p-0"
                title="Perkecil"
              >
                <ZoomOut className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleZoomIn}
                className="bg-[#B8860B] hover:bg-[#8B6508] rounded-full w-10 h-10 p-0"
                title="Perbesar"
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-[#B8860B] hover:bg-[#8B6508] rounded-full w-10 h-10 p-0"
                title="Unduh"
              >
                <Download className="w-5 h-5" />
              </Button>
              <Button
                onClick={onClose}
                className="bg-red-600 hover:bg-red-700 rounded-full w-10 h-10 p-0"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}