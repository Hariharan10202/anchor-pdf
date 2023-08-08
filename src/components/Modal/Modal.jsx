import { Dialog } from "primereact/dialog";
import React from "react";

const Modal = ({ header, children, visible, setVisible }) => {
  return (
    <Dialog
      header={header}
      style={{ width: "30vw" }}
      visible={visible}
      onHide={() => setVisible(false)}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
