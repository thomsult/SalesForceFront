import PropTypes from "prop-types";
import React from "react";

export default function ProfilsPictures({
  user: { firstName, lastName },
  profilePicture,
  rank,
  isOnline,
}) {
  const Online = "border-yellow-500";
  const Offline = "border-red-500";

  return (
    <div className="relative w-fit  mt-auto self-center">
      <div
        className={` relative h-auto w-48 rounded-full border-8  overflow-hidden ${
          !isOnline ? Online : Offline
        }`}
      >
        <img
          src={profilePicture || "./templateAccount.png"}
          alt={`${firstName} ${lastName} `}
        />
      </div>
      <span
        className={`absolute block -bottom-1 left-1/2 -translate-x-8  px-4 rounded-md ${
          !isOnline ? "bg-yellow-500" : "bg-red-500"
        }`}
      >
        {rank}
      </span>
    </div>
  );
}
ProfilsPictures.defaultProps = {
  isOnline: false,
  profilePicture: "./templateAccount.png",
  rank: 0,
  user: {
    firstName: "Chuck",
    lastName: "Norris",
  },
};

ProfilsPictures.propTypes = {
  isOnline: PropTypes.bool,
  profilePicture: PropTypes.string,
  rank: PropTypes.number,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
};
