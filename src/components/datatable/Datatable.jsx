import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { userRows } from "../../datatablesource";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { FiEdit2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import styles from "./datatable.module.scss";
import { Toolbar } from "primereact/toolbar";
import Modal from "../Modal/Modal";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const Datatable = () => {
  const [roles] = useState(["Admin", "User"]);
  const toast = useRef(null);

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState(userRows);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "",
    createdOn: "",
  });

  const roleRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={roles}
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  useEffect(() => {
    const fetchUsers = () => {
      const unsubscribe = onSnapshot(
        collection(db, "customers"),
        (snapshot) => {
          snapshot.forEach((element) => {
            console.log(element);
            // console.log(element._document.data.value.mapValue.fields);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    };
    fetchUsers();
  }, []);

  const roleBodyTemplate = (rowData) => {
    return <Tag value={rowData.role} />;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className={styles.actionBody}>
        <Button rounded outlined className="mr-2">
          <FiEdit2 />
        </Button>
        <Button rounded outlined severity="danger">
          <FaTrash />
        </Button>
      </div>
    );
  };

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const createdOn = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
    setUserData({ ...userData, [id]: value, createdOn: createdOn });
  };

  const submitHandler = async () => {
    if (userData.email && userData.role && userData.username) {
      setLoading(true);
      const docRef = doc(db, "customers", userData.email);
      const docSnap = await getDoc(docRef);
      if (!docSnap.data()) {
        await setDoc(doc(db, "customers", userData.email), userData);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "User Added Successfully",
        });
        setLoading(false);
        setOpenUserModal(false);
        setUserData({
          username: "",
          email: "",
          role: "",
        });
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Warning",
          detail: "User Already Exists",
        });
        setLoading(false);
      }
    }
  };

  const leftToolbarTemplate = () => {
    return (
      <Link to={"/create_template"}>
        <Button label="Add New User" onClick={() => setOpenUserModal(true)} />
      </Link>
    );
  };

  return (
    <div className={styles.container}>
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
      <DataTable
        value={users}
        selection={selectedUsers}
        onSelectionChange={(e) => setSelectedUsers(e.value)}
        filterDisplay="row"
        dataKey="id"
        paginator
        rows={10}
        tableStyle={{ minWidth: "75rem" }}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column
          field="username"
          header="Name"
          sortable
          filter
          filterPlaceholder="Search"
        />
        <Column
          field="email"
          sortable
          header="Email"
          filterField="email"
          filter
          filterPlaceholder="Search"
        />
        <Column
          field="role"
          header="Role"
          filter
          body={roleBodyTemplate}
          filterElement={roleRowFilterTemplate}
        />
        <Column
          field="createdOn"
          header="Created On"
          filter
          filterPlaceholder="Search"
        />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>
      <Modal
        header={"Add New user"}
        visible={openUserModal}
        setVisible={setOpenUserModal}
      >
        <div className={styles.modalContent}>
          <div className={styles.inputContainer}>
            <div className={styles.inputField}>
              <span className="p-float-label">
                <InputText
                  id="username"
                  value={userData.username}
                  onChange={inputHandler}
                />
                <label htmlFor="username">Username</label>
              </span>
            </div>
            <div className={styles.inputField}>
              <span className="p-float-label">
                <InputText
                  id="email"
                  value={userData.email}
                  onChange={inputHandler}
                />
                <label htmlFor="email">Email</label>
              </span>
            </div>
            <div className={styles.inputField}>
              <Dropdown
                value={userData.role}
                options={roles}
                id="role"
                onChange={inputHandler}
                placeholder="Select One"
                className="p-column-filter"
                showClear
                style={{ minWidth: "12rem" }}
              />
            </div>
          </div>
          <div className={styles.newUserCta}>
            <Button
              loading={loading}
              label={loading ? "Adding..." : "Add"}
              onClick={submitHandler}
            />
          </div>
        </div>
      </Modal>
      <Toast style={{ zIndex: 999 }} ref={toast} />
    </div>
  );
};

export default Datatable;
