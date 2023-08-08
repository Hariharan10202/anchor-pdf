import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import styles from "./StylesModel.module.css";
import { ColorPicker } from "primereact/colorpicker";
import { InputNumber } from "primereact/inputnumber";
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";
import SliderComponent from "../UI/SliderComponent/SliderComponent";
import { SelectButton } from "primereact/selectbutton";

import { Button } from "primereact/button";

import { BsJustifyLeft } from "react-icons/bs";
import { BsJustifyRight } from "react-icons/bs";
import { BsJustify } from "react-icons/bs";
import { TabView, TabPanel } from "primereact/tabview";
import { AiOutlineArrowLeft } from "react-icons/ai";

const StylesModal = ({
  setVisible,
  visible,
  setStylesProps,
  stylesProps,
  header = "true",
}) => {
  const justifyOptions = [
    { icon: <BsJustifyLeft />, value: "flex-start" },
    { icon: <BsJustify />, value: "center" },
    { icon: <BsJustifyRight />, value: "flex-end" },
  ];

  const footerContent = (
    <div>
      <Button
        label="Discard"
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

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (!name.includes("font")) {
      setStylesProps((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      if (name.includes("label")) {
        setStylesProps((prevData) => ({
          ...prevData,
          labelFont: {
            ...prevData.labelFont,
            [name]: value,
          },
        }));
      } else {
        setStylesProps((prevData) => ({
          ...prevData,
          dataFont: {
            ...prevData.dataFont,
            [name]: value,
          },
        }));
      }
    }
  };

  const handleSliderInput = (e, name) => {
    if (!name.includes("font"))
      setStylesProps((prevData) => ({
        ...prevData,
        [name]: e.value,
      }));
    else {
      if (name.includes("label")) {
        setStylesProps((prevData) => ({
          ...prevData,
          labelFont: {
            ...prevData.labelFont,
            [name]: e.value,
          },
        }));
      } else {
        setStylesProps((prevData) => ({
          ...prevData,
          dataFont: {
            ...prevData.dataFont,
            [name]: e.value,
          },
        }));
      }
    }
  };

  const handleResize = (e) => {
    console.log(e);
  };

  const [modalStyles, setModalStyles] = useState({
    width: "30vw",
    position: "static",
    left: "",
    top: "",
  });

  const stickPositionHanlder = () => {
    setModalStyles({
      width: "350px",
      position: "absolute",
      left: "0",
      top: "0",
    });
  };

  const headerTemplate = () => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <AiOutlineArrowLeft onClick={stickPositionHanlder} />
        <span>Style Properties</span>
      </div>
    );
  };

  return (
    <div>
      <Dialog
        header={headerTemplate}
        visible={visible}
        modal={false}
        style={modalStyles}
        onHide={() => setVisible(false)}
        footer={footerContent}
        onResize={handleResize}
      >
        <div className={styles.container}>
          <div>
            <span className={styles.label}>Background Color</span>
            <ColorPicker
              value={stylesProps.backgroundColor}
              className={styles.colorpicker}
              onChange={handleInput}
              name="backgroundColor"
            />
          </div>
          <div>
            <span className={styles.label}>Padding</span>
            <div>
              <InputText
                value={stylesProps.padding}
                onChange={handleInput}
                className="w-full"
                name="padding"
                readOnly
              />
              <Slider
                value={stylesProps.padding}
                onChange={(e) => handleSliderInput(e, "padding")}
                className="w-full"
                min={5}
                max={10}
              />
            </div>
          </div>

          <div className={styles.border}>
            <span className={styles.label}>Border Properties</span>
            <div className={styles.borderInputs}>
              <div>
                <span className={styles.label}>Which border ?</span>
                <select
                  value={stylesProps.borderType}
                  onChange={handleInput}
                  name="borderType"
                >
                  <option value="border">border</option>
                  <option value="borderLeft">borderLeft</option>
                  <option value="borderRight">borderRight</option>
                  <option value="borderTop">borderTop</option>
                  <option value="borderBottom">borderBottom</option>
                </select>
              </div>
              <div>
                <span className={styles.label}>Border Width</span>
                <select
                  value={stylesProps.borderWidth}
                  onChange={handleInput}
                  name="borderWidth"
                >
                  <option value="1px">1px</option>
                  <option value="2px">2px</option>
                  <option value="3px">3px</option>
                  <option value="4px">4px</option>
                </select>
              </div>
              <div>
                <span className={styles.label}>Border Style</span>
                <select
                  value={stylesProps.borderStyle}
                  onChange={handleInput}
                  name="borderStyle"
                >
                  <option value="solid">solid</option>
                  <option value="dashed">dashed</option>
                  <option value="dotted">dotted</option>
                  <option value="double">double</option>
                </select>
              </div>
              <div>
                <span className={styles.label}>Border Color</span>
                <ColorPicker
                  onChange={handleInput}
                  value={stylesProps.borderColor}
                  className={styles.colorpicker}
                  name="borderColor"
                />
              </div>
              <div>
                <span className={styles.label}>Border Radius</span>
                <div>
                  <InputText
                    onChange={handleInput}
                    value={stylesProps.borderRadius}
                    className="w-full"
                    name="borderRadius"
                    readOnly
                  />
                  <Slider
                    value={stylesProps.borderRadius}
                    onChange={(e) => handleSliderInput(e, "borderRadius")}
                    className="w-full"
                    min={5}
                    max={10}
                  />
                </div>
              </div>
              {header && (
                <>
                  <div>
                    <span className={styles.label}>Justify Content</span>
                    <div>
                      <SelectButton
                        value={stylesProps.justifyContent}
                        onChange={handleInput}
                        optionLabel="icon"
                        name="justifyContent"
                        options={justifyOptions}
                      />
                    </div>
                  </div>
                  <div>
                    <span className={styles.label}>Gap</span>
                    <div>
                      <InputText
                        value={stylesProps.gap}
                        onChange={handleInput}
                        className="w-full"
                        name="gap"
                        readOnly
                      />
                      <Slider
                        value={stylesProps.gap}
                        onChange={(e) => handleSliderInput(e, "gap")}
                        className="w-full"
                        min={5}
                        max={50}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <span className={styles.label}>Data points</span>
            <TabView>
              <TabPanel header="Label">
                <div className={styles.borderInputs}>
                  <div>
                    <span>Font Color</span>
                    <ColorPicker
                      onChange={handleInput}
                      value={stylesProps.labelFont.labelfontcolor}
                      className={styles.colorpicker}
                      name="labelfontcolor"
                    />
                  </div>
                  <div>
                    <span>Font Style</span>
                    <select
                      value={stylesProps.labelFont.labelfontStyle}
                      onChange={handleInput}
                      name="labelfontStyle"
                    >
                      <option value="normal">normal</option>
                      <option value="bold">bold</option>
                      <option value="italic">italic</option>
                    </select>
                  </div>
                  <div>
                    <span>Font Size</span>
                    <div>
                      <InputText
                        value={stylesProps.labelFont.labelfontSize}
                        onChange={handleInput}
                        className="w-full"
                        name="gap"
                        readOnly
                      />
                      <Slider
                        value={stylesProps.labelFont.labelfontSize}
                        onChange={(e) => handleSliderInput(e, "labelfontSize")}
                        className="w-full"
                        min={14}
                        max={18}
                      />
                    </div>
                  </div>
                  <div>
                    <span>Font Weight</span>
                    <select
                      value={stylesProps.labelFont.labelfontWeight}
                      onChange={handleInput}
                      name="labelfontWeight"
                    >
                      <option value="500">500</option>
                      <option value="600">600</option>
                      <option value="700">700</option>
                    </select>
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Data">
                <div className={styles.borderInputs}>
                  <div>
                    <span>Font Color</span>
                    <ColorPicker
                      onChange={handleInput}
                      value={stylesProps.dataFont.fontcolor}
                      className={styles.colorpicker}
                      name="fontcolor"
                    />
                  </div>
                  <div>
                    <span>Font Style</span>
                    <select
                      value={stylesProps.dataFont.fontStyle}
                      onChange={handleInput}
                      name="fontStyle"
                    >
                      <option value="normal">normal</option>
                      <option value="bold">bold</option>
                      <option value="italic">italic</option>
                    </select>
                  </div>
                  <div>
                    <span>Font Size</span>
                    <div>
                      <InputText
                        value={stylesProps.dataFont.fontSize}
                        onChange={handleInput}
                        className="w-full"
                        name="gap"
                        readOnly
                      />
                      <Slider
                        value={stylesProps.dataFont.fontSize}
                        onChange={(e) => handleSliderInput(e, "fontSize")}
                        className="w-full"
                        min={14}
                        max={18}
                      />
                    </div>
                  </div>
                  <div>
                    <span>Font Weight</span>
                    <select
                      value={stylesProps.dataFont.fontWeight}
                      onChange={handleInput}
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
        </div>
      </Dialog>
    </div>
  );
};

export default StylesModal;
