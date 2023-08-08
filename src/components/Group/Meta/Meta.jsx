import React, { useEffect, useRef, useState } from "react";
import styles from "./Meta.module.css";
import { AiFillEdit } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { Menu } from "primereact/menu";
import { OverlayPanel } from "primereact/overlaypanel";
import RemovedItems from "../../RemovedItems/RemovedItems";

import { motion } from "framer-motion";

import "./popoverstyles.css";

const Meta = ({
  label,
  data,
  obj,
  companyDetails = [],
  quotationDetails = [],
  linerDetails = [],
  setCompanyDetails,
  setQuotationDetails,
  setLinerDetails,
  removedQuotationDetails = [],
  removedCompanyDetails = [],
  removedLinerDetails = [],
  setRemovedLinerDetails,
  setRemovedCompanyDetails,
  setRemovedQuotationDetails,
  companyDetailsRef,
}) => {
  const [editableVisible, setEditableVisible] = useState(false);

  const [isDataEditable, setIsDataEditable] = useState(false);

  const [isLabelEditable, setIsLabelEditable] = useState(false);

  const [clickRemoved, setClickRemoved] = useState([]);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    if (clickRemoved.code === "CD") {
      setCompanyDetails((prevArray) => [
        ...prevArray.slice(0, index),
        clickRemoved,
        ...prevArray.slice(index),
      ]);
      setRemovedCompanyDetails(
        removedCompanyDetails.filter((obj) => obj.name !== clickRemoved.name)
      );
    }

    if (clickRemoved.code === "QD") {
      setQuotationDetails((prevArray) => [
        ...prevArray.slice(0, index),
        clickRemoved,
        ...prevArray.slice(index),
      ]);
      setRemovedQuotationDetails(
        removedQuotationDetails.filter((obj) => obj.name !== clickRemoved.name)
      );
    }

    if (clickRemoved.code === "LD") {
      setLinerDetails((prevArray) => [
        ...prevArray.slice(0, index),
        clickRemoved,
        ...prevArray.slice(index),
      ]);
      setRemovedLinerDetails(
        removedLinerDetails.filter((obj) => obj.name !== clickRemoved.name)
      );
    }
  }, [clickRemoved, index]);

  const [labalValues, setLabalValues] = useState({
    fontSize: "16px",
    color: "#333",
    fontStyle: "normal",
    fontWeight: "600",
  });

  const [dataValues, setDataValues] = useState({
    fontSize: "16px",
    color: "#333",
    fontStyle: "normal",
    fontWeight: "500",
  });

  const labelRef = useRef(null);
  const dataRef = useRef(null);

  const handleEdit = () => {
    console.log(labelRef.current);
    console.log(dataRef.current);
  };

  const handleLabel = () => {
    // setEnableLabelEditable(true);
  };

  const handleData = () => {
    // setEnableDataEditable(false);
  };

  const labelInputHandler = (e) => {
    const { name, value } = e.target;
    setLabalValues((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const dataInputHandler = (e) => {
    const { name, value } = e.target;
    setDataValues((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const applyHandler = () => {
    labelRef.current.style.color = labalValues.color;
    labelRef.current.style.fontSize = labalValues.fontSize;
    labelRef.current.style.fontStyle = labalValues.fontStyle;
    labelRef.current.style.fontWeight = labalValues.fontWeight;

    dataRef.current.style.color = dataValues.color;
    dataRef.current.style.fontSize = dataValues.fontSize;
    dataRef.current.style.fontStyle = dataValues.fontStyle;
    dataRef.current.style.fontWeight = dataValues.fontWeight;
  };

  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => console.log("Home clicked"),
    },
    {
      label: "About",
      icon: "pi pi-fw pi-info",
      command: () => console.log("About clicked"),
    },
    {
      label: "Contact",
      icon: "pi pi-fw pi-envelope",
      command: () => console.log("Contact clicked"),
    },
  ];

  const template = (menuItem) => {
    return (
      <div>
        <i className={menuItem.icon}></i>
        <span>{menuItem.label}</span>
      </div>
    );
  };

  const removedItemsRight = useRef(null);
  const removedItemsLeft = useRef(null);

  const handleCurrentDataPoint = (event, obj, direction) => {
    removedItemsRight.current.toggle(event);

    if (obj.code === "CD") {
      let objIndex = companyDetails?.findIndex(
        (objItem) => objItem.name === obj.name
      );
      if (direction === "left") {
        setIndex(objIndex);
        setClickRemoved([]);
      } else {
        setIndex(objIndex + 1);
        setClickRemoved([]);
      }
    }
    if (obj.code === "QD") {
      let objIndex = quotationDetails?.findIndex(
        (objItem) => objItem.code === obj.code && objItem.name === obj.name
      );
      if (direction === "left") {
        setIndex(objIndex);
        setClickRemoved([]);
      } else {
        setIndex(objIndex + 1);
        setClickRemoved([]);
      }
    }
    if (obj.code === "LD") {
      let objIndex = linerDetails?.findIndex(
        (objItem) => objItem.code === obj.code && objItem.name === obj.name
      );
      if (direction === "left") {
        setIndex(objIndex);
        setClickRemoved([]);
      } else {
        setIndex(objIndex + 1);
        setClickRemoved([]);
      }
    }
  };

  const editDataHandler = () => {
    setIsDataEditable(true);
  };

  const editLabelHandler = () => {
    setIsLabelEditable(true);
  };

  const handleInputBlur = () => {
    setIsDataEditable(false);
  };

  const handleChange = (e, obj) => {
    obj.val = e.target.value;
  };

  const handleLabelChange = (e, obj) => {
    obj.label = e.target.value;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") setIsDataEditable(false);
  };

  const dragStyles = {
    scale: 1,
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.505)",
    backgroundColor: "rgba(0, 123, 255, 0.5)",
    borderRadius: "6px",
    padding: 10,
    cursor: "drag",
    zIndex: 999,
  };

  const dataPointRef = useRef(null);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        duration: 0.2,
      }}
      drag="x"
      layout
      whileDrag={dragStyles}
      whileHover={{
        backgroundColor: "rgba(0, 0, 0, 0.244)",
        bordeRadius: "4px",
        zIndex: 99,
      }}
      ref={dataPointRef}
      className={styles.container}
      onMouseLeave={() => setEditableVisible(false)}
    >
      {isLabelEditable ? (
        <input
          className={styles.editableData}
          defaultValue={obj.label}
          onKeyDown={(e) => {
            if (e.key === "Enter") setIsLabelEditable(false);
          }}
          onChange={(e) => handleLabelChange(e, obj)}
          type="text"
        />
      ) : (
        <span
          onDoubleClick={editLabelHandler}
          onBlur={handleInputBlur}
          ref={labelRef}
        >
          {obj.label}
        </span>
      )}
      {isDataEditable ? (
        <input
          className={styles.editableData}
          defaultValue={obj.val}
          onKeyDown={handleKeyPress}
          onChange={(e) => handleChange(e, obj)}
          type="text"
        />
      ) : (
        <span
          onDoubleClick={editDataHandler}
          onBlur={handleInputBlur}
          ref={dataRef}
        >
          {obj.val}
        </span>
      )}
      <span
        className={styles.editIconContainer}
        onMouseEnter={() => setEditableVisible(true)}
        onClick={(obj) => handleEdit(obj)}
      >
        <AiFillEdit className={styles.editIcon} />
      </span>
      <span
        className={`${styles.addIconContainer} ${styles.left}`}
        onClick={(e) => {
          let direction = "left";
          handleCurrentDataPoint(e, obj, direction);
        }}
      >
        {removedCompanyDetails[0]?.code === "CD" ? (
          <IoMdAdd className={styles.addIcon} />
        ) : removedQuotationDetails[0]?.code === "QD" ? (
          <IoMdAdd className={styles.addIcon} />
        ) : (
          removedLinerDetails[0]?.code === "LD" && (
            <IoMdAdd className={styles.addIcon} />
          )
        )}
      </span>

      {(removedCompanyDetails.length > 0 ||
        removedQuotationDetails.length > 0 ||
        removedLinerDetails.length > 0) && (
        <OverlayPanel ref={removedItemsRight}>
          {removedCompanyDetails?.length
            ? removedCompanyDetails.map((item, index) => (
                <RemovedItems
                  // clickRemoved={clickRemoved}
                  setClickRemoved={setClickRemoved}
                  list={item}
                  key={index}
                />
              ))
            : removedLinerDetails?.length
            ? removedLinerDetails.map((item, index) => (
                <RemovedItems
                  // clickRemoved={clickRemoved}
                  setClickRemoved={setClickRemoved}
                  list={item}
                  key={index}
                />
              ))
            : removedQuotationDetails?.length
            ? removedQuotationDetails.map((item, index) => (
                <RemovedItems
                  // clickRemoved={clickRemoved}
                  setClickRemoved={setClickRemoved}
                  list={item}
                  key={index}
                />
              ))
            : ""}
        </OverlayPanel>
      )}

      {(removedCompanyDetails.length > 0 ||
        removedQuotationDetails.length > 0 ||
        removedLinerDetails.length > 0) && (
        <OverlayPanel ref={removedItemsLeft}>
          {removedCompanyDetails?.length
            ? removedCompanyDetails.map((item, index) => (
                <RemovedItems
                  // clickRemoved={clickRemoved}
                  setClickRemoved={setClickRemoved}
                  list={item}
                  key={index}
                />
              ))
            : removedLinerDetails?.length
            ? removedLinerDetails.map((item, index) => (
                <RemovedItems
                  // clickRemoved={clickRemoved}
                  setClickRemoved={setClickRemoved}
                  list={item}
                  key={index}
                />
              ))
            : removedQuotationDetails?.length &&
              removedQuotationDetails.map((item, index) => (
                <RemovedItems
                  // clickRemoved={clickRemoved}
                  setClickRemoved={setClickRemoved}
                  list={item}
                  key={index}
                />
              ))}
        </OverlayPanel>
      )}
      <span
        className={`${styles.addIconContainer} ${styles.right}`}
        onClick={(e) => {
          let direction = "right";
          handleCurrentDataPoint(e, obj, direction);
        }}
      >
        {removedCompanyDetails[0]?.code === "CD" ? (
          <IoMdAdd className={styles.addIcon} />
        ) : removedQuotationDetails[0]?.code === "QD" ? (
          <IoMdAdd className={styles.addIcon} />
        ) : (
          removedLinerDetails[0]?.code === "LD" && (
            <IoMdAdd className={styles.addIcon} />
          )
        )}
      </span>
      {editableVisible && (
        <div
          className={styles.editableDropdown}
          onMouseEnter={() => setEditableVisible(true)}
          onMouseLeave={() => setEditableVisible(false)}
        >
          <div>
            <div>
              <div>
                <span onClick={handleLabel} className={styles.label}>
                  Label
                </span>
                <div className={styles.configs}>
                  <div>
                    <span>Font Color</span>
                    <input
                      type="color"
                      name="color"
                      value={labalValues.color}
                      onChange={labelInputHandler}
                    />
                  </div>
                  <div>
                    <span>Font Size</span>
                    <select
                      name="fontSize"
                      value={labalValues.fontSize}
                      id=""
                      onChange={labelInputHandler}
                    >
                      <option disabled>Select</option>
                      <option value="12px">12px</option>
                      <option value="13px">13px</option>
                      <option value="14px">14px</option>
                      <option value="15px">15px</option>
                      <option value="16px">16px</option>
                      <option value="17px">17px</option>
                    </select>
                  </div>
                  <div>
                    <span>Font Style</span>
                    <select
                      name="fontStyle"
                      value={labalValues.fontStyle}
                      onChange={labelInputHandler}
                    >
                      <option disabled>Select</option>
                      <option value="normal">normal</option>
                      <option value="italic">italic</option>
                      <option value="oblique">oblique</option>
                    </select>
                  </div>
                  <div>
                    <span>Font Weight</span>
                    <select
                      name="fontWeight"
                      value={labalValues.fontWeight}
                      onChange={labelInputHandler}
                    >
                      <option disabled>Select</option>
                      <option value="500">500</option>
                      <option value="600">600</option>
                      <option value="700">700</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div
            // onMouseEnter={handleHoverDataEnter}
            // onMouseLeave={handleHoverDataLeave}
            >
              <div>
                <span onClick={handleData} className={styles.label}>
                  Data
                </span>
                <div className={styles.configs}>
                  <div>
                    <span>Font Color</span>
                    <input
                      type="color"
                      name="color"
                      value={dataValues.color}
                      onChange={dataInputHandler}
                    />
                  </div>
                  <div>
                    <span>Font Size</span>
                    <select
                      name="fontSize"
                      value={dataValues.fontSize}
                      onChange={dataInputHandler}
                    >
                      <option disabled>Select</option>
                      <option value="12px">12px</option>
                      <option value="13px">13px</option>
                      <option value="14px">14px</option>
                      <option value="15px">15px</option>
                      <option value="16px">16px</option>
                      <option value="17px">17px</option>
                    </select>
                  </div>
                  <div>
                    <span>Font Style</span>
                    <select
                      name="fontStyle"
                      value={dataValues.fontStyle}
                      onChange={dataInputHandler}
                    >
                      <option disabled>Select</option>
                      <option value="normal">normal</option>
                      <option value="italic">italic</option>
                      <option value="oblique">oblique</option>
                    </select>
                  </div>
                  <div>
                    <span>Font Weight</span>
                    <select
                      name="fontWeight"
                      value={dataValues.fontWeight}
                      onChange={dataInputHandler}
                    >
                      <option disabled>Select</option>
                      <option value="500">500</option>
                      <option value="600">600</option>
                      <option value="700">700</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.configcta}>
            <button onClick={applyHandler}>Apply Changes</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Meta;
