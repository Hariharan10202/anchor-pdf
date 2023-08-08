import styles from "./components/datatable/datatable.module.scss";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return <div className={styles.cellWithImg}>{params.row.username}</div>;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "role",
    headerName: "Role",
    width: 100,
  },
  {
    field: "status",
    headerName: "Created on",
    width: 160,
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    status: "active",
    email: "1snow@gmail.com",
    role: "Admin",
    createdOn: "2023-08-02",
  },
  {
    id: 2,
    username: "Jamie Lannister",
    email: "2snow@gmail.com",
    status: "passive",
    role: "User",
    createdOn: "2023-08-02",
  },
  {
    id: 3,
    username: "Lannister",
    email: "3snow@gmail.com",
    status: "pending",
    role: "User",
    createdOn: "2023-08-02",
  },
  {
    id: 4,
    username: "Stark",
    email: "4snow@gmail.com",
    status: "active",
    role: "Admin",
    createdOn: "2023-08-02",
  },
  {
    id: 5,
    username: "Targaryen",
    email: "5snow@gmail.com",
    status: "passive",
    role: "User",
    createdOn: "2023-08-02",
  },
  {
    id: 6,
    username: "Melisandre",
    email: "6snow@gmail.com",
    status: "active",
    role: "User",
    createdOn: "2023-08-02",
  },
  {
    id: 7,
    username: "Clifford",
    email: "7snow@gmail.com",
    status: "passive",
    role: "Admin",
    createdOn: "2023-08-02",
  },
  {
    id: 8,
    username: "Frances",
    email: "8snow@gmail.com",
    status: "active",
    role: "Admin",
    createdOn: "2023-08-02",
  },
  {
    id: 9,
    username: "Roxie",
    email: "snow@gmail.com",
    status: "pending",
    role: "User",
    createdOn: "2023-08-02",
  },
  {
    id: 10,
    username: "Roxie",
    email: "snow@gmail.com",
    status: "active",
    role: "Admin",
    createdOn: "2023-08-02",
  },
];
