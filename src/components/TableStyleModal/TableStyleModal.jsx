import React from "react";
import Styles from "./TableStyleModal.module.css";
import { Dialog } from "primereact/dialog";
import { ColorPicker } from "primereact/colorpicker";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";

const TableStyleModal = ({
  subHeaderStyleProps,
  setSubHeaderStyleProps,
  columnStyleProps,
  setColumnStyleProps,
  visible,
  setVisible,
}) => {
  const handleInput = (e) => {
    const { name, value } = e.target;
    setColumnStyleProps((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubHeaderInput = (e) => {
    const { name, value } = e.target;
    setSubHeaderStyleProps((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSliderInput = (e, name) => {
    setColumnStyleProps((prevData) => ({
      ...prevData,
      [name]: e.value,
    }));
  };

  const handleSubHeaderSliderInput = (e, name) => {
    setSubHeaderStyleProps((prevData) => ({
      ...prevData,
      [name]: e.value,
    }));
  };

  const footerContent = (
    <div>
      <Button
        label="Cancel"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Apply Changes"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

  return (
    <div>
      <Dialog
        header="Table Styles"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "30vw" }}
        footer={footerContent}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className={Styles.container}>
          <TabView>
            <TabPanel header="Column">
              <div className={Styles.InputFieldGroup}>
                <div className={Styles.InputField}>
                  <span>Background Color</span>
                  <ColorPicker
                    value={columnStyleProps.backgroundColor}
                    className={Styles.colorpicker}
                    onChange={handleInput}
                    name="backgroundColor"
                  />
                </div>
                <div className={Styles.InputField}>
                  <span>Font Color</span>
                  <ColorPicker
                    value={columnStyleProps.color}
                    className={Styles.colorpicker}
                    onChange={handleInput}
                    name="color"
                  />
                </div>
                <div className={Styles.InputField}>
                  <span className={Styles.label}>Font Size</span>
                  <div>
                    <InputText
                      value={columnStyleProps.fontSize}
                      className={Styles.InputText}
                      name="fontSize"
                      onChange={handleSubHeaderInput}
                    />
                    <Slider
                      value={columnStyleProps.fontSize}
                      onChange={(e) => handleSliderInput(e, "fontSize")}
                      min={13}
                      max={17}
                    />
                  </div>
                </div>
                <div className={Styles.InputField}>
                  <span className={Styles.label}>Font Style</span>
                  <select
                    value={columnStyleProps.fontStyle}
                    className={Styles.select}
                    onChange={handleInput}
                    name="fontStyle"
                  >
                    <option value="normal">normal</option>
                    <option value="bold">bold</option>
                    <option value="italic">italic</option>
                  </select>
                </div>
                <div className={Styles.InputField}>
                  <span className={Styles.label}>Font Style</span>
                  <select
                    value={columnStyleProps.fontWeight}
                    className={Styles.select}
                    // onChange={handleInput}
                    name="fontWeight"
                  >
                    <option value="500">500</option>
                    <option value="600">600</option>
                    <option value="700">700</option>
                  </select>
                </div>
              </div>
            </TabPanel>
            <TabPanel header="Sub Header">
              <div className={Styles.InputFieldGroup}>
                <div className={Styles.InputField}>
                  <span>Background Color</span>
                  <ColorPicker
                    value={subHeaderStyleProps.backgroundColor}
                    className={Styles.colorpicker}
                    onChange={handleSubHeaderInput}
                    name="backgroundColor"
                  />
                </div>
                <div className={Styles.InputField}>
                  <span>Font Color</span>
                  <ColorPicker
                    value={subHeaderStyleProps.color}
                    className={Styles.colorpicker}
                    onChange={handleSubHeaderInput}
                    name="color"
                  />
                </div>
                <div className={Styles.InputField}>
                  <span className={Styles.label}>Font Size</span>
                  <div>
                    <InputText
                      value={subHeaderStyleProps.fontSize}
                      className={Styles.InputText}
                      name="fontSize"
                      onChange={handleInput}
                    />
                    <Slider
                      value={subHeaderStyleProps.fontSize}
                      onChange={(e) =>
                        handleSubHeaderSliderInput(e, "fontSize")
                      }
                      min={13}
                      max={17}
                    />
                  </div>
                </div>
                <div className={Styles.InputField}>
                  <span className={Styles.label}>Font Style</span>
                  <select
                    value={subHeaderStyleProps.fontStyle}
                    className={Styles.select}
                    onChange={handleSubHeaderInput}
                    name="fontStyle"
                  >
                    <option value="normal">normal</option>
                    <option value="bold">bold</option>
                    <option value="italic">italic</option>
                  </select>
                </div>
                <div className={Styles.InputField}>
                  <span className={Styles.label}>Font Style</span>
                  <select
                    value={subHeaderStyleProps.fontWeight}
                    className={Styles.select}
                    onChange={handleSubHeaderInput}
                    name="fontWeight"
                  >
                    <option value="500">500</option>
                    <option value="600">600</option>
                    <option value="700">700</option>
                  </select>
                </div>
              </div>
            </TabPanel>
          </TabView>
        </div>
      </Dialog>
    </div>
  );
};

export default TableStyleModal;
