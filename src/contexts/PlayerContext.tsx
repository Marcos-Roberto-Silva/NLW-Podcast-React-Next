import { createContext, ReactNode, useContext, useState } from "react";
import Episode from "../pages/episodes/[slug]";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  play: (episode: Episode) => void;
  playList(list: Episode[], index: number): void;
  isPlaying: boolean;
  setIsPlayingState: (state: boolean) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProvider = {
  children: ReactNode;
};

export function PlayerContextProvider({ children }: PlayerContextProvider) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentepisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentepisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
      setEpisodeList(list);
      setCurrentepisodeIndex(index);
      setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setIsPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length;
  

  function playNext() {
    if (hasNext) {
      setCurrentepisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentepisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        setIsPlayingState,
        playList,
        playPrevious,
        playNext,
        hasPrevious,
        hasNext,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}