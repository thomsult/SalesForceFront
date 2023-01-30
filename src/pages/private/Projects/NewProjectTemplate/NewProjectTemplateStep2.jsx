import PropTypes from "prop-types";
import React from "react";

import Timer from "../Form/Timer";
import MemberLimit from "../Form/MemberLimit";
import Category from "../Form/Category";
import Files from "../Form/Files";
import ProjectName from "../Form/ProjectName";
import Description from "../Form/Description";
import LinksVideo from "../Form/LinksVideo";
import Sub from "../Form/Sub";

export default function NewProjectsStep2({ project, update }) {
  const {
    name,
    description,
    visioLink,
    invitePending,
    projectPicture,
    category,
    memberLimit,
    timer,
  } = project;

  return (
    <>
      <div className="  py-2  md:grid md:grid-cols-2 md:px-8 px-4 gap-10  overflow-auto   ">
        <div className="flex  flex-col justify-start md:h-full gap-5 mb-4 md:mb-0">
          <ProjectName
            value={name}
            onChange={(newName) => {
              update({ ...project, name: newName });
            }}
          />
          <Description
            value={description}
            onChange={(newDescription) => {
              update({ ...project, description: newDescription });
            }}
          />
          <LinksVideo
            value={visioLink}
            onChange={(newlinksVideo) => {
              update({ ...project, visioLink: newlinksVideo });
            }}
          />
          <Sub
            list={invitePending || []}
            onChange={(newSub) => {
              update({ ...project, invitePending: newSub });
            }}
          />
        </div>
        <div className="flex flex-col justify-between gap-5  md:h-full">
          <Files
            value={projectPicture}
            onChange={(newFile) => {
              update({ ...project, projectPicture: newFile });
            }}
          />
          <Category
            value={category}
            onChange={(NewCategory) =>
              update({ ...project, category: NewCategory })
            }
          />
          <MemberLimit
            value={memberLimit || 15}
            onChange={(NewMemberLimit) =>
              update({ ...project, memberLimit: NewMemberLimit })
            }
          />
          <Timer
            value={timer.toString() || "0"}
            onChange={(NewTimer) => update({ ...project, timer: NewTimer })}
          />
        </div>
      </div>
      <p className="text-red-600 pt-[-1em] md:px-8 px-4">
        *{" "}
        <small className="text-gray-500">
          tous les champs avec des asterisques sont obligatoires
        </small>
      </p>
    </>
  );
}

NewProjectsStep2.propTypes = {
  project: PropTypes.shape().isRequired,
  update: PropTypes.func.isRequired,
};
