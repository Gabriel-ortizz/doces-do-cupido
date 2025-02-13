import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const MaintenancePage: React.FC = () => {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-pink-400 text-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Estamos em Manutenção!</h1>
        <p className="text-lg mb-6">Estamos trabalhando para melhorar sua experiência. Voltaremos em breve!</p>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Image width={465} height={465} src="/img/manutençao.png" alt="Manutenção" className="w-4xl mx-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MaintenancePage;
