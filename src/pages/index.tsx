import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import Button from "@/styles/Button";
import { NameInput } from "@/components/Input";

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

export default function Home() {
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name) {
      setError(true);
      return;
    }

    const response = await fetch("/api/create-game");

    const gameId = await response.json();

    await fetch(`/api/create-player?gameId=${gameId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, admin: true }),
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
