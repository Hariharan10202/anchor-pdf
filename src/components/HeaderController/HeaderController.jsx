import React, { useEffect, useState } from "react";
import styles from "./HeaderController.module.css";
import { MultiSelect } from "primereact/multiselect";
import "../Sidebar/styles.css";

import { HeaderPoints } from "../../headerDataPoint";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderController = ({
  setSelectedHeaderPoints,
  selectedHeaderPoints,
}) => {
  // const params = useParams();

  // const userConfigurations = useSelector((state) => state.user.data);

  // const [config, setConfig] = useState([]);

  // useEffect(() => {
  //   if (params.templateId) {
  //     const userConfig = userConfigurations.find(
  //       (item) => item.username === params.templateId
  //     );
  //     setConfig(userConfig.configuration);
  //   } else {
  //     setConfig([]);
  //   }
  // }, [userConfigurations]);

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
