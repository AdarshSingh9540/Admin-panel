import React, { useState, useEffect } from 'react';
import useStore from '../Store';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ProjectDetails = () => {
  const { selectedAssignees } = useStore(); // Access selected assignees from Zustand store
  const [filter, setFilter] = useState('');
  const [workProgress, setWorkProgress] = useState({});

  useEffect(() => {
    // Initialize work progress for each assignee
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

  const pieChartData = {
    labels: filteredAssignees.map(assignee => assignee.label),
    datasets: [
      {
        label: 'Work Completed',
        data: filteredAssignees.map(assignee => workProgress[assignee.value]?.percentage || 0),
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = [
    { name: 'Week 1', ...Object.fromEntries(filteredAssignees.map(a => [a.label, workProgress[a.value]?.data[0] || 0])) },
    { name: 'Week 2', ...Object.fromEntries(filteredAssignees.map(a => [a.label, workProgress[a.value]?.data[1] || 0])) },
    { name: 'Week 3', ...Object.fromEntries(filteredAssignees.map(a => [a.label, workProgress[a.value]?.data[2] || 0])) },
    { name: 'Week 4', ...Object.fromEntries(filteredAssignees.map(a => [a.label, workProgress[a.value]?.data[3] || 0])) },
  ];

  const handlePieClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const selectedAssignee = filteredAssignees[index];
      console.log(`Clicked on ${selectedAssignee.label}`);
    }
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

  return (
    <div className="p-4 sm:p-6 lg:p-8 lg:ml-[5rem] lg:w-full">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Project Details</h1>
      
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
            <div key={assignee.value} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
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

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="border p-4 rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-2">Work Progress (Line Chart)</h2>
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

        <div className="border p-4 rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-2">Task Status (Pie Chart)</h2>
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Task Status' },
              },
            }}
            onClick={handlePieClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
