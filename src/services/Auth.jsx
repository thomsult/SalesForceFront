import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useCookies from "../hooks/useCookies";
import useSessionStorage from "../hooks/sessionStorage";
import { UpdateMyProfils, DeleteMyProfils } from "../hooks/Crud/Users";
import AxiosWithAuth from "./axiosRequest";
import SocketAuth from "./Socket";

function Auth() {
  const socket = SocketAuth();
  const navTo = useNavigate();
  const loc = useLocation();
  const { cookies, setCookie, removeAllCookies } = useCookies();
  const [sessionStorage, setSessionStorage, RemoveInSessionStorage] =
    useSessionStorage();

  const [user, setUser] = useState();

  const disconnect = () => {
    RemoveInSessionStorage("User");
    if (user) {
      AxiosWithAuth({
        url: "/api/logout",
        method: "Put",
        data: { email: user.email },
      })
        .then((res) => {
          console.warn(res);
          console.warn("disconnected");
          setUser(null);
          removeAllCookies();
          navTo("/");
        })
        .catch((err) => {
          console.warn(err);
          console.warn("disconnected");
          setUser(null);
          removeAllCookies();
          navTo("/");
        });
    }
    console.warn("disconnected");
    setUser(null);
    removeAllCookies();
    navTo("/");
  };
  const UpdateStateUser = (userState) => {
    setUser(userState);
    setSessionStorage("User", userState);
    console.warn("Updated user state");
  };
  const UpdateUser = () => {
    console.warn(user);
    UpdateMyProfils(user, (res) => {
      if (res === "Created") {
        console.warn("Updated user");
      }
    });
  };
  const DeleteUser = (id) => {
    DeleteMyProfils(id, () => {
      setTimeout(() => {
        console.warn("Removed user");
        disconnect();
      }, 1000);
    });
  };

  const connection = (userConnection) => {
    const { token } = userConnection;
    const noToken = userConnection;
    delete noToken.token;
    setUser(noToken);
    setSessionStorage("User", noToken);
    const date = new Date();
    const hour = 2;
    date.setTime(date.getTime() + hour * 60 * 60 * 1000);
    console.warn(userConnection);
    setCookie("loginToken", token, {
      expires: date.toGMTString(),
    });
    navTo("/dashboard");
  };

  useEffect(() => {
    if (cookies.loginToken && sessionStorage("User") && !user) {
      setUser(sessionStorage("User"));
      console.warn("reconnection");
    }
    if (
      !cookies.loginToken ||
      !sessionStorage("User") ||
      (user && JSON.stringify(user) !== JSON.stringify(sessionStorage("User")))
    ) {
      if (loc.pathname.match(/dashboard\/.*/i) || !user) {
        console.warn("Unauthorized");
        disconnect();
      }
    }
  }, [cookies.loginToken, sessionStorage("User"), user]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("message", { rooms: "all", message: "connect" });
    });
    socket.on("message", (data) => {
      if (data.rooms === "all") {
        console.warn(data.message);
      }
    });
    socket.on("disconnect", () => {
      socket.emit("message", { rooms: "all", message: "disconnect" });
    });
  }, []);

  return {
    UpdateUser,
    UpdateStateUser,
    DeleteUser,
    user,
    disconnect,
    connection,
    socket,
  };
}

export default Auth;
