import { create } from "zustand";
import { OneTaskType } from "../type";

type UseTaskListType = {
  userTaskList: OneTaskType[];
  setTaskList: (data: OneTaskType[]) => void;
  updateFilterTaskList: (number: string) => void;
  updateTaskList: (data: OneTaskType) => void;
  toggleTaskDone: (id: string) => void;
};

export const useTaskList = create<UseTaskListType>()((set) => ({
  userTaskList: [],

  setTaskList: (data) =>
    set(() => ({
      userTaskList: data,
    })),

  updateFilterTaskList: (id) =>
    set((state) => ({
      userTaskList: state.userTaskList.filter((task) => task.id !== id),
    })),
  updateTaskList: (data) =>
    set((state) => ({
      userTaskList: [...state.userTaskList, data],
    })),
  toggleTaskDone: (id) =>
    set((state) => ({
      userTaskList: state.userTaskList.map((oneTask) =>
        oneTask.id === id ? { ...oneTask, isDone: !oneTask.isDone } : oneTask
      ),
    })),
}));
