import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useStore from '../Store';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const UserDetails = () => {
  const { userId } = useParams();
  const { users } = useStore();
  const navigate = useNavigate();

  const user = users.find((user) => user.id === parseInt(userId, 10));

  if (!user) return <div>User not found</div>;

  const { assignedTasks, projectStatus } = user;

  const pieChartData = projectStatus.map((task) => ({
    name: task.name,
    value: task.percentage,
  }));

  const barChartData = projectStatus.map((task) => ({
    name: task.name,
    percentage: task.percentage,
  }));

  return (
    <div className="p-4 min-h-screen w-full">
      <div className="w-full mx-auto">
        <div className="text-sm text-gray-500 mb-4">
          <span className="hover:text-blue-600 cursor-pointer">Home</span> / 
          <span className="hover:text-blue-600 cursor-pointer"> User</span> / 
          <span className="font-semibold"> User Profile</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* User Card */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-gray-200 p-6 rounded-full h-24 w-24 lg:px-4 mb-2 m-auto">
              <span className="text-gray-800 text-4xl font-bold">{user.name[0]}</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{user.name}</h2>
            <p className="text-gray-600 mb-4">{user.role || 'Full Stack Developer'}</p>
            <p className="text-gray-600 mb-4">{user.location || 'New Delhi, India, IN'}</p>
            <div className="flex justify-center space-x-2">
              <button onClick={() => navigate('/task-list')} className="bg-blue-500 text-white px-4 py-2 rounded">Assign Task</button>
              <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded">Message</button>
            </div>
          </div>

          {/* User Details */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Full Name</h3>
                <p className="text-gray-600">{user.name}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">{user.Email || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">{user.mobile || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-gray-600">{user.Address || 'N/A'}</p>
              </div>
            </div>
            <button className="mt-10 bg-teal-500 text-white px-4 py-2 rounded">Edit</button>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h3 className="font-semibold mb-4">Social Links</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Website</p>
              <a href="https://thisisadarshsingh.vercel.app/" className="text-blue-500">Portfolio</a>
            </div>
            <div>
              <p className="font-medium">Github</p>
              <a href="https://github.com/AdarshSingh9540" className="text-blue-500">Github</a>
            </div>
            <div>
              <p className="font-medium">Twitter</p>
              <a href={user.twitter} className="text-blue-500">{user.twitter || 'N/A'}</a>
            </div>
            <div>
              <p className="font-medium">Instagram</p>
              <a href={user.instagram} className="text-blue-500">{user.instagram || 'N/A'}</a>
            </div>
            <div>
              <p className="font-medium">Facebook</p>
              <a href={user.facebook} className="text-blue-500">{user.facebook || 'N/A'}</a>
            </div>
          </div>
        </div>

        {/* All Assigned Tasks and Project Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4">All Assigned Tasks</h3>
            <div className="space-y-4">
              {assignedTasks.map((task, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <p>{task}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4">Project Status</h3>
            <div className="space-y-4">
              {projectStatus.map((task, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <p>{task.name}</p>
                    <p>{task.percentage}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${task.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4">Pie Chart</h3>
            <div className="flex justify-center items-center h-64">
              <PieChart width={300} height={300}>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h3 className="font-semibold mb-4">Project Completion </h3>
            <div className="flex justify-center items-center">
              <BarChart
                width={500}
                height={300}
                data={barChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="percentage" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
