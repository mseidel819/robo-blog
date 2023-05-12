import MainNavigation from "./main-navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
};

export default Layout;
