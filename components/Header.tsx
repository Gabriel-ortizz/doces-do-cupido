import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  cartCount: number;
  setIsCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  cartCount,
  setIsCartVisible,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full p-4 bg-pink-200 shadow-md z-50">
      <div className="flex justify-between items-center">
        <Image src="/img/Logo.png" alt="Logo" width={84} height={80} />
        <input
          type="text"
          placeholder="Pesquise por produtos..."
          className="w-1/2 sm:w-3/4 p-3 border-2 border-gray-300 rounded-md text-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Buscar produtos"
        />
        <div className="flex items-center gap-4">
          <div
            onClick={() => setIsCartVisible(true)}
            className="cursor-pointer p-3 rounded-lg hover:bg-pink-300 transition-all duration-200 flex items-center"
          >
            🛒 <span className="ml-1">{cartCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
