import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { FiEdit2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import styles from "./datatable.module.scss";
import { Toolbar } from "primereact/toolbar";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { SiRender } from "react-icons/si";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";

import {
  updateSucess,
  updateUser,
  updateUserPending,
} from "../../Redux/userSlice";

const Datatable = () => {
  const [roles] = useState(["Admin", "User"]);
  const toast = useRef(null);

  const dispatch = useDispatch();

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

  const userInfo = useSelector((state) => state.user.data);

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
          const lists = [];
          snapShot.docs.forEach((doc) => {
            lists.push(doc.data());
          });
          setUsers(lists);
          dispatch(updateUserPending());
          dispatch(updateUser(lists));
          dispatch(updateSucess());
          setLoading(false);
        }
      );
    };
    fetchUsers();
  }, []);

  const roleBodyTemplate = (rowData) => {
    return <Tag value={rowData.role} />;
  };

  const deleteHandler = async (obj) => {
    await deleteDoc(doc(db, "customer_pdf_templates", obj.username));
  };

  const [editableText, setEditableText] = useState();

  const editHandler = async (obj) => {
    setEditableText(obj);
    setOpenUserModal(true);
  };

  const renderHandler = () => {
    console.log("in");
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className={styles.actionBody}>
        <Link to={`/render-template/${rowData.username}`}>
          <Button onClick={renderHandler} rounded outlined severity="secondary">
            <SiRender />
          </Button>
        </Link>

        <Button
          onClick={() => editHandler(rowData)}
          rounded
          outlined
          className="mr-2"
        >
          <FiEdit2 />
        </Button>
        <Button
          onClick={() => deleteHandler(rowData)}
          rounded
          outlined
          severity="danger"
        >
          <FaTrash />
        </Button>
      </div>
    );
  };

  const submitHandler = async () => {
    if (
      (userData.email || editableText.email) &&
      (userData.role || editableText.role) &&
      (userData.username || editableText.username)
    ) {
      setLoading(true);
      await setDoc(
        doc(db, "customer_pdf_templates", editableText.username),
        editableText
      );
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "User Modified Successfully",
      });
      setLoading(false);
      setOpenUserModal(false);
      setUserData({
        username: "",
        email: "",
        role: "",
      });
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

  const inputHandler = (e) => {
    const { id, value } = e.target;
    setEditableText({ ...editableText, [id]: value });
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
                  onChange={inputHandler}
                  value={editableText?.username}
                />
                <label htmlFor="username">Username</label>
              </span>
            </div>
            <div className={styles.inputField}>
              <span className="p-float-label">
                <InputText
                  id="email"
                  onChange={inputHandler}
                  value={editableText?.email}
                  disabled
                />
                <label htmlFor="email">Email</label>
              </span>
            </div>
            <div className={styles.inputField}>
              <Dropdown
                options={roles}
                id="role"
                defaultValue={editableText?.role}
                value={editableText?.role}
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
