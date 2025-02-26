import { Bell, Search, User } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex-1 flex flex-col">
      <header className="flex items-center justify-between px-4 py-[9px] border-b bg-white">
        <div className="relative w-72">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Bell
            className="cursor-pointer text-gray-600 hover:text-black"
            size={20}
          />
          <User
            className="cursor-pointer text-gray-600 hover:text-black"
            size={20}
          />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
