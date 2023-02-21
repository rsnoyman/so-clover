import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Button from "@/styles/Button";
import { NameInput } from "@/components/Input";
import { useCookies } from "react-cookie";

const Form = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  height: var(--board-size);
  width: var(--board-size);
  inset: 0;
  margin: auto;
  border: 3px solid;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 4px;
`;

const createPlayer = async (gameId: string, name: string, admin: boolean) => {
  const response = await fetch(`/api/create-player?gameId=${gameId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, admin }),
  });

  const { id } = await response.json();

  return id;
};

export default function NewPlayerForm() {
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState(false);
  const [, setCookie] = useCookies(["playerId"]);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!name) {
      setError(true);
      return;
    }

    let { gameId } = router.query;
    const admin = !gameId;

    if (!gameId) {
      const response = await fetch("/api/create-game");
      gameId = await response.json();
    }

    gameId = gameId as string;
    const id = await createPlayer(gameId, name, admin);
    setCookie("playerId", id, {
      path: "/",
      maxAge: 7200 /* Expires after 2hr */,
    });
    router.push(gameId);
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <h1>🍀 So Clover! 🍀</h1>
      <InputWrapper>
        <Label htmlFor="name">Enter Your Name</Label>
        <NameInput
          id="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        {error && <div>Please enter your name</div>}
      </InputWrapper>
      <Button>Start</Button>
    </Form>
  );
}
