import '../styles/DeltaChart.css';
import { useMemo, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Slider } from "@mui/material";

function DeltaChart({ Strategies }) {

    // Compute max laps
    const maxLaps = Math.max(...Strategies.map(s => s.laptimes.length));

    const [range, setRange] = useState([1, maxLaps]);

    // Build X-axis
    const xAxis = useMemo(
        () => Array.from({ length: maxLaps }, (_, i) => i + 1),
        [maxLaps]
    );

    // Compute cumulative deltas
    const deltas = useMemo(() => {
        const cumulatives = Strategies.map(s => {
            let sum = 0;
            return s.laptimes.map(t => {
                sum += Number(t);
                return sum;
            });
        });

        const ref = cumulatives[0];

        return cumulatives.map(cum =>
            cum.map((t, i) => t - ref[i])
        );
    }, [Strategies]);

    // Filter X-axis by zoom
    const filteredXAxis = xAxis.filter(lap => lap >= range[0] && lap <= range[1]);

    // Build series
    const series = deltas.map((delta, index) => ({
        id: index,
        label: `Strategy ${index + 1}`,
        data: delta.slice(range[0] - 1, range[1]),
        showMark: false,
        strokeWidth: 2,
    }));

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
                />
            </div>
        </div>
    );
}

export default DeltaChart;
