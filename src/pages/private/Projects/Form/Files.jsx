import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropFile } from "../../../../components/utils/DropFiles";
import useCookies from "../../../../hooks/useCookies";

export default function Files({ value, onChange }) {
  const [Loading, SetLoading] = useState(false);
  const { cookies } = useCookies();
  const [url, setUrl] = useState(value);
  const { loginToken } = cookies;
  const handleChange = (e) => {
    SetLoading(true);
    const formData = new FormData();
    formData.append("file", e.dataTransfer.files[0]);
    const config = {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    };
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/private/uploads`,
        formData,
        config
      )
      .then((res) => {
        setTimeout(() => {
          SetLoading(true);
          setUrl(res.data.FileUploaded);
          onChange(res.data.FileUploaded);
        }, 1000);
      })
      .catch((err) => {
        console.warn("catch", err);
        SetLoading(true);
      });
  };
  useEffect(() => {
    if (value) {
      setUrl(value);
      SetLoading(true);
    } else {
      setUrl("");
      SetLoading(false);
    }
  }, [value]);

  return (
    <div name="files">
      <label
        htmlFor="Cover"
        className="block text-sm font-medium text-gray-700"
      >
        Photo de couverture
      </label>
      <div className="rounded-md shadow-sm border mt-1 p-2 border-gray-300">
        {!Loading ? (
          <DragDropFile onChange={(e) => handleChange(e)} />
        ) : (
          <div className=" rounded-md w-full mt-2 mb-4 overflow-hidden">
            <img
              clasName="h-full w-full object-cover object-bottom"
              src={url}
              alt={url}
            />
          </div>
        )}
        <label
          htmlFor="Cover"
          className="block text-sm font-light text-gray-700"
        >
          Ou url vers une image
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            http://
          </span>
          <input
            value={value || url.replace("http://", "")}
            onChange={(e) => onChange(e.target.value)}
            type="text"
            name="CoverUrl"
            id="CoverUrl"
            className="block w-full p-2 flex-1 rounded-none border rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="www.exemple.com"
          />
        </div>
      </div>
      <p className="text-xs text-gray-500">
        {/* {value && JSON.stringify(value.dataTransfer.files[0])} */}
      </p>
    </div>
  );
}
Files.defaultProps = {
  value: "",
};

Files.propTypes = {
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
};
