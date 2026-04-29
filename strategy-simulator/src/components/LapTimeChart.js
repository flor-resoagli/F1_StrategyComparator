import { useState, useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Slider } from "@mui/material";

function LapTimeChart({ Strategies, Circuit }) {

    // Hooks MUST run before any conditional return
    const maxLaps = useMemo(() => {
        if (!Strategies || Strategies.length === 0) return 1;
        return Math.max(...Strategies.map(s => s.laptimes.length));
    }, [Strategies]);

    const [range, setRange] = useState([1, maxLaps]);

    // Full X-axis
    const xAxis = useMemo(
        () => Array.from({ length: maxLaps }, (_, i) => i + 1),
        [maxLaps]
    );

    // Filtered X-axis based on slider
    const filteredXAxis = useMemo(
        () => xAxis.filter(lap => lap >= range[0] && lap <= range[1]),
        [xAxis, range]
    );

    // Build one series per strategy, filtered by slider
    const series = useMemo(
        () =>
            Strategies.map((strategy, index) => ({
                id: index,
                label: `Strategy ${index + 1}`,
                data: strategy.laptimes
                    .map(Number)
                    .slice(range[0] - 1, range[1]), // zoom filter
                showMark: false,
                strokeWidth: 2,
            })),
        [Strategies, range]
    );

    // Early return AFTER hooks
    if (!Strategies || Strategies.length === 0) {
        return <p>No strategies yet</p>;
    }



    return (
        <div style={{ width: "80%" }}>
            <div className="chart-container">
            <LineChart
                xAxis={[{ data: filteredXAxis, label: "Lap Number" }]}
                series={series}
                height={300}
                sx={{ width: "80%", margin: "0 auto", marginBottom: 2 }}
            />
            <Slider
                value={range}
                onChange={(e, newValue) => setRange(newValue)}
                color='error'
                min={1}
                max={maxLaps}
                valueLabelDisplay="auto"
                sx={{ width: "80%", marginLeft: "110px", marginRight: "50px"}}
            />
            </div>
        </div>
    );
}

export default LapTimeChart;
