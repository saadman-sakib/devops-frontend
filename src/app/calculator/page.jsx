"use client";

import React, { useEffect, useRef } from "react";
import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";

import ReactToPrint from "react-to-print";

const { Option } = Select;

const Calculator = () => {
    const formRef = React.useRef(null);
    const [res, setRes] = React.useState(null);
    const [info, setInfo] = React.useState(null);
    const [res_display, setResDisplay] = React.useState(true);

    const onFinish = (values) => {
        console.log(info.date.toString());
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        setInfo(values);

        var raw = JSON.stringify({
            income: values.income,
            date: values.date.toString(),
            gender: values.gender,
            age: values.age,
            location: "RANGPUR",
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(
            "https://asdasdasd-uwv3gbod2a-uc.a.run.app/wizard/calculate",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setRes(result);
                console.log(result);
                setResDisplay(false);
            })
            .catch((error) => console.log("error", error));
    };

    const submitInfo = (values) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");


      var raw = JSON.stringify({
          id: res.id,
          year: res.date.year(),
          income: res.income,
          tax: res.tax,
          token: localStorage.getItem("token"),
      });

      var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
      };

      fetch(
          "https://asdasdasd-uwv3gbod2a-uc.a.run.app/dashboard/submit-info",
          requestOptions
      )
          .then((response) => response.json())
          .then((result) => {
              console.log(result);
          })
          .catch((error) => console.log("error", error));
  };

    useEffect(() => {
        console.log(res);
    }, [res]);

    let pdfref = useRef();

    const onReset = () => {
        formRef.current?.resetFields();
    };

    return (
        <div style={{ width: "100%", maxWidth: 800 }}>
            <h1 style={{ textAlign: "center" }}>Calculate Your Tax</h1>

            <Form ref={formRef} name="control-ref" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="name"
                    rules={[{ required: true }]}
                    style={{ width: "100%" }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="income"
                    label="income"
                    rules={[{ required: true }]}
                    style={{ width: "100%" }}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true }]}
                    style={{ width: "100%" }}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="M">male</Option>
                        <Option value="F">female</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="age"
                    label="age"
                    rules={[{ required: true }]}
                    style={{ width: "100%" }}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    name="date"
                    label="DatePicker"
                    rules={[{ required: true }]}
                    style={{ width: "100%" }}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>

            <div
                style={{ visibility: res_display ? "hidden" : "visible" }}
            >
              <div
                ref={(el) => (pdfref = el)}
                style={{ visibility: res_display ? "hidden" : "visible" }}
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
                        <th>Name</th> <td>{info?.name}</td>
                    </tr>
                    <tr>
                        <th>Age</th> <td>{info?.age}</td>
                    </tr>
                    <tr>
                        <th>Gender</th>{" "}
                        <td>{info?.gender == "M" ? "Male" : "Female"}</td>
                    </tr>
                    <tr>
                        <th>Date</th> <td>{info?.date.toString()}</td>
                    </tr>
                    <tr>
                        <th>Tax Amount</th> <td>{res?.tax}</td>
                    </tr>
                </table>
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
            <Button className="btn btn" type="primary" danger onClick={submitInfo} >
                Save
            </Button>
            </div>
        </div>
        // </div>
    );
};
export default Calculator;
