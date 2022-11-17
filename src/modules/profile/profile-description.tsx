import { User } from "@src/model";
import React from "react";
import { ProfileDescriptionEdit } from "./profile-description-edit";
import { ProfileDescriptionStatic } from "./profile-description-static";

interface ProfileDescriptionProps {
  userData: User;
}

export const ProfileDescription = (props: ProfileDescriptionProps) => {
  const [editProfile, setEditProfile] = React.useState(false);
  const [profile, setProfile] = React.useState<User>(props.userData);

  return (
    <>
      {!editProfile ? (
        <ProfileDescriptionStatic profile={profile} onEdit={setEditProfile} />
      ) : (
        <ProfileDescriptionEdit
          profile={profile}
          editProfile={setProfile}
          onEdit={setEditProfile}
        />
      )}
    </>
  );
};
