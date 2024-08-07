import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Select from 'react-select';
import useStore from '../Store';
import { ChevronDown, Plus, Send } from 'lucide-react';

const TaskList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};
 
  const { 
    status, setStatus,
    priority, setPriority,
    dueDate, setDueDate,
    selectedAssignees, setSelectedAssignees ,
    allAssignees
  } = useStore();

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [taskItem, setTaskItem] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  // const allAssignees = ['Parth', 'Adarsh', 'John', 'Rahul'];
  const assigneeOptions = allAssignees.map(assignee => ({
    value: assignee,
    label: assignee,
  }));

  useEffect(() => {
    const initialAssignees = item?.assignees || [];
    if (initialAssignees.length > 0) {
      const selected = assigneeOptions.filter(option => initialAssignees.includes(option.value));
      setSelectedAssignees(selected);
    }
  }, [assigneeOptions, item?.assignees, setSelectedAssignees]);

  const handleAssigneeChange = (selectedOption) => {
    setSelectedAssignees(selectedOption);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments(prevComments => [...prevComments, comment]);
      setComment('');
    }
  };

  const handleAddTaskItem = () => {
    if (taskItem.trim()) {
      setTaskItems(prevTaskItems => [...prevTaskItems, taskItem]);
      setTaskItem('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50 pt-16">
      <div className="text-sm text-gray-500 p-4 bg-white border-b">
        <span className="hover:text-blue-600 cursor-pointer">Projects & Tasks</span> / 
        <span className="hover:text-blue-600 cursor-pointer"> Tasks</span> / 
        <span className="font-semibold"> {item?.title || "New Task"}</span>
      </div>
      <div className="flex-grow p-4 sm:p-6 lg:p-8 lg:w-1/2 mx-auto lg:ml-[15rem]">
        <div className="flex items-center mb-8">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="4" fill="#3B82F6" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{item?.title || "New Task"}</h1>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <span className="w-full sm:w-32 text-gray-600 font-medium mb-2 sm:mb-0">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-auto"
            >
              {['Not started', 'In progress', 'Done'].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <span className="w-full sm:w-32 text-gray-600 font-medium mb-2 sm:mb-0">Priority</span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-300 w-full sm:w-auto"
            >
              {['Low', 'Medium', 'High'].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <span className="w-full sm:w-32 text-gray-600 font-medium mb-2 sm:mb-0">Assignees</span>
            <div className="flex-1">
              <Select
                isMulti
                value={selectedAssignees}
                onChange={handleAssigneeChange}
                options={assigneeOptions}
                className="w-full"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: 'none',
                    boxShadow: 'none',
                    backgroundColor: '#e0f7fa',
                    borderRadius: '9999px',
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: '#00796b',
                    borderRadius: '9999px',
                  }),
                  multiValueLabel: (provided) => ({
                    ...provided,
                    color: 'white',
                  }),
                  multiValueRemove: (provided) => ({
                    ...provided,
                    color: 'white',
                    ':hover': {
                      backgroundColor: '#004d40',
                      color: 'white',
                    },
                  }),
                }}
              />
              <div 
                onClick={() => 
                  navigate('/project-detail', { state: { title: 'Sample Project' } })
                }
                className="flex flex-wrap gap-2 mt-2 cursor-pointer"
              >
                {selectedAssignees.map(assignee => (
                  <div key={assignee.value} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                    {assignee.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <span className="w-full sm:w-32 text-gray-600 font-medium mb-2 sm:mb-0">Due</span>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-auto"
            />
          </div>

          <div className="flex items-center">
            <span className="text-gray-600 font-medium">More properties</span>
            <button className="flex items-center text-blue-600 hover:text-blue-800 ml-4">
              <Plus size={16} className="mr-1" />
              <span>Add property</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex  sm:flex-row items-center mb-4">
            <img src="https://avatars.githubusercontent.com/u/131537713?v=4" alt="User" className="w-8 h-8 rounded-full mr-2" />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={handleAddComment}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {comments.map((c, index) => (
              <div key={index} className="bg-white p-3 rounded-lg shadow">
                {c}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">About this task</h2>
          <div className="relative flex items-center mb-2">
  <input
    type="text"
    placeholder="Add a task item..."
    value={taskItem}
    onChange={(e) => setTaskItem(e.target.value)}
    className="w-full p-2 pr-12 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
  />
  <button
    onClick={handleAddTaskItem}
    className="absolute right-0 top-0 bottom-0 p-4  my-1 mx-1 bg-blue-600 text-white flex items-center justify-center rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
    Add
  </button>
</div>


          <ul className="list-disc pl-5 text-gray-700">
            {taskItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
