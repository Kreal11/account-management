import React, { useState } from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableDataCell from "../tableDataCell/TableDataCell";
import accountsData from "../../data/accountsData.json";
import profilesData from "../../data/profilesData.json";
import Profile from "../profile/Profile";

// interface AccountProps {
//   accounts: Array<{
//     accountId: string;
//     email: string;
//     authToken: string;
//     creationDate: string;
//   }>;
// }

const Account: React.FC = () => {
  const headers = [
    { name: "Account ID", id: 1 },
    { name: "Email", id: 2 },
    { name: "Auth Token", id: 3 },
    { name: "Creation Date", id: 4 },
  ];

  const fields = ["accountId", "email", "authToken", "creationDate"];

  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );

  const handleAccountClick = (accoundId: string) => {
    setSelectedAccountId(accoundId);
  };

  const getProfilesForAccount = (accountId: string) => {
    return profilesData.filter((profile) => profile.accountId === accountId);
  };

  return (
    <>
      {selectedAccountId ? (
        <Profile
          profiles={getProfilesForAccount(selectedAccountId)}
          setSelectedAccountId={setSelectedAccountId}
        />
      ) : (
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
              <tr
                key={account.accountId}
                onClick={() => handleAccountClick(account.accountId)}
              >
                <TableDataCell
                  key={account.accountId}
                  fields={fields}
                  values={Object.values(account)}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Account;
