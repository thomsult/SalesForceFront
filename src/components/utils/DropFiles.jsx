import PropTypes from "prop-types";

function DragDropFile({ onChange, className }) {
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e);
    }
  };

  // triggers when file is selected with click
  const handleChange = (e) => {
    e.preventDefault();
    e.dataTransfer = { files: e.target.files };
    onChange(e);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div onDragEnter={handleDrag} id="Cover" className="h-[14em] flex ">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={className}
      >
        <div className=" text-center  ">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Importer un fichier</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleChange}
                onDrop={handleDrop}
                multiple
              />
            </label>
            <p className="pl-1">ou glisser/déposer</p>
          </div>

          <p className="text-xs text-gray-500">PNG, JPG, GIF max 10MB</p>
        </div>
      </div>
    </div>
  );
}
DragDropFile.defaultProps = {
  className:
    "py-8 w-full h-full flex justify-center items-center rounded-md border-2 border-dashed border-gray-300",
};

DragDropFile.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
// eslint-disable-next-line import/prefer-default-export
export { DragDropFile };
