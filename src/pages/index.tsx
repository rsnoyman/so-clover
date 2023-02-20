import React from "react";
import styled from "@emotion/styled";

import Button from "@/styles/Button";

const Layout = styled.div`
  position: absolute;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  height: var(--board-size);
  width: var(--board-size);
  inset: 0;
  margin: auto;
  border: 3px solid;
`;

export default function Home() {
  return (
    <Layout>
      <Button>Invite</Button>
      <Button>Start</Button>
    </Layout>
  );
}
