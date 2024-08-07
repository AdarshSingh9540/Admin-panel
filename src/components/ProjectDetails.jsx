import React, { useState, useEffect } from 'react';
import useStore from '../Store';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

const ProjectDetails = () => {
  const { selectedAssignees } = useStore();
  const [filter, setFilter] = useState('');
  const [workProgress, setWorkProgress] = useState({});
  const location = useLocation();
  const { item } = location.state || {};
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  useEffect(() => {
    const initialProgress = {};
    selectedAssignees.forEach(assignee => {
      initialProgress[assignee.value] = {
        data: [0, 0, 0, 0],
        percentage: 0
      };
    });
    setWorkProgress(initialProgress);
  }, [selectedAssignees]);

  const filteredAssignees = selectedAssignees.filter(assignee =>
    assignee.label.toLowerCase().includes(filter.toLowerCase())
  );

  const pieChartData = filteredAssignees.map(assignee => ({
    label: assignee.label,
    value: workProgress[assignee.value]?.percentage || 0
  }));

  const lineChartData = [
    { name: 'Week 1', ...Object.fromEntries(filteredAssignees.map(a => [a.label, workProgress[a.value]?.data[0] || 0])) },
    { name: 'Week 2', ...Object.fromEntries(filteredAssignees.map(a => [a.label, workProgress[a.value]?.data[1] || 0])) },
    { name: 'Week 3', ...Object.fromEntries(filteredAssignees.map(a => [a.label, workProgress[a.value]?.data[2] || 0])) },
    { name: 'Week 4', ...Object.fromEntries(filteredAssignees.map(a => [a.label, workProgress[a.value]?.data[3] || 0])) },
  ];

  const handlePieClick = (event, data) => {
    console.log(`Clicked on ${data.label}`);
  };

  const updateWorkProgress = (assigneeValue, weekIndex, value) => {
    setWorkProgress(prev => ({
      ...prev,
      [assigneeValue]: {
        ...prev[assigneeValue],
        data: prev[assigneeValue].data.map((v, i) => i === weekIndex ? value : v),
        percentage: Math.round(value)
      }
    }));
  };

  const allAssignees = ['Parth', 'Adarsh', 'Priya', 'Rahul', 'Anjali'];

  const handleAssigneeClick = (assigneeName) => {
    const index = allAssignees.indexOf(assigneeName) + 1; 
    if (index !== -1) {
      navigate(`/user-profile/${index}`);
    }
  };
  

  return (
    <div className="p-4 sm:p-6 lg:p-8 lg:w-full pt-16">
      <div className="text-sm text-gray-500 p-4 bg-white border-b">
        <span className="hover:text-blue-600 cursor-pointer">Projects & Tasks</span> / 
        <span className="hover:text-blue-600 cursor-pointer"> Tasks</span> / 
        <span className="font-semibold"> Project Details</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold my-4">Project Details</h1>
      
      <div className="mb-6 border p-4 rounded-lg bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-2">Selected Assignees</h2>
        <input
          type="text"
          placeholder="Filter assignees..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <div className="flex flex-wrap gap-2">
          {filteredAssignees.map(assignee => (
            <div
              key={assignee.value}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm cursor-pointer"
              onClick={() => handleAssigneeClick(assignee.value)}
            >
              {assignee.label}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border p-4 rounded-lg bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4">Update Work Progress</h2>
        {filteredAssignees.map(assignee => (
          <div key={assignee.value} className="mb-4">
            <h3 className="font-semibold mb-2">{assignee.label}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => (
                <input
                  key={week}
                  type="number"
                  placeholder={week}
                  min="0"
                  max="100"
                  value={workProgress[assignee.value]?.data[index] || 0}
                  onChange={(e) => updateWorkProgress(assignee.value, index, parseInt(e.target.value, 10))}
                  className="w-24 p-2 border rounded-lg"
                />
              ))}
            </div>
            <div>
              Overall Progress: {workProgress[assignee.value]?.percentage || 0}%
              <progress
                value={workProgress[assignee.value]?.percentage || 0}
                max="100"
                className="ml-2 w-full"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid h-auto grid-cols-1 md:grid-cols-2">
        <div className="border p-4 rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-6">Work Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {filteredAssignees.map((assignee, index) => (
                <Line
                  key={assignee.value}
                  type="monotone"
                  dataKey={assignee.label}
                  stroke={`hsl(${index * 137.508},70%,50%)`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="border p-4 rounded-lg h-[450px] bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-2">Task Status</h2>
          <PieChart
            series={[
              {
                data: pieChartData,
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 180,
                cx: isMobile ? 90 : 150,
                cy: isMobile ? 200 : 150,
              }
            ]}
            onClick={handlePieClick} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
