import React, { useEffect, useRef, useState } from "react";
import styles from "./TemplateHeader.module.css";
import StylesModal from "../StylesModal/StylesModal";

import { motion, AnimatePresence, useDragControls } from "framer-motion";

const TemplateHeader = ({
  selectedHeaderPoints,
  setSelectedHeaderPoints,
  headerVisibleProps,
  setHeaderVisibleProps,
  headerStyles,
  setHeaderStyles,
}) => {
  const [logo, setLogo] = useState(null);

  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.backgroundColor = `#${headerStyles.backgroundColor}`;
      headerRef.current.style.padding = `${headerStyles.padding}px`;
      headerRef.current.style.border = `${headerStyles.borderWidth} ${headerStyles.borderStyle} #${headerStyles.borderColor}`;
      headerRef.current.style.borderRadius = `${headerStyles.borderRadius}px`;
    }
    if (companyLabelRef.current) {
      companyLabelRef.current.style.fontSize = `${headerStyles.labelFont.labelfontSize}px`;
      companyLabelRef.current.style.fontStyle = `${headerStyles.labelFont.labelfontStyle}`;
      companyLabelRef.current.style.fontWeight = `${headerStyles.labelFont.labelfontWeight}`;
      companyLabelRef.current.style.color = `#${headerStyles.labelFont.labelfontcolor}`;
    }
    if (companyDataRef.current) {
      companyDataRef.current.style.fontSize = `${headerStyles.dataFont.fontSize}px`;
      companyDataRef.current.style.fontStyle = `${headerStyles.dataFont.fontStyle}`;
      companyDataRef.current.style.fontWeight = `${headerStyles.dataFont.fontWeight}`;
      companyDataRef.current.style.color = `#${headerStyles.dataFont.fontcolor}`;
    }
    if (othersRef.current) {
      for (let index = 0; index < othersRef.current.children.length; index++) {
        othersRef.current.children[
          index
        ].children[0].style.fontSize = `${headerStyles.labelFont.labelfontSize}px`;
        othersRef.current.children[
          index
        ].children[0].style.fontStyle = `${headerStyles.labelFont.labelfontStyle}`;
        othersRef.current.children[
          index
        ].children[0].style.fontWeight = `${headerStyles.labelFont.labelfontWeight}`;
        othersRef.current.children[
          index
        ].children[0].style.color = `#${headerStyles.labelFont.labelfontcolor}`;

        othersRef.current.children[
          index
        ].children[1].style.fontSize = `${headerStyles.dataFont.fontSize}px`;
        othersRef.current.children[
          index
        ].children[1].style.fontStyle = `${headerStyles.dataFont.fontStyle}`;
        othersRef.current.children[
          index
        ].children[1].style.fontWeight = `${headerStyles.dataFont.fontWeight}`;
        othersRef.current.children[
          index
        ].children[1].style.color = `#${headerStyles.dataFont.fontcolor}`;
      }
    }
  }, [headerStyles]);

  const companyLabelRef = useRef(null);
  const companyDataRef = useRef(null);
  const othersRef = useRef(null);

  const companyInfo = selectedHeaderPoints?.filter(
    (item) => item.code === "CI"
  );

  const companyDetails = selectedHeaderPoints?.filter(
    (item) => item.code === "CD"
  );

  const companyInfoRef = useRef(null);

  useEffect(() => {
    if (companyInfoRef.current) {
      companyInfoRef.current.classList.add(styles.show);
    }
  }, [companyInfo]);

  const controls = useDragControls();

  const startDragHeader = (e) => {
    controls.start(e);
  };

  const dragStyles = {
    scale: 1,
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.505)",
    zIndex: 999,
    backgroundColor: "rgba(0, 123, 255, 0.5)",
    borderRadius: "6px",
    padding: 10,
    cursor: "drag",
  };

  return (
    <>
      <StylesModal
        setStylesProps={setHeaderStyles}
        stylesProps={headerStyles}
        setVisible={setHeaderVisibleProps}
        visible={headerVisibleProps}
        header={false}
      />
      <div className={styles.container} ref={headerRef}>
        <motion.div
          className={styles.logo}
          drag="x"
          dragConstraints={headerRef}
          whileDrag={dragStyles}
          dragTransition={{ duration: 0 }}
        >
          <h1>Logo</h1>
        </motion.div>
        <div className={styles.headerContent}>
          <AnimatePresence mode="sync">
            {companyInfo?.length !== 0 && (
              <div
                className={styles.companyInfo}
                ref={companyInfoRef}
                onPointerDown={startDragHeader}
              >
                {companyInfo?.map((data, index) => (
                  <motion.div
                    drag="x"
                    whileDrag={dragStyles}
                    dragConstraints={headerRef}
                    key={index}
                    layout
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{
                      duration: 0.2,
                    }}
                    className={styles.eachDiv}
                  >
                    <span ref={companyLabelRef}>{data.label}</span>
                    <span
                      ref={companyDataRef}
                      className={styles.companyAddress}
                    >
                      {data.val}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
          {companyDetails?.length !== 0 && (
            <div className={styles.companyDetails} ref={othersRef}>
              <AnimatePresence mode="sync">
                {companyDetails?.map((data, index) => (
                  <motion.div
                    drag="x"
                    dragConstraints={headerRef}
                    layout
                    whileDrag={dragStyles}
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      duration: 0.2,
                    }}
                    className={styles.eachDiv}
                  >
                    <span>{data.label}</span>
                    <span>{data.val}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TemplateHeader;
