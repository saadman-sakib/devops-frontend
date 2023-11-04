"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const App = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const onFinish = (values) => {
        console.log("Received values of form: ", values);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let id = 0; /// to be changed

        var raw = JSON.stringify({
            id: values.id,
            phone: values.phone,
            name: values.name,
            gender: values.gender,
            age: values.age,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(
            "https://cloud-run-tf-dev-uwv3gbod2a-uc.a.run.app/auth/register",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.message == "User created") {
                    router.push("/login");
                } else {
                    alert(result.message);
                }
            })
            .catch((error) => {
                console.log("error", error);
                alert(result.message);
            });
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="880">+880</Option>
            </Select>
        </Form.Item>
    );
    useEffect(() => {
      if (localStorage.getItem("token") != null) {
          router.push("/");
      }
  }, []);
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ textAlign: "center" }}>Sign Up</h1>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                scrollToFirstError
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
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Name!",
                        },
                    ]}
                >
                    <Input
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
                        addonBefore={prefixSelector}
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="age"
                    label="Age"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Age",
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
                    name="gender"
                    label="Gender"
                    rules={[
                        {
                            required: true,
                            message: "Please select gender!",
                        },
                    ]}
                >
                    <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>

                {/* <Form.Item
                    label="Captcha"
                    extra="We must make sure that your are a human."
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="captcha"
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the captcha you got!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Button>Get captcha</Button>
                        </Col>
                    </Row>
                </Form.Item> */}

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(
                                          new Error("Should accept agreement")
                                      ),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <br />
                    Already have an account? <a href="/login">login now!</a>
                </Form.Item>
            </Form>
        </div>
    );
};
export default App;
