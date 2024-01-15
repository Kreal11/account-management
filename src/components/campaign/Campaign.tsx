import React from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableDataCell from "../tableDataCell/TableDataCell";

interface CampaignProps {
  campaigns: Array<{
    campaignId: string;
    clicks: number;
    cost: number;
    date: string;
  }>;
}

const Campaign: React.FC<CampaignProps> = ({ campaigns }) => {
  const headers = [
    { name: "Campaign ID", id: 1 },
    { name: "Clicks", id: 2 },
    { name: "Cost", id: 3 },
    { name: "Date", id: 4 },
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
        <tr>
          {campaigns?.map((campaign) => (
            <TableDataCell
              key={campaign.campaignId}
              values={Object.values(campaign)}
            />
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Campaign;
