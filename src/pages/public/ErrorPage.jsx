import { PropTypes } from "prop-types";
import React, { useEffect } from "react";

function ErrorImage({ url, alt }) {
  return (
    <div className=" p-9 ">
      <img src={url} alt={alt} className="sm:h-[70vh]" />
    </div>
  );
}

export const Erreur404 = {
  code: "404",
  message: "Ressource introuvable",
  description: "La page demandée n'existe pas.",
};

export default function ErrorPage({ error = Erreur404, callBack }) {
  useEffect(() => {
    callBack(error);
    return () => callBack(null);
  }, []);

  return (
    <ErrorImage
      url="https://thumbs.dreamstime.com/b/chat-de-chant-le-troubadour-megieval-conception-pour-t-shirt-affiche-tatouage-120710100.jpg"
      alt="Chat Troubadour"
    />
  );
}
ErrorImage.propTypes = {
  alt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
ErrorPage.defaultProps = {
  error: {
    code: "404",
    message: "Ressource introuvable",
    description: "La page demandée n'existe pas.",
  },
};
ErrorPage.propTypes = {
  callBack: PropTypes.func.isRequired,
  error: PropTypes.shape({
    code: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }),
};
