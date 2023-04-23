import React, { useState, useEffect } from 'react';
import './index.css';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip, Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [value, setValue] = useState<string>('');

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   loadMoreData();
  // }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Input
        placeholder="Enter your username"
        allowClear={true}
        value={value}
        prefix={<UserOutlined className="site-form-item-icon" />}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value !== '') {
            loadMoreData();
          } else {
            setData([]);
          }
        }}
      />
      {data.length ? (
        <div
          id="scrollableDiv"
          style={{
            position: 'absolute',
            top: 35,
            minHeight: 0,
            maxHeight: 400,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
            background: '#ffffff',
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 50}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.email}
                  onClick={() => {
                    setValue(item.name.first);
                    setData([]);
                  }}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={item.name.last}
                    description={item.email}
                  />
                  <div>Content</div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      ) : null}
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
    </div>
  );
};

export default App;
