export type FormType = {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormTypeLogIn = {
  email: string;
  password: string;
};

export type UserType = {
  id: string;
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  taskList: [];
};

export type OneTaskType = {
  id: string
  taskName: string;
  isPriority: boolean;
  tag: string;
  isDone: boolean;
  listName: string;
  userId: string;
};

export type IsUserLogInType = {
  id: string;
  name: string;
};
