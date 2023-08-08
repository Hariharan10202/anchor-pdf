import { Slider } from "primereact/slider";
import React, { useState } from "react";

const SliderComponent = () => {
  const [value, setValue] = useState(null);

  return (
    <Slider
      value={value}
      onChange={(e) => setValue(e.value)}
      className="w-14rem"
    />
  );
};

export default SliderComponent;
