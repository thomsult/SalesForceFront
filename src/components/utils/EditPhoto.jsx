import React, { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { PropTypes } from "prop-types";
import axiosRequest from "../../services/axiosRequest";
import { DragDropFile } from "./DropFiles";

export default function EditPhoto({ src, alt, label, OnUpload, onBlur }) {
  const [edit, SetEdit] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const handleChange = (e) => {
    SetLoading(true);
    const formData = new FormData();
    formData.append("file", e.dataTransfer.files[0]);
    axiosRequest({
      url: `/api/private/uploads`,
      method: "Post",
      data: formData,
    })
      .then((res) => {
        SetLoading(true);
        console.warn(res.data);
        OnUpload(res.data.FileUploaded);
        SetLoading(false);
        SetEdit(false);
      })
      .catch((err) => {
        console.warn("catch", err);
        SetEdit(true);
        SetLoading(true);
      });
  };

  useEffect(() => {
    return () => {
      if (Loading) {
        onBlur();
      }
    };
  }, [src, Loading]);
  const pictureWidth = 84;
  return (
    <div className="flex  items-center">
      {!edit ? (
        <div className="relative max-w-[15em]  self-center mx-auto">
          <img
            className={`relative w-${pictureWidth} h-${pictureWidth} overflow-hidden  rounded-full border-8  object-cover  border-yellow-500 `}
            src={src}
            alt={alt}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "../../../public/templateAccount.png";
            }}
          />
          <span className="absolute block -bottom-1 left-1/2 -translate-x-8 bg-yellow-500 px-4 rounded-md">
            {label}
          </span>
        </div>
      ) : (
        <div className="relative w-fit max-w-[15em] self-center mx-auto   ">
          <DragDropFile
            className={`w-${pictureWidth} h-${pictureWidth}  flex items-center  px-6 rounded-full border-8 border-gray-300 `}
            onChange={handleChange}
          />
          {Loading && (
            <div className="absolute z-50 top-0 left-0  mt-2 ">
              <div
                className={`w-${pictureWidth} h-${pictureWidth}  border-t-transparent border-solid animate-spin  rounded-full border-yellow-500 border-8 `}
              />
            </div>
          )}
        </div>
      )}
      <PencilSquareIcon
        className="text-gray-400 h-5 w-8 hover:text-gray-600"
        title="Edit Photo"
        onClick={() => SetEdit((e) => !e)}
      />
    </div>
  );
}
EditPhoto.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  OnUpload: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
