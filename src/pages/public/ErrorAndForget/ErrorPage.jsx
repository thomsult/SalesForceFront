import { PropTypes } from "prop-types";
import React, { useEffect } from "react";

export const erreur404 = {
  code: "404",
  message: "Introuvable",
  description: "La page demandée n'existe pas.",
  image:
    "https://thumbs.dreamstime.com/b/chat-de-chant-le-troubadour-megieval-conception-pour-t-shirt-affiche-tatouage-120710100.jpg",
  alt: "Chat Troubadour",
};

export default function ErrorPage({ error = erreur404, callBack }) {
  useEffect(() => {
    callBack(error);
    return () => callBack(null);
  }, []);

  return (
    <div className=" p-9 ">
      <img src={error.image} alt={error.alt} className="sm:h-[70vh]" />
    </div>
  );
}

ErrorPage.defaultProps = {
  error: erreur404,
};
ErrorPage.propTypes = {
  callBack: PropTypes.func.isRequired,
  error: PropTypes.shape({
    code: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
};
