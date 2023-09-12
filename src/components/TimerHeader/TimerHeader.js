export default function TimerHeader({hours, minutes, seconds}){
  return(
    <div className="timer-header">
            <h1>Timer</h1>
            <h2>{hours < 10 ? "0" + hours : hours}:{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</h2>
    </div>
  )
}