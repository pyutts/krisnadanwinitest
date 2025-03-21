"use client" 

import { Clock, MapPin, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function ScheduleSection() {
  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/place/8%C2%B031'45.4%22S+115%C2%B020'20.4%22E/@-8.529337,115.3389815,21z/data=!4m4!3m3!8m2!3d-8.529266!4d115.339012?entry=ttu&g_ep=EgoyMDI1MDMxOC4wIKXMDSoJLDEwMjExNjM5SAFQAw%3D%3D`, '_blank');
  };
  
  return (
    <section className="py-20 relative">
      {/* Background image */}
      <div className="absolute inset-0 bg-black/100 z-0">
        <img
          src="/images/hero/hero2.jpg"
          alt="Foto1"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Top message */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg leading-relaxed font-serif text-center text-white">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir untuk
            memberikan doa restu.
          </p>
        </div>

        {/* Event card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto bg-white/10 backdrop-blur-none rounded-3xl overflow-hidden border border-white/20"
        >
          <div className="flex">
            {/* Date section */}
            <div className="bg-white/20 p-4 w-1/3 flex flex-col items-center justify-center">
              <h3 className="text-5xl font-bold text-white">09</h3>
              <p className="text-base uppercase font-serif text-white">April</p>
              <p className="text-base font-serif text-white">2025</p>
            </div>

            {/* Event details */}
            <div className="p-4 w-2/3">
              <h3 className="text-2xl font-bold text-white mb-3">PAWIWAHAN</h3>

              <div className="flex items-center gap-2 mb-2 text-white">
                <Clock className="w-4 h-4 text-white flex-shrink-0" />
                <p className="text-sm">12:00 WITA-SELESAI</p>
              </div>

              <div className="flex items-start gap-2 mb-4 text-white">
                <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <p className="text-sm">Br. Bukit Batu, Kec. Samplangan, Kab. Gianyar</p>
              </div>

              <div className="flex justify-center mt-2">
                <button 
                  onClick={openGoogleMaps} 
                  className="bg-white text-black px-4 py-1.5 rounded-full flex items-center gap-1 text-sm hover:bg-white/90 transition-colors"
                >
                  PETUNJUK ARAH 
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thank you message */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-lg text-white mb-6">Atas kehadiran dan doa restunya kami ucapkan terimakasih.</p>
          <p className="text-2xl font-serif font-semibold text-white">"Om Shanti, Shanti, Shanti, Om"</p>
        </div>
      </div>
    </section>
  )
}
