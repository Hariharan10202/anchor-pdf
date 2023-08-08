import React, { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";

const FooterMultiSelect = ({
  selectedFooterPoints,
  setSelectedFooterPoints,
}) => {
  const footerPoints = [
    {
      name: "Remarks",
      code: "NY",
      val: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, expedita.",
    },
    { name: "Inclusion", code: "RM", val: "inclusionsinclusionsinclusions" },
  ];

  useEffect(() => {
    setSelectedFooterPoints(footerPoints);
  }, []);

  return (
    <div>
      <MultiSelect
        value={selectedFooterPoints}
        onChange={(e) => setSelectedFooterPoints(e.value)}
        options={footerPoints}
        optionLabel="name"
        placeholder="Select Footer Points"
        maxSelectedLabels={3}
        className="w-full md:w-20rem"
      />
    </div>
  );
};

export default FooterMultiSelect;
