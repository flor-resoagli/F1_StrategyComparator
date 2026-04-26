import '../styles/TyreCompounds.css';


function TyreCompounds(props) {



    return (
        <div>
            <h3>Tyres</h3>
            <div className="compounds">
                <div className='compound-item'>
                   <p className='compound-type'>C1</p>
                    {props.HardTyre === 1 ? <div className='hard'> HARD </div> : <div> </div>} 
                    {props.MediumTyre === 1 ? <div className='medium'> MEDIUM </div> : <div> </div>} 
                    {props.SoftTyre === 1 ? <div className='soft'> SOFT </div> : <div> </div>} 
                </div>
                <div className='compound-item'>
                   <p className='compound-type'>C2</p> 
                    {props.HardTyre === 2 ? <div className='hard'> HARD </div> : <div> </div>} 
                    {props.MediumTyre === 2 ? <div className='medium'> MEDIUM </div> : <div> </div>} 
                    {props.SoftTyre === 2 ? <div className='soft'> SOFT </div> : <div> </div>}  
                </div>
                <div className='compound-item'>
                   <p className='compound-type'>C3</p> 
                    {props.HardTyre === 3 ? <div className='hard'> HARD </div> : <div> </div>} 
                    {props.MediumTyre === 3 ? <div className='medium'> MEDIUM </div> : <div> </div>} 
                    {props.SoftTyre === 3 ? <div className='soft'> SOFT </div> : <div> </div>} 
                </div>
                <div className='compound-item'>
                   <p className='compound-type'>C4</p>  
                    {props.HardTyre === 4 ? <div className='hard'> HARD </div> : <div> </div>} 
                    {props.MediumTyre === 4 ? <div className='medium'> MEDIUM </div> : <div> </div>} 
                    {props.SoftTyre === 4 ? <div className='soft'> SOFT </div> : <div> </div>}
                </div>
                <div className='compound-item'>
                   <p className='compound-type'>C5</p>  
                    {props.HardTyre === 5 ? <div className='hard'> HARD </div> : <div> </div>} 
                    {props.MediumTyre === 5 ? <div className='medium'> MEDIUM </div> : <div> </div>} 
                    {props.SoftTyre === 5 ? <div className='soft'> SOFT </div> : <div> </div>}
                </div>
                <div className='compound-item'>
                   <p className='compound-type'>C6</p>
                    {props.HardTyre === 6 ? <div className='hard'> HARD </div> : <div> </div>} 
                    {props.MediumTyre === 6 ? <div className='medium'> MEDIUM </div> : <div> </div>} 
                    {props.SoftTyre === 6 ? <div className='soft'> SOFT </div> : <div> </div>}  
                </div>
            </div>          
        </div>
    )
}

export default TyreCompounds;