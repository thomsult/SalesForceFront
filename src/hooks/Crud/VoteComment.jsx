import AxiosWithAuth from "../../services/axiosRequest";

/* router.post("/:idProject/hashtag/:idHashtag/", voteControllers.addVote);
router.post(
  "/:idProject/hashtag/:idHashtag/vote/:idVote/",
  voteControllers.addComment
); */

const AddComment = (idProject, idHashtag, idVote, data) => {
  AxiosWithAuth({
    url: `/api/private/vote/project/${idProject}/hashtag/${idHashtag}/vote/${idVote}/`,
    method: "Post",
    data,
  }).then((res) => {
    console.warn(res);
    // callBack();
  });
};
const AddVote = (idProject, idHashtag, { description, thumUp }) => {
  AxiosWithAuth({
    url: `/api/private/vote/project/${idProject}/hashtag/${idHashtag}/`,
    method: "Post",
    data: { description, thumUp },
  }).then((res) => {
    console.warn(res.data);
    // callBack();
  });
};

// eslint-disable-next-line import/prefer-default-export
export { AddVote, AddComment };
