"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import MusicPlayer from "@/components/MusicPlayer";
import ImageModal from "@/components/ImageModal";
import LocationSection from "@/components/LocationSection";
import CountdownTimer from "@/components/CountdownTimer";
import ScheduleSection from "@/components/ScheduleSection";

interface Message {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

const heroImages = [
  "/images/hero/hero1.jpg",
  "/images/hero/hero2.jpg",
  "/images/hero/hero3.jpg",
  "/images/hero/hero4.jpg",
  "/images/hero/hero5.jpg"
];

const galleryImages = [
  "/images/Gallery/Gallery1.jpg",
  "/images/Gallery/Gallery2.jpg",
  "/images/Gallery/Gallery3.jpg",
  "/images/Gallery/Gallery4.jpg",
  "/images/Gallery/Gallery5.jpg",
  "/images/Gallery/Gallery6.jpg",
  "/images/Gallery/Gallery7.jpg",
  "/images/Gallery/Gallery8.jpg",
  "/images/Gallery/Gallery9.jpg",
  "/images/Gallery/Gallery10.jpg",
  "/images/Gallery/Gallery11.jpg",
  "/images/Gallery/Gallery12.jpg",
  "/images/Gallery/Gallery13.jpg",
  "/images/Gallery/Gallery14.jpg",
  "/images/Gallery/Gallery15.jpg",
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error("Mohon maaf, gagal mengambil pesan");
    }
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.name && newMessage.message) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessage),
        });

        if (!response.ok) {
          throw new Error('Failed to submit message');
        }

        await response.json();
        setNewMessage({ name: '', message: '' });
        toast.success("Terima kasih, pesan Anda telah terkirim");
        
        const newMsg = {
          id: Date.now(),
          name: newMessage.name,
          message: newMessage.message,
          created_at: new Date().toISOString()
        };
        setMessages(prev => [newMsg, ...prev]);
        
        fetchMessages();
      } catch (error) {
        console.error('Error sending message:', error);
        toast.error("Mohon maaf, gagal mengirim pesan");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleOpenInvitation = () => {
    setIsOpen(true);
    window.dispatchEvent(new Event('invitationOpened'));
  };

  if (!isOpen) {
    return (
      <div className="min-h-screen relative bg-[#1a1a1a]">
        <div className="absolute inset-0">
          <Image
            src={heroImages[0]}
            alt="Wedding Background"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-xl md:text-xl text-gray-300">Om Swastiastu</p>
            <h1 className="text-4xl md:text-6xl font-serif mb-4 font-light tracking-wide">
              Krisna & Wini
            </h1>
            <div className="w-24 h-1 bg-[#B8860B] mx-auto"></div>
            <p className="text-xl font-serif">Senin, 31 Maret 2025</p>
      
              {/* <div className="mt-8">
                <p className="text-lg text-gray-300">Majeng ring</p>
                <p className="text-xl font-semibold mt-2"></p>
              </div> */}

            <Button
              onClick={handleOpenInvitation}
              className="mt-8 bg-[#B8860B] hover:bg-[#8B6508] text-white border-none rounded-none px-8 py-6"
            >
              Buka Undangan
            </Button>
          </motion.div>
        </div>
        <MusicPlayer />
      </div>
    );
  }

  return (
    <main className="bg-[#1a1a1a] text-white">
      <MusicPlayer />
      
      <section className="relative h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt="Wedding Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center z-10 px-4"
        >
          <p className="text-xl mb-4">Om Swastiastu</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Krisna & Wini</h1>
          <div className="w-24 h-1 bg-[#B8860B] mx-auto mb-6"></div>
          <p className="text-xl font-serif">Senin, 31 Maret 2025</p>
        </motion.div>
      </section>

      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-serif mb-6">         
                "Ya Tuhanku Yang Maha Pengasih, anugrahkanlah kepada pasangan ini senantiasa kebahagiaan, kesehatan, tetap bersatu dan tidak pernah terpisahkan, panjang umur dan tinggal di rumah yang penuh kegembiraan bersama seluruh keturunannya"
            </h2>
            <p className="text-[#B8860B]">- Rg Veda X.85.42. -</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#222222]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            <div className="w-full h-[50px] bg-[url('/images/ornaments/top.png')] bg-no-repeat bg-center mb-4" />
            <h2 className="text-3xl font-serif mb-4">Mempelai</h2>
            <div className="w-24 h-1 bg-[#B8860B] mx-auto"></div>
            <br />
            <div className="max-w-3xl mx-auto">
              <p className="text-lg mb-8 leading-relaxed">
                Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/ Tuhan Yang Maha Esa, 
                kami bermaksud mengundang Bapak/ Ibu/ Saudara/ i pada Upacara Manusa Yadnya 
                Pawiwahan putra dan putri kami.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-center relative p-8 border border-[#B8860B] rounded-lg"
            >
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B8860B]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B8860B]" />
              <div className="relative w-48 h-48 mx-auto mb-6">
                <Image
                  src="/images/couple/cowok.jpg"
                  alt="Mempelai Lanang"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-serif mb-2">I Putu Agus Chrisna Reinaldy, S.H</h3>
              <p className="text-[#B8860B] mb-4 font-serif">Putra Pertama dari Pasangan</p>
              <p className="text-gray-300 font-serif">I Putu Rajeg & Ni Ketut Wardani</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-center relative p-8 border border-[#B8860B] rounded-lg"
            >
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B8860B]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B8860B]" />
              <div className="relative w-48 h-48 mx-auto mb-6">
                <Image
                  src="/images/couple/cewek.jpg"
                  alt="Mempelai Istri"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-serif mb-2">Ni Wayan Wini Widarini, S.Pd., M.Pd</h3>
              <p className="text-[#B8860B] mb-4 font-serif">Putri Pertama dari Pasangan</p>
              <p className="text-gray-300 font-serif">I Wayan Widiasna & Ni Wayan Sadrini</p>
            </motion.div>
          </div>
        </div>
        <br /><br />
      </section>

      <section className="py-20 bg-[#1a1a1a]">
            <div className="text-center mb-16 relative">
              <h2 className="text-4xl mb-4 font-bold font-serif text-[#B8860B]">Menghitung Hari Bahagia</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <CountdownTimer />
            </div>
      </section>


      <ScheduleSection />


      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">Galeri Photo</h2>
            <div className="w-24 h-1 bg-[#B8860B] mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden group cursor-pointer ${
                  index >= 12 ? 'aspect-[3/4]' : 'aspect-square'
                }`}
                onClick={() => setSelectedImage(src)}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LocationSection />

      <section className="py-20 bg-[#222222]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            <div className="w-full h-[50px] bg-[url('/images/ornaments/top.png')] bg-no-repeat bg-center mb-4" />
            <h2 className="text-4xl font-serif mb-4">Doa & Ucapan</h2>
            <div className="w-24 h-1 bg-[#B8860B] mx-auto"></div>
          </div>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmitMessage} className="mb-8">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama"
                  value={newMessage.name}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 bg-transparent border border-[#B8860B] rounded-md"
                  disabled={isSubmitting}
                  required
                />
                <textarea
                  placeholder="Doa & Ucapan"
                  value={newMessage.message}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2 bg-transparent border border-[#B8860B] rounded-md"
                  rows={4}
                  disabled={isSubmitting}
                  required
                ></textarea>
                <Button
                  type="submit"
                  className="w-full bg-[#B8860B] hover:bg-[#8B6508] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Mohon tunggu...' : 'Kirim'}
                </Button>
              </div>
            </form>
            
            <div className="space-y-6">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4 border border-[#B8860B] rounded-md relative"
                  >
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#B8860B]" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#B8860B]" />
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold">{msg.name}</h3>
                      <span className="text-sm text-gray-400">
                        {new Date(msg.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-300">{msg.message}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-[#1a1a1a] text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <img src="/images/logo.png" alt="LogoDigsoft" className="w-32" />
            <div className="text-center sm:text-right mt-4 sm:mt-0">
              <p className="text-2xl font-bold mb-2">Created by DigSoft</p>
              <p className="text-sm text-gray-400">All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>


      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage || ''}
        images={galleryImages}
      />
    </main>
  );
}