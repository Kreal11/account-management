import React from "react";

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
