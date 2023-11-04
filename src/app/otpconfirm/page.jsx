"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, message, Checkbox, Form, Input, InputNumber } from "antd";

const App = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values) => {
        console.log("Received values of form: ", values);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify({
            id: values.id,
            otp: values.otp,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(
            "https://cloud-run-tf-dev-uwv3gbod2a-uc.a.run.app/auth/verify-otp",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.token) {
                    localStorage.setItem("token", result.token);
                    localStorage.setItem("id", values.id);
                    router.push("/");
                } else {
                    // messageApi.open({
                    //     type: "error",
                    //     content: "OTP Failed Try again correctly",
                    //     duration: 10,
                    // });
                    
                alert("OTP Failed Try again correctly");
                }
            })
            .catch((error) => {
                // messageApi.open({
                //     type: "error",
                //     content: "OTP Failed Try again correctly",
                //     duration: 10,
                // });
                alert("OTP Failed Try again correctly");
                console.log("error", error);
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <h1>OTP Verification</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="NID"
                    name="id"
                    rules={[
                        {
                            required: true,
                            message: "Please input your OTP!",
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="OTP"
                    name="otp"
                    rules={[
                        {
                            required: true,
                            message: "Please input your OTP!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default App;
