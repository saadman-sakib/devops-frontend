"use client";
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Button, Divider, List, Skeleton } from 'antd';
import Link from 'next/link';
const AdminPanel = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://asdasdasd-uwv3gbod2a-uc.a.run.app/dashboard/db-test')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <div
      id="scrollableDiv"
      style={{
        width: '90%',
        height: '700px',
        overflow: 'auto',
        padding: '0 16px',
      }}
    >
      <h1 style={{textAlign: 'center'}}  >Admin Panel</h1>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                // avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.email}
              />
              <Link type="button" href={"/adminpanel/" + item.id} >
                <Button type="primary" >View</Button>
              </Link>
              <Button type="primary" danger>Delete</Button>    
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
export default AdminPanel;