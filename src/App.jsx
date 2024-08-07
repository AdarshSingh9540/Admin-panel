import React, { useState } from 'react';
import { Sidebar } from './components/SideBar';
import { Dashboard } from './components/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskDetail from './components/TaskDetail';
import ProjectDetails from './components/ProjectDetails';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 relative " >
      <BrowserRouter>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div 
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}  lg:pl-64 mt-12`}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/task-list" element={<TaskDetail />} />
            <Route path="/project-detail" element={<ProjectDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
