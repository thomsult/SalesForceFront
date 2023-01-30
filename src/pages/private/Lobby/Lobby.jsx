import PropTypes from "prop-types";
import React, { useState } from "react";

import LobbySideBar from "./LobbySideBar";

import InterFaceVisualisation from "../InterFace/InterFaceVisualisation";
import { LobbyProvider } from "./LobbyContext";

import InterFaceCreation from "../InterFace/InterFaceCreation";

export default function Lobby({ projects }) {
  const [step, setStep] = useState(
    parseInt(localStorage.getItem(`lobby ${projects[0].name} step`) || 1, 10)
  );
  const NextStep = () => {
    setStep(() => step + 1);
    localStorage.setItem(`lobby ${projects[0].name} step`, 2);
  };

  return (
    <LobbyProvider step={{ step, setStep }} projects={projects}>
      {step === 1 && <InterFaceCreation NextStep={NextStep} />}
      {step === 2 && <div>Loading...</div>}
      {step === 3 && (
        <div className="flex flex-col 1 h-screen w-screen xl:w-full pt-[4em]">
          <LobbySideBar>
            <InterFaceVisualisation />
          </LobbySideBar>
        </div>
      )}
    </LobbyProvider>
  );
}

Lobby.defaultProps = {
  projects: [],
};

Lobby.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};
