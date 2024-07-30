import React from "react";
import { TaskListForm } from "../component/taskListForm/TaskListForm";
import { TaskItem } from "../component/TaskItem";
// import { useTaskList } from "../../stores/useTaskList";
import { useTaskList } from "../stores/useTaskList";

export const Home = () => {
  const taskList = useTaskList((state) => state.userTaskList);

  console.log("This is tasks from home", taskList);

  return (
    <main className="w-full max-w-5xl h-full mx-auto min-h-screen pt-10 sm:pt-16  px-5 ">
      <h1 className="pb-8 text-[3rem] font-medium text-black text-center">
        Todo list
      </h1>
      <TaskListForm />
      <TaskItem />
    </main>
  );
};
