import { useEffect, useState } from "react";
import { CustomButton } from "./CustomButton";
import { OneTaskType } from "../type";
import { useTaskList } from "../stores/useTaskList";
import { TASKS_API_URL } from "../api/url";
import { isUserLogIn } from "../stores/localStorage/isUserLogIn";

export const TaskListForm = () => {
  const setTaskList = useTaskList((state) => state.updateTaskList);
  const activeTodoList = useTaskList((state) => state.activeTodoList);
  const taskList = useTaskList((state) => state.filterTodoListData);
  const [newId, setNewId] = useState("");
  const [userTask, setUserTask] = useState<OneTaskType>({
    id: newId,
    userId: isUserLogIn.id,
    taskName: "",
    isPriority: false,
    tag: "home",
    isDone: false,
    listName: activeTodoList,
  });

  useEffect(() => {
    const calcId = () => {
      const lastId = parseInt(taskList[taskList.length - 1]?.id, 10);
      const id = isNaN(lastId) ? 1 : lastId + 1;
      const result = id.toString();
      setNewId(result);
    };

    calcId();
  }, [taskList]);

  const formSubmit = async () => {
    setTaskList(userTask);

    try {
      const response = await fetch(`${TASKS_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userTask.id,
          taskName: userTask.taskName,
          isPriority: userTask.isPriority,
          tag: userTask.tag,
          isDone: userTask.isDone,
          listName: activeTodoList,
          userId: isUserLogIn.id,
        }),
      });
      if (response.ok) {
        setUserTask({
          id: newId,
          taskName: "",
          isPriority: false,
          tag: "home",
          isDone: false,
          listName: activeTodoList,
          userId: isUserLogIn.id,
        });
        console.log("Task is sent.");
      } else {
        console.log("Task is not sent.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setUserTask((prevTask) => ({
      ...prevTask,
      id: newId,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  return (
    <form className="w-full flex flex-col justify-center items-center gap-1 mx-auto ">
      <div className="flex w-full">
        <input
          className={`flex-1 bg-gray-50 border 
           border-gray-300
          text-gray-900 text-sm rounded-tl-lg rounded-bl-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          type="text"
          name="taskName"
          placeholder="Write your task"
          onChange={handleChange}
          value={userTask.taskName}
        />
        <CustomButton
          buttonName="Add task"
          customStyle="bg-formButton"
          action={formSubmit}
        />
      </div>
      <div className="flex flex-wrap items-center  w-full gap-1">
        <div className={`flex gap-1 bg-gray-100 p-[8px] border-1  rounded-lg `}>
          <input
            type="checkbox"
            name="isPriority"
            onChange={handleChange}
            checked={userTask.isPriority}
          />
          <label htmlFor="isPriority">Is priority?</label>
        </div>
        <select
          id="task-tag"
          name="tag"
          onChange={handleChange}
          value={userTask.tag}
          className={`flex-none w-26 p-2 rounded-lg bg-gray-100 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        >
          <option value="home">Home</option>
          <option value="jobs">Jobs</option>
          <option value="workshop">Workshop</option>
          <option value="workout">Workout</option>
        </select>
      </div>
    </form>
  );
};
