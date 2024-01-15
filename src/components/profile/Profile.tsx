import React from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableDataCell from "../tableDataCell/TableDataCell";

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
          {profiles?.map((profile) => (
            <TableDataCell
              key={profile.profileId}
              values={Object.values(profile)}
            />
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Profile;
