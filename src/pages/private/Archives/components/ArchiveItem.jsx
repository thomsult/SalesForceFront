import PropTypes from "prop-types";
import React from "react";

import MenuButton from "../../../../components/utils/ContextMenu/MenuButtonEditRemove";
import { Dot } from "./utils";

export default function ArchiveItem({
  Hashtag,
  infos,
  date,
  remove,
  index,
  addProject,
}) {
  return (
    <li
      className="flex whitespace-nowrap  justify-between  w-full py-3  "
      draggable
    >
      <p className="mx-5 text-sm w-[5em]">{Hashtag}</p>
      <div className="flex text-sm w-0 invisible md:visible md:w-1/2 md:max-w-xl  items-center justify-around">
        {infos.map(({ type, content }) => (
          <span key={type}>
            {type}: <Dot count={content.split(";").length} />
          </span>
        ))}
      </div>
      <div className="flex  gap-5 mx-5 md:w-1/2 justify-end max-w-[15em] ">
        <p className="text-sm">{date}</p>
        <MenuButton titleComposant={<span>Éditer</span>}>
          <button
            onClick={() => remove(index)}
            type="button"
            className="hover:bg-gray-50  px-4 py-2 text-sm text-gray-700 flex w-full"
          >
            Supprimer
          </button>
          <button
            type="button"
            className="hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 flex w-full"
          >
            Modifier
          </button>
          <button
            type="button"
            onClick={() => addProject(index)}
            className="hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 flex w-full"
          >
            Ajouter a un projet
          </button>
        </MenuButton>
      </div>
    </li>
  );
}

ArchiveItem.defaultProps = {
  Hashtag: "",
  date: "",
  index: 0,
  infos: [
    { type: "textes", content: "your content" },
    { type: "images", content: "https://via.placeholder.com/150" },
    { type: "vidéos", content: "https://www.youtube.com/" },
  ],
  remove: () => {},
  addProject: () => {},
};

ArchiveItem.propTypes = {
  Hashtag: PropTypes.string,
  date: PropTypes.string,
  index: PropTypes.number,
  infos: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      content: PropTypes.string,
    })
  ),
  remove: PropTypes.func,
  addProject: PropTypes.func,
};
