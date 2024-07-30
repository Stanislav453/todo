import { create } from "zustand";
import { OneTaskType } from "../type";

type UseTaskListType = {
  userTaskList: OneTaskType[];
  updateUserTaskList: (data: OneTaskType) => void;
};

export const useTaskList = create<UseTaskListType>()((set) => ({
  userTaskList: [],

  updateUserTaskList: (data) =>
    set((state) => ({ userTaskList: [...state.userTaskList, data] })),
}));
