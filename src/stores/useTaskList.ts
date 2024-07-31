import { create } from "zustand";
import { OneTaskType } from "../type";

type UseTaskListType = {
  userTaskList: OneTaskType[];
  filterTodoListData: OneTaskType[];
  activeTodoList: string;
  taskListName: string[];
  setTaskList: (data: OneTaskType[]) => void;
  updateFilterTaskList: (id: string) => void;
  updateTaskListName: (id: string) => void;
  updateTaskList: (data: OneTaskType) => void;
  setTaskListName: (data: string[]) => void;
  toggleTaskDone: (id: string) => void;
  editTaskList: (id: string, data: Partial<OneTaskType>) => void;
  updateActiveToList: (data: string) => void;
  setFilterTodoListsData: (todoList: string) => void;
  deleteTaskListName: (name: string) => void; 
};

export const useTaskList = create<UseTaskListType>()((set) => ({
  userTaskList: [],
  filterTodoListData: [],
  taskListName: [],
  activeTodoList: "",
  setTaskList: (data) =>
    set(() => ({
      userTaskList: data,
      filterTodoListData: data,
    })),
  updateFilterTaskList: (id) =>
    set((state) => ({
      userTaskList: state.userTaskList.filter((task) => task.id !== id),
      filterTodoListData: state.filterTodoListData.filter(
        (task) => task.id !== id
      ),
    })),
  updateTaskList: (data) =>
    set((state) => ({
      userTaskList: [...state.userTaskList, data],
      filterTodoListData: [...state.filterTodoListData, data],
    })),
  setTaskListName: (data) =>
    set(() => ({
      taskListName: data,
    })),
  updateTaskListName: (data) =>
    set((state) => ({
      taskListName: [...state.taskListName, data],
    })),
  toggleTaskDone: (id) =>
    set((state) => ({
      userTaskList: state.userTaskList.map((oneTask) =>
        oneTask.id === id ? { ...oneTask, isDone: !oneTask.isDone } : oneTask
      ),
      filterTodoListData: state.filterTodoListData.map((oneTask) =>
        oneTask.id === id ? { ...oneTask, isDone: !oneTask.isDone } : oneTask
      ),
    })),
  editTaskList: (id, data) =>
    set((state) => ({
      userTaskList: state.userTaskList.map((oneTask) =>
        oneTask.id === id ? { ...oneTask, ...data } : oneTask
      ),
      filterTodoListData: state.filterTodoListData.map((oneTask) =>
        oneTask.id === id ? { ...oneTask, ...data } : oneTask
      ),
    })),
  updateActiveToList: (data) => set(() => ({ activeTodoList: data })),
  setFilterTodoListsData: (todoList) =>
    set((state) => ({
      filterTodoListData: state.userTaskList.filter(
        (oneTask) => oneTask.listName === todoList
      ),
    })),
  deleteTaskListName: (name) =>
    set((state) => ({
      taskListName: state.taskListName.filter(
        (taskListName) => taskListName !== name
      ),
    })),
}));
