import React, { useState, createContext } from "react";
import SideBar from "../components/sidebar/sidebar";
import "./homepage.css";
import UserTable from "../components/table/usertable";
import ReportedPostTable from "../components/table/reportedPostTable";
export const sideBarContext = createContext("user");
function UserPage() {
  const [path, setpath] = useState("users");
  function changePath(x) {
    setpath(x);
  }
  return (
    <sideBarContext.Provider value={{ path, changePath }}>
      <div className="admin-home">
        <SideBar />
        <div className="homeContainer">
          {/* <NavbarAdmin /> */}
          {path === "users" && <UserTable />}
          {path === "posts" && <ReportedPostTable />}
        </div>
      </div>
    </sideBarContext.Provider>
  );
}

export default UserPage;
