import React, { useEffect, useRef, useState } from "react";
import Template from "../Template/Template";

import { Button } from "primereact/button";

import styles from "./ExportScreen.module.css";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getDoc } from "firebase/firestore";

import { VscPreview } from "react-icons/vsc";
import { LuEdit2 } from "react-icons/lu";
import { AiTwotoneSave } from "react-icons/ai";
import Modal from "../Modal/Modal";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { v4 as uuidv4 } from "uuid";

const ExportScreen = () => {
  const user = localStorage.getItem("user");
  const [roles] = useState(["Admin", "User"]);

  const [loading, setLoading] = useState(false);

  const toast = useRef(null);

  const [isTemplateEditable, setIsTemplateEditable] = useState(true);
  const [preview, setPreview] = useState(false);

  const [openUserModal, setOpenUserModal] = useState(false);

  const [companyDetails, setCompanyDetails] = useState([]);
  const [quotationDetails, setQuotationDetails] = useState([]);
  const [linerDetails, setLinerDetails] = useState([]);

  const [selectedHeaderPoints, setSelectedHeaderPoints] = useState(null);
  const [selectedFooterPoints, setSelectedFooterPoints] = useState([]);

  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
    createdOn: "",
    templateConfiguration: "",
    templateId: "",
  });

  const [headerStyles, setHeaderStyles] = useState({
    backgroundColor: "#fff",
    padding: "10",
    borderRadius: "4",
    borderType: "border",
    borderWidth: "1",
    borderStyle: "solid",
    borderColor: "000",
    justifyContent: "flexStart",
    gap: "20",
    labelFont: {
      labelfontStyle: "normal",
      labelfontSize: 14,
      labelfontWeight: 500,
      labelfontcolor: "#000",
    },
    dataFont: {
      fontStyle: "normal",
      fontSize: 14,
      fontWeight: 500,
      fontcolor: "#000",
    },
  });

  const [companyStylesProps, setCompanyStylesProps] = useState({
    backgroundColor: "#fff",
    padding: "10",
    borderRadius: "4",
    borderType: "border",
    borderWidth: "1",
    borderStyle: "solid",
    borderColor: "000",
    justifyContent: "flexStart",
    gap: "20",
    labelFont: {
      labelfontStyle: "normal",
      labelfontSize: 14,
      labelfontWeight: 600,
      labelfontcolor: "#000",
    },
    dataFont: {
      fontStyle: "normal",
      fontSize: 14,
      fontWeight: 500,
      fontcolor: "#000",
    },
  });

  const [quotationStylesProps, setQuotationStylesProps] = useState({
    backgroundColor: "#fff",
    padding: "10",
    borderRadius: "4",
    borderType: "border",
    borderWidth: "1",
    borderStyle: "solid",
    borderColor: "000",
    justifyContent: "flexStart",
    gap: "20",
    labelFont: {
      labelfontStyle: "normal",
      labelfontSize: 14,
      labelfontWeight: 600,
      labelfontcolor: "#000",
    },
    dataFont: {
      fontStyle: "normal",
      fontSize: 14,
      fontWeight: 500,
      fontcolor: "#000",
    },
  });

  const [linerStylesProps, setLinerStylesProps] = useState({
    backgroundColor: "#fff",
    padding: "10",
    borderRadius: "4",
    borderType: "border",
    borderWidth: "1",
    borderStyle: "solid",
    borderColor: "000",
    justifyContent: "flexStart",
    gap: "20",
    labelFont: {
      labelfontStyle: "normal",
      labelfontSize: 14,
      labelfontWeight: 600,
      labelfontcolor: "#000",
    },
    dataFont: {
      fontStyle: "normal",
      fontSize: 14,
      fontWeight: 500,
      fontcolor: "#000",
    },
  });

  const [footerstyleProps, setFooterStyleProps] = useState({
    backgroundColor: "#fff",
    padding: "10",
    borderRadius: "4",
    borderType: "border",
    borderWidth: "1",
    borderStyle: "solid",
    borderColor: "000",
    justifyContent: "flexStart",
    gap: "5",
    labelFont: {
      labelfontStyle: "normal",
      labelfontSize: 16,
      labelfontWeight: 600,
      labelfontcolor: "#000",
    },
    dataFont: {
      fontStyle: "normal",
      fontSize: 14,
      fontWeight: 500,
      fontcolor: "#000",
    },
  });

  const [visibleRows, setVisibleRows] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);

  const [contents, setContents] = useState([
    {
      type: "Header",
      value: null,
    },
  ]);

  const [quotationContents, setQuotationContents] = useState([
    {
      type: "Header",
      value: null,
    },
  ]);

  const [linerContents, setLinerContents] = useState([
    {
      type: "Header",
      value: null,
    },
  ]);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const createdOn = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
    setUserData({ ...userData, [id]: value, createdOn: createdOn });
  };

  const saveTemplateHandler = () => {
    const templateConfigs = {};
    const id = String(new Date().getTime());

    templateConfigs.headerPoints = selectedHeaderPoints;
    templateConfigs.headerStyles = headerStyles;
    templateConfigs.footerPoints = selectedFooterPoints;
    templateConfigs.footerStyles = footerstyleProps;
    templateConfigs.companyDetails = companyDetails;
    templateConfigs.quotationDetails = quotationDetails;
    templateConfigs.linerDetails = linerDetails;
    templateConfigs.companyStyles = companyStylesProps;
    templateConfigs.quotationStyles = quotationStylesProps;
    templateConfigs.linerStyles = linerStylesProps;
    templateConfigs.contents = contents;
    templateConfigs.quotationContents = quotationContents;
    templateConfigs.linerContents = linerContents;
    templateConfigs.visibleRows = visibleRows;
    templateConfigs.visibleColumns = visibleColumns;
    const uuid = uuidv4();

    setUserData({
      ...userData,
      configuration: templateConfigs,
      id: id,
      templateId: uuid,
    });

    setOpenUserModal(true);
  };

  const submitHandler = async () => {
    const id = String(new Date().getTime());

    if (userData.email && userData.role && userData.username) {
      setLoading(true);
      const docRef = doc(db, "customer_pdf_templates", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.data()) {
        await setDoc(
          doc(db, "customer_pdf_templates", userData.email),
          userData
        );
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

  return (
    <div>
      <div className="PDFtemplate">
        <Template
          isTemplateEditable={isTemplateEditable}
          setIsTemplateEditable={setIsTemplateEditable}
          preview={preview}
          setPreview={setPreview}
          companyDetails={companyDetails}
          setCompanyDetails={setCompanyDetails}
          quotationDetails={quotationDetails}
          setLinerDetails={setLinerDetails}
          linerDetails={linerDetails}
          setQuotationDetails={setQuotationDetails}
          selectedHeaderPoints={selectedHeaderPoints}
          setSelectedHeaderPoints={setSelectedHeaderPoints}
          selectedFooterPoints={selectedFooterPoints}
          setSelectedFooterPoints={setSelectedFooterPoints}
          companyStylesProps={companyStylesProps}
          setCompanyStylesProps={setCompanyStylesProps}
          linerStylesProps={linerStylesProps}
          setLinerStylesProps={setLinerStylesProps}
          quotationStylesProps={quotationStylesProps}
          setQuotationStylesProps={setQuotationStylesProps}
          visibleRows={visibleRows}
          visibleColumns={visibleColumns}
          setVisibleRows={setVisibleRows}
          setVisibleColumns={setVisibleColumns}
          contents={contents}
          linerContents={linerContents}
          quotationContents={quotationContents}
          setContents={setContents}
          setLinerContents={setLinerContents}
          setQuotationContents={setQuotationContents}
          footerstyleProps={footerstyleProps}
          setFooterStyleProps={setFooterStyleProps}
          headerStyles={headerStyles}
          setHeaderStyles={setHeaderStyles}
        />
      </div>
      <div className={styles.previewBtn}>
        <Button
          label="Edit"
          onClick={() => {
            setIsTemplateEditable(true);
            setPreview(true);
          }}
        >
          <LuEdit2 />
        </Button>
        <Button
          label="Set Preview"
          onClick={() => {
            setIsTemplateEditable(false);
            setPreview(true);
          }}
        >
          <VscPreview />
        </Button>
        <Button label="Save Template" onClick={saveTemplateHandler}>
          <AiTwotoneSave />
        </Button>
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
    </div>
  );
};

export default ExportScreen;
