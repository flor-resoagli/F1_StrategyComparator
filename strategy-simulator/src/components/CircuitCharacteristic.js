import '../styles/CircuitCharacteristic.css';


function CircuitCharacteristic (props) {

    return (
        <div className='container'>
            <p className='characteristics-title'>{props.Title}</p>
            <p className={props.Value === 1 ? 'selected' : 'not-selected'}>1</p>
            <p className={props.Value === 2 ? 'selected' : 'not-selected'}>2</p>
            <p className={props.Value === 3 ? 'selected' : 'not-selected'}>3</p>
            <p className={props.Value === 4 ? 'selected' : 'not-selected'}>4</p>
            <p className={props.Value === 5 ? 'selected' : 'not-selected'}>5</p>
        </div>
    )
}

export default CircuitCharacteristic