import React, { useState } from 'react';
import Image from 'next/image';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  cartCount: number;
  setIsCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, cartCount, setIsCartVisible }) => {
  const [isAdminView, setIsAdminView] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full p-4 bg-pink-200 shadow-md z-50">
      {isAdminView ? (
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Painel Administrativo</h2>
          <Button onClick={() => setIsAdminView(false)}>Voltar à Loja</Button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <Image src="/img/Logo.png" alt="Logo" width={84} height={80} />
          <input
            type="text"
            placeholder="Pesquise por produtos..."
            className="w-1/2 sm:w-3/4 p-3 border-2 border-gray-300 rounded-md text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsAdminView(true)}>Painel Admin</Button>
            <div
              onClick={() => setIsCartVisible(true)}
              className="cursor-pointer p-3 rounded-lg hover:bg-pink-300 transition-all duration-200 flex items-center"
            >
              🛒 <span className="ml-1">{cartCount}</span>
            </div>
          </div>
        </div>
      )}

      {isAdminView && <AdminDashboard />}
    </header>
  );
};

export default Header;
