import AxiosWithAuth from "../../services/axiosRequest";

const UpdateUserByProject = (isPending, IdProject, callBack) => {
  AxiosWithAuth({
    url: `/api/private/projects/${IdProject}`,
    method: "Put",
    data: { isPending },
  }).then((res) => {
    console.warn(res);
    callBack();
  });
};
// eslint-disable-next-line import/prefer-default-export
export { UpdateUserByProject };
