import React, { useState } from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableDataCell from "../tableDataCell/TableDataCell";
import campaignsData from "../../data/campaignsData.json";
import Campaign from "../campaign/Campaign";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
  profiles?: Array<{
    profileId: string;
    country: string;
    marketplace: string;
  }>;
  setSelectedAccountId?: (accountId: string | null) => void;
}

type Profile = {
  profileId: string;
  country: string;
  marketplace: string;
};

const Profile: React.FC<ProfileProps> = ({
  profiles,
  setSelectedAccountId,
}) => {
  const headers = [
    { name: "Profile ID", id: 1 },
    { name: "Country", id: 2 },
    { name: "Marketplace", id: 3 },
  ];

  const fields: (keyof Profile)[] = ["profileId", "country", "marketplace"];

  const sortOptions = [
    { key: "", label: "Sort by...", disabled: true },
    { key: "alphabetical-country", label: "Alphabetical by Country" },
    { key: "alphabetical-marketplace", label: "Alphabetical by Marketplace" },
  ];

  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null
  );
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [filter, setFilter] = useState<string>("");

  const navigate = useNavigate();

  const handleProfileClick = (profileId: string) => {
    setSelectedProfileId(profileId);
  };

  const handleBackClick = () => {
    setSelectedAccountId?.(null);
    navigate("/accounts");
  };

  const getCampaignsForProfile = (profileId: string) => {
    return campaignsData.filter((campaign) => campaign.profileId === profileId);
  };

  const filteredProfiles: Profile[] = (profiles || []).filter((profile) =>
    fields.some((field) =>
      profile[field].toLowerCase().trim().includes(filter.toLowerCase().trim())
    )
  );

  const sortOptionsMap: Record<string, (a: Profile, b: Profile) => number> = {
    "": () => 0,
    "alphabetical-country": (a, b) => a.country.localeCompare(b.country),
    "alphabetical-marketplace": (a, b) =>
      a.marketplace.localeCompare(b.marketplace),
  };

  const handleSortChange = (selectedOption: string) => {
    setSortConfig({ key: selectedOption, direction: "asc" });
  };

  const sortedProfiles = [...filteredProfiles];

  if (sortConfig) {
    const sortFunction = sortOptionsMap[sortConfig.key];
    if (sortFunction) {
      sortedProfiles.sort(
        (a, b) => sortFunction(a, b) * (sortConfig.direction === "asc" ? 1 : -1)
      );
    }
  }

  return (
    <>
      <button className="btn btn-primary" onClick={handleBackClick}>
        Back to Accounts
      </button>
      {selectedProfileId ? (
        <Campaign
          campaigns={getCampaignsForProfile(selectedProfileId)}
          setSelectedProfileId={setSelectedProfileId}
        />
      ) : (
        <>
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
              {sortedProfiles?.map((profile) => (
                <tr
                  key={profile.profileId}
                  onClick={() => handleProfileClick(profile.profileId)}
                >
                  <TableDataCell
                    key={profile.profileId}
                    fields={fields}
                    values={fields.map((field) => profile[field])}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Profile;
