import React, { useContext } from "react";
import "./sideBar.css";
import PersonIcon from "@mui/icons-material/Person";
import { sideBarContext } from "../../pages/userPage";

function SideBar() {
  const { path, changePath } = useContext(sideBarContext);
  return (
    <div className="sidebar">
      <div className="top">
        <span className="admin-logo">admin panel</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="sidebar-title">Lists</p>
          <li onClick={() => changePath("users")}>
            <PersonIcon className="icon" />
            <span>Users</span>
          </li>
          {/* <li onClick={() => changePath("posts")}>
            <PersonIcon className="icon" />
            <span>Reported Posts</span>
          </li> */}
          {/* <li><DashboardIcon className='icon'/><span>Dashboard</span></li> */}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
