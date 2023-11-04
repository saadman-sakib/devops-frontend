"use client";

import React, { useRef } from "react";
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
import ReactToPrint from "react-to-print";

import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";

const items = [
    {
        label: "2023",
        key: "2023",
    },
    {
        label: "2022",
        key: "2022",
    },
    {
        label: "2021",
        key: "2021",
    },
];

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




export default function CustomChart() {
    let pdfref = useRef();
    const [data, setdata] = React.useState(null);
    const [year, setYear] = React.useState(null);

    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
        setYear(key);
    };
    const getChartInfo = (values) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        console.log("came1");

        fetch(
            "https://cloud-run-tf-dev-uwv3gbod2a-uc.a.run.app/dashboard/get-info",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) =>{
              console.log("gg", result);
              // result = result.map( result => ({...result, labels: result.year}) )
              const labels = result.map( r => r.year)
              const data = {
                labels,
                datasets: [
                    {
                        label: "Tax",
                        data: result.map(r => r.tax ),
                    },
                    {
                        label: "Income",
                        data: result.map(r => r.income ),
                    },
                ],
            }

              setdata(data)
              console.log(data)
            })
            .catch((error) => console.log("error", error));
    };

    const [is_auth, setauth] = React.useState(true);

    React.useEffect(() => {
        console.log("came2");
        getChartInfo();
        setauth(localStorage.getItem("token") != null)
    }, []);



    if (is_auth==false) {
        window.location.href = "/login";
        return <></>;
    } else {
        return ( data &&
            <div style={{ width: "98%", maxWidth: 1000, maxHeight: 600 }}>
                <div ref={(el) => (pdfref = el)}>
                    <h1 style={{ textAlign: "center" }}>
                        Your Historical Data
                    </h1>
                    <h3> tax given over the years</h3>
                    <Line style={{marginBottom: '60px'}} options={options} 
                  // data={data?.map((el)=>el.tax)}
                  data = {data} 
                  />

                    <Dropdown
                        menu={{
                            items,
                            onClick,
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={(e) => {
                              e.preventDefault()
                              let tmp = data.datasets[0].data.filter((el, i) => data.labels[i] == year)
                              console.log(tmp);
                            }}
                        >
                            <Space>
                                {year || "Select Year"}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>

                    <h1 style={{ textAlign: "center" }}> Result </h1>
                    <h3 style={{ marginTop: "40px" }}> tax to income ratio </h3>
                    <Progress
                        style={{ display: "flex", justifyContent: "center" }}
                        type="circle"
                        percent={30}
                        size={200}
                    />
                    <h3 style={{ marginTop: "40px" }}> tax information </h3>
                    <div className="result">
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

                    <br />
                    <br />
                </div>

                <ReactToPrint
                    style={{ marginBottom: "80px" }}
                    content={() => pdfref}
                    trigger={() => (
                        <Button className="btn btn-primary" type="primary">
                            Print to PDF!
                        </Button>
                    )}
                />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}
