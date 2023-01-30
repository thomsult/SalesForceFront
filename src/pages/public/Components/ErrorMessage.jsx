import PropTypes from "prop-types";
import React from "react";

export default function ErrorMessage({ error }) {
  const { code, message, description } = error;
  return (
    <section className="flex flex-col items-center justify-center h-full m-auto">
      <h1 className="font-bold text-indigo-600 text-9xl">{code}</h1>
      <p className="mb-2 text-2xl font-bold text-center text-white md:text-3xl">
        <span className="text-red-500">OoOops!</span> {message}
      </p>
      <p className="mb-8 text-center text-gray-50 md:text-lg">{description}</p>
      <a
        href="/"
        className="
      flex justify-center py-2 px-9 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
      "
      >
        Retour au site
      </a>
    </section>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    code: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};
