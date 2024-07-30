import { create } from "zustand";
import { UserType } from "../type";

type UseUserDataType = {
  userData: UserType[] | null;
  updateUserData: (data: UserType[]) => void;
};

export const useUserData = create<UseUserDataType>()((set) => ({
  userData: null,

  updateUserData: (data) => set({ userData: data }),
}));
