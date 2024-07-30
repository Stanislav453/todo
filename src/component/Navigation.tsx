import { Link } from "react-router-dom";
import { CustomLink } from "./CustomLinks";
import { CustomButton } from "./CustomButton";
import { isUserLogIn } from "../stores/localStorage/isUserLogIn";

export const Navigation = () => {


  const logOut = () => {
    localStorage.removeItem("activeUser");
    location.reload();
  };

  return (
    <nav className="flex justify-between  items-center w-full h-auto p-2 sm:p-4 shadow-basicShadow">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>

      {isUserLogIn ? (
        <div className="flex gap-2 items-center">
          <p className="text-sm ">
            Hellov <span className="font-semibold">{isUserLogIn.name}</span>
          </p>

          <CustomButton
            buttonName="LogOut"
            customStyle="bg-logOut"
            action={() => logOut()}
          />
        </div>
      ) : (
        <div className="flex gap-4">
          <CustomLink
            linkName="LogIn"
            to="/logIn"
            customStyle="rounded-full bg-logIn"
          />
          <CustomLink
            linkName="Registration"
            to="/registration"
            customStyle="rounded-full bg-registration"
          />
        </div>
      )}
    </nav>
  );
};
