import React, { useState } from 'react';
import { Calendar, ChevronDown, Menu, PlusSquare, Search } from 'lucide-react';
import { useNavigate } from 'react-router';

export const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
  const sidebarItems = [
    { icon: <Search size={18} />, text: 'Search' },
    { icon: <PlusSquare size={18} />, text: 'Home' },
    { icon: <Calendar size={18} />, text: 'Calendar' },
  ];

  const pages = [
    'Web Dev',
    'React Developer - Prog...',
    'React Developer - Prog...',
    'Week-7',
    'Getting Started on Mo...',
    'Quick Note',
    'Personal Home',
    'Task List',
    'Journal',
    'Reading List',
  ];

  return (
    <div className={`bg-gray-100 h-screen overflow-y-auto transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <span className="font-semibold">Adarsh Singh</span>
          </div>
          <ChevronDown size={18} />
        </div>
        {sidebarItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 mb-4 cursor-pointer">
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
        <div className="mt-6">
          <h3 className="text-xs font-semibold mb-2">Private</h3>
          {pages.map((page, index) => (
            <div onClick={()=> navigate('/')} key={index} className="py-1 px-2 cursor-pointer  hover:bg-gray-200 rounded">
              {page}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};