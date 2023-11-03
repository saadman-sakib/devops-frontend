"use client";

import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Progress, Button } from "antd";
import faker from "faker";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Tax vs Time Graph",
        },
    },
};

const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() =>
                faker.datatype.number({ min: -1000, max: 1000 })
            ),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: labels.map(() =>
                faker.datatype.number({ min: -1000, max: 1000 })
            ),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export default function CustomChart() {
    return (
        <div style={{ width: "98%", maxWidth: 1000, maxHeight: 600 }}>
            <h1 style={{ textAlign: "center" }}>Your Historical Data</h1>
            <h3> tax given over the years</h3>
            <Line options={options} data={data} />
            <h3 style={{ marginTop: "40px" }}> tax to income ratio</h3>
            <Progress
                style={{ display: "flex", justifyContent: "center" }}
                type="circle"
                percent={30}
                size={400}
            />

            <div
                className="result"
            >
                <h1 style={{ textAlign: "center" }}>Result</h1>
                <table
                    className={"custom-table"}
                    style={{
                        padding: "20px",
                        width: "100%",
                        textAlign: "center",
                        marginBottom: "10px",
                    }}
                >
                    <tr>
                        <th>Name</th> <td> Jamal </td>
                    </tr>
                    <tr>
                        <th>Age</th> <td> 45 </td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>Male</td>
                    </tr>
                    <tr>
                        <th>Year</th> <td>2023</td>
                    </tr>
                    <tr>
                        <th>Income Amount</th> <td>12518698253</td>
                    </tr>
                    <tr>
                        <th>Tax Amount</th> <td>1251253</td>
                    </tr>
                </table>
            </div>

            <Button type="primary" htmlType="button">
                Pdf Create
            </Button>
            <br /><br /><br /><br /><br />
        </div>
    );
}
