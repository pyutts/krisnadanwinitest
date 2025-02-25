"use client";

import { Calendar, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScheduleSection() {
  return (
    <section className="py-20 bg-[#222222]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <div className="w-full h-[50px] bg-[url('/images/ornaments/floral-gold.png')] bg-no-repeat bg-center mb-4" />
          <h2 className="text-3xl font-serif mb-4">Acara Pawiwahan</h2>
          <div className="w-24 h-1 bg-[#B8860B] mx-auto"></div>
          <br />
            <div className="max-w-3xl mx-auto">
                <p className="text-lg mb-8 leading-relaxed text-center">
                  Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/ Tuhan Yang Maha Esa, 
                  kami bermaksud mengundang Bapak/ Ibu/ Saudara/ i pada Upacara Manusa Yadnya 
                  Pawiwahan putra dan putri kami.
                </p>
            </div>
        </div>
     
        <br /> <br />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* Acara 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-[#1a1a1a] border border-[#B8860B] p-8 rounded-lg relative"
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B8860B]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B8860B]" />
            
            <h3 className="text-3xl font-bold text-center text-[#B8860B]">Ngidih & Metipat Bantal</h3>
            <br />
            <div className="text-center space-y-4 mt-4">
              <Calendar className="w-8 h-8 text-[#B8860B] mx-auto" />
              <h3 className="text-xl font-serif">Pada Hari Minggu</h3>
              <p className="text-lg">6 April 2025</p>
            </div>
            <div className="text-center space-y-4 mt-4">
              <Clock className="w-8 h-8 text-[#B8860B] mx-auto" />
              <p className="text-lg">Pukul 08:00 - 15:00 WITA</p>
            </div>
            <div className="mt-8 text-center space-y-4">
              <MapPin className="w-8 h-8 text-[#B8860B] mx-auto" />
              <h3 className="text-xl font-serif">Bertempat di</h3>
              <p className="text-lg">Rumah Besar Wini</p>
              <p className="text-gray-300">Bangli Bangli, Bali</p>
            </div>
          </motion.div>

          {/* Acara 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-[#1a1a1a] border border-[#B8860B] p-8 rounded-lg relative"
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B8860B]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B8860B]" />
            
            <h3 className="text-3xl font-bold text-center text-[#B8860B]">Pawiwahan & Resepsi</h3>
            <br />
            <div className="text-center space-y-4 mt-4">
              <Calendar className="w-8 h-8 text-[#B8860B] mx-auto" />
              <h3 className="text-xl font-serif">Pada Hari Rabu</h3>
              <p className="text-lg">9 April 2025</p>
            </div>
            <div className="text-center space-y-4 mt-4">
              <Clock className="w-8 h-8 text-[#B8860B] mx-auto" />
              <p className="text-lg">Pukul 08:00 - 23:00 WITA</p>
            </div>
            <div className="mt-8 text-center space-y-4">
              <MapPin className="w-8 h-8 text-[#B8860B] mx-auto" />
              <h3 className="text-xl font-serif">Bertempat di</h3>
              <p className="text-lg">Pura Taman Ayun</p>
              <p className="text-gray-300">Mengwi, Badung, Bali</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
