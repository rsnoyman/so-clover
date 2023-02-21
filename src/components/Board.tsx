import React from 'react';
import { RotateCcw, RotateCw } from 'react-feather';

import { BoardContext } from '@/components/BoardProvider';
import Clover from '@/components/Clover';

import RotateButton from '@/styles/RotateButton';

export default function Board({ children }: { children: React.ReactNode }) {
  const { handleClockwiseBoardRotate, handleCounterClockwiseBoardRotate } =
    React.useContext(BoardContext);

  return (
    <>
      <RotateButton left onClick={handleClockwiseBoardRotate}>
        <RotateCw size={100} />
      </RotateButton>
      <RotateButton onClick={handleCounterClockwiseBoardRotate}>
        <RotateCcw size={100} />
      </RotateButton>
      <Clover>{children}</Clover>
    </>
  );
}
