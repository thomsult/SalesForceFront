/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-useless-escape */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { PlusSmallIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import ButtonInterFace from "@components/InterFace/ButtonIterFace";
import ListItemInput from "@components/InterFace/ListItemInput";

function ModalEditDataNode({
  showCreateButton,
  methodClose,
  titleNodeModal,
  textNodeModal,
  colorNodeModal,
  lienNodeModal,
  imageNodeModal,
  videoNodeModal,
  setTitleNodeModal,
  createNodeModal,
  updateNodeModal,
  changeColorModal,
  changeTextModal,
  changeLienModal,
  changeImageModal,
  changeVideoModal,
}) {
  const [lien, setLien] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");

  const handleChangeColor = (e) => {
    changeColorModal(e.target.value);
  };

  const handleChangeText = (e) => {
    changeTextModal(e.target.value);
  };

  /* handler event for creation */
  const handleChangeName = (e) => {
    setTitleNodeModal(e.target.value);
  };

  const resetField = () => {
    setLien("");
    setImage("");
    setVideo("");
  };

  const patternLien =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;

  const patternImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

  const patternVideo =
    /^(http:\/\/|https:\/\/)(vimeo\.com|youtu\.be|www\.youtube\.com)\/([\w\/]+)([\?].*)?$/g;

  const addUrl = (url, patternType, verifyString, methodSet, reset, set) => {
    const isUrl = verifyString(url, patternType);

    if (isUrl) {
      methodSet(`${set};${url}`);
    }

    reset();
  };

  function checkUrl(str, patternReg) {
    const pattern = patternReg;
    return !!pattern.test(str);
  }

  return (
    <div className=" z-50 top-0 w-full h-[100vh] absolute">
      <div className="w-full h-full absolute top-0 z-0 bg-gray-800 opacity-80" />
      <div className="animate-slideTop bg-white rounded-2xl flex flex-wrap gap-4 justify-between relative  w-[80%] mx-auto mt-24 min-h-[50vh] max-h-[80vh] p-5 shadow-2xl overflow-y-auto">
        <h1 className="text-xl font-medium text-gray-700 text-center">
          {showCreateButton === "create" ? "Créer un " : "Modifier le "}
          Hashtag
        </h1>
        <div className="w-full flex flex-row items-center gap-2">
          <h2 className="text-md font-medium text-gray-800">Couleur</h2>
          <div
            className="h-10 w-10 rounded-full"
            style={{ backgroundColor: `rgba(${colorNodeModal},0.8)` }}
          />
          <select onChange={handleChangeColor} id="color-select">
            {showCreateButton !== "create" ? (
              <option value={colorNodeModal}> couleur actuelle</option>
            ) : null}
            <option value="75,177,216">bleu</option>
            <option value="36,201,126">vert</option>
            <option value="209,76,57">rouge</option>
          </select>
        </div>

        <div className="absolute top-4 right-4">
          <ButtonInterFace
            isActivated={true}
            name="Close"
            method={methodClose}
            icon={<XMarkIcon className="h-6 w-6" aria-hidden="true" />}
          />
        </div>

        <div className="w-full lg:w-[45%] ">
          <label htmlFor="title" className="text-md font-medium text-gray-800">
            Titre :
          </label>
          <input
            name="title"
            className="peer px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none text-gray-700"
            value={titleNodeModal}
            onChange={handleChangeName}
            placeholder="Ajouter un titre..."
            required
          />
        </div>

        <div className="w-full lg:w-[45%] ">
          <label htmlFor="texte" className="text-md font-medium text-gray-800">
            Texte :
          </label>
          <textarea
            rows="4"
            cols="50"
            name="texte"
            maxLength="255"
            className="resize-none peer px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full max-h-xl rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none text-gray-700"
            value={textNodeModal}
            onChange={handleChangeText}
            placeholder="Ajouter du contenu..."
            required
          />
        </div>

        <ListItemInput
          titleInput="Liens"
          valueInput={lien}
          onChangeInput={(e) => {
            setLien(e.target.value);
          }}
          onClickInput={() => {
            addUrl(
              lien,
              patternLien,
              checkUrl,
              changeLienModal,
              resetField,
              lienNodeModal
            );
          }}
          listItem={lienNodeModal}
          deleteLienModal={changeLienModal}
          placeholderExemple="https://exemple.com"
          limitAdd={5}
        />

        <ListItemInput
          titleInput="Images"
          valueInput={image}
          onChangeInput={(e) => {
            setImage(e.target.value);
          }}
          onClickInput={() => {
            addUrl(
              image,
              patternImage,
              checkUrl,
              changeImageModal,
              resetField,
              imageNodeModal
            );
          }}
          listItem={imageNodeModal}
          deleteLienModal={changeImageModal}
          placeholderExemple="https://exemple/image.jpg"
          limitAdd={5}
        />

        <ListItemInput
          titleInput="Vidéos"
          valueInput={video}
          onChangeInput={(e) => {
            setVideo(e.target.value);
          }}
          onClickInput={() => {
            addUrl(
              video,
              patternVideo,
              checkUrl,
              changeVideoModal,
              resetField,
              videoNodeModal
            );
          }}
          listItem={videoNodeModal}
          deleteLienModal={changeVideoModal}
          placeholderExemple="https://www.youtube.com/watch?v=_tmA751lb6Q"
          limitAdd={5}
        />
        <div className="w-full flex justify-center">
          {showCreateButton ? (
            <ButtonInterFace
              method={createNodeModal}
              isActivated={
                titleNodeModal.length !== 0 && textNodeModal.length !== 0
              }
              name="Ajouter"
              icon={<PlusSmallIcon className="h-6 w-6" aria-hidden="true" />}
            />
          ) : (
            <ButtonInterFace
              method={updateNodeModal}
              isActivated={
                titleNodeModal.length !== 0 && textNodeModal.length !== 0
              }
              name="Valider"
              icon={<CheckIcon className="h-6 w-6 px-0.5" aria-hidden="true" />}
            />
          )}
        </div>
      </div>
    </div>
  );
}

ModalEditDataNode.propTypes = {
  showCreateButton: PropTypes.string.isRequired,
  methodClose: PropTypes.func.isRequired,
  titleNodeModal: PropTypes.string.isRequired,
  textNodeModal: PropTypes.string.isRequired,
  lienNodeModal: PropTypes.string.isRequired,
  imageNodeModal: PropTypes.string.isRequired,
  videoNodeModal: PropTypes.string.isRequired,
  setTitleNodeModal: PropTypes.func.isRequired,
  createNodeModal: PropTypes.func.isRequired,
  updateNodeModal: PropTypes.func.isRequired,
  changeColorModal: PropTypes.func.isRequired,
  changeTextModal: PropTypes.func.isRequired,
  changeLienModal: PropTypes.func.isRequired,
  changeImageModal: PropTypes.func.isRequired,
  changeVideoModal: PropTypes.func.isRequired,
  colorNodeModal: PropTypes.string.isRequired,
};

export default ModalEditDataNode;
