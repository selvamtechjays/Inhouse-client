
/*doughnutchart*/
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ["Primary", "Secondary"],
    datasets: [
        {
            label: "# of Votes",
            data: [40, 60],
            backgroundColor: [

                "#5a5a5a",
                "#450c36"
            ],
            borderColor: "white",
            borderwidth: 500,
            cutout: "75%"
        }
    ]
};

export function PieChart() {
    return <Doughnut data={data} />;
}