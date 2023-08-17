import React, { useEffect, useState } from "react";
import styles from "./Template.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Screen from "../Screen/Screen";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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

  const userConfigurations = useSelector((state) => state.user.data);
  const protocol = useSelector((state) => state.user.protocol);

  const [config, setConfig] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    if (params.templateId) {
      setLoading(true);
      const userConfig = userConfigurations.find(
        (item) => item.username === params.templateId
      );
      setConfig(userConfig.configuration);
      setLoading(false);
    } else {
      setConfig([]);
    }
  }, [userConfigurations]);

  console.log(config);

  return (
    <div className={styles.container}>
      {!preview && !protocol && (
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
      {!loading && (
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
          companyDetails={
            config?.companyDetails?.length
              ? config.companyDetails
              : companyDetails
          }
          quotationDetails={
            config?.quotationDetails?.length
              ? config.quotationDetails
              : quotationDetails
          }
          linerDetails={
            config?.linerDetails?.length ? config.linerDetails : linerDetails
          }
          setQuotationDetails={setQuotationDetails}
          setCompanyDetails={setCompanyDetails}
          setLinerDetails={setLinerDetails}
          selectedFooterPoints={selectedFooterPoints}
          setSelectedFooterPoints={setSelectedFooterPoints}
          setPreview={setPreview}
          preview={preview}
          companyStylesProps={
            config?.companyStyles ? config.companyStyles : companyStylesProps
          }
          setCompanyStylesProps={setCompanyStylesProps}
          linerStylesProps={
            config?.linerStyles ? config.linerStyles : linerStylesProps
          }
          setLinerStylesProps={setLinerStylesProps}
          quotationStylesProps={quotationStylesProps}
          setQuotationStylesProps={setQuotationStylesProps}
          visibleRows={
            config?.visibleRows?.length ? config.visibleRows : visibleRows
          }
          visibleColumns={
            config?.visibleColumns?.length
              ? config.visibleColumns
              : visibleColumns
          }
          setVisibleRows={setVisibleRows}
          setVisibleColumns={setVisibleColumns}
          contents={config?.contents?.length ? config.contents : contents}
          linerContents={
            config?.linerContents?.length ? config.linerContents : linerContents
          }
          quotationContents={
            config?.quotationContents?.length
              ? config.quotationContents
              : quotationContents
          }
          setContents={setContents}
          setLinerContents={setLinerContents}
          setQuotationContents={setQuotationContents}
          footerstyleProps={
            config?.footerstyleProps?.length
              ? config.footerstyleProps
              : footerstyleProps
          }
          setFooterStyleProps={setFooterStyleProps}
          headerStyles={
            config?.headerStyles ? config.headerStyles : headerStyles
          }
          setHeaderStyles={setHeaderStyles}
        />
      )}
    </div>
  );
};

export default Template;
