import { createContext } from 'react';
import Episode from '../pages/episodes/[slug]';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: string;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
}

export const PlayerContext = createContext({} as PlayerContextData)