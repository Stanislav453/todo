import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { isUserLogIn } from "../stores/localStorage/isUserLogIn";
import { useTaskList } from "../stores/useTaskList";

export const SideTodoLists = () => {
  const taskList = useTaskList((state) => state.userTaskList);
  const activeTodoList = useTaskList((state) => state.activeTodoList);
  const setActiveTodoList = useTaskList((state) => state.updateActiveToList);
  const setFilterTodoListsData = useTaskList(
    (state) => state.setFilterTodoListsData
  );
  const taskListName = useTaskList((state) => state.taskListName);
  const [newListName, setNewListName] = useState("");
  const [isTodoliStHaveSameName, setIsTodoliStHaveSameName] = useState(false);
  const [isTaskManagerActive, setIsTaskManagerActive] = useState(true);

  const todoListsName = [
    ...new Set(taskList.map((oneName) => oneName.listName)),
  ];
  console.log(todoListsName);

  // const isUserLogIn = localStorage.getItem("basicUserInfo");

  const title = "Todo lists manager";
  const todoListsError = "Todo list can't have some name.";

  const sideTodoListSubmit = (todoListName: string) => {
    setFilterTodoListsData(todoListName);
    setActiveTodoList(todoListName);
  };

  const handleCreateList = () => {
    if (!newListName.trim()) {
      return;
    }

    // todoLists.map((oneTodoList) =>
    //   oneTodoList === newListName
    //     ? setIsTodoliStHaveSameName(true)
    //     : (createNewTodoList(newListName.trim()),
    //       setNewListName(""),
    //       setIsTodoliStHaveSameName(false))
    // );
  };

  if (!isUserLogIn) {
    return null;
  }

  return (
    <aside
      className={`absolute z-50 top-0 ${
        isTaskManagerActive ? "left-0" : "left-[-210px]"
      } flex-col w-full max-w-52 h-full py-2 px-2 bg-white border shadow-md transition-all`}
    >
      <button
        onClick={() => setIsTaskManagerActive((state) => !state)}
        className="absolute top-0 right-[-36px] bg-blue-500 p-2 rounded-br-lg rounded-tr-lg hover:bg-blue-400 transition-colors"
      >
        {isTaskManagerActive ? (
          <FaArrowLeft className="text-white text-xl" />
        ) : (
          <FaArrowRight className="text-white text-xl" />
        )}
      </button>
      <h2 className="text-sm pb-2 font-semibold text-center">{title}</h2>
      <ul className="flex flex-col gap-2 ">
        {taskListName.map((todoListName, index) => (
          <li key={index}>
            <button
              onClick={() => sideTodoListSubmit(todoListName)}
              className={`w-full px-2 text-start ${
                todoListName === activeTodoList
                  ? "bg-slate-300"
                  : "bg-slate-100"
              }  hover:bg-slate-300 rounded-md transition-colors `}
            >
              {todoListName}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-center items-center w-full pt-4">
        <p className="pb-1 text-sm text-center text-red-500">
          {isTodoliStHaveSameName && todoListsError}
        </p>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Enter new list name"
          className=" w-full p-1 border border-gray-300 rounded mb-2"
        />
        <button onClick={handleCreateList}>
          <IoIosAddCircle className=" text-3xl text-blue-500 hover:text-blue-400 transition-colors " />
        </button>
      </div>
    </aside>
  );
};
