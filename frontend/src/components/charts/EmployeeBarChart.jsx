import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function EmployeeBarChart({ chartData }) {

    const data = {

        labels: chartData.map(
            item => item.department
        ),

        datasets: [

            {

                label: "Employees",

                data: chartData.map(
                    item => item.employees
                ),

                backgroundColor: [

                    "#0d6efd",
                    "#198754",
                    "#dc3545",
                    "#fd7e14",
                    "#6f42c1",
                    "#20c997"

                ]

            }

        ]

    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                display: false

            }

        }

    };

    return (

        <div className="card shadow mt-4">

            <div className="card-header bg-primary text-white">

                <h5 className="mb-0">

                    Employees Per Department

                </h5>

            </div>

            <div className="card-body">

                <Bar
                    data={data}
                    options={options}
                />

            </div>

        </div>

    );

}

export default EmployeeBarChart;