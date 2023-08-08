import React, { useState } from "react";
import styles from "./Template.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Screen from "../Screen/Screen";

const Template = ({
  isTemplateEditable,
  setIsTemplateEditable,
  preview,
  setPreview,
  companyDetails,
  setCompanyDetails,
  quotationDetails,
  setQuotationDetails,
  linerDetails,
  setLinerDetails,
  selectedHeaderPoints,
  setSelectedHeaderPoints,
  selectedFooterPoints,
  setSelectedFooterPoints,
  companyStylesProps,
  setCompanyStylesProps,
  quotationStylesProps,
  setQuotationStylesProps,
  linerStylesProps,
  setLinerStylesProps,
  visibleRows,
  setVisibleRows,
  visibleColumns,
  setVisibleColumns,
  contents,
  setContents,
  quotationContents,
  setQuotationContents,
  linerContents,
  setLinerContents,
  footerstyleProps,
  setFooterStyleProps,
  headerStyles,
  setHeaderStyles,
}) => {
  const [existingItems, setExistingItems] = useState([]);

  const [removedCompanyDetails, setRemovedCompanyDetails] = useState([]);
  const [removedQuotationDetails, setRemovedQuotationDetails] = useState([]);
  const [removedLinerDetails, setRemovedLinerDetails] = useState([]);

  return (
    <div className={styles.container}>
      {!preview && (
        <Sidebar
          isTemplateEditable={isTemplateEditable}
          setIsTemplateEditable={setIsTemplateEditable}
          existingItems={existingItems}
          setExistingItems={setExistingItems}
          removedCompanyDetails={removedCompanyDetails}
          setRemovedCompanyDetails={setRemovedCompanyDetails}
          removedQuotationDetails={removedQuotationDetails}
          setRemovedQuotationDetails={setRemovedQuotationDetails}
          removedLinerDetails={removedLinerDetails}
          setRemovedLinerDetails={setRemovedLinerDetails}
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
        />
      )}
      <Screen
        isTemplateEditable={isTemplateEditable}
        setIsTemplateEditable={setIsTemplateEditable}
        selectedHeaderPoints={selectedHeaderPoints}
        setSelectedHeaderPoints={setSelectedHeaderPoints}
        removedCompanyDetails={removedCompanyDetails}
        removedLinerDetails={removedLinerDetails}
        removedQuotationDetails={removedQuotationDetails}
        setRemovedCompanyDetails={setRemovedCompanyDetails}
        setRemovedQuotationDetails={setRemovedQuotationDetails}
        setRemovedLinerDetails={setRemovedLinerDetails}
        companyDetails={companyDetails}
        quotationDetails={quotationDetails}
        linerDetails={linerDetails}
        setQuotationDetails={setQuotationDetails}
        setCompanyDetails={setCompanyDetails}
        setLinerDetails={setLinerDetails}
        selectedFooterPoints={selectedFooterPoints}
        setSelectedFooterPoints={setSelectedFooterPoints}
        setPreview={setPreview}
        preview={preview}
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
  );
};

export default Template;
