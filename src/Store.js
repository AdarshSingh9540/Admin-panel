// store.js
import create from 'zustand';

const useStore = create((set) => ({
  status: 'Not start yet',
  priority: 'Low',
  dueDate: '2024-05-30',
  comment: '',
  selectedAssignees: [],

  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setDueDate: (dueDate) => set({ dueDate }),
  setComment: (comment) => set({ comment }),
  setSelectedAssignees: (assignees) => set({ selectedAssignees: assignees }),
}));

export default useStore;
