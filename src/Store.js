import create from 'zustand';

const useStore = create((set) => ({
  status: 'Not started',
  priority: 'Low',
  dueDate: '2024-05-30',
  comment: '',
  selectedAssignees: [],
  allAssignees: ['Parth', 'Adarsh', 'Priya', 'Rahul', 'Anjali'],
  users: [
    { 
      id: 1, 
      name: 'Parth', 
      mobile: 9187752368, 
      Address: 'New Delhi',
      Email: 'adarshsingh@gmail.com', 
      tasks: ['Task A', 'Task B'],
      assignedTasks: ['Web Design', 'Website Markup'],
      projectStatus: [
        { name: "Web Design", percentage: 60 },
        { name: "Website Markup", percentage: 80 }
      ]
    },
    { 
      id: 2, 
      name: 'Adarsh', 
      mobile: 9187752368, 
      Address: 'New Delhi',
      Email: 'adarshsingh@gmail.com', 
      tasks: ['Task C', 'Task D','task k'],
      assignedTasks: ['Mobile Template', 'Backend API','Task H'],
      projectStatus: [
        { name: "Mobile Template", percentage: 50 },
        { name: "Backend API", percentage: 90 },
        { name: "Task H", percentage: 5 }
      ]
    },
    { 
      id: 3, 
      name: 'Priya', 
      mobile: 9187752368, 
      Address: 'New Delhi',
      Email: 'adarshsingh@gmail.com', 
      tasks: ['Task E', 'Task F', 'Task F', 'Task F', 'Task F'],
      assignedTasks: ['One Page', 'Web Design',"Task H","Task A","Task B"],
      projectStatus: [
        { name: "One Page", percentage: 70 },
        { name: "Web Design", percentage: 40 },
        { name: "Task H", percentage: 55 },
        { name: "Task A", percentage: 15 },
        { name: "Task B", percentage: 95 }
      ]
    },
    { 
      id: 4, 
      name: 'Rahul', 
      mobile: 9187752368, 
      Address: 'New Delhi',
      Email: 'adarshsingh@gmail.com', 
      tasks: ['Task G', 'Task H', 'Task F', 'Task F'],
      assignedTasks: ['Backend API', 'Backend API',"Task F","Task H"],
      projectStatus: [
        { name: "Backend API", percentage: 85 },
        { name: "Backend API", percentage: 55 },
        { name: "Task F", percentage: 40 },
        { name: "Task H", percentage: 95 },
      ]
    },
    { 
      id: 5, 
      name: 'Anjali', 
      mobile: 918752368, 
      Address: 'New Delhi',
      Email: 'adarshsingh@gmail.com', 
      tasks: ['Task I', 'Task J','Task H'],
      assignedTasks: ['Task I', 'Task J',"Task H",],
      projectStatus: [
        { name: "Task I", percentage: 75 },
        { name: "Task J", percentage: 95 },
        { name: "Task H", percentage: 55 }
      ]
    }
  ],

  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setDueDate: (dueDate) => set({ dueDate }),
  setComment: (comment) => set({ comment }),
  setSelectedAssignees: (assignees) => set({ selectedAssignees: assignees }),
  setAllAssignees: (assignees) => set({ allAssignees: assignees }),
  setUsers: (users) => set({ users }),
  setAssignedTasks: (userId, tasks) => set((state) => {
    const updatedUsers = state.users.map(user => 
      user.id === userId ? { ...user, assignedTasks: tasks } : user
    );
    return { users: updatedUsers };
  }),
  setProjectStatus: (userId, status) => set((state) => {
    const updatedUsers = state.users.map(user => 
      user.id === userId ? { ...user, projectStatus: status } : user
    );
    return { users: updatedUsers };
  })
}));

export default useStore;
