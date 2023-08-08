import React, { useEffect, useRef, useState } from "react";
import { tableData } from "../../tableData";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { MultiSelect } from "primereact/multiselect";

import { Toolbar } from "primereact/toolbar";

import "./table.css";
import TableStyleModal from "../TableStyleModal/TableStyleModal";

import { Button } from "primereact/button";
import { FaPaintBrush } from "react-icons/fa";
import StyleModal from "../StylesModal/StylesModal";

import styles from "./tableStyles.module.css";

const Table = ({
  isTemplateEditable,
  visibleRows,
  setVisibleRows,
  visibleColumns,
  setVisibleColumns,
}) => {
  const [columnStyleProps, setColumnStyleProps] = useState({
    backgroundColor: "#fff",
    fontSize: "14",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#333",
  });

  const [subHeaderStyleProps, setSubHeaderStyleProps] = useState({
    width: "100%",
    fontSize: 16,
    backgroundColor: "#E6DFDF",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#333",
  });

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const [visible, setVisible] = useState(false);

  const chargesTableRef = useRef(null);

  const footerTemplate = () => {
    return (
      <React.Fragment>
        <div className="table-footer">
          <span>View exchange rates</span>
          <span>Total SGD 0.13</span>
        </div>
      </React.Fragment>
    );
  };

  const handleTable = (e) => {
    console.log(e.target);
  };

  const columns = [
    { field: "charges", header: "Charges" },
    { field: "basic", header: "Basic" },
    { field: "quantity", header: "Quantity" },
    { field: "amount", header: "Amount" },
    {
      field: "amount_in_preferred_currency",
      header: "Amount in Preferred Currency",
    },
  ];

  useEffect(() => {
    setProducts(tableData);
    setVisibleRows(tableData);
    setVisibleColumns(columns);
  }, []);

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
    setVisibleColumns(orderedSelectedColumns);
  };

  const deleteChargeHandler = (e) => {
    let selectedColumns = e.value;
    let orderedSelectedColumns = products.filter((col) =>
      selectedColumns.some((sCol) => sCol.legName === col.legName)
    );
    setVisibleRows(orderedSelectedColumns);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className={styles.headerContainer}>
        <div>
          <span>Showed Rows</span>
          <MultiSelect
            value={visibleRows}
            onChange={deleteChargeHandler}
            options={products}
            optionLabel="legName"
            display="chip"
            placeholder="Hidden Legs"
            maxSelectedLabels={3}
            className="w-full md:w-20rem"
          />
        </div>
        <div>
          <span>Showed Columns</span>
          <MultiSelect
            value={visibleColumns}
            options={columns}
            optionLabel="header"
            onChange={onColumnToggle}
            className="w-full sm:w-20rem"
            display="chip"
          />
        </div>
        <div className={styles.editButton}>
          <Button label="Customize" onClick={() => setVisible(true)}>
            <FaPaintBrush />
          </Button>
        </div>
      </div>
    );
  };

  const tableCustomizationHanlder = () => {
    console.log(chargesTableRef.current.props);
  };

  const reorderHandler = (e) => {
    setVisibleRows(e.value);
  };

  const subHeaderTemplate = (data) => {
    return (
      <div style={subHeaderStyleProps}>
        <span>{data.legName}</span>
        <span>{data.amount_in_preferred_currency}</span>
      </div>
    );
  };

  return (
    <div style={{ width: "100%", padding: "20px 0" }}>
      <TableStyleModal
        subHeaderStyleProps={subHeaderStyleProps}
        setSubHeaderStyleProps={setSubHeaderStyleProps}
        columnStyleProps={columnStyleProps}
        setColumnStyleProps={setColumnStyleProps}
        visible={visible}
        setVisible={setVisible}
      />
      {isTemplateEditable && (
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
      )}
      <DataTable
        ref={chargesTableRef}
        value={visibleRows}
        tableClassName="table-background"
        stripedRows
        showGridlines
        rowGroupMode="subheader"
        groupRowsBy="legName"
        rowGroupHeaderTemplate={subHeaderTemplate}
        footer={footerTemplate}
        reorderableColumns
        sortMode="single"
        sortOrder={1}
        reorderableRows
        onRowReorder={reorderHandler}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        onClick={tableCustomizationHanlder}
      >
        <Column
          rowReorder={isTemplateEditable}
          style={{ display: isTemplateEditable ? "block" : "none" }}
        />
        {visibleColumns.map((col) => (
          <Column
            style={columnStyleProps}
            key={col.field}
            field={col.field}
            header={col.header}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default Table;
