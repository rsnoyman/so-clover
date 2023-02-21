import React from "react";
import { useCookies } from "react-cookie";
import Lobby from "@/components/Lobby";
import NewPlayerForm from "@/components/NewPlayerForm";

export default function JoinGame() {
  const [cookies] = useCookies(["playerId"]);
  return cookies.playerId ? <Lobby /> : <NewPlayerForm />;
}
