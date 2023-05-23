import React, { useEffect, useState } from "react";
import "./table.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { adminUrl } from "../../api/api";

function ReportedPostTable() {
  const [userData, setUserData] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    axios.get(`${adminUrl}getPosts`).then((response) => {
      setUserData(response.data);
    });
  }, [reload]);
  const blockUser = (userId) => {
    axios.get(`${adminUrl}blockUser/${userId}`).then((response) => {
      reload ? setReload(false) : setReload(true);
    });
  };
  const unBlockUser = (userId) => {
    axios.get(`${adminUrl}unBlockUser/${userId}`).then((response) => {
      reload ? setReload(false) : setReload(true);
    });
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 300 },
    { field: "firstName", headerName: "FULL NAME", width: 200 },
    { field: "lastName", headerName: "LAST NAME", width: 200 },
    { field: "email", headerName: "EMAIL", width: 300 },
    ,
    {
      field: "phone",
      headerName: "PHONE",
      sortable: true,
      width: 200,
    },
    { field: "type", headerName: "TYPE OF LOGIN", width: 150 },

    {
      field: "block",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return params.row.block ? (
          <div className="tableAction">
            <button
              onClick={() => {
                unBlockUser(params.row._id);
              }}
              className="btn-success btn"
            >
              UNBLOCK
            </button>
          </div>
        ) : (
          <div className="tableAction">
            <button
              className="btn-danger btn"
              onClick={() => {
                blockUser(params.row._id);
              }}
            >
              BLOCK
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="dataTable">
      <DataGrid
        getRowId={(row) => row._id}
        rows={userData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
    </div>
  );
}

export default ReportedPostTable;
