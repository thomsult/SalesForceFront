import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GraphVisualisation from "./service/GraphVisualisation";

import ParserToNode from "../Lobby/utils/ParserToNode";
import { LobbyContext } from "../Lobby/LobbyContext";
import { AuthContext } from "../../../services/AuthContext";
// ------------------- InterFaceVisualisation ------------------- //

function InterFaceVisualisation() {
  const nav = useNavigate();
  const { socket } = useContext(AuthContext);
  const { project, currentUser, openMenu } = useContext(LobbyContext);
  const [GraphState, setGraphState] = useState({ ...project[0] });
  const graph = useRef(null);
  const [test, setTest] = useState(0);
  useEffect(() => {
    if (graph.current && project[0]) {
      graph.current = GraphVisualisation(
        ParserToNode(GraphState),
        currentUser.id,
        openMenu
      );
    }
  }, [GraphState, openMenu, test]);
  useEffect(() => {
    socket.on("ReloadState", ({ data }) => {
      if (data?.data) {
        setGraphState((e) => {
          return { ...e, ...data.data };
        });
      } else {
        setTest((prev) => prev + 1);
        console.warn("ReloadState", data);
        nav(0);
      }
    });
  }, [socket]);

  return (
    <section
      id="project-visualisation"
      className="flex flex-col justify-end items-end"
    >
      <svg ref={graph} id="area-svg">
        <g />
      </svg>
    </section>
  );
}

export default InterFaceVisualisation;
