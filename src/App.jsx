import React, { useState } from 'react';
import { Sidebar } from './components/SideBar';
import { Dashboard } from './components/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskDetail from './components/TaskDetail';
import ProjectDetails from './components/ProjectDetails';
import UserDetails from './components/UserDetails';
import AllTeamMember from './components/AllTeamMember';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 relative">
      <BrowserRouter>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div 
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'} lg:ml-64`}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/task-list" element={<TaskDetail />} />
            <Route path="/project-detail" element={<ProjectDetails />} />
            <Route path='/project-details/user' element={<UserDetails/>}/>
            <Route path="/user-profile/:userId" element={<UserDetails />} />
            <Route path="/all-members" element={<AllTeamMember/>} />
          </Routes>
        </div>
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;