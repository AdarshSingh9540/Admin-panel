import React from 'react';
import useStore from '../Store';
import { useNavigate } from 'react-router';

function AllTeamMember() {
  const navigate = useNavigate();
  const { users } = useStore((state) => ({
    users: state.users,
  }));

  return (
    <div className="mt-16 px-4 lg:px-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text py-4 px-6 rounded-lg shadow-md border border-gray-200">
        All Team Members
      </h2>
      <div className="grid grid-cols-1 gap-6 ">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate(`/user-profile/${user.id}`)}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-row items-start lg:items-center gap-4 lg:gap-6"
          >
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 p-3 rounded-full flex items-center justify-center">
                <span className="text-gray-800 text-lg font-bold">{user.name[0]}</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
              <p className="text-md text-gray-600">Tasks: {user.tasks.length}</p>
            </div>
            <div className="hidden lg:flex items-center">
              <p className="text-md text-blue-600 font-semibold mr-2">See all assigned tasks</p>
              <span className="material-symbols-outlined text-blue-600">arrow_forward_ios</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllTeamMember;
