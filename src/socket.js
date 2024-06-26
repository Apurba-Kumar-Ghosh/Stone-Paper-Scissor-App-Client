import React, { useContext, useRef } from "react";
import { io } from "socket.io-client";

const SERVER_URL = "https://rock-paper-scissor-game-ioii.onrender.com";

export const socketInstance = io(SERVER_URL);

const SocketContext = React.createContext(undefined);

export const SocketContextProvider = ({ children }) => {
  const socket = useRef(socketInstance);

  return (
    <SocketContext.Provider value={{ socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context)
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );

  return context;
};
