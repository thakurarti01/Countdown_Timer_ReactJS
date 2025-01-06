import React, { use, useEffect, useRef, useState } from 'react';

function Timer(){
    const[time, setTime] = useState(0);
    const[isActive, setActive] = useState(false);
    const[isPause, setIsPause] = useState(false);
    const intervalRef = useRef(null);

    const handleInput=(event)=>{
        setTime(parseInt(event.target.value*60));//we are multiplying user input which is in minutes to 60 so that it will be converted into sec because setTime always takes input in seconds
    }

    const formatTime=()=>{
       const min = String(Math.floor(time/60)).padStart(2,'0');//padStart method is used to add some value before or after the string where 2 denotes max length
        const sec = String(time%60).padStart(2,'0');
        return`${min}:${sec}`
    }

    const handleStart=()=>{
        if(!isActive){
        setActive(true);
        setIsPause(false);
        }
    }

    useEffect(()=>{
        if(isActive && !isPause && time>0){
            intervalRef.current = setInterval(()=>{
                setTime((prev)=>prev-1)
            },1000)
        }else if(time===0){
            clearInterval(intervalRef.current);
            setActive(false);
            alert("time up")
        }
        return() =>clearInterval(intervalRef.current);
    }, [isActive, isPause, time])

    const handlePause=()=>{
        setIsPause(!isPause)
    }

    const handleReset=()=>{
        clearInterval(intervalRef.current);
        setActive(false);
        setIsPause(false);
        setTime(0);
    }
    return(
        <div>
            <h1>Countdown Timer</h1><br/>
            <input type='number' placeholder='enter time in minutes' onChange={handleInput}/><br/>
            <div>
                {formatTime()}
            </div>
            
            <button onClick={handleStart} disabled={isActive&&!isPause}>Start</button>
            <button onClick={handlePause}disabled={!isActive}>{isPause ? 'Resume' : 'Pause'}</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    )
}
export default Timer;