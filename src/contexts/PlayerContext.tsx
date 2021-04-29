import { createContext, useState, ReactNode } from 'react'

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: number,
    url: string
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffling: () => void;
    setPlaying: (state: boolean) => void;
    skip: () => void;
    playPrevious: () => void;
    clearPlayerStatus: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true)
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function toggleShuffling() {
        setIsShuffling(!isShuffling);
    }

    function setPlaying(state: boolean) {
        setIsPlaying(state);
    }

    function clearPlayerStatus() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0)
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = (currentEpisodeIndex + 1) < episodeList.length || isShuffling;

    function skip() {
        if (isShuffling) {
            setCurrentEpisodeIndex(Math.floor(Math.random() * (episodeList.length - 1)));
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious() {
        if (!hasPrevious) return;

        setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }

    return (
        <PlayerContext.Provider value={{
                episodeList,
                currentEpisodeIndex,
                play,
                isPlaying,
                isLooping,
                isShuffling,
                togglePlay,
                toggleLoop,
                toggleShuffling,
                setPlaying,
                playList,
                skip,
                playPrevious,
                hasNext,
                hasPrevious,
                clearPlayerStatus
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}