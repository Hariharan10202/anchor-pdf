import React from "react";
import styles from "./RemovedItems.module.css";

const RemovedItems = ({ list, setClickRemoved }) => {
  const handleSelect = (list) => {
    setClickRemoved(list);
  };

  return (
    <span onClick={() => handleSelect(list)} className={styles.removedItems}>
      {list.name}
    </span>
  );
};

export default RemovedItems;
