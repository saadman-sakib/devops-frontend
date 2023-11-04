"use client";

import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, ProfileOutlined, LoginOutlined } from '@ant-design/icons';
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
      label:  (<Link href="/">Logout</Link>),
      key: 'logout',
      icon: <LoginOutlined />,
  },
  // {
  //   label:  (<Link href="/adminpanel">Admin</Link>),
  //   key: 'adminpanel',
  //   icon: <ProfileOutlined />,
  // },
];
const Navbar = () => {
  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    if(e.key=='logout'){
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      window.location.reload();
    }
  };
  const [is_auth, setAuth] = useState(null);
  useEffect( ()=>{
    if(localStorage.getItem('token')===null){
      setAuth(localStorage?.getItem('token')!==null);
    }
  },[])

  if (is_auth==false){
    return <></>
  } else {
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
  }
};
export default Navbar;