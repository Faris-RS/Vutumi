import React, { useState, createContext } from "react";
import SideBar from "../components/sidebar/sidebar";
import "./homepage.css";
import ReportedPostTable from "../components/table/reportedPostTable";
export const sideBarContext = createContext("user");
function PostPage() {
  const [path, setpath] = useState("posts");
  function changePath(x) {
    setpath(x);
  }
  return (
    <sideBarContext.Provider value={{ path, changePath }}>
      <div className="admin-home">
        <SideBar />
        <div className="homeContainer">
          {path === "posts" && <ReportedPostTable />}
        </div>
      </div>
    </sideBarContext.Provider>
  );
}

export default PostPage;
