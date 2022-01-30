import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function UserList() {
  
  const users = useSelector(state=>state.allusers.allusersData);
  const allUsers = users.map((user) => ({...user,id: user._id}))
  const dispatch = useDispatch();
  useEffect(() =>{
    getUsers(dispatch)
  },[dispatch])

  // console.log(userRows);

  const handleDelete = (id) => {
    deleteUser(id, dispatch)
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      <DataGrid
        rows={allUsers}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
