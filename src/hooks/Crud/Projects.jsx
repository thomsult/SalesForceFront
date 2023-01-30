import AxiosWithAuth from "../../services/axiosRequest";

const CreateProject = (projects, context, nav) => {
  console.warn(projects);
  AxiosWithAuth({
    url: "/api/private/projects",
    method: "Post",
    data: projects,
  }).then((res) => {
    console.warn(res);
    setTimeout(() => {
      nav(`/dashboard${res.data.location}`);
    }, 1000);
  });
};

const RemoveProject = (id, callBack) => {
  AxiosWithAuth({
    url: `/api/private/projects/${id}`,
    method: "Delete",
  }).then((res) => {
    console.warn(res);
    callBack();
  });
};

const GetProjectByUser = (callBack) => {
  AxiosWithAuth({
    url: `/api/private/projects/`,
    method: "get",
  }).then((res) => {
    callBack(res.data);
  });
};

export { CreateProject, RemoveProject, GetProjectByUser };
