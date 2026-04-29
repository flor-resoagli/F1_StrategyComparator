import '../styles/HomePage.css';
import data from '../files/circuit_data.json'

import AppBar from '@mui/material/AppBar';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import CircuitImage from './CircuitImage';
import CircuitCharacteristic from './CircuitCharacteristic';
import TyreCompounds from './TyreCompounds';
import LapTimeChart from './LapTimeChart';
import Grid from '@mui/material/Grid';
import StrategySummary from './StrategySummary';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import DeltaChart from './DeltaChart';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { expandStrategyToLaps, generateLapTimes } from '../services/StrategyService';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

function HomePage() {

    const [selectedCircuit, setSelectedCircuit] = useState(1);

    const circuits = data.circuits;
    const [fullSelectedCircuit, setFullSelectedCircuit] = useState(circuits[0]);

    const handleCircuitChange = (event) => {
        setSelectedCircuit(event.target.value);
        setFullSelectedCircuit(circuits.find(c => c.id === event.target.value))
        resetStints();
        resetStrategies();
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => {
        resetStints();
        setOpenModal(false);
    }

    const [strategies, setStrategies] = useState([]);

    const [stints, setStints] = useState([])

    const createStint = () => {
        let startLap = 1;

        if (stints.length > 0) {
            const last = stints[stints.length - 1];
            startLap = Number(last.endLap) + 1;
        }

        setStints([
            ...stints,
            {
                tyre: '',
                startLap: startLap,
                endLap: startLap,   // default: 1‑lap stint until user edits
                startingTyreAge: 0
            }
        ]);
    };


    const resetStints = () => setStints([]);
    const resetStrategies = () => setStrategies([]);

    const deleteStint = (index) => setStints(stints.filter((_, i) => i !== index));
    const deleteStrategy = (index) => setStrategies(strategies.filter((_, i) => i !== index));  

    const updateStint = (index, field, value) => {
        const updated = [...stints];
        updated[index] = { ...updated[index], [field]: value };
        setStints(updated);
    };

    const handleCreateStrategy = async () => {

        const laptimes = await generateLapTimes(stints, fullSelectedCircuit);

        const newStrategy = {
            stints: stints,
            laptimes: adjustedLapTimes(laptimes.prediction, stints),
            totalTime: calculateTotalRaceTime(laptimes.prediction)
        }

        setStrategies([...strategies, newStrategy])
        handleClose();
    }

    const calculateTotalRaceTime = (laptimes) => laptimes.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    const adjustedLapTimes = (laptimes, stints) => {

        const adjustedLaptimes = []
        const pitLaps = stints.map(s => s.startLap-1);

       laptimes.map((time, index) => {
            const lapNumber = index+1;
            if(pitLaps.includes(lapNumber) && lapNumber != 1) adjustedLaptimes.push(time+20);
            else adjustedLaptimes.push(time);
       })

        return adjustedLaptimes;
    }

    const [validationError, setValidationError] = useState("");

    const validateStints = () => {
        if (stints.length === 0) {
            setValidationError("You must add at least one stint");
            return false;
        }

        const sorted = [...stints].sort((a, b) => Number(a.startLap) - Number(b.startLap));

        if (Number(sorted[0].startLap) !== 1) {
            setValidationError("The first stint must start at lap 1");
            return false;
        }

        if (Number(sorted[sorted.length - 1].endLap) !== Number(fullSelectedCircuit.TotalLaps)) {
            setValidationError(`The last stint must end at lap ${fullSelectedCircuit.TotalLaps}`);
            return false;
        }

        for (let i = 0; i < sorted.length - 1; i++) {
            const currentEnd = Number(sorted[i].endLap);
            const nextStart = Number(sorted[i + 1].startLap);

            if (currentEnd + 1 !== nextStart) {
                setValidationError(`Gap or overlap between stint ${i + 1} and ${i + 2}`);
                return false;
            }
        }

        // Count unique tyre compounds
        const uniqueTyres = new Set(stints.map(s => s.tyre).filter(t => t !== ''));

        if (uniqueTyres.size < 2) {
            setValidationError("You must use at least two different tyre compounds");
            return false;
        }

        setValidationError(""); // No errors
        return true;
    };

    const [chartMode, setChartMode] = useState('laptimes');

    useEffect(() => {
        validateStints();
    }, [stints]);

    return (
        <div className='background'>
            <AppBar position="static" className='top-bar' color='error'>
                <h1 className='title'>
                    Formula 1 Strategy Simulator
                </h1>
            </AppBar>
            <div className='circuit-select'>
                <FormControl fullWidth>
                    <h3> Select a Circuit </h3>
                    <Select 
                        value={selectedCircuit}
                        onChange={handleCircuitChange}
                        MenuProps={MenuProps}
                    >
                        {circuits.map((circuit) => {
                            return (
                                <MenuItem value={circuit.id}>{circuit.Name} ({circuit.Circuit})</MenuItem>
                            )  
                        })}
                    </Select>
                </FormControl>
            </div>
            <div className='circuit-info-box'>
                <div className='circuit-info'>
                    <div className='circuit-info-details'>
                        <CircuitImage CircuitName={fullSelectedCircuit.Circuit} />
                        <div className='circuit-details'>
                            <p><b>Circuit Length:</b> {fullSelectedCircuit.CircuitLength} km</p>
                            <p><b>Race Laps:</b> {fullSelectedCircuit.TotalLaps}</p>
                            <p><b>Average Speed:</b> {fullSelectedCircuit.AverageSpeed} km/h</p>
                            <p><b>N° of Corners:</b> {fullSelectedCircuit.Corners}</p>
                            <p><b>Total Race Distance:</b> {fullSelectedCircuit.RaceDistance} km</p>
                        </div>
                    </div>
                    <div>
                        <h3>Circuit Characteristics</h3>
                        <CircuitCharacteristic Title='Braking' Value={fullSelectedCircuit.Braking} />
                        <CircuitCharacteristic Title='Traction' Value={fullSelectedCircuit.Traction} />
                        <CircuitCharacteristic Title='Lateral' Value={fullSelectedCircuit.Lateral} />
                        <CircuitCharacteristic Title='TrackEvolution' Value={fullSelectedCircuit.TrackEvolution} />
                        <CircuitCharacteristic Title='TyreStress' Value={fullSelectedCircuit.TyreStress} />
                        <CircuitCharacteristic Title='AsphaltAbrasion' Value={fullSelectedCircuit.AsphaltAbrasion} />
                        <CircuitCharacteristic Title='AsphaltGrip' Value={fullSelectedCircuit.AsphaltGrip} />
                        <CircuitCharacteristic Title='Downforce' Value={fullSelectedCircuit.Downforce} />
                    </div>
                </div>
            </div>
            <div className='strategy-container'>
                <Grid container spacing={1}>
                    <Grid size={2}>
                        <div className='tyre-info'>
                            <TyreCompounds 
                                HardTyre={fullSelectedCircuit.HardTyre}
                                MediumTyre={fullSelectedCircuit.MediumTyre}
                                SoftTyre={fullSelectedCircuit.SoftTyre}
                            />
                        </div>  
                    </Grid>
                    <Grid size={7}>
                        <div class='laptime-container'>
                        <ToggleButtonGroup
                            value={chartMode}
                            exclusive
                            orientation="vertical"
                            onChange={(e, value) => {
                                if (value !== null) setChartMode(value);
                            }}
                            size='small'
                            color='error'
                            sx={{ marginBottom: 2 }}
                        >
                            <ToggleButton value="laptime">Lap Times</ToggleButton>
                            <ToggleButton value="delta">Delta</ToggleButton>
                        </ToggleButtonGroup>
                            {chartMode === 'delta' ? 
                                <DeltaChart Strategies={strategies} />
                                 : 
                                <LapTimeChart Strategies={strategies} Circuit={fullSelectedCircuit} />
                            }
                        </div> 
                    </Grid>
                    <Grid size={3}>
                        <h3>Strategies (max. 2)</h3>
                        <Button variant='contained' 
                        disabled={strategies.length >= 2}
                        onClick={() => handleOpen()}
                        color='error'> Create Strategy </Button>
                        {strategies.map((strat, index) => (
                            <div className='strategy-details-container'>
                                <StrategySummary 
                                TotalTime={strat.totalTime} 
                                StrategyName={'Strategy '+(index+1)} 
                                Stints={strat.stints}
                                HardTyre={fullSelectedCircuit.HardTyre}
                                MediumTyre={fullSelectedCircuit.MediumTyre}
                                SoftTyre={fullSelectedCircuit.SoftTyre}
                                />
                                <IconButton>
                                  <DeleteIcon 
                                    color="error"
                                    onClick={() => deleteStrategy(index)}
                                    className='delete-button'
                                    />  
                                </IconButton>
                            </div>
                        ))}                        
                    </Grid>
                </Grid>
            </div>
            <Modal open={openModal} onClose={handleClose}>
                <div className='modal-container'>
                    <div className='modal-box'>
                        <h2>Create a Strategy</h2>

                        {stints.map((stint, index) => (
                            <div key={index} className="stint-row">
                                <div className='select-container'>
                                <Select
                                    size="small"
                                    fullWidth
                                    value={stint.tyre}
                                    onChange={(e) => updateStint(index, "tyre", e.target.value)}
                                >
                                    <MenuItem value={fullSelectedCircuit.HardTyre}>
                                        HARD (C{fullSelectedCircuit.HardTyre})
                                    </MenuItem>
                                    <MenuItem value={fullSelectedCircuit.MediumTyre}>
                                        MEDIUM (C{fullSelectedCircuit.MediumTyre})
                                    </MenuItem>
                                    <MenuItem value={fullSelectedCircuit.SoftTyre}>
                                        SOFT (C{fullSelectedCircuit.SoftTyre})
                                    </MenuItem>
                                </Select>
                                </div>
                                <TextField
                                    size="small"
                                    label="Start Lap"
                                    type="number"
                                    value={stint.startLap}
                                    onChange={(e) => updateStint(index, "startLap", e.target.value)}
                                />
                                <TextField
                                    size="small"
                                    label="End Lap"
                                    type="number"
                                    value={stint.endLap}
                                    onChange={(e) => updateStint(index, "endLap", e.target.value)}
                                />
                                <TextField
                                    size="small"
                                    label="Tyre Age"
                                    type="number"
                                    value={stint.startingTyreAge}
                                    onChange={(e) => updateStint(index, "startingTyreAge", e.target.value)}
                                />
                                <IconButton>
                                  <DeleteIcon 
                                    color="error"
                                    onClick={() => deleteStint(index)}
                                    className='delete-button'
                                    />  
                                </IconButton>                                
                            </div>
                        ))}
                        <div className='alert-container'>
                        {validationError && (
                            <Alert severity="error" style={{ marginBottom: "12px" }}>
                                {validationError}
                            </Alert>
                        )}
                        </div>
                        <div className='action-buttons'>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={createStint}
                        >
                            Add Stint
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleCreateStrategy}
                            disabled={!!validationError}
                        >
                            Create Strategy
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default HomePage;