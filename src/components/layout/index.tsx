import { ReactNode } from "react";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return <Sidebar>{children}</Sidebar>;
};

export default Layout;
