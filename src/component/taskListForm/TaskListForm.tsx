import { useState } from "react";
import { registerLocale } from "react-datepicker";
import { CustomButton } from "../CustomButton";
import { OneTaskType } from "../../type";
import { es } from "date-fns/locale/es";
import { useTaskList } from "../../stores/useTaskList";
import { TASKS_API_URL } from "../../api/url";
import { isUserLogIn } from "../../stores/localStorage/isUserLogIn";
// import { useTaskList } from "../../stores/useTaskList";

registerLocale("es", es);

export const TaskListForm = () => {
  // const [editIndex, setEditIndex] = useState<number | null>(null);
  const setTaskList = useTaskList((state) => state.updateTaskList);
  const [userTask, setUserTask] = useState<OneTaskType>({
    id: "",
    taskName: "",
    isPriority: false,
    tag: "home",
    isDone: false,
    listName: "listName 2",
    userId: isUserLogIn.id,
  });

  const formSubmit = async () => {
    setTaskList(userTask);

    try {
      const response = await fetch(`${TASKS_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName: userTask.taskName,
          isPriority: userTask.isPriority,
          tag: userTask.tag,
          isDone: false,
          listName: "listName 2",
          userId: isUserLogIn.id,
        }),
      });
      if (response.ok) {
        setUserTask({
          id: "",
          taskName: "",
          isPriority: false,
          tag: "home",
          isDone: false,
          listName: "listName 2",
          userId: isUserLogIn.id,
        });
        console.log("huraa");
      } else {
        console.log("noooo");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (e.target instanceof HTMLInputElement) {
      const checked = e.target.checked;
      setUserTask({
        ...userTask,
        [name]: type === "checkbox" ? checked : value,
      });
    } else {
      setUserTask({
        ...userTask,
        [name]: value,
      });
    }
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
          action={() => {
            formSubmit();
          }}
        />
      </div>
      <div className="flex flex-wrap items-center  w-full gap-1">
        <div className={`flex gap-1 "bg-gray-100 p-1 border-1  rounded-lg `}>
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
