"use client";

import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import { useRouter } from "next/navigation";

const { Option } = Select;

const App = () => {
    const router = useRouter();

    const onFinish = (values) => {
        console.log("Received values of form: ", values);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify({
            id: values.id,
            phone: values.phone,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(
            "https://cloud-run-tf-dev-uwv3gbod2a-uc.a.run.app/auth/request-otp",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.message == "OTP sent") {
                    router.push("/otpconfirm");
                } else {
                    alert(result.message);
                }
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            router.push("/");
        }
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="id"
                    label="NID"
                    rules={[
                        {
                            required: true,
                            message: "Please input NID no",
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                    &nbsp; Or <a href="/signup">register now!</a>
                </Form.Item>
            </Form>
        </div>
    );
};
export default App;
