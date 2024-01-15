import React from "react";

interface TableDataCellProps {
  values: (string | number)[];
}

const TableDataCell: React.FC<TableDataCellProps> = ({ values }) => {
  return (
    <>
      {values.map((value, index) => (
        <td key={index}>{value}</td>
      ))}
    </>
  );
};

export default TableDataCell;
