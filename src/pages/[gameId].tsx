import React from "react";
import dynamic from "next/dynamic";
const JoinGame = dynamic(() => import("../components/JoinGame"), {
  ssr: false,
});

export default function JoinGamePage() {
  return <JoinGame />;
}
