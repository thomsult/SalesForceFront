import { io } from "socket.io-client";
import useCookies from "../hooks/useCookies";

const SERVER = `https://http-nodejs-production-ee73.up.railway.app/api/private/Lobby`;

function SocketAuth() {
  const { cookies } = useCookies();
  const { loginToken } = cookies;
  const socket = io.connect(SERVER, {
    transports: ["websocket", "polling"],
    auth: {
      token: loginToken,
    },
  });
  return socket;
}

export default SocketAuth;
