import { useEffect } from "react";
import { USERS_API_URL } from "../url";
import { isUserLogIn } from "../../stores/localStorage/isUserLogIn";
import { useTaskList } from "../../stores/useTaskList";
import { OneTaskType } from "../../type";

export const useFetchTask = () => {
  const setTaskList = useTaskList((state) => state.setTaskList);
  const setTaskListName = useTaskList((state) => state.setTaskListName);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskResponse = await fetch(
          `${USERS_API_URL}tasks?userId=${isUserLogIn.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (taskResponse.ok) {
          const tasks: OneTaskType[] = await taskResponse.json();
          const taskListName = [
            ...new Set(tasks.map((oneTask) => oneTask.listName)),
          ];
          setTaskList(tasks);
          setTaskListName(taskListName);
        } else {
          console.log("Nepodařilo se načíst úkoly");
        }
      } catch (error) {
        console.error("Chyba pri načítaní úloh:", error);
      }
    };

    fetchTasks();
  }, [setTaskList]);

  return setTaskList;
};
