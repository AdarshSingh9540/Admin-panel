import create from 'zustand';

const useStore = create((set) => ({
  status: 'Not started',
  priority: 'Low',
  dueDate: '2024-05-30',
  comment: '',
  selectedAssignees: [],
  allAssignees: ['Parth', 'Adarsh', 'Priya', 'Rahul','Anjali'], 
  users: [
    { id: 1, name: 'Parth',  mobile: 9187752368, Address:'New Delhi',Email:'adarshsingh@gmail.com',tasks: ['Task A', 'Task B','Task Good'] },
    { id: 2, name: 'Adarsh', mobile: 9187752368, Address:'New Delhi',Email:'adarshsingh@gmail.com', tasks: ['Task C', 'Task D'] },
    { id: 3, name: 'Priya',  mobile: 9187752368, Address:'New Delhi',Email:'adarshsingh@gmail.com',tasks: ['Task E', 'Task F','Task F','Task F','Task F'] },
    { id: 4, name: 'Rahul',  mobile: 9187752368, Address:'New Delhi',Email:'adarshsingh@gmail.com',tasks: ['Task G', 'Task H','Task X','Task G'] },
    { id: 5, name: 'Anajali', mobile: 918752368, Address:'New Delhi',Email:'adarshsingh@gmail.com', tasks: ['Task G', 'Task H'] }
  ], 

  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setDueDate: (dueDate) => set({ dueDate }),
  setComment: (comment) => set({ comment }),
  setSelectedAssignees: (assignees) => set({ selectedAssignees: assignees }),
  setAllAssignees: (assignees) => set({ allAssignees: assignees }),
  setUsers: (users) => set({ users }), // Add method to update users
}));

export default useStore;
