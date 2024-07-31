import { Link } from "react-router-dom";
import { isUserLogIn } from "../stores/localStorage/isUserLogIn";
import { useTaskList } from "../stores/useTaskList";
import { FaRegTrashAlt, FaPenAlt, FaFire, FaCheckCircle } from "react-icons/fa";
import { OneTaskType } from "../type";
import { useFetchTask } from "../api/actions/useFetchTask";
import { USERS_API_URL } from "../api/url";
import { useState } from "react";

export const TaskItem = () => {
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const taskList = useTaskList((state) => state.filterTodoListData);
  const activeTodoList = useTaskList((state) => state.activeTodoList);
  const filterTaskList = useTaskList((state) => state.updateFilterTaskList);
  const toggleIsDone = useTaskList((state) => state.toggleTaskDone);
  const editTaskList = useTaskList((state) => state.editTaskList);
  const [updateTask, setUpdateTask] = useState<Partial<OneTaskType>>({
    id: "",
    taskName: "",
    isPriority: false,
    tag: "home",
    isDone: false,
    listName: "listName 2",
    userId: isUserLogIn.id,
  });

  useFetchTask();

  const deleteTask = async (id: string) => {
    filterTaskList(id);
    console.log(id);

    try {
      const taskResponse = await fetch(
        `${USERS_API_URL}users/${isUserLogIn.id}/tasks/${id}`,
        {
          method: "DELETE",
        }
      );

      if (taskResponse.ok) {
        console.log("task delete");
      } else {
        console.log("task not delete");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTaskDone = async (id: string, currentStatus: boolean) => {
    toggleIsDone(id);

    try {
      const taskResponse = await fetch(
        `${USERS_API_URL}users/${isUserLogIn.id}/tasks/${id}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ isDone: !currentStatus }),
        }
      );

      if (taskResponse.ok) {
        console.log("task change");
      } else {
        console.log("task not delete");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (e.target instanceof HTMLInputElement) {
      const checked = e.target.checked;
      setUpdateTask((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else {
      setUpdateTask((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const editTask = (id: string) => {
    setEditIndex(id);
    const taskToEdit = taskList.find((task) => task.id === id);
    if (taskToEdit) {
      setUpdateTask(taskToEdit);
    }
  };

  const editTaskSubmit = async () => {
    if (editIndex) {
      editTaskList(editIndex, updateTask);
      setEditIndex(null);
      setUpdateTask({
        id: "",
        taskName: "",
        isPriority: false,
        tag: "home",
        isDone: false,
        listName: "listName 2",
        userId: isUserLogIn.id,
      });

      try {
        const taskResponse = await fetch(
          `${USERS_API_URL}users/${isUserLogIn.id}/tasks/${editIndex}`,
          {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              ...updateTask,
            }),
          }
        );

        if (taskResponse.ok) {
          console.log("task change");
        } else {
          console.log("task not change");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="pt-12">
      {isUserLogIn ? (
        <>
          <h3 className="pb-5 text-center text-2xl">
            This is your taskList
            {activeTodoList ? (
              <span className="font-semibold"> {activeTodoList}</span>
            ) : (
              <span className="font-semibold"> select your task list</span>
            )}
          </h3>
          <ul className="flex flex-col gap-1">
            {taskList.map((oneTask: OneTaskType, index: number) => {
              const { id, taskName, isPriority, tag, isDone } = oneTask;
              return (
                <li
                  key={index}
                  className={`flex justify-between w-full p-3 pt-0 rounded-lg 
                    ${editIndex === id ? "bg-orange-100 pt-3" : "bg-gray-100"}`}
                >
                  <div
                    className={`flex flex-col items-center w-full w-max-24 ${
                      editIndex === id ? "gap-2" : ""
                    }`}
                  >
                    <p
                      className={`flex w-full ${
                        editIndex === id ? "bg-orange-100" : "bg-gray-100"
                      }`}
                    >
                      {editIndex === id ? (
                        <select
                          id="task-tag"
                          name="tag"
                          onChange={handleChange}
                          value={updateTask.tag}
                          className="flex-none w-26 p-2 ml-[21px]  rounded-lg bg-gray-100 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="home">Home</option>
                          <option value="jobs">Jobs</option>
                          <option value="workshop">Workshop</option>
                          <option value="workout">Workout</option>
                        </select>
                      ) : (
                        <span className="text-[10px]">{tag}</span>
                      )}
                    </p>
                    <div
                      className={`flex gap-2 items-center justify-between w-full ${
                        isDone ? "bg-black" : "bg-gray-100"
                      } ${editIndex === id ? "bg-orange-100" : "bg-gray-100"}`}
                    >
                      <div className="flex gap-2">
                        <input
                          name="isDone"
                          type="checkbox"
                          checked={isDone}
                          onChange={() => handleToggleTaskDone(id, isDone)}
                        />
                        {editIndex === id ? (
                          <input
                            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="taskName"
                            placeholder="Write your task"
                            onChange={handleChange}
                            value={updateTask.taskName}
                          />
                        ) : (
                          <p>{taskName}</p>
                        )}
                        {editIndex === id ? (
                          <div className="flex gap-1 p-1 border-1 rounded-lg items-center	 bg-gray-100">
                            <input
                              type="checkbox"
                              name="isPriority"
                              onChange={handleChange}
                              checked={updateTask.isPriority}
                            />
                            <label htmlFor="isPriority">Is priority?</label>
                          </div>
                        ) : (
                          isPriority && (
                            <div className="flex items-center">
                              <FaFire className="text-red-500" />
                            </div>
                          )
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => deleteTask(id)}>
                          <FaRegTrashAlt className="text-red-500 text-xl text-[1.3rem]" />
                        </button>
                        {editIndex !== id ? (
                          <button onClick={() => editTask(id)}>
                            <FaPenAlt className="text-orange-500 text-xl text-[1.3rem]" />
                          </button>
                        ) : (
                          <button onClick={() => editTaskSubmit()}>
                            <FaCheckCircle className="text-orange-500 text-[1.3rem]" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <h3 className="text-center">
          if you want add task please <Link to="/logIn">LogIn</Link> or
          <Link to="/registration">Register</Link>
        </h3>
      )}
    </div>
  );
};
