import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import './Timer.css';
import GreyBoxContainer from "../GreyBoxContainer/GreyBoxContainer";
import TimerHeader from "../TimerHeader/TimerHeader";
import CenteredDiv from "../CenteredDiv/CenteredDiv";


export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [listTimer, setListTimer] = useState([]);
  const timeRef = useRef(null);

  
  useEffect(() => {
    if (seconds === 60) {
      setMinutes(minutes => minutes + 1);
      setSeconds(0);
    }
    
    if (minutes === 60) {
      setHours(hours => hours + 1);
      setMinutes(0);
    }
  }, [seconds, minutes])
  
  const startTimer = () => {
    if (timeRef.current === null) {
      timeRef.current = setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000);
    }
    return () => clearInterval(timeRef);
  }
  
  const stopTimer = () => {
    if (timeRef.current != null) {
      clearInterval(timeRef.current)
      timeRef.current = null
    }
  }
  
  const resetTimer = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

  useEffect(() => {
    const timeInfo = localStorage.getItem('LOCAL_TIMER');
    const objInfo = JSON.parse(timeInfo);

    if(objInfo){
      setListTimer(objInfo);
    }
    
  }, [])
  
  const saveTimer = () => {
    const newTimerObject = {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
    setListTimer(listTimer => [...listTimer, newTimerObject]);

    localStorage.setItem('LOCAL_TIMER', JSON.stringify([...listTimer, newTimerObject]));
  }

  const deleteTimer = (indexToRemove) => {
    setListTimer(prevListTimer => prevListTimer.filter((_, index) => index !== indexToRemove))
    const timerInLocalStorage = localStorage.getItem('LOCAL_TIMER');
    if(timerInLocalStorage){
      const timersArray = JSON.parse(timerInLocalStorage);
      const updatedTimersArray = timersArray.filter((_, index) => index !== indexToRemove);
      localStorage.setItem('LOCAL_TIMER', JSON.stringify(updatedTimersArray));
    }
    console.log('deletando só que nao', indexToRemove, listTimer);
  }

  return (
    <>
      <GreyBoxContainer>
        <div className="timer-content">
          <TimerHeader hours={hours} minutes={minutes} seconds={seconds} />
          <div className="timer-buttons">
            <Button func={startTimer} name='Start' />
            <Button func={stopTimer} name='Stop' />
            <Button func={resetTimer} name='Reset' />
            <Button style={{backgroundColor: '#4CAF50'}} func={saveTimer} name='+' />
          </div>
        </div>
      </GreyBoxContainer>
      <CenteredDiv style={{overflow: 'auto'}}>
        {listTimer.map((x, index) => {
          return (
            <GreyBoxContainer style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} key={index}>
              {x.hours < 10 ? '0' + x.hours : x.hours}:
              {x.minutes < 10 ? '0' + x.minutes : x.minutes}:
              {x.seconds < 10 ? '0' + x.seconds : x.seconds}
            <Button func={() => deleteTimer(index)} style={{backgroundColor: '#B83030'}} name='x'/>
            </GreyBoxContainer>
          )
        })}
      </CenteredDiv>

    </>
  )
}