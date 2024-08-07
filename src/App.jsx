import { Sidebar } from "./components/SideBar";
import { Dashboard } from "./components/Dashboard";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskDetail from "./components/TaskDetail";
import ProjectDetails from "./components/ProjectDetails";
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <BrowserRouter>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/task-list" element={<TaskDetail/>}/>
        <Route path="/project-detail" element={<ProjectDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;