import React from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import { Player } from "@prisma/client";
import Button from "@/styles/Button";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";

const Layout = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: var(--board-size);
  width: var(--board-size);
  inset: 0;
  margin: auto;
  border: 3px solid;
`;

const StyledButtton = styled(Button)`
  width: 200px;
`;

const PlayersWrapper = styled.div``;
const Player = styled.div``;

export default function Lobby() {
  const router = useRouter();
  const { gameId } = router.query;

  const { data: players } = useSWR<Player[]>(
    `/api/get-players?gameId=${gameId}`,
    fetcher
  );

  const [isCopied, setIsCopied] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Invite");

  async function copyPageUrl() {
    try {
      await navigator.clipboard.writeText(location.href);
      setIsCopied(true);
    } catch (err) {
      setIsCopied(false);
    }
  }

  return (
    <Layout>
      <PlayersWrapper>
        {players &&
          players.map(({ id, name }) => <Player key={id}>{name}</Player>)}
      </PlayersWrapper>
      <div>
        <StyledButtton
          onClick={copyPageUrl}
          onMouseOver={() => {
            setButtonText("Copy");
          }}
          onMouseUp={() => {
            setButtonText(isCopied ? "Copied" : "Copy");
          }}
          onMouseLeave={() => {
            setButtonText("Invite");
          }}
        >
          {buttonText}
        </StyledButtton>
        <StyledButtton>Start</StyledButtton>
      </div>
    </Layout>
  );
}
