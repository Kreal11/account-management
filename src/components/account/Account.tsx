import React from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableDataCell from "../tableDataCell/TableDataCell";
import accountsData from "../../data/accountsData.json";

interface AccountProps {
  accounts: Array<{
    accountId: string;
    email: string;
    authToken: string;
    creationDate: string;
  }>;
}

const Account: React.FC = () => {
  const headers = [
    { name: "Account ID", id: 1 },
    { name: "Email", id: 2 },
    { name: "Auth Token", id: 3 },
    { name: "Creation Date", id: 4 },
  ];

  return (
    <table>
      <thead>
        <tr>
          {headers?.map((header) => (
            <TableHeader key={header.id} {...header} />
          ))}
        </tr>
      </thead>
      <tbody>
        {accountsData?.map((account) => (
          <tr key={account.accountId}>
            <TableDataCell
              key={account.accountId}
              values={Object.values(account)}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Account;
