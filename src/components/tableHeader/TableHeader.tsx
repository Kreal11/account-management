import React from "react";

interface TableHeaderProps {
  name: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ name }) => {
  return (
    <>
      <th>{name}</th>
    </>
  );
};

export default TableHeader;
