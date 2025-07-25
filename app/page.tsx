"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getMessages } from "@/lib/db";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import MusicPlayer from "@/components/MusicPlayer";
import ImageModal from "@/components/ImageModal";
import CountdownTimer from "@/components/CountdownTimer";
import ScheduleSection from "@/components/ScheduleSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

interface Message {
  id: number;
  name: string;
  message: string;
  status: string;
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
  "/images/Gallery/Gallery7.jpg",
  "/images/Gallery/Gallery8.jpg",
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
  const [newMessage, setNewMessage] = useState({ name: "", message: "", status: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fetchMessages = async () => {
    const data = await getMessages();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  },[]);

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

  dayjs.extend(utc);



  
  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.name || !newMessage.message || !newMessage.status) {
      toast.error("Harap isi semua kolom termasuk status kehadiran.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });
  
      if (!response.ok) throw new Error("Gagal mengirim pesan");
  
      const data: Message = await response.json();
      setMessages((prevMessages) => [data, ...prevMessages]); // Gunakan prevMessages
  
      setNewMessage({ name: "", message: "", status: "" });
      toast.success("Pesan terkirim!");
    } catch (error) {
      toast.error("Terjadi kesalahan, coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
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
            <p className="text-xl md:text-xl text-gray-300">The Wedding of</p>
            <h1 className="text-4xl md:text-6xl font-serif mb-4 font-light tracking-wide">
              Chrisna & Wini
            </h1>
            <div className="w-24 h-1 bg-[#B8860B] mx-auto"></div>
            <p className="text-xl font-serif">Rabu, 09 April 2025</p>
            <Button
              onClick={handleOpenInvitation}
              className="mt-8 bg-[#B8860B] hover:bg-[#8B6508] text-white border-none rounded-none rounded-full px-8 py-6"
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
  
      {/* Section Hero */}
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
          <p className="text-xl mb-4">The Wedding of</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-4">Chrisna & Wini</h1>
          <div className="w-24 h-1 bg-[#B8860B] mx-auto mb-4"></div>
          <p className="text-xl font-serif">Rabu, 09 April 2025</p>
          <div className="flex justify-center mt-8">
            <a
              href="#hitung"
              className="bg-[#B8860B] hover:bg-[#8B6508] text-white border-none rounded-full px-6 py-3 flex items-center justify-center w-[160px] shadow-md transition-all duration-300 gap-2"
            >
        <span className="text-sm font-medium">Scroll Bawah</span>
        <FontAwesomeIcon icon={faArrowDown} className="text-sm opacity-75" />
      </a>
    </div>


        </motion.div>
      </section>
      {/* Tombol Scroll ke Bawah */}
  


       {/* Section Countdown */}
       <section className="py-20 bg-[#ffff] text-center" id="hitung">
        <p className="text-center text-balance max-w-3xl mx-auto mb-12 font-semibold text-[#B8860B]">"Ya Tuhan, anugerahkanlah kepada pasangan pengantin ini kebahagiaan, keduanya tiada terpisahkan dan panjang umur. Semoga penganten ini dianugerahkan putra dan cucu yang memberikan penghiburan, tinggal di rumah yang penuh kegembiraan."
        </p>
        <div className="mx-auto w-32 h-1 bg-[#b18121] mb-2"></div>
        <p className="text-center font-bold text-[#b18121] mb-2">RG VEDA X.85.42</p>
        <div className="mx-auto w-32 h-1 bg-[#b18121] "></div>

        {/* <h2 className="text-4xl mb-4 font-serif text-[#B8860B]">Menuju Hari Bahagia</h2>
        <br />
        <div className="max-w-4xl mx-auto">
          <CountdownTimer />
        </div> */}
      </section>
  
      {/* Section Kedua Mempelai */}
      <section className="py-20 bg-[#fff3db]">
        <div className="cont~ainer mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex flex-col items-center justify-center">
              <img src="/images/salam.png" alt="salam" className="w-32 mb-6" />
            </div>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg mb-8 font-serif text-center text-black leading-relaxed">
                    Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/ Tuhan Yang Maha Esa, 
                    kami bermaksud mengundang Bapak/ Ibu/ Saudara/ i pada Upacara Manusa Yadnya 
                    Pawiwahan putra dan putri kami.
              </p>
            </div>  
          </div>
          <br />
          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-center relative p-8 border border-[#B8860B] rounded-lg"
            >
              <div className="relative w-48 h-48 mx-auto mb-6">
                <Image
                  src="/images/couple/cowok.jpg"
                  alt="Mempelai Pria"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-serif mb-2 text-black">I Putu Agus Chrisna Reinaldy, S.H.</h3>
              <p className="text-[#B8860B] mb-2 font-serif">Putra Pertama dari Pasangan</p>
              <p className="font-serif text-black">I Putu Rajeg & Ni Ketut Wardani</p>
            </motion.div>
  
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-center relative p-8 border border-[#B8860B] rounded-lg"
            >
              <div className="relative w-48 h-48 mx-auto mb-6">
                <Image
                  src="/images/couple/cewek.jpg"
                  alt="Mempelai Wanita"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-serif mb-2 text-black">Ni Wayan Wini Widarini, S.Pd., M.Pd.</h3>
              <p className="text-[#B8860B] mb-2 font-serif">Putri Pertama dari Pasangan</p>
              <p className="font-serif text-black">I Wayan Widiasna & Ni Wayan Sadrini</p>
            </motion.div>
          </div>
        </div>
      </section>
  
      {/* Section Schedule */}
      <ScheduleSection />

      
      {/* Section Lokasi */}
      {/* <LocationSection /> */}

      {/* Section Countdown */}
      <section className="py-20 bg-[#ffff] text-center">
        <h2 className="text-balance max-w-3xl mx-auto mb-4 font-semibold text-[#B8860B]">"Siang dan malam berganti begitu cepat, di antara saat-saat mendebarkan yang belum pernah kami rasakan sebelumnya. Kami nantikan kehadiran para keluarga dan sahabat, untuk menjadi saksi ikrar janji suci kami di hari yang bahagia."</h2>
        <br />
        <div className="max-w-4xl mx-auto">
          <CountdownTimer />
        </div>
      </section>
  
      {/* Section Galeri */}
      <section className="py-20 bg-[#fff3db]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-semibold mb-4 text-[#B8860B]">Gallery Photo</h2>
          <div className="w-32 h-1 mb-12 bg-[#B8860B] mx-auto"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden group cursor-pointer aspect-square"
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

      {/* Section Doa & Ucapan */}
      <section className="py-20 bg-[#fff]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4 font-semibold text-[#B8860B]">Doa & Ucapan</h2>
            <div className="w-40 h-1 bg-[#B8860B] mx-auto"></div>
          </div>
          <div className="max-w-2xl mx-auto">
             {/* Form Input */}
            <form onSubmit={handleSubmitMessage} className="space-y-4">
              <input
                type="text"
                placeholder="Nama"
                value={newMessage.name}
                onChange={(e) => setNewMessage((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-[#B8860B] rounded-md text-gray-900"
                required
              />

              <select
                value={newMessage.status}
                onChange={(e) => setNewMessage((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2 border border-[#B8860B] rounded-md text-gray-900 bg-white"
                required
              >
                <option value="" disabled>Pilih Status</option>
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
              </select>

              <textarea
                placeholder="Doa & Ucapan"
                value={newMessage.message}
                onChange={(e) => setNewMessage((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-2 border border-[#B8860B] rounded-md text-gray-900"
                rows={4}
                required
              ></textarea>

              <Button type="submit" className="w-full bg-[#B8860B] hover:bg-[#8B6508] text-white" disabled={isSubmitting}>
                {isSubmitting ? "Mengirim..." : "Kirim"}
              </Button>
            </form>

            {/* Menampilkan Pesan dari Database */}
            <div className="space-y-6 py-12">
                <AnimatePresence>
                  {messages.length === 0 ? (
                    <p className="text-center text-gray-500">Belum ada pesan</p>
                  ) : (
                    messages.map((msg) => (
                      <motion.div
                        key={msg.id || Math.random()} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-4 border border-[#B8860B] rounded-md bg-white shadow-md"
                      >                    
                        {/* Nama dan Tanggal */}
                        <div className="flex justify-between mb-2">
                          <h3 className="font-semibold text-gray-700">{msg.name}</h3>
                          <span className="text-sm text-gray-500">
                            {msg.created_at
                              ? dayjs.utc(msg.created_at).local().format("DD MMMM YYYY [pukul] HH:mm")
                              : "Tanggal tidak tersedia"}
                          </span>
                        </div>

                        {/* Pesan dan Status (sejajar) */}
                        <div className="flex justify-between items-start">
                          <p className="text-gray-600">{msg.message}</p>
                          <p
                            className={`text-sm font-semibold ${
                              msg.status === "Hadir" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {msg.status}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>



          </div>
        </div>
      </section>

  
      {/* Footer */}
      <footer className="py-12 bg-gray-100 text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            {/* Logo DigSoft Tidak Hilang */}
            <img src="/images/logo.png" alt="Logo DigSoft" className="w-36"/>
            <div className="text-center sm:text-right mt-4 sm:mt-0">
              <p className="text-2xl font-bold mb-2 text-gray-950">Created by DigSoft</p>
              <p className="text-sm text-gray-600">All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>

  
      {/* Modal Galeri */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage || ''}
        images={galleryImages}
      />

    </main>
  );
  
}