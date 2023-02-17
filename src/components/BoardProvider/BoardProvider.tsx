import React from "react";

type BoardContextType = {
  rotationAngle: number;
  setRotationAngle: React.Dispatch<React.SetStateAction<number>>;
};

export const BoardContext = React.createContext<BoardContextType>(
  {} as BoardContextType
);

type Props = { children?: React.ReactNode };

const BoardProvider = ({ children }: Props) => {
  const [rotationAngle, setRotationAngle] = React.useState(0);
  return (
    <BoardContext.Provider value={{ rotationAngle, setRotationAngle }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
