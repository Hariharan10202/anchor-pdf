import React, { useEffect, useRef, useState } from "react";
import styles from "./Sidebar.module.css";
import { dataPoints } from "./dataPoints";
import { MultiSelect } from "primereact/multiselect";
// import { Slider } from "primereact/slider";
import HeaderController from "../HeaderController/HeaderController";

import { Checkbox } from "primereact/checkbox";
import FooterMultiSelect from "../FooterMultiSelect/FooterMultiSelect";

const Navbar = ({
  setCompanyDetails,
  setExistingItems,
  existingItems,
  setQuotationDetails,
  setLinerDetails,
  companyDetails,
  linerDetails,
  quotationDetails,
  setRemovedCompanyDetails,
  removedCompanyDetails,
  setRemovedQuotationDetails,
  removedQuotationDetails,
  setRemovedLinerDetails,
  removedLinerDetails,
  selectedHeaderPoints,
  setSelectedHeaderPoints,
  setIsTemplateEditable,
  isTemplateEditable,
  selectedFooterPoints,
  setSelectedFooterPoints,
}) => {
  const [existing, setExisting] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [removedExisting, setRemovedExisting] = useState([]);
  const previousOptionsRef = useRef([]);

  const removearr = [];

  useEffect(() => {
    setExisting(dataPoints);

    let list = [];
    dataPoints.forEach((element) => {
      element.Meta.forEach((item) => {
        list.push(item);
      });
    });
    setExistingItems(list);
    setTotalItems(list);
  }, [dataPoints]);

  useEffect(() => {
    setCompanyDetails(existingItems.filter((obj) => obj.code === "CD"));
    setQuotationDetails(existingItems.filter((obj) => obj.code === "QD"));
    setLinerDetails(existingItems.filter((obj) => obj.code === "LD"));
  }, [existingItems]);

  useEffect(() => {
    setRemovedCompanyDetails(
      removedExisting.filter((obj) => obj.code === "CD")
    );
    setRemovedQuotationDetails(
      removedExisting.filter((obj) => obj.code === "QD")
    );
    setRemovedLinerDetails(removedExisting.filter((obj) => obj.code === "LD"));
  }, [removedExisting]);

  // useEffect(() => {
  //   setExistingItems([...companyDetails, ...linerDetails, ...quotationDetails]);
  // }, [companyDetails, linerDetails, quotationDetails]);

  const handleSelectionChange = (e) => {
    const hash = {};
    for (const item of e.value) {
      hash[item.name] = 1;
    }
    for (const item of totalItems) {
      if (!hash[item.name]) {
        removearr.push(item);
      }
    }

    // let count = 0;

    // dataPoints.forEach((element) => {
    //   element.Meta.forEach((item) => {
    //     count++;
    //   });
    // });

    // let companyList = [];
    // let linerList = [];
    // let quoationList = [];
    // let list = [];

    // if (e.value.length === count) {
    //   console.log("All options selected!");
    //   dataPoints.forEach((element) => {
    //     element.Meta.forEach((item) => {
    //       list.push(item);
    //       if (item.code === "CD") companyList.push(item);
    //       if (item.code === "QD") quoationList.push(item);
    //       if (item.code === "LD") linerList.push(item);
    //     });
    //   });
    //   setCompanyDetails(companyList);
    //   setQuotationDetails(quoationList);
    //   setLinerDetails(linerList);
    //   setExistingItems(list);
    //   return;
    // }

    // if (e.value.length === 0) {
    //   setCompanyDetails([]);
    //   setQuotationDetails([]);
    //   setLinerDetails([]);
    //   setExistingItems([]);
    //   return;
    // }

    const newSelectedOptions = e.value;
    const removedOptions = previousOptionsRef.current.filter((option) => {
      return !newSelectedOptions.includes(option);
    });

    setExistingItems(e.value);

    const combinedArray = [...totalItems, ...e.value];

    setRemovedExisting(removearr);
  };

  // console.log(removedCompanyDetails);
  // console.log(companyDetails);

  // console.log(totalItems);

  return (
    <div className={styles.Sidebar}>
      <div className={styles.components}>
        <div className={styles.multiselect}>
          <label htmlFor="">Header Item</label>
          <HeaderController
            setSelectedHeaderPoints={setSelectedHeaderPoints}
            selectedHeaderPoints={selectedHeaderPoints}
          />
        </div>
        <div className={styles.multiselect}>
          <label htmlFor="">Existing Item</label>
          <MultiSelect
            value={[...companyDetails, ...quotationDetails, ...linerDetails]}
            onChange={handleSelectionChange}
            options={existing}
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="Meta"
            placeholder="Select a data point"
            display="chip"
            style={{ width: "300px" }}
          />
        </div>
        <div className={styles.editable}>
          <Checkbox
            inputId="editable"
            onChange={() => setIsTemplateEditable(!isTemplateEditable)}
            checked={isTemplateEditable}
          />
          <label htmlFor="editable" className="ml-2">
            Start Editing the template
          </label>
        </div>
        <div className={styles.multiselect}>
          <label htmlFor="">Footer Items</label>
          <FooterMultiSelect
            selectedFooterPoints={selectedFooterPoints}
            setSelectedFooterPoints={setSelectedFooterPoints}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
