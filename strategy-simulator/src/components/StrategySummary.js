import '../styles/StrategySummary.css';


function StrategySummary(props) {

    const totalRaceTime = () => {
        const date = new Date(null);
        date.setSeconds(props.TotalTime);
        return date.toISOString().slice(11, 19);
    }

    const stints = props.Stints;

    return (
        <div className='racetime-container'>
            <div className='strat-description'>
                <p><b>{props.StrategyName}</b></p>
                <p className='racetime-time'><b>{totalRaceTime()}</b></p>
            </div>
            <div className='strat-details'>
                {stints.map(stint => (
                    <div className='stint-description'>
                        {stint.tyre == props.HardTyre ? (
                            <p className='hard-stint'>H</p>
                        ) : stint.tyre == props.MediumTyre ? (
                            <p className='medium-stint'>M</p>
                        ) : (
                            <p className='soft-stint'>S</p>
                        )}
                        <p>{stint.endLap - stint.startLap +1}</p>
                    </div>
                ))}                
            </div>
        </div>
    )
}

export default StrategySummary;