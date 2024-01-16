import React, { useState } from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableDataCell from "../tableDataCell/TableDataCell";
import campaignsData from "../../data/campaignsData.json";
import Campaign from "../campaign/Campaign";

interface ProfileProps {
  profiles: Array<{
    profileId: string;
    country: string;
    marketplace: string;
  }>;
}

const Profile: React.FC<ProfileProps> = ({ profiles }) => {
  const headers = [
    { name: "Profile ID", id: 1 },
    { name: "Country", id: 2 },
    { name: "Marketplace", id: 3 },
  ];

  const fields = ["profileId", "country", "marketplace"];

  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null
  );

  const handleProfileClick = (profileId: string) => {
    setSelectedProfileId(profileId);
  };

  const getCampaignsForProfile = (profileId: string) => {
    return campaignsData.filter((campaign) => campaign.profileId === profileId);
  };

  return (
    <>
      {selectedProfileId ? (
        <Campaign campaigns={getCampaignsForProfile(selectedProfileId)} />
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
            {profiles?.map((profile) => (
              <tr
                key={profile.profileId}
                onClick={() => handleProfileClick(profile.profileId)}
              >
                <TableDataCell
                  key={profile.profileId}
                  fields={fields}
                  values={Object.values(profile)}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Profile;
