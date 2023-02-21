import React from 'react';

import BoardProvider from '@/components/BoardProvider';
import GuessPage from '@/components/GuessPage';

export default function GuessStage() {
  return (
    <BoardProvider>
      <GuessPage />
    </BoardProvider>
  );
}
