import AxiosWithAuth from "../../services/axiosRequest";

const GetHashtagsByUser = (callback) => {
  AxiosWithAuth({
    url: "/api/private/projects/hashtags",
    method: "Get",
  }).then((res) => {
    callback(res.data);
  });
};

const GetHashtagsArchiverByUser = (callback) => {
  AxiosWithAuth({
    url: "/api/private/archive/hashtags",
    method: "Get",
  }).then((res) => {
    callback(res.data);
  });
};
const DeleteHashtagsById = (id, callback) => {
  AxiosWithAuth({
    url: `/api/private/projects/hashtags/${id}`,
    method: "Delete",
  }).then((res) => {
    callback(res.data);
  });
};

const GetHashtagsByProject = (id, callback) => {
  AxiosWithAuth({
    url: `/api/private/projects/${id}`,
    method: "Get",
  })
    .then((res) => callback(res))
    .catch((res) => callback(res));
};
const AddHashtagsByProject = (id, hashtag, callback) => {
  AxiosWithAuth({
    url: `/api/private/projects/${id}/hashtags/${hashtag.id}`,
    method: "post",
    hashtag,
  })
    .then((res) => callback(res))
    .catch((res) => callback(res));
};

const DeleteHashtagsOnProjectById = (idHtag, idProject, callback) => {
  AxiosWithAuth({
    url: `/api/private/projects/${idProject}/hashtags/${idHtag}`,
    method: "Delete",
  }).then((res) => {
    callback(res.data);
  });
};
export {
  AddHashtagsByProject,
  GetHashtagsByUser,
  GetHashtagsArchiverByUser,
  DeleteHashtagsById,
  GetHashtagsByProject,
  DeleteHashtagsOnProjectById,
};
