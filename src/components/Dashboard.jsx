import React from 'react';
import { useNavigate } from 'react-router';
import useStore from '../Store';

export const Dashboard = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { users } = useStore((state) => ({
    users: state.users,
  }));

  const recentItems = [
    { title: 'Task 2', time: 'Just now', color: 'from-blue-400 to-blue-600' },
    { title: 'Task 1', time: '9m ago', color: 'from-green-400 to-green-600' },
    { title: 'Projects & Tasks', time: '9m ago', color: 'from-yellow-400 to-yellow-600' },
    { title: 'Getting Started on Mobile', time: '10m ago', color: 'from-red-400 to-red-600' },
    { title: 'Personal Home', time: 'Jun 14, 2023', color: 'from-purple-400 to-purple-600' },
    { title: 'Task List', time: '11m ago', color: 'from-indigo-400 to-indigo-600' },
  ];

  const events = [
    { title: 'My first meeting', time: '9 AM', location: 'Office' },
    { title: 'Lunch', time: '1 PM', location: 'Restaurant' },
    { title: 'Grocery shopping', time: '11 AM', location: 'Store' },
    { title: 'Birthday celebration', time: '', location: '' },
  ];

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="flex-1 p-8  pt-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl lg:text-3xl font-bold text-gray-800">
          {getGreeting()}, Adarsh Singh
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentItems.map((item, index) => (
          <div
            onClick={() => navigate('/task-list', { state: { item } })}
            key={index}
            className={`bg-gradient-to-br ${item.color} p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer`}
          >
            <h3 className="font-semibold mb-2 text-white text-lg">{item.title}</h3>
            <p className="text-sm text-white opacity-80">{item.time}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Recent Assign Task </h2>
        <div className="grid grid-cols-1 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => navigate(`/user-profile/${user.id}`)}
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-row justify-between lg:mx-6"
            >
              <div className="flex flex-row pt-2">
                <div className="bg-gray-200 p-2 rounded-full lg:px-4 mb-2">
                  <span className="text-gray-800 text-lg font-bold">{user.name[0]}</span>
                </div>
                <h3 className="font-semibold text-lg text-gray-800 ml-6">{user.name}</h3>
                <p className="text-md text-gray-600 ml-6">Tasks: {user.tasks.length}</p>
              </div>

              <div className="hidden lg:block pt-2">
                <div className="flex flex-row">
                  <div>
                    <p className="text-md">See all assigned tasks</p>
                  </div>
                  <div className="m-3 my-1">
                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Upcoming Events</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600">See your upcoming events and join meetings from Home.</span>
            <button className="bg-blue-500 text-white px-2 lg:px-4 py-1 text-xs lg:py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              Connect to Google Calendar
            </button>
          </div>
          {events.map((event, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
              <p className="font-semibold text-gray-800">{event.title}</p>
              <p className="text-sm text-gray-600">
                {event.time} {event.location && `- ${event.location}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
