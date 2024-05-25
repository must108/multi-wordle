"use client";

import React, { useEffect, useState } from 'react';
import PlayBoard from './components/playBoard';
import Title from './components/title';
import { ModeSelect } from './components/modeSelect';

export default function Home() {
  const [showTitle, setShowTitle] = useState(true);
  const [showMode, setShowMode] = useState(false);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
      window.addEventListener('titleToggle', () => {
          setShowTitle(false);
          setShowMode(true);
      });

      window.addEventListener('gameToggle', () => {
          setShowMode(false);
          setShowGame(true);
      });

      window.addEventListener('showTitle', () => {
        setShowTitle(true);
        setShowMode(false);
        setShowGame(false);
      });

      return () => {
          window.removeEventListener('titleToggle', () => {});
          window.removeEventListener('gameToggle', () => {});
          window.removeEventListener('showTitle', () => {});
      }

  }, []);

return (
  <>
      {showTitle ? <Title /> : null}
      {showMode ? <ModeSelect/> : null}
      {showGame ? <PlayBoard /> : null}
  </>
);
}
