import React, { useState } from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableDataCell from "../tableDataCell/TableDataCell";
import { useNavigate } from "react-router-dom";

interface CampaignProps {
  campaigns?: Array<{
    campaignId: string;
    clicks: number;
    cost: number;
    date: string;
  }>;
  setSelectedProfileId?: (accountId: string | null) => void;
}

type Campaign = {
  campaignId: string;
  clicks: number;
  cost: number;
  date: string;
};

const Campaign: React.FC<CampaignProps> = ({
  campaigns,
  setSelectedProfileId,
}) => {
  const headers = [
    { name: "Campaign ID", id: 1 },
    { name: "Clicks", id: 2 },
    { name: "Cost", id: 3 },
    { name: "Date", id: 4 },
  ];

  const sortOptions = [
    { key: "", label: "Sort by...", disabled: true },
    { key: "popular-first", label: "Popular first" },
    { key: "unpopular-first", label: "Unpopular first" },
    { key: "expensive-first", label: "Expensive first" },
    { key: "inexpensive-first", label: "Inexpensive first" },
    { key: "newest-first", label: "Newest first" },
    { key: "oldest-first", label: "Oldest first" },
  ];

  const [filter, setFilter] = useState<string>("");
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const fields: (keyof Campaign)[] = ["campaignId", "clicks", "cost", "date"];

  const handleBackClick = () => {
    setSelectedProfileId?.(null);
    navigate("/accounts/:accountId/profiles");
  };

  const filteredCampaigns: Campaign[] = (campaigns || []).filter((campaign) =>
    fields.some((field) =>
      String(campaign[field])
        .toLowerCase()
        .trim()
        .includes(filter.toLowerCase().trim())
    )
  );

  const sortOptionsMap: Record<string, (a: Campaign, b: Campaign) => number> = {
    "": () => 0,
    "popular-first": (a, b) => b.clicks - a.clicks,
    "unpopular-first": (a, b) => a.clicks - b.clicks,
    "expensive-first": (a, b) => b.cost - a.cost,
    "inexpensive-first": (a, b) => a.cost - b.cost,
    "newest-first": (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime(),
    "oldest-first": (a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime(),
  };

  const handleSortChange = (selectedOption: string) => {
    setSortConfig({ key: selectedOption, direction: "asc" });
  };

  const sortedCampaigns = [...filteredCampaigns];

  if (sortConfig) {
    const sortFunction = sortOptionsMap[sortConfig.key];
    if (sortFunction) {
      sortedCampaigns.sort(
        (a, b) => sortFunction(a, b) * (sortConfig.direction === "asc" ? 1 : -1)
      );
    }
  }

  return (
    <>
      <button className="btn btn-primary" onClick={handleBackClick}>
        Back to Profiles
      </button>
      <input
        className="form-control"
        type="text"
        placeholder="Search by any column"
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
      <table className="table">
        <thead>
          <tr>
            {headers?.map((header) => (
              <TableHeader key={header.id} {...header} />
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedCampaigns?.map((campaign) => (
            <tr key={campaign.campaignId}>
              <TableDataCell
                key={campaign.campaignId}
                fields={fields}
                values={fields.map((field) => campaign[field])}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Campaign;
