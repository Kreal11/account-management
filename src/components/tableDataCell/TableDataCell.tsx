import React from "react";
import "./TableDataCell.css";

interface TableDataCellProps {
  values: (string | number)[];
  fields: string[];
}

const TableDataCell: React.FC<TableDataCellProps> = ({ values, fields }) => {
  return (
    <>
      {fields.map((_, index) => (
        <td key={values[index]}>{values[index]}</td>
      ))}
    </>
  );
};

export default TableDataCell;
