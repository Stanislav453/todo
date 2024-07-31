import { TaskListForm } from "../component/TaskListForm";
import { TaskItem } from "../component/TaskItem";
import { SideTodoLists } from "../component/SideTodoLists";

export const Home = () => {

  return (
    <main className="w-full max-w-5xl h-full mx-auto min-h-screen py-10 sm:pt-16  px-5 ">
      <h1 className="pb-8 text-[3rem] font-medium text-black text-center">
        Todo list
      </h1>
      <SideTodoLists />
      <TaskListForm />
      <TaskItem />
    </main>
  );
};
