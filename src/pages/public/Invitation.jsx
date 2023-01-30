import React from "react";
import { useParams } from "react-router-dom";
import RegisterPage from "./RegisterPage";

export default function Invitation() {
  const { invitation } = useParams();

  const tokenData = Buffer.from(invitation, "base64")
    .toString("utf8")
    .split(";");
  const ResultToken = {
    Author: tokenData[0],
    Project: tokenData[1],
    IdProject: tokenData[2],
    email: tokenData[3],
  };

  return <RegisterPage tokenData={ResultToken} />;
}
