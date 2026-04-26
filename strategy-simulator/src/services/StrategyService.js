
export const generateLapTimes = async (stints, circuit) => {

    const laps = expandStrategyToLaps(stints, circuit);

    try {
        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(laps)
        });

        if (!response.ok) {
            throw new Error("API error");
        }

        return await response.json();

    } catch (err) {
        console.error("Lap time generation failed:", err);
        throw err;
    }

};

export const expandStrategyToLaps = (stints, circuit) => {

    const laps = []

    stints.map((stint, index) => {
        
        const start = stint.startLap;
        const end = stint.endLap;

        for (let lap = start; lap <= end; lap++) {

            const newLap = {
                LapNumber: lap,
                TyreLife: (lap-start)+ Number(stint.startingTyreAge),
                Circuit: circuit.id,
                CircuitLength: circuit.CircuitLength,
                TotalLaps: circuit.TotalLaps,
                FuelByLap: circuit.FuelByLap,
                RaceDistance: circuit.RaceDistance,
                AverageSpeed: circuit.AverageSpeed,
                Corners: circuit.Corners,
                Traction: circuit.Traction,
                Braking: circuit.Braking,
                Lateral: circuit.Lateral,
                TyreStress: circuit.TyreStress,
                TrackEvolution: circuit.TrackEvolution,
                AsphaltGrip: circuit.AsphaltGrip,
                AsphaltAbrasion: circuit.AsphaltAbrasion,
                Downforce: circuit.Downforce,
                MaxTemperature: circuit.MaxTemperature,
                MinTemperature: circuit.MinTemperature,
                AverageTemperature: circuit.AverageTemperature,
                Tyre: stint.tyre,
                RemainingFuel: 1 - circuit.FuelByLap*lap
            };

            laps.push(newLap);
        }

    })

    return laps;

}