/* eslint-disable import/no-unresolved */
import axios from "axios";
import useCookies from "../../../../hooks/useCookies";
// ---------------- get hashtag user ---------------- //

const getHashtagsByUser = (callbackDataNodes) => {
  const { cookies } = useCookies();
  const token = cookies.loginToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .get(
      `${import.meta.env.VITE_BACKEND_URL}/api/private/projects/hashtags`,
      config
    )
    .then((res) => callbackDataNodes(res.data))
    .catch((err) => console.error(err));
};

export default getHashtagsByUser;
