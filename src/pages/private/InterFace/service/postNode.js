import axios from "axios";
import useCookies from "../../../../hooks/useCookies";

/* post nodes into hashtag's table */
const postNodes = (
  idUserToSend,
  nodeToSend,
  callbackToSend,
  errorFunc,
  name
) => {
  // get cookie and token
  const { cookies } = useCookies();
  const token = cookies.loginToken;
  let toObj;
  // convert string into object
  if (typeof nodeToSend === "string") {
    toObj = JSON.parse(nodeToSend);
  } else {
    toObj = nodeToSend;
  }
  // format the data to send into the backend app
  const data = {
    hashtagName: toObj.name,
    idUser: idUserToSend,
    fileList: toObj.children.map((obj) => ({
      type: obj.type,
      content: obj.content,
    })),
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // post axios
  axios
    .post(
      `${import.meta.env.VITE_BACKEND_URL}/api/private/projects/${name}`,
      data,
      config
    )
    .then(() => {
      callbackToSend();
    })
    .catch((err) => {
      if (err.response.status === 409) {
        errorFunc();
      } else {
        console.error(err);
      }
    });
};

export default postNodes;
