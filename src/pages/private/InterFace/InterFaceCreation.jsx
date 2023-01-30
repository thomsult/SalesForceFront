/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-use-before-define */
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState, useContext } from "react";
import * as d3 from "d3";

import {
  PlusSmallIcon,
  InboxArrowDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

import ButtonInterFace from "@components/InterFace/ButtonIterFace";
import MessagePopUp from "@components/InterFace/MessagePopUp";
import { LobbyContext } from "../Lobby/LobbyContext";
import DataCurrentDisplay from "./DataCurrentDisplay";
import ModalEditDataNode from "./ModalEditDataNode";
import NodeForNext from "./NodeForNext";

// import method crud for client app node
import postNode from "./service/postNode";
import deleteNode from "./service/deleteNode";
import createNode from "./service/createNode";
import updateNode from "./service/updateNode";
// import another method
import getHashtagsByUser from "./service/getHashtagsByUser";
import getUserData from "./service/getUserData";
import displayTimeMessage from "./service/displayTimeMessage";

// ------------------- InterFace ------------------- //
function InterFaceCreation({ NextStep }) {
  const svgRef = useRef(null);
  // all nodes data
  const [nodes, setNodes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [dataBase, setDataBase] = useState([]);

  // inside one node data
  const [titleNode, setTitleNode] = useState("Hashtag");
  const [colorNode, setColorNode] = useState("75,177,216");
  const [textNode, setTextNode] = useState("");
  const [lienNode, setLienNode] = useState("");
  const [imageNode, setImageNode] = useState("");
  const [videoNode, setVideoNode] = useState("");

  // Current data node display
  const [currentNode, setCurrentNode] = useState("no current");

  // Nodes to send into next step
  const [dataNext, setDateNext] = useState([]);

  // show form update
  const [showForm, setShowForm] = useState(false);
  // show form createNode button
  const [showCreateButton, setShowCreateButton] = useState("create");

  // Display message
  const [displayMessage, setDisplayMessage] = useState(false);

  let centerX;
  let centerY;

  const svg = d3.select(svgRef.current).attr("class", "cursor-crosshair");

  if (!svg.empty()) {
    centerX = svg.node().clientWidth / 2;
    centerY = svg.node().clientHeight / 2;
  }

  svg.call(d3.zoom().scaleExtent([0.1, 10]).on("zoom", zoomed));
  svg.call(
    d3.zoom().transform,
    d3.zoomIdentity.scale(1).translate(centerX, centerY)
  );

  // hook useEffect for refresh the simulation
  useEffect(() => {
    // settings force & collision
    const simulation = d3
      .forceSimulation(nodes)
      .force("nodes", d3.forceManyBody())
      .force("collide", d3.forceCollide().radius(60))
      .on("tick", ticked);

    // display DataCurrentDisplay func && selected Node
    svg.on("click", (e) => {
      const idTarget = d3.select(e.target).attr("id");
      let idCurrentNode;

      if (currentNode !== "no current") {
        idCurrentNode = JSON.parse(currentNode).id.toString();
      } else {
        idCurrentNode = currentNode;
      }

      if (idTarget !== null && idTarget === "area-svg") {
        setCurrentNode("no current");
        d3.selectAll(".node").attr("stroke-width", 5);
      }

      if (currentNode !== "no current" && e.target.id !== idCurrentNode) {
        d3.selectAll(".node").attr("stroke-width", 5);
      } else if (
        currentNode !== "no current" &&
        e.target.id === idCurrentNode
      ) {
        d3.selectAll(".node").attr("stroke-width", 5);
        d3.select(e.target).attr("stroke-width", 15);
      }
      simulation.alpha(1).restart();
    });

    // Node Construction with d3 library ; add animation into node creation (animate-spawnCell)
    let node = svg
      .select("g")
      .attr("id", "graph-area")
      .selectAll(".node")
      .data(nodes);

    node.exit().remove();

    const nodeEnter = node
      .enter()
      .append("circle")
      .attr("class", "node cursor-grab animate-spawnCell")
      .attr("id", (d) => d.id)
      .attr("r", (d) => d.size)
      .attr("fill", (d) => `rgba(${d.color},0.5)`)
      .attr("stroke-width", 5)
      .attr("stroke", (d) => `rgba(${d.color},0.8)`)
      .on("click", selectNode)
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    node = nodeEnter.merge(node);
    // end construction node

    // Title hashtags (every node's title)
    let title = svg
      .select("g")
      .selectAll(".node-title")
      .data(nodes, (d) => d.id);

    title.exit().remove();

    const titleEnter = title
      .enter()
      .append("text")
      .attr("class", "node-title")
      .text((d) => `#${d.name}`)
      .attr("data-id", (d) => d.id)
      .attr("isSelected", "false")
      .attr("text-anchor", "middle")
      .attr("fill", "#374151");

    title = titleEnter.merge(title);
    // end title hashtag

    function ticked() {
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      title.attr("x", (d) => d.x).attr("y", (d) => d.y + 15);
    }

    // restart the simulation method
    simulation.alpha(1).restart();

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(1).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
      d3.select(`[id="${event.subject.id}"]`).attr(
        "class",
        "node cursor-grabbing stroke-indigo-500"
      );
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
      d3.select(`[id="${event.subject.id}"]`).attr(
        "class",
        "node cursor-grabbing stroke-indigo-500"
      );
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
      d3.select(`[id="${event.subject.id}"]`).attr("class", "node cursor-grab");
    }
    getHashtagsByUser(setDataBase);

    /* animate selected node to next step */
    svg
      .selectAll(`[isSelected="true"]`)
      .attr("class", "node-title animate-selectCell");
    svg
      .selectAll(`[isSelected="false"]`)
      .attr("class", "node-title animate-none");
  }, [nodes, currentNode, dataNext]);

  // method zone ----------------------------------------------------------

  /* show form to fill before create node */
  const createNewNode = () => {
    setShowForm(true);
    setShowCreateButton("create");
    setCurrentNode("no current");
  };

  /* selection du noeud */
  const selectNode = (event) => {
    const currentToChange = d3.select(event.target).datum();
    setTitleNode(currentToChange.name);
    setTextNode(currentToChange.children[0].content);
    setLienNode(currentToChange.children[1].content);
    setImageNode(currentToChange.children[2].content);
    setVideoNode(currentToChange.children[3].content);
    const result = JSON.stringify(currentToChange);
    setCurrentNode(result);
  };

  /* Mise à jour du noeud */
  const resetAll = () => {
    setShowForm(false);
    setCurrentNode("no current");
    setColorNode("75,177,216");
  };

  /* zoom func for d3 */
  function zoomed(e) {
    d3.select("g").attr("transform", e.transform);
  }

  /* show the component ModalEditDataNode */
  function showFormNode() {
    setShowForm(!showForm);
  }

  const project = useContext(LobbyContext)?.project[0] || {};
  return (
    <section className="bg-gray-300 relative h-screen w-screen lg:w-full">
      <nav className="h-16 absolute top-24 w-[90%] bg-white shadow-xl ml-2 rounded-md p-1.5 flex">
        <div className="flex flex-1 gap-2">
          <ButtonInterFace
            method={() => {
              createNewNode();
              setTitleNode("Hashtag");
              setTextNode("");
            }}
            isActivated={true}
            name="Ajouter"
            icon={<PlusSmallIcon className="h-6 w-6" aria-hidden="true" />}
          />
          <ButtonInterFace
            method={() => {
              postNode(
                getUserData().id,
                currentNode,
                () => {
                  deleteNode(currentNode, nodes, setNodes, setCurrentNode);
                },
                () => {
                  displayTimeMessage(displayMessage, setDisplayMessage);
                },
                "hashtags"
              );
            }}
            isActivated={currentNode !== "no current" && dataNext.length === 0}
            name="Archiver"
            icon={<InboxArrowDownIcon className="h-6 w-6" aria-hidden="true" />}
          />
        </div>
        {project !== undefined && project?.id && (
          <>
            {dataNext.length > 0 && (
              <NodeForNext
                nodesToSendNext={dataNext}
                removeAll={setDateNext}
                idProject={project.id}
                NextStep={NextStep}
                noCurrent={setCurrentNode}
              />
            )}
            {dataNext.length < 1 && (
              <button
                className="bg-blue-500 w-fit hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={NextStep}
                type="button"
              >
                suivant
              </button>
            )}
          </>
        )}
      </nav>
      <MessagePopUp
        message="L'une de vos idées portent déjà ce nom."
        type="Attention"
        icon={
          <ExclamationCircleIcon className="h-10 w-10" aria-hidden="true" />
        }
        activated={displayMessage}
        colorMessage="red"
      />
      {showForm ? (
        <div className="animate-appear">
          <ModalEditDataNode
            showCreateButton={showCreateButton}
            methodClose={() => {
              setShowForm(false);
            }}
            titleNodeModal={titleNode}
            setTitleNodeModal={setTitleNode}
            createNodeModal={() => {
              createNode(
                nodes,
                titleNode,
                colorNode,
                textNode,
                lienNode,
                imageNode,
                videoNode,
                setNodes,
                setShowCreateButton
              );
              setShowForm(false);
              setTitleNode("Hashtag");
              setColorNode("75,177,216");
              setTitleNode("");
              setLienNode("");
              setTextNode("");
              setImageNode("");
              setVideoNode("");
            }}
            updateNodeModal={() => {
              updateNode(
                resetAll,
                currentNode,
                nodes,
                setNodes,
                titleNode,
                colorNode,
                textNode,
                lienNode,
                imageNode,
                videoNode
              );
            }}
            changeColorModal={setColorNode}
            colorNodeModal={colorNode}
            textNodeModal={textNode}
            lienNodeModal={lienNode}
            imageNodeModal={imageNode}
            videoNodeModal={videoNode}
            changeTextModal={setTextNode}
            changeLienModal={setLienNode}
            changeImageModal={setImageNode}
            changeVideoModal={setVideoNode}
          />
        </div>
      ) : null}

      <DataCurrentDisplay
        dataNode={currentNode}
        isDisplay={currentNode !== "no current"}
        putMethod={showFormNode}
        dataNext={dataNext}
        setDataNext={setDateNext}
        showMessage={() =>
          displayTimeMessage(displayMessage, setDisplayMessage)
        }
        closeDataDisplay={() => {
          setCurrentNode("no current");
        }}
      />

      <svg ref={svgRef} width="100%" height="100%" id="area-svg">
        <g />
      </svg>
    </section>
  );
}

InterFaceCreation.defaultProps = {
  NextStep: () => {},
};

InterFaceCreation.propTypes = {
  NextStep: PropTypes.func,
};

export default InterFaceCreation;
