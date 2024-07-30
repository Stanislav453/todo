import { RouterProvider } from "react-router-dom";
import { router } from "./route/router";

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
