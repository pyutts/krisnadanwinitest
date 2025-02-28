"use client";

import { Calendar, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScheduleSection() {
  return (
    <section className="py-20 bg-[#fff3db]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <h2 className="text-3xl font-serif font-semibold mb-4 text-[#B8860B]">Acara Pawiwahan</h2>
          <div className="w-40 h-1 bg-[#B8860B] mx-auto"></div>
          <br />
            <div className="max-w-3xl mx-auto">
                <p className="text-lg mb-8 leading-relaxed font-serif text-center text-black">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami pada:
                </p>
            </div>
        </div>
     
        <br /> <br />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* Acara 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="border border-[#B8860B] p-8 rounded-lg relative"
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B8860B]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B8860B]" />
            
            <h3 className="text-3xl font-bold text-center text-[#B8860B]">Ngidih & Metipat Bantal</h3>
            <br />
            <div className="text-center space-y-4 mt-4">
              <Calendar className="w-8 h-8 text-[#000] mx-auto" />
              <p className="text-xl font-serif text-black">Pada Hari Minggu</p>
              <p className="text-lg text-black">6 April 2025</p>
            </div>
            <div className="text-center space-y-4 mt-4">
              <Clock className="w-8 h-8 text-[#000] mx-auto" />
              <p className="text-lg text-black">Pukul 08:00 - 15:00 WITA</p>
            </div>
            <div className="mt-8 text-center space-y-4">
              <MapPin className="w-8 h-8 text-[#000] mx-auto" />
              <h3 className="text-xl font-serif text-black">Bertempat di</h3>
              <p className="text-lg text-black">Rumah Besar Wini</p>
              <p className="text-black">Bangli Bangli, Bali</p>
            </div>
          </motion.div>

          {/* Acara 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="border border-[#B8860B] p-8 rounded-lg relative"
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B8860B]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B8860B]" />
            <h3 className="text-3xl font-bold text-center text-[#B8860B]">Pawiwahan & Metipat Bantal</h3>
            <br />
            <div className="text-center space-y-4 mt-4">
              <Calendar className="w-8 h-8 text-[#000] mx-auto" />
              <p className="text-xl font-serif text-black">Pada Hari Minggu</p>
              <p className="text-lg text-black">6 April 2025</p>
            </div>
            <div className="text-center space-y-4 mt-4">
              <Clock className="w-8 h-8 text-[#000] mx-auto" />
              <p className="text-lg text-black">Pukul 08:00 - 15:00 WITA</p>
            </div>
            <div className="mt-8 text-center space-y-4">
              <MapPin className="w-8 h-8 text-[#000] mx-auto" />
              <h3 className="text-xl font-serif text-black">Bertempat di</h3>
              <p className="text-lg text-black">Rumah Besar Wini</p>
              <p className="text-black">Bangli Bangli, Bali</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
