import { io } from "socket.io-client";
import useCookies from "../hooks/useCookies";

const SERVER = `${import.meta.env.VITE_BACKEND_URL_SOCKET}/api/private/Lobby`;

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
