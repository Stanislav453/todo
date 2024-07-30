import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import { Outlet } from "react-router";

export const Layout = () => {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
