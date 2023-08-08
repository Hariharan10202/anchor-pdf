import React, { useEffect, useRef, useState } from "react";
import {
  MetaLeveContainer,
  MetaLevelWrapper,
  ScreenContainer,
} from "./Screen.styles";
import Meta from "../Group/Meta/Meta";
import { OverlayPanel } from "primereact/overlaypanel";
import StylesModal from "../StylesModal/StylesModal";
import TemplateHeader from "../Header/TemplateHeader";
import styles from "./screen.module.css";
import { InputText } from "primereact/inputtext";
import Table from "../Table/Table";
import { motion, AnimatePresence } from "framer-motion";

import { FiSettings } from "react-icons/fi";
import { BsCheckLg } from "react-icons/bs";

import { InputTextarea } from "primereact/inputtextarea";

import { AiFillCloseCircle } from "react-icons/ai";
import FooterData from "../FooterData/FooterData";

import { Button } from "primereact/button";
import { FaPaintBrush } from "react-icons/fa";

const Screen = ({
  removedQuotationDetails,
  removedLinerDetails,
  removedCompanyDetails,
  setRemovedCompanyDetails,
  setRemovedQuotationDetails,
  setRemovedLinerDetails,
  companyDetails,
  quotationDetails,
  linerDetails,
  setCompanyDetails,
  setLinerDetails,
  setQuotationDetails,
  selectedHeaderPoints,
  setSelectedHeaderPoints,
  setIsTemplateEditable,
  isTemplateEditable,
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
  const companyDetailsRef = useRef(null);
  const quotationDetailsRef = useRef(null);
  const linerDetailsRef = useRef(null);

  const [headerVisibleProps, setHeaderVisibleProps] = useState(false);

  const [companyDetailsPropsVisible, setCompanyDetailsPropsVisible] =
    useState(false);
  const [quotationDetailsPropsVisible, setQuotationDetailsPropsVisible] =
    useState(false);
  const [linerDetailsPropsVisible, setLinerDetailsPropsVisible] =
    useState(false);

  useEffect(() => {
    if (companyDetailsRef.current) {
      companyDetailsRef.current.style.backgroundColor = `#${companyStylesProps.backgroundColor}`;
      companyDetailsRef.current.style.padding = `${companyStylesProps.padding}px`;
      companyDetailsRef.current.style.borderRadius = `${companyStylesProps.borderRadius}px`;
      companyDetailsRef.current.style.border = `${companyStylesProps.borderWidth} ${companyStylesProps.borderStyle} #${companyStylesProps.borderColor}`;
      companyDetailsRef.current.style.justifyContent =
        companyStylesProps.justifyContent;
      companyDetailsRef.current.style.gap = `${companyStylesProps.gap}px`;
      for (
        let index = 0;
        index < companyDetailsRef.current.children.length;
        index++
      ) {
        companyDetailsRef.current.children[
          index
        ].children[0].style.color = `#${companyStylesProps.labelFont.labelfontcolor}`;
        companyDetailsRef.current.children[
          index
        ].children[0].style.fontSize = `${companyStylesProps.labelFont.labelfontSize}px`;
        companyDetailsRef.current.children[index].children[0].style.fontStyle =
          companyStylesProps.labelFont.labelfontStyle;
        companyDetailsRef.current.children[index].children[0].style.fontWeight =
          companyStylesProps.labelFont.labelfontWeight;

        companyDetailsRef.current.children[
          index
        ].children[1].style.color = `#${companyStylesProps.dataFont.fontcolor}`;
        companyDetailsRef.current.children[
          index
        ].children[1].style.fontSize = `${companyStylesProps.dataFont.fontSize}px`;
        companyDetailsRef.current.children[index].children[1].style.fontStyle =
          companyStylesProps.dataFont.fontStyle;
        companyDetailsRef.current.children[index].children[1].style.fontWeight =
          companyStylesProps.dataFont.fontWeight;
      }
    }
  }, [companyStylesProps]);

  useEffect(() => {
    if (quotationDetailsRef.current) {
      quotationDetailsRef.current.style.backgroundColor = `#${quotationStylesProps.backgroundColor}`;
      quotationDetailsRef.current.style.padding = `${quotationStylesProps.padding}px`;
      quotationDetailsRef.current.style.borderRadius = `${quotationStylesProps.borderRadius}px`;
      quotationDetailsRef.current.style.border = `${quotationStylesProps.borderWidth} ${quotationStylesProps.borderStyle} #${quotationStylesProps.borderColor}`;
      quotationDetailsRef.current.style.justifyContent =
        quotationStylesProps.justifyContent;
      quotationDetailsRef.current.style.gap = `${quotationStylesProps.gap}px`;
      for (
        let index = 0;
        index < quotationDetailsRef.current.children.length;
        index++
      ) {
        quotationDetailsRef.current.children[
          index
        ].children[0].style.color = `#${quotationStylesProps.labelFont.labelfontcolor}`;
        quotationDetailsRef.current.children[
          index
        ].children[0].style.fontSize = `${quotationStylesProps.labelFont.labelfontSize}px`;
        quotationDetailsRef.current.children[
          index
        ].children[0].style.fontStyle =
          quotationStylesProps.labelFont.labelfontStyle;
        quotationDetailsRef.current.children[
          index
        ].children[0].style.fontWeight =
          quotationStylesProps.labelFont.labelfontWeight;

        quotationDetailsRef.current.children[
          index
        ].children[1].style.color = `#${quotationStylesProps.dataFont.fontcolor}`;
        quotationDetailsRef.current.children[
          index
        ].children[1].style.fontSize = `${quotationStylesProps.dataFont.fontSize}px`;
        quotationDetailsRef.current.children[
          index
        ].children[1].style.fontStyle = quotationStylesProps.dataFont.fontStyle;
        quotationDetailsRef.current.children[
          index
        ].children[1].style.fontWeight =
          quotationStylesProps.dataFont.fontWeight;
      }
    }
  }, [quotationStylesProps]);

  useEffect(() => {
    if (linerDetailsRef.current) {
      linerDetailsRef.current.style.backgroundColor = `#${linerStylesProps.backgroundColor}`;
      linerDetailsRef.current.style.padding = `${linerStylesProps.padding}px`;
      linerDetailsRef.current.style.borderRadius = `${linerStylesProps.borderRadius}px`;
      linerDetailsRef.current.style.border = `${linerStylesProps.borderWidth} ${linerStylesProps.borderStyle} #${linerStylesProps.borderColor}`;
      linerDetailsRef.current.style.justifyContent =
        linerStylesProps.justifyContent;

      linerDetailsRef.current.style.gap = `${linerStylesProps.gap}px`;
      for (
        let index = 0;
        index < linerDetailsRef.current.children.length;
        index++
      ) {
        linerDetailsRef.current.children[
          index
        ].children[0].style.color = `#${linerStylesProps.labelFont.labelfontcolor}`;
        linerDetailsRef.current.children[
          index
        ].children[0].style.fontSize = ` ${linerStylesProps.labelFont.labelfontSize}px`;
        linerDetailsRef.current.children[index].children[0].style.fontStyle =
          linerStylesProps.labelFont.labelfontStyle;
        linerDetailsRef.current.children[index].children[0].style.fontWeight =
          linerStylesProps.labelFont.labelfontWeight;

        linerDetailsRef.current.children[
          index
        ].children[1].style.color = `#${linerStylesProps.dataFont.fontcolor}`;
        linerDetailsRef.current.children[
          index
        ].children[1].style.fontSize = `${linerStylesProps.dataFont.fontSize}px`;
        linerDetailsRef.current.children[index].children[1].style.fontStyle =
          linerStylesProps.dataFont.fontStyle;
        linerDetailsRef.current.children[index].children[1].style.fontWeight =
          linerStylesProps.dataFont.fontWeight;
      }
    }
  }, [linerStylesProps]);

  const handleCompanyDetailsSection = (e) => {
    if (
      typeof e.target.className !== "object" &&
      e.target.className.includes("sc-fBEEOr")
    )
      setCompanyDetailsPropsVisible(true);
  };

  const handlQuotationDetailsSection = (e) => {
    if (
      typeof e.target.className !== "object" &&
      e.target.className.includes("sc-fBEEOr")
    )
      setQuotationDetailsPropsVisible(true);
  };

  const handleLinerDetailsSection = (e) => {
    if (
      typeof e.target.className !== "object" &&
      e.target.className.includes("sc-fBEEOr")
    )
      setLinerDetailsPropsVisible(true);
  };

  const [content, setContent] = useState();
  const [quotationContent, setQuotationContent] = useState();
  const [linerContent, setLinerContent] = useState();

  const [companyDetailsHover, setCompanyDetailsHover] = useState(false);
  const [quotationDetailsHover, setQuotationDetailsHover] = useState(false);
  const [linerDetailsHover, setLinerDetailsHover] = useState(false);

  // const [hasCompanyDetailsContent, setHasCompanyDetailsContent] =
  //   useState(false);

  // const [companyDetailsContent, setCompanyDetailsContent] = useState(false);
  // const [quotationDetailsContent, setQuotationDetailsContent] = useState(false);
  // const [linerDetailsContent, setLinerDetailsContent] = useState(false);

  const companyDetailsContentRef = useRef(null);

  const [companyDropdown, setCompanyDropdown] = useState(false);
  const [quotationDropdown, setQuotationDropdown] = useState(false);
  const [linerDropdown, setLinerDropdown] = useState(false);

  const [isCompanyElement, setIsCompanyElement] = useState("Header");
  const [isQuotationElement, setIsQuotationElement] = useState("Header");
  const [isLinerElement, setIsLinerElement] = useState("Header");

  const addContentHandler = () => {
    if (content) {
      if (isCompanyElement === "Header") {
        const inputElement = document.createElement("span");
        inputElement.classList = styles.headings;
        inputElement.textContent = content;
        setContents([...contents, { type: isCompanyElement, value: content }]);
      } else if (isCompanyElement === "Paragraph") {
        const inputElement = document.createElement("p");
        inputElement.classList = styles.paragraphs;
        inputElement.textContent = content;

        setContents([...contents, { type: isCompanyElement, value: content }]);
      }
      setContent("");
    }
  };

  const addQuotationHandler = () => {
    if (quotationContent) {
      if (isQuotationElement === "Header") {
        const inputElement = document.createElement("span");
        inputElement.classList = styles.headings;
        inputElement.textContent = content;
        setQuotationContents([
          ...quotationContents,
          { type: isQuotationElement, value: quotationContent },
        ]);
      } else if (isQuotationElement === "Paragraph") {
        const inputElement = document.createElement("p");
        inputElement.classList = styles.paragraphs;
        inputElement.textContent = content;

        setQuotationContents([
          ...quotationContents,
          { type: isQuotationElement, value: quotationContent },
        ]);
      }
      setQuotationContent("");
    }
  };

  const addLinerContent = () => {
    if (linerContent) {
      if (isLinerElement === "Header") {
        const inputElement = document.createElement("span");
        inputElement.classList = styles.headings;
        inputElement.textContent = content;
        setLinerContents([
          ...linerContents,
          { type: isLinerElement, value: linerContent },
        ]);
      } else if (isLinerElement === "Paragraph") {
        const inputElement = document.createElement("p");
        inputElement.classList = styles.paragraphs;
        inputElement.textContent = content;

        setLinerContents([
          ...linerContents,
          { type: isLinerElement, value: linerContent },
        ]);
      }
      setLinerContent("");
    }
  };

  const companyDetailsHoverEnter = () => {
    setCompanyDetailsHover(true);
  };

  const companyDetailsHoverLeave = () => {
    setCompanyDetailsHover(false);
  };

  const quotationDetailsHoverEnter = () => {
    setQuotationDetailsHover(true);
  };

  const quotationDetailsHoverLeave = () => {
    setQuotationDetailsHover(false);
  };

  const linerDetailsHoverEnter = () => {
    setLinerDetailsHover(true);
  };

  const linerDetailsHoverLeave = () => {
    setLinerDetailsHover(false);
  };

  const addCompanyElementHandler = (e) => {
    setIsCompanyElement(e.target.children[0].textContent);
    setCompanyDropdown(false);
  };

  const addQuotationElementHandler = (e) => {
    setIsQuotationElement(e.target.children[0].textContent);
    setQuotationDropdown(false);
  };

  const addLinerElementHandler = (e) => {
    setIsLinerElement(e.target.children[0].textContent);
    setLinerDropdown(false);
  };

  const removeContentHandler = (obj) => {
    setContents(contents.filter((item) => item.value !== obj.value));
  };

  return (
    <ScreenContainer className={styles.container}>
      <MetaLevelWrapper>
        <AnimatePresence mode="sync">
          {isTemplateEditable && (
            <motion.div
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 0.2,
              }}
              className={styles.editButton}
            >
              <AnimatePresence mode="sync">
                <Button
                  onClick={() => setHeaderVisibleProps(true)}
                  label="Customize"
                  className={styles.editButton}
                >
                  <FaPaintBrush />
                </Button>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        <TemplateHeader
          headerVisibleProps={headerVisibleProps}
          setHeaderVisibleProps={setHeaderVisibleProps}
          headerStyles={headerStyles}
          setHeaderStyles={setHeaderStyles}
          selectedHeaderPoints={selectedHeaderPoints}
          setSelectedHeaderPoints={setSelectedHeaderPoints}
        />
      </MetaLevelWrapper>
      <StylesModal
        setStylesProps={setCompanyStylesProps}
        stylesProps={companyStylesProps}
        setVisible={setCompanyDetailsPropsVisible}
        visible={companyDetailsPropsVisible}
      />
      <MetaLevelWrapper
        onMouseEnter={companyDetailsHoverEnter}
        onMouseLeave={companyDetailsHoverLeave}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            ref={companyDetailsContentRef}
            className={styles.contentContainer}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
            layout
          >
            {contents?.map((con, index) => (
              <div key={index}>
                <span
                  className={
                    con.type === "Header" ? styles.headings : styles.paragraphs
                  }
                  key={index}
                >
                  {con.value}
                  {con.value && isTemplateEditable && (
                    <AiFillCloseCircle
                      onClick={() => removeContentHandler(con)}
                      className={styles.removeIcon}
                    />
                  )}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="sync">
          {isTemplateEditable && (
            <motion.div
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 0.2,
              }}
              className={styles.addContentContainer}
            >
              <div className={styles.headingContainer}>
                {isCompanyElement === "Header" ? (
                  <InputText
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={styles.addWrapper}
                    placeholder="Add Header"
                    onKeyDown={(e) => {
                      if (e.code === "Enter") addContentHandler();
                    }}
                  />
                ) : (
                  <InputTextarea
                    autoResize
                    value={content}
                    placeholder="Add Paragraph"
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    cols={30}
                    onKeyDown={(e) => {
                      if (e.code === "Enter") addContentHandler();
                    }}
                  />
                )}
                <AnimatePresence mode="sync">
                  {companyDropdown && (
                    <div className={styles.dropdown}>
                      <div onClick={addCompanyElementHandler}>
                        <span>Header</span>
                      </div>
                      <div onClick={addCompanyElementHandler}>
                        <span>Paragraph</span>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
                <div className={styles.configs}>
                  <FiSettings
                    className={`${styles.configIcon} ${styles.settings}`}
                    onClick={() => setCompanyDropdown(true)}
                  />
                  <BsCheckLg
                    className={styles.configIcon}
                    onClick={addContentHandler}
                  />
                </div>
              </div>
              <div>
                {isTemplateEditable && (
                  <Button
                    onClick={() => setCompanyDetailsPropsVisible(true)}
                    label="Customize"
                    className={styles.editButton}
                  >
                    <FaPaintBrush />
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {companyDetails.length > 0 && (
          <MetaLeveContainer ref={companyDetailsRef}>
            <AnimatePresence mode="sync">
              {companyDetails.map((data, index) => (
                <Meta
                  key={index}
                  removedCompanyDetails={removedCompanyDetails}
                  label={data.name}
                  data={data.val}
                  obj={data}
                  companyDetails={companyDetails}
                  setCompanyDetails={setCompanyDetails}
                  setRemovedCompanyDetails={setRemovedCompanyDetails}
                />
              ))}
            </AnimatePresence>
          </MetaLeveContainer>
        )}
      </MetaLevelWrapper>
      <StylesModal
        setStylesProps={setQuotationStylesProps}
        stylesProps={quotationStylesProps}
        setVisible={setQuotationDetailsPropsVisible}
        visible={quotationDetailsPropsVisible}
      />
      <MetaLevelWrapper
        onMouseEnter={quotationDetailsHoverEnter}
        onMouseLeave={quotationDetailsHoverLeave}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            ref={companyDetailsContentRef}
            className={styles.contentContainer}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
            layout
          >
            {quotationContents?.map((con, index) => (
              <div key={index}>
                <span
                  className={
                    con.type === "Header" ? styles.headings : styles.paragraphs
                  }
                  key={index}
                >
                  {con.value}
                  {con.value && isTemplateEditable && (
                    <AiFillCloseCircle
                      onClick={() =>
                        setQuotationContents(
                          quotationContents.filter(
                            (item) => item.value !== con.value
                          )
                        )
                      }
                      className={styles.removeIcon}
                    />
                  )}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="sync">
          {isTemplateEditable && (
            <motion.div
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 0.2,
              }}
              className={styles.addContentContainer}
            >
              <div className={styles.headingContainer}>
                {isQuotationElement === "Header" ? (
                  <InputText
                    value={quotationContent}
                    onChange={(e) => setQuotationContent(e.target.value)}
                    className={styles.addWrapper}
                    placeholder="Add Header"
                    onKeyDown={(e) => {
                      if (e.code === "Enter") addQuotationHandler();
                    }}
                  />
                ) : (
                  <InputTextarea
                    autoResize
                    value={quotationContent}
                    placeholder="Add Paragraph"
                    onChange={(e) => setQuotationContent(e.target.value)}
                    rows={5}
                    cols={30}
                    onKeyDown={(e) => {
                      if (e.code === "Enter") addQuotationHandler();
                    }}
                  />
                )}
                <AnimatePresence mode="sync">
                  {quotationDropdown && (
                    <div className={styles.dropdown}>
                      <div onClick={addQuotationElementHandler}>
                        <span>Header</span>
                      </div>
                      <div onClick={addQuotationElementHandler}>
                        <span>Paragraph</span>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
                <div className={styles.configs}>
                  <FiSettings
                    className={`${styles.configIcon} ${styles.settings}`}
                    onClick={() => setQuotationDropdown(true)}
                  />
                  <BsCheckLg
                    className={styles.configIcon}
                    onClick={addQuotationHandler}
                  />
                </div>
              </div>
              <div>
                {isTemplateEditable && (
                  <Button
                    onClick={() => setQuotationDetailsPropsVisible(true)}
                    label="Customize"
                    className={styles.editButton}
                  >
                    <FaPaintBrush />
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {quotationDetails.length > 0 && (
          <MetaLeveContainer ref={quotationDetailsRef}>
            <AnimatePresence mode="sync">
              {quotationDetails.map((data, index) => (
                <Meta
                  key={index}
                  removedQuotationDetails={removedQuotationDetails}
                  label={data.name}
                  data={data.val}
                  obj={data}
                  quotationDetails={quotationDetails}
                  setQuotationDetails={setQuotationDetails}
                  setRemovedQuotationDetails={setRemovedQuotationDetails}
                />
              ))}
            </AnimatePresence>
          </MetaLeveContainer>
        )}
      </MetaLevelWrapper>
      <StylesModal
        setStylesProps={setLinerStylesProps}
        stylesProps={linerStylesProps}
        setVisible={setLinerDetailsPropsVisible}
        visible={linerDetailsPropsVisible}
      />
      <MetaLevelWrapper
        onMouseEnter={() => setLinerDetailsHover(true)}
        onMouseLeave={() => setLinerDetailsHover(false)}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            className={styles.contentContainer}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
            layout
          >
            {linerContents?.map((con, index) => (
              <div key={index}>
                <span
                  className={
                    con.type === "Header" ? styles.headings : styles.paragraphs
                  }
                  key={index}
                >
                  {con.value}
                  {con.value && isTemplateEditable && (
                    <AiFillCloseCircle
                      onClick={() =>
                        setLinerContents(
                          linerContents.filter(
                            (item) => item.value !== con.value
                          )
                        )
                      }
                      className={styles.removeIcon}
                    />
                  )}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="sync">
          {isTemplateEditable && (
            <motion.div
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 0.2,
              }}
              className={styles.addContentContainer}
            >
              <div className={styles.headingContainer}>
                {isLinerElement === "Header" ? (
                  <InputText
                    value={linerContent}
                    onChange={(e) => setLinerContent(e.target.value)}
                    className={styles.addWrapper}
                    placeholder="Add Header"
                    onKeyDown={(e) => {
                      if (e.code === "Enter") addLinerContent();
                    }}
                  />
                ) : (
                  <InputTextarea
                    autoResize
                    value={linerContent}
                    placeholder="Add Paragraph"
                    onChange={(e) => setLinerContent(e.target.value)}
                    rows={5}
                    cols={30}
                    onKeyDown={(e) => {
                      if (e.code === "Enter") addLinerContent();
                    }}
                  />
                )}
                <AnimatePresence mode="sync">
                  {linerDropdown && (
                    <div className={styles.dropdown}>
                      <div onClick={addLinerElementHandler}>
                        <span>Header</span>
                      </div>
                      <div onClick={addLinerElementHandler}>
                        <span>Paragraph</span>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
                <div className={styles.configs}>
                  <FiSettings
                    className={`${styles.configIcon} ${styles.settings}`}
                    onClick={() => setLinerDropdown(true)}
                  />
                  <BsCheckLg
                    className={styles.configIcon}
                    onClick={addLinerContent}
                  />
                </div>
              </div>
              <div>
                {isTemplateEditable && (
                  <Button
                    onClick={() => setLinerDetailsPropsVisible(true)}
                    label="Customize"
                    className={styles.editButton}
                  >
                    <FaPaintBrush />
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {linerDetails.length > 0 && (
          <MetaLeveContainer ref={linerDetailsRef}>
            <AnimatePresence mode="sync">
              {linerDetails.map((data, index) => (
                <Meta
                  removedLinerDetails={removedLinerDetails}
                  key={index}
                  label={data.name}
                  data={data.val}
                  obj={data}
                  linerDetails={linerDetails}
                  setLinerDetails={setLinerDetails}
                  setRemovedLinerDetails={setRemovedLinerDetails}
                />
              ))}
            </AnimatePresence>
          </MetaLeveContainer>
        )}
      </MetaLevelWrapper>
      <Table
        setIsTemplateEditable={setIsTemplateEditable}
        isTemplateEditable={isTemplateEditable}
        visibleRows={visibleRows}
        visibleColumns={visibleColumns}
        setVisibleRows={setVisibleRows}
        setVisibleColumns={setVisibleColumns}
      />

      <FooterData
        stylesProps={footerstyleProps}
        setStylesProps={setFooterStyleProps}
        isTemplateEditable={isTemplateEditable}
        selectedFooterPoints={selectedFooterPoints}
        setSelectedFooterPoints={setSelectedFooterPoints}
      />
    </ScreenContainer>
  );
};

export default Screen;
