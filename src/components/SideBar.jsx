import React from 'react';
import { Calendar, ChevronDown, Menu, PlusSquare, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: <Search size={18} />, text: 'Search' },
    { icon: <PlusSquare size={18} />, text: 'Home' },
    { icon: <Calendar size={18} />, text: 'Calendar' },
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-4 fixed top-4 left-4 z-50"
      >
        <Menu size={24} />
      </button>
      <div className={`bg-gray-100 h-screen overflow-y-auto transition-all duration-300 fixed top-0 left-0 z-50 ${isOpen ? 'w-64' : 'w-0'} lg:w-64`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full">
                <img src="https://avatars.githubusercontent.com/u/131537713?v=4" alt="" />
              </div>
              <span className="font-semibold text-lg ">Adarsh Singh</span>
            </div>
            <button
              onClick={toggleSidebar}
              className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex flex-col space-y-4 lg:space-y-2">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 py-2 px-3 rounded"
              >
                {item.icon}
                <Link to="/"><span className="">{item.text}</span></Link>
              </div>
            ))}
          </div>
          <div className="mt-6">
          <h3 className="text-xs font-semibold mb-2 hidden lg:block">Private</h3>
          <div className="py-1 lg:py-2 px-2 cursor-pointer hover:bg-gray-200 rounded flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="material-symbols-outlined">dashboard</span>
              <span>DashBoard</span>
            </Link>
          </div>
        
          <div className="py-1 lg:py-2 px-2 cursor-pointer hover:bg-gray-200 rounded flex items-center">
            <Link to="/task-list" className="flex items-center space-x-2">
              <span className="material-symbols-outlined">add_task</span>
              <span>TaskList</span>
            </Link>
          </div>
        
          <div className="py-1 lg:py-2 px-2 cursor-pointer hover:bg-gray-200 rounded flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="material-symbols-outlined">diversity_3</span>
              <span>All Members</span>
            </Link>
          </div>
        
          <div className="py-1 lg:py-2 px-2 cursor-pointer hover:bg-gray-200 rounded flex items-center">
            <Link className="flex items-center space-x-2">
              <span className="material-symbols-outlined">settings</span>
              <span>Setting</span>
            </Link>
          </div>
        </div>

        </div>
      </div>
    </>
  );
};