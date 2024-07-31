import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { isUserLogIn } from "../stores/localStorage/isUserLogIn";
import { useTaskList } from "../stores/useTaskList";
import { FaTrashAlt } from "react-icons/fa";

export const SideTodoLists = () => {
  const activeTodoList = useTaskList((state) => state.activeTodoList);
  const setActiveTodoList = useTaskList((state) => state.updateActiveToList);
  const updateTaskListName = useTaskList((state) => state.updateTaskListName);
  const deleteTaskListName = useTaskList((state) => state.deleteTaskListName);
  const setFilterTodoListsData = useTaskList(
    (state) => state.setFilterTodoListsData
  );
  const taskListName = useTaskList((state) => state.taskListName);
  const [newListName, setNewListName] = useState("");
  const [isTodoliStHaveSameName, setIsTodoliStHaveSameName] = useState(false);
  const [isTaskManagerActive, setIsTaskManagerActive] = useState(true);

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

    const doesListExist = taskListName.includes(newListName.trim());

    if (doesListExist) {
      setIsTodoliStHaveSameName(true);
    } else {
      updateTaskListName(newListName.trim());
      setNewListName("");
      setIsTodoliStHaveSameName(false);
    }
  };

  const deleteTodoList = async (name: string) => {
    deleteTaskListName(name);
  };

  if (!isUserLogIn) {
    return null;
  }

  return (
    <aside
      className={`absolute z-50 top-[73px] ${
        isTaskManagerActive ? "left-0" : "left-[-210px]"
      } flex-col w-full max-w-52 h-full py-2 px-2 bg-white border shadow-md transition-all`}
    >
      <button
        onClick={() => setIsTaskManagerActive((state) => !state)}
        className="absolute top-0 right-[-33px] bg-blue-500 p-2 rounded-br-lg rounded-tr-lg hover:bg-blue-400 transition-colors"
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
          <li
            key={index}
            className={`flex items-center p-2 ${
              todoListName === activeTodoList ? "bg-slate-300" : "bg-slate-100"
            }  hover:bg-slate-300 rounded-md transition-colors }`}
          >
            <button
              onClick={() => sideTodoListSubmit(todoListName)}
              className={`w-full px-2 text-start `}
            >
              {todoListName}
            </button>
            <button
              onClick={() => deleteTodoList(todoListName)}
              className="text-red-500"
            >
              <FaTrashAlt />
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
          <IoIosAddCircle className=" text-[2.2rem] text-blue-500 hover:text-blue-400 transition-colors " />
        </button>
      </div>
    </aside>
  );
};
