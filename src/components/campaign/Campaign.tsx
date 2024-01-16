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

  const [filter, setFilter] = useState<string>("");
  const navigate = useNavigate();

  const fields: (keyof Campaign)[] = ["campaignId", "clicks", "cost", "date"];

  const handleBackClick = () => {
    setSelectedProfileId?.(null);
    navigate("/accounts/:accountId/profiles");
  };

  const filteredCampaigns: Campaign[] | undefined = campaigns?.filter(
    (campaign) =>
      fields.some((field) =>
        campaign[field]
          .toString()
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim())
      )
  );

  return (
    <>
      <button onClick={handleBackClick}>Back to Profiles</button>
      <input
        type="text"
        placeholder="Search by any column name"
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            {headers?.map((header) => (
              <TableHeader key={header.id} {...header} />
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCampaigns?.map((campaign) => (
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
