import React, { useEffect, useState } from "react";
import styles from "./HeaderController.module.css";
import { MultiSelect } from "primereact/multiselect";
import { HeaderPoints } from "../../headerDataPoint";
import "../Sidebar/styles.css";

const HeaderController = ({
  setSelectedHeaderPoints,
  selectedHeaderPoints,
}) => {
  useEffect(() => {
    setSelectedHeaderPoints(HeaderPoints);
  }, [HeaderPoints]);

  return (
    <MultiSelect
      value={selectedHeaderPoints}
      options={HeaderPoints}
      onChange={(e) => setSelectedHeaderPoints(e.value)}
      optionLabel="label"
      placeholder="Select Header Points"
      display="chip"
      className="w-full md:w-20rem"
    />
  );
};

export default HeaderController;
