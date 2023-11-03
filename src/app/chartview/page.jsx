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
    let pdfref = useRef();
    // const [data, setdata] = React.useState(null);
    const [year, setYear] = React.useState(null);
    
    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
        setYear(key);
    };
    const getChartInfo = (values) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
    
      let id = 0;/// to be changed
    
      var raw = JSON.stringify({
          id: id,
          token: localStorage.getItem("token"),
      });
    
      var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
      };
    
      fetch(
          "https://asdasdasd-uwv3gbod2a-uc.a.run.app/dashboard/get-info",
          requestOptions
      )
          .then((response) => response.json())
          .then((result) => {
              setdata(result);
              console.log(result);
          })
          .catch((error) => console.log("error", error));
    };

    React.useEffect(() => {
        getChartInfo();
    }, []);


    return (
        <div style={{ width: "98%", maxWidth: 1000, maxHeight: 600 }}>
            <div ref={(el) => (pdfref = el)}>
                <h1 style={{ textAlign: "center" }}>Your Historical Data</h1>
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
                    <Button type="primary" onClick={(e) => e.preventDefault()}>
                        <Space>
                             { year || "Select Year" }
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
