import React, { useEffect, useRef, useState } from "react";
import styles from "./FooterData.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "primereact/button";
import { FaPaintBrush } from "react-icons/fa";
import StylesModal from "../StylesModal/StylesModal";

const FooterData = ({
  selectedFooterPoints,
  isTemplateEditable,
  stylesProps,
  setStylesProps,
}) => {
  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.style.backgroundColor = `#${stylesProps.backgroundColor}`;
      footerRef.current.style.padding = `${stylesProps.padding}px`;
      footerRef.current.style.borderRadius = `${stylesProps.borderRadius}px`;
      footerRef.current.style.border = `${stylesProps.borderWidth} ${stylesProps.borderStyle} #${stylesProps.borderColor}`;
      footerRef.current.style.justifyContent = stylesProps.justifyContent;
      footerRef.current.children[0].style.gap = `${stylesProps.gap}px`;

      for (
        let index = 0;
        index < footerRef.current.firstChild.children.length;
        index++
      ) {
        footerRef.current.firstChild.children[
          index
        ].children[0].style.color = `#${stylesProps.labelFont.labelfontcolor}`;
        footerRef.current.firstChild.children[
          index
        ].children[0].style.fontSize = `${stylesProps.labelFont.labelfontSize}px`;
        footerRef.current.firstChild.children[
          index
        ].children[0].style.fontStyle = stylesProps.labelFont.labelfontStyle;
        footerRef.current.firstChild.children[
          index
        ].children[0].style.fontWeight = stylesProps.labelFont.labelfontWeight;

        footerRef.current.firstChild.children[
          index
        ].children[1].style.color = `#${stylesProps.dataFont.fontcolor}`;
        footerRef.current.firstChild.children[
          index
        ].children[1].style.fontSize = `${stylesProps.dataFont.fontSize}px`;
        footerRef.current.firstChild.children[
          index
        ].children[1].style.fontStyle = stylesProps.dataFont.fontStyle;
        footerRef.current.firstChild.children[
          index
        ].children[1].style.fontWeight = stylesProps.dataFont.fontWeight;
      }
    }
  }, [stylesProps]);

  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <StylesModal
        setVisible={setVisible}
        visible={visible}
        stylesProps={stylesProps}
        setStylesProps={setStylesProps}
      />
      <div className={styles.wrapper}>
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
                  className={styles.editButton}
                  label="Customize"
                  onClick={() => setVisible(true)}
                >
                  <FaPaintBrush />
                </Button>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedFooterPoints.length > 0 && (
          <div className={styles.containerRef} ref={footerRef}>
            <div className={styles.container}>
              <AnimatePresence mode="sync">
                {selectedFooterPoints.map((item, index) => (
                  <motion.div layout key={index}>
                    <span>{item.name}</span>
                    <span>{item.val}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FooterData;
