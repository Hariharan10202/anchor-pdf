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
import { Link } from "react-router-dom";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

const Datatable = () => {
  const [roles] = useState(["Admin", "User"]);
  const toast = useRef(null);

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);
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
      setLoading(true);
      const unsub = onSnapshot(
        collection(db, "customer_pdf_templates"),
        (snapShot) => {
          console.log(snapShot.docs);
          const lists = [];
          snapShot.docs.forEach((doc) => {
            lists.push(doc.data());
          });
          setUsers(lists);
          setLoading(false);
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

  const templateIdBody = (rowData) => {
    return <span className={styles.textTruncate}>{rowData.templateId}</span>;
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
        loading={loading}
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
          header="Template Id"
          body={templateIdBody}
          filterField="templateId"
          filter
          filterPlaceholder="Search"
        />
        <Column
          field="createdOn"
          header="Created On"
          filter
          filterPlaceholder="Search"
        />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default Datatable;
