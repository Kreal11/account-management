import React, { useState } from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableDataCell from "../tableDataCell/TableDataCell";
import accountsData from "../../data/accountsData.json";
import profilesData from "../../data/profilesData.json";
import Profile from "../profile/Profile";

type Account = {
  accountId: string;
  email: string;
  authToken: string;
  creationDate: string;
};

const Account: React.FC = () => {
  const headers = [
    { name: "Account ID", id: 1 },
    { name: "Email", id: 2 },
    { name: "Auth Token", id: 3 },
    { name: "Creation Date", id: 4 },
  ];

  const fields: (keyof Account)[] = [
    "accountId",
    "email",
    "authToken",
    "creationDate",
  ];

  const sortOptions = [
    { key: "", label: "Sort by...", disabled: true },
    { key: "newest-first", label: "Newest first" },
    { key: "oldest-first", label: "Oldest first" },
    { key: "alphabetical-email", label: "Alphabetical by email" },
    { key: "id-ascending", label: "ID ascending" },
    { key: "id-descending", label: "ID descending" },
  ];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );
  const [filter, setFilter] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handlePageChange = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleAccountClick = (accoundId: string) => {
    setSelectedAccountId(accoundId);
  };

  const filteredAccounts: Account[] = accountsData.filter((account) =>
    fields.some((field) =>
      account[field].toLowerCase().trim().includes(filter.toLowerCase().trim())
    )
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleAccounts = filteredAccounts.slice(0, endIndex);

  const getProfilesForAccount = (accountId: string) => {
    return profilesData.filter((profile) => profile.accountId === accountId);
  };

  const sortOptionsMap: Record<string, (a: Account, b: Account) => number> = {
    "": () => 0,
    "newest-first": (a, b) =>
      new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(),
    "oldest-first": (a, b) =>
      new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime(),
    "alphabetical-email": (a, b) => a.email.localeCompare(b.email),
    "id-ascending": (a, b) => parseInt(a.accountId) - parseInt(b.accountId),
    "id-descending": (a, b) => parseInt(b.accountId) - parseInt(a.accountId),
  };

  const handleSortChange = (selectedOption: string) => {
    setSortConfig({ key: selectedOption, direction: "asc" });
  };

  const sortedAccounts = [...visibleAccounts];

  if (sortConfig) {
    const sortFunction = sortOptionsMap[sortConfig.key];
    if (sortFunction) {
      sortedAccounts.sort(
        (a, b) => sortFunction(a, b) * (sortConfig.direction === "asc" ? 1 : -1)
      );
    }
  }

  return (
    <>
      {selectedAccountId ? (
        <Profile
          profiles={getProfilesForAccount(selectedAccountId)}
          setSelectedAccountId={setSelectedAccountId}
        />
      ) : (
        <>
          <div className="accounts-search-wrapper">
            <input
              className="form-control"
              type="text"
              placeholder="Search by any column"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <select
              className="form-select"
              value={sortConfig?.key}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <table className="table">
            <thead>
              <tr>
                {headers?.map((header) => (
                  <TableHeader key={header.id} {...header} />
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedAccounts?.map((account) => (
                <tr
                  className="table-row"
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
          {filteredAccounts.length > endIndex && (
            <button className="btn btn-primary" onClick={handlePageChange}>
              See more
            </button>
          )}
        </>
      )}
    </>
  );
};

export default Account;
