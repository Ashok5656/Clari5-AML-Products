import React from 'react';
import imgClari5Favicon from "figma:asset/4695cc06ada82390ec617ae2b76764d7dd803fe5.png";
import { motion } from "motion/react";

export const CreationLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[8px] p-[27px] px-[36px] shadow-2xl flex items-center gap-4 min-w-[211px] h-[100px]"
      >
        <div className="relative size-[46px]">
          <motion.img 
            src={imgClari5Favicon} 
            alt="Clari5 Loading..." 
            className="size-full object-contain"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </div>
        <p className="text-[16px] font-normal text-[#333] whitespace-nowrap">Loading....</p>
      </motion.div>
    </div>
  );
};
