import { Link } from "react-router-dom";
import { isUserLogIn } from "../stores/localStorage/isUserLogIn";
import { useTaskList } from "../stores/useTaskList";
import { FaRegTrashAlt, FaPenAlt, FaFire } from "react-icons/fa";
import { OneTaskType } from "../type";
import { useFetchTask } from "../api/actions/useFetchTask";
import { USERS_API_URL } from "../api/url";

export const TaskItem = () => {
  // const [isEdit, setIsedit]
  const taskList = useTaskList((state) => state.userTaskList);
  const filterTaskList = useTaskList((state) => state.updateFilterTaskList);
  const toogleIsDone = useTaskList((state) => state.toggleTaskDone);

  const editIndex = 0;

  const taskListMessage = "This is your taskList";

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
    toogleIsDone(id);
    console.log(currentStatus);

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
  return (
    <div className="pt-12">
      {isUserLogIn ? (
        <>
          <h3 className="pb-5 text-center text-2xl">{taskListMessage} </h3>
          <ul className="flex flex-col gap-1">
            {Array.isArray(taskList) &&
              taskList.map((oneTask: OneTaskType, index: number) => {
                const { id, taskName, isPriority, tag, isDone } = oneTask;
                return (
                  <li
                    key={index}
                    className={`flex justify-between w-full p-3 pt-0 rounded-lg 
                    ${editIndex === index ? "bg-orange-100" : "bg-gray-100"}`}
                  >
                    <div className="flex flex-col items-center w-full w-max-24">
                      <p className="flex w-full bg-gray-100">
                        <span className="text-[10px]">{tag}</span>
                      </p>
                      <div
                        className={`flex gap-2 items-center justify-between w-full ${
                          isDone ? "bg-black" : "bg-gray-100 "
                        } `}
                      >
                        <div className="flex gap-2">
                          <input
                            name="isDone"
                            type="checkbox"
                            checked={isDone}
                            onChange={() => handleToggleTaskDone(id, isDone)}
                          />
                          <p>{taskName}</p>
                          {isPriority && <FaFire className="text-red-500" />}
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => deleteTask(id)}>
                            <FaRegTrashAlt className="text-red-500 text-xl " />
                          </button>
                          <button>
                            <FaPenAlt className="text-orange-500 text-xl" />
                          </button>
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
