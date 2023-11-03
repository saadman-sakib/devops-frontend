"use client";

import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, ProfileOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';

const items = [
  {
    label: (<Link href="/">Home</Link>),
    key: 'home',
    icon: <MailOutlined />,
  },
  {
    label:  (<Link href="/chartview">History</Link>),
    key: 'history',
    icon: <AppstoreOutlined />,
  },
  {
    label:  (<Link href="/calculator">Calculator</Link>),
    key: 'calculaor',
    icon: <SettingOutlined />,
  },
  {
    label:  (<Link href="/adminpanel">Admin</Link>),
    key: 'adminpanel',
    icon: <ProfileOutlined />,
  },
];
const Navbar = () => {
  const [current, setCurrent] = useState('home');
  const is_auth = true;
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  if(is_auth){
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
  } else {
    return <></>
  }
};
export default Navbar;