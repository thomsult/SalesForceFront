/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as d3 from "d3";
import PropTypes from "prop-types";
import {
  PencilSquareIcon,
  ChevronRightIcon,
  PlusSmallIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import ButtonInterFace from "@components/InterFace/ButtonIterFace";

function DataCurrentDisplay({
  dataNode,
  isDisplay,
  putMethod,
  dataNext,
  setDataNext,
  showMessage,
  closeDataDisplay,
}) {
  const [dataCurrent, setDataCurrent] = useState({});
  const [isHidden, setIsHidden] = useState("hidden");
  const [activateEdit, setActivateEdit] = useState(true);

  // get path's endpoint client
  const pathname = useLocation().pathname.match(/dashboard\/(.*)/);

  // use d3js for show list content
  const displayDataList = (listId) => {
    /* if already display or not */
    if (d3.select(`[id="${listId}"]`).style("display") === "block") {
      d3.select(`[id="${listId}"]`).style("display", "none");
      d3.select(`[id="logo${listId}"]`).style("transform", "rotate(0deg)");
      d3.select(`[id="title-list-${listId}"]`).attr(
        "class",
        "bg-white w-full py-2 px-2 rounded-xl shadow-sm hover:shadow-md hover:scale-110 transition ease-in-out delay-100"
      );
    } else {
      d3.select(`[id="${listId}"]`)
        .style("display", "block")
        .attr("class", "animate-slideLeft py-4");
      d3.select(`[id="logo${listId}"]`).style("transform", "rotate(90deg)");
      d3.select(`[id="title-list-${listId}"]`).attr(
        "class",
        "bg-gray-200 w-full py-2 px-2 rounded-xl shadow-sm hover:shadow-md hover:scale-110 transition ease-in-out delay-100"
      );
    }
  };

  // check the selected node to send into project step 2
  const isNodeToSendValid = (limit) => {
    /* convert data */
    const selectData = JSON.parse(dataNode);

    const test = dataNext.find(
      (item) => item.id === selectData.id || item.name === selectData.name
    );

    if (
      test === undefined ||
      (test.id !== selectData.id &&
        test.name !== selectData.name &&
        dataNext.length <= limit)
    ) {
      setDataNext([...dataNext, selectData]);
      d3.select(`[data-id="${dataCurrent.id}"]`).attr("isSelected", "true");
    } else {
      showMessage();
    }
  };

  useEffect(() => {
    if (dataNode !== "no current") setDataCurrent(JSON.parse(dataNode));
    if (isDisplay === false) setIsHidden("hidden animate-none");
    if (isDisplay === true) setIsHidden("block animate-appear");

    if (d3.select(`[data-id="${dataCurrent.id}"]`).node() !== null) {
      if (
        d3.select(`[data-id="${dataCurrent.id}"]`).attr("isSelected") !==
        "false"
      ) {
        setActivateEdit(false);
      } else {
        setActivateEdit(true);
      }
    }
  }, [dataNode]);

  return (
    <div
      className={`${isHidden} w-full absolute bottom-4 whitespace-pre-wrap md:max-w-2xl break-all `}
    >
      <div className="animate-slideTop bg-white h-fit min-h-[20vh] mx-4 rounded-2xl px-12 py-4 shadow-lg relative">
        <div
          style={{
            backgroundColor: `rgba(${dataCurrent.color},0.5)`,
            borderColor: `rgba(${dataCurrent.color},0.8)`,
          }}
          className="absolute -top-5 left-2 rounded-full border-4 h-10 w-10"
        />
        <div className="flex w-full justify-between mb-12">
          <h1 className="text-lg font-bold text-gray-800 max-w-[33%] truncate">
            Titre : {dataNode !== "no current" ? `${dataCurrent.name}` : null}
          </h1>

          {pathname[1] !== "Interface" && (
            <ButtonInterFace
              name="Sélectionner"
              method={() => {
                isNodeToSendValid(3);
                setActivateEdit(false);
              }}
              isActivated={true}
              icon={<PlusSmallIcon className="h-5 w-5" aria-hidden="true" />}
            />
          )}

          <ButtonInterFace
            name="Modifier"
            method={putMethod}
            isActivated={activateEdit}
            icon={<PencilSquareIcon className="h-5 w-5" aria-hidden="true" />}
          />
          <button
            className="h-fit w-fit rounded-full bg-white hover:bg-gray-200 p-1.5 transition duration-300 ease-in-out"
            type="button"
            onClick={() => {
              closeDataDisplay();
            }}
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {dataCurrent.children ? (
          <ul className="">
            {dataCurrent.children.map((list) => (
              <li key={list.id}>
                <button
                  id={`title-list-${list.id}`}
                  type="button"
                  className="w-full py-2 px-2 rounded-xl shadow-sm hover:shadow-md hover:scale-110 transition ease-in-out delay-100"
                  onClick={() => {
                    displayDataList(list.id);
                  }}
                >
                  <h2 className="flex flex-row gap-4 text-start font-medium capitalize">
                    <div id={`logo${list.id}`}>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    {list.type}
                  </h2>
                </button>
                <div id={list.id} className="hidden">
                  {list.type !== "textes"
                    ? list.content.split(";").map((el, j) =>
                        el ? (
                          <div key={j}>
                            <a
                              className="h-12 text-blue-600 hover:text-blue-800"
                              href={el}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {el}
                            </a>
                            <br />
                          </div>
                        ) : null
                      )
                    : list.content}
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

DataCurrentDisplay.propTypes = {
  dataNode: PropTypes.string,
  putMethod: PropTypes.func,
  isDisplay: PropTypes.bool.isRequired,
  dataNext: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  setDataNext: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  closeDataDisplay: PropTypes.func.isRequired,
};

DataCurrentDisplay.defaultProps = {
  dataNode: "",
  putMethod: () => {},
};

export default DataCurrentDisplay;
