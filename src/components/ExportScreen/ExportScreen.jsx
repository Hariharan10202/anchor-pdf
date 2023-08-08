import React, { useEffect, useState } from "react";
import Template from "../Template/Template";

import { Button } from "primereact/button";

import styles from "./ExportScreen.module.css";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDoc } from "firebase/firestore";

import { VscPreview } from "react-icons/vsc";
import { LuEdit2 } from "react-icons/lu";
import { AiTwotoneSave } from "react-icons/ai";
import { logDOM } from "@testing-library/react";
// import { convertComponentToJson } from "convert-react-to-json";

const ExportScreen = () => {
  const user = localStorage.getItem("user");

  const [isTemplateEditable, setIsTemplateEditable] = useState(true);
  const [preview, setPreview] = useState(false);

  const [companyDetails, setCompanyDetails] = useState([]);
  const [quotationDetails, setQuotationDetails] = useState([]);
  const [linerDetails, setLinerDetails] = useState([]);

  const [selectedHeaderPoints, setSelectedHeaderPoints] = useState(null);
  const [selectedFooterPoints, setSelectedFooterPoints] = useState([]);

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

  const saveTemplateHandler = async () => {
    const id = String(new Date().getMilliseconds());

    const templateConfigs = {};

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

    await setDoc(doc(db, "pdftemplates", user.email + id), templateConfigs);

    setIsTemplateEditable(false);
    setPreview(true);
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
      </div>
    </div>
  );
};

export default ExportScreen;
