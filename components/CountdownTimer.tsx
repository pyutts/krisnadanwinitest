"use client";

import Countdown from 'react-countdown';
import { motion } from 'framer-motion';

interface TimeUnit {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const CountdownTimer = () => {
  const weddingDate = new Date('2025-04-09T10:00:00');

  const renderer = ({ days, hours, minutes, seconds, completed }: TimeUnit) => {
    if (completed) {
      return <span className='bg-[#B8860B] p-4 rounded-3xl'>Acara telah selesai</span>;
    }

    const timeUnits = [
      { label: 'Hari', value: days },
      { label: 'Jam', value: hours },
      { label: 'Menit', value: minutes },
      { label: 'Detik', value: seconds }
    ];

    return (
      <div className="flex gap-4 justify-center">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="bg-[#B8860B] text-white px-4 py-2 rounded-lg min-w-[80px] text-center">
              <span className="text-2xl font-bold">{unit.value}</span>
            </div>
            <span className="text-sm mt-2 text-[#B8860B]">{unit.label}</span>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="text-center">
      <Countdown date={weddingDate} renderer={renderer} />
    </div>
  );
};

export default CountdownTimer;