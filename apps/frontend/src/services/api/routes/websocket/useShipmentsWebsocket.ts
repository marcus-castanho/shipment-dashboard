import { useEffect, useMemo } from "react";
import { URL } from "../../httpClient";
import { io, Socket } from "socket.io-client";
import { useUser } from "../../../../context/UserContext";
import { create } from "zustand";

export const EVENT = {
  QUERY: "query",
  SUBSCRIBE_TO_ID: "subscribe_to_id",
  FIND: "find",
  CONNECT: "connect",
};

type SocketStore = {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
  lastUpdatedAt: Date;
  setLastUpdatedAt: (date: Date) => void;
};

export const useShipmentsWebsocket = () => {
  const { user } = useUser();
  const useSocketStore = useMemo(
    () =>
      create<SocketStore>((set) => ({
        socket: null,
        setSocket: (socket) => set(() => ({ socket })),
        lastUpdatedAt: new Date(),
        setLastUpdatedAt: (date) => set(() => ({ lastUpdatedAt: date })),
      })),
    []
  );
  const setSocket = useSocketStore((store) => store.setSocket);
  const setLastUpdatedAt = useSocketStore((store) => store.setLastUpdatedAt);

  useEffect(() => {
    const client = io(`${URL}/shipments`, {
      autoConnect: true,
      extraHeaders: { Authorization: `Bearer ${user.token}` },
    });

    setSocket(client);

    client.on(EVENT.CONNECT, () => console.log("Connected"));
    client.on(EVENT.QUERY, () => setLastUpdatedAt(new Date()));
    client.on(EVENT.FIND, () => setLastUpdatedAt(new Date()));

    return () => {
      client.close();
    };
  }, [setLastUpdatedAt, setSocket, user.id, user.token]);

  return { useSocketStore };
};
