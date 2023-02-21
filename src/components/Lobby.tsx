import React from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import { Player } from "@prisma/client";
import Button from "@/styles/Button";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const Layout = styled.form`
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

const PlayersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const Player = styled.div`
  text-transform: uppercase;
`;

export default function Lobby() {
  const router = useRouter();
  const { gameId } = router.query;
  const [cookies] = useCookies(["playerId"]);

  const { data: players } = useSWR<Player[]>(
    `/api/get-players?gameId=${gameId}`,
    fetcher
  );

  const { data: isAdmin } = useSWR<Player[]>(
    `/api/is-admin?playerId=${cookies.playerId}`,
    fetcher
  );

  const [isCopied, setIsCopied] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Invite");

  const copyPageUrl = async (event: any) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(location.href);
      setIsCopied(true);
    } catch (err) {
      setIsCopied(false);
    }
  };

  return (
    <Layout>
      <PlayersWrapper>
        <h1>Players</h1>
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
        {isAdmin && <StyledButtton>Start</StyledButtton>}
      </div>
    </Layout>
  );
}
