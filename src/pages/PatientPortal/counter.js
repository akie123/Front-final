
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;
const renderTime = (dimension, time) => {
    return (
        <div className="time-wrapper" style={{textAlign:'center'}}>

            <div className="time">{time}</div>

            <div>{dimension}</div>
        </div>
    );
};

export default function Counter({remainingTime,setF1,setF2,setF3}) {

    const timerProps = {
        isPlaying: true,
        size: 120,
        strokeWidth: 6
    };
    const getTimeMinutes = (time) => {

        setF1(((time % hourSeconds) / minuteSeconds) | 0)
        return ((time % hourSeconds) / minuteSeconds) | 0

    }
    const getTimeSeconds = (time) => {

        setF2((minuteSeconds - time) | 0)
        return (minuteSeconds - time) | 0
    }
    const getTimeHours = (time) =>{
        setF3(((time % daySeconds) / hourSeconds) | 0)
        return ((time % daySeconds) / hourSeconds) | 0
    }
    // const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
    // const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
    // const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;


    return (




                            <div className="row">
                                {remainingTime!=300 && <div className="col-4">
                                    <CountdownCircleTimer
                                        {...timerProps}
                                        colors="#D14081"
                                        duration={daySeconds}
                                        initialRemainingTime={remainingTime }
                                        onComplete={(totalElapsedTime) => ({
                                            shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
                                        })}
                                    >
                                        {({ elapsedTime, color }) => (
                                            <span style={{ color }}>
            {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
          </span>
                                        )}
                                    </CountdownCircleTimer>
                                </div> }

                                <div className="col-4">
                                    <CountdownCircleTimer
                                        {...timerProps}
                                        colors="#EF798A"
                                        duration={hourSeconds}
                                        initialRemainingTime={remainingTime % hourSeconds}
                                        onComplete={(totalElapsedTime) => ({
                                            shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
                                        })}
                                    >
                                        {({ elapsedTime, color }) => (
                                            <span style={{ color }}>
            {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
          </span>
                                        )}
                                    </CountdownCircleTimer>
                                </div>

                                <div className="col-4">
                                    <CountdownCircleTimer
                                        {...timerProps}
                                        colors="#218380"
                                        duration={minuteSeconds}
                                        initialRemainingTime={remainingTime % minuteSeconds}
                                        onComplete={(totalElapsedTime) => ({
                                            shouldRepeat:remainingTime - totalElapsedTime > 0
                                        })}
                                    >
                                        {({ elapsedTime, color }) => (
                                            <span style={{ color }}>
            {renderTime("seconds", getTimeSeconds(elapsedTime))}
          </span>
                                        )}
                                    </CountdownCircleTimer>
                                </div>
                            </div>



    );
}