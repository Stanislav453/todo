import { useEffect } from "react";
import { USERS_API_URL } from "../url";
import { isUserLogIn } from "../../stores/localStorage/isUserLogIn";
import { useTaskList } from "../../stores/useTaskList";

export const useFetchTask = () => {
  const setTaskList = useTaskList((state) => state.setTaskList);

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
          const tasks = await taskResponse.json();
          setTaskList(tasks);
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
