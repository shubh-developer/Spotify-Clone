import { useRef, useState } from "react";
import { createContext } from "react";
import { songsData } from "../assets/assets";
import { useEffect } from "react";

export const PlayerContext = createContext();
 const PlayerContextProvider = (props)=>{
 
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playerStatus, setPlayerStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime:{
            seconds: 0,
            minutes: 0
        },
        totalTime:{
            seconds: 0,
            minutes: 0
        }
    })

    const play = () =>{
        audioRef.current.play();
        setPlayerStatus(true);
    }

    const pause = () =>{
        audioRef.current.pause();
        setPlayerStatus(false);
    }

    const playwithID = async() =>{
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayerStatus(true);
    }

    useEffect(() => {

        setTimeout(()=>{

            
            audioRef.current.ontimeupdate= () =>{
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100)) +"%"
                setTime({
                    currentTime:{
                        seconds: Math.floor(audioRef.current.currentTime % 60),
                        minutes: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime:{
                    
                        seconds: Math.floor(audioRef.current.duration % 60),
                        minutes: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        })
    })
    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playerStatus, setPlayerStatus,
        time, setTime,
        play, pause,
        playwithID
    }

    return(
        <PlayerContext.Provider value={contextValue}>
                {props.children}
        </PlayerContext.Provider>
    )
 }

 export default PlayerContextProvider;