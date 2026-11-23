import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function DepartmentPieChart({ chartData }) {

    const data = {

        labels: chartData.map(
            item => item.department
        ),

        datasets: [

            {

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

    return (

        <div className="card shadow mt-4">

            <div className="card-header bg-success text-white">

                <h5 className="mb-0">

                    Employee Distribution

                </h5>

            </div>

            <div className="card-body">

                <Pie data={data} />

            </div>

        </div>

    );

}

export default DepartmentPieChart;