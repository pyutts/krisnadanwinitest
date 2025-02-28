"use client";

import { MapPin } from 'lucide-react';
import { Button } from './ui/button';

export default function LocationSection() {
  const openGoogleMaps = () => {
    const destination = "Pura+Taman+Ayun+Mengwi+Bali";
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
  };

  return (
    <section className="py-20 bg-[#fff3db]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 relative">
          <h2 className="text-4xl font-semibold font-serif mb-4 text-[#B8860B]">Lokasi</h2>
          <div className="w-24 h-1 bg-[#B8860B] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
         {/* Maps */}
          <div className="aspect-video relative overflow-hidden rounded-lg border border-[#B8860B]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.2279411770347!2d115.17199661478378!3d-8.541883393857697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23a7f8883b6a3%3A0xf7d0bf9c4c7da16d!2sPura%20Taman%20Ayun!5e0!3m2!1sen!2sid!4v1647830836447!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* Coordinates */}
          <div className="flex flex-col items-center justify-center p-8 border border-[#B8860B] rounded-lg">
            <h3 className="text-2xl font-serif mb-4 text-center text-black">Ingin ke Tempat Mempelai?</h3>
            <p className="mb-6 text-center text-black">
              Tekan tombol di bawah ini untuk petunjuk arah menuju lokasi acara
            </p>
            <Button
              onClick={openGoogleMaps}
              className="bg-[#B8860B] hover:bg-[#8B6508] text-white flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Petunjuk Arah
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}