import AxiosWithAuth from "../../services/axiosRequest";

const GetAllUsers = (callback) => {
  AxiosWithAuth({
    url: "/api/private/users",
    method: "Get",
  }).then((res) => {
    console.warn(res);
    callback(res.data);
  });
};
const UpdateMyProfils = (data, callback) => {
  AxiosWithAuth({
    url: `/api/private/user/${data.id}`,
    method: "Put",
    data,
  }).then((res) => {
    console.warn(res);
    callback(res.data);
  });
};
const DeleteMyProfils = (id, callback) => {
  AxiosWithAuth({
    url: `/api/private/user/${id}`,
    method: "Delete",
  }).then((res) => {
    console.warn(res);
    callback(res.data);
  });
};
// eslint-disable-next-line import/prefer-default-export
export { GetAllUsers, UpdateMyProfils, DeleteMyProfils };
