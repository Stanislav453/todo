import { create } from "zustand";
import { OneTaskType } from "../type";

type UseTaskListType = {
  userTaskList: OneTaskType[];
  filterTodoListData: OneTaskType[];
  activeTodoList: string;
  taskListName: string[];
  setTaskList: (data: OneTaskType[]) => void;
  updateFilterTaskList: (id: string) => void;
  updateTaskList: (data: OneTaskType) => void;
  setTaskListName: (data: string[]) => void;
  toggleTaskDone: (id: string) => void;
  editTaskList: (id: string, data: Partial<OneTaskType>) => void;
  updateActiveToList: (data: string) => void;
  setFilterTodoListsData: (todoList: string) => void;
};

export const useTaskList = create<UseTaskListType>()((set) => ({
  userTaskList: [],
  taskListName: [],
  filterTodoListData: [],
  activeTodoList: "",
  setTaskList: (data) =>
    set(() => ({
      userTaskList: data,
      filterTodoListData: data,
    })),
  updateFilterTaskList: (id) =>
    set((state) => ({
      filterTodoListData: state.userTaskList.filter((task) => task.id !== id),
    })),

  updateTaskList: (data) =>
    set((state) => ({
      userTaskList: [...state.userTaskList, data],
    })),
  setTaskListName: (data) =>
    set(() => ({
      taskListName: data,
    })),
  toggleTaskDone: (id) =>
    set((state) => ({
      userTaskList: state.userTaskList.map((oneTask) =>
        oneTask.id === id ? { ...oneTask, isDone: !oneTask.isDone } : oneTask
      ),
    })),
  editTaskList: (id, data) =>
    set((state) => ({
      userTaskList: state.userTaskList.map((oneTask) =>
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
}));
