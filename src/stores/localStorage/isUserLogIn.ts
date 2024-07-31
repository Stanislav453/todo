import { IsUserLogInType } from "../../type";
const getOneUser = localStorage.getItem("activeUser");
export const isUserLogIn: IsUserLogInType = getOneUser ? JSON.parse(getOneUser) : 0;
