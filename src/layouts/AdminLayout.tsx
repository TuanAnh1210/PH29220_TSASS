import { Button, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineMenuUnfold,
  AiOutlineUser,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <AiOutlineUser />,
              label: <Link to="/admin/dashboard">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <AiOutlineUser />,
              label: <Link to="/admin/course">Course</Link>,
            },
            {
              key: "3",
              icon: <AiOutlineVideoCamera />,
              label: <Link to="/admin/category">Category</Link>,
            },
            {
              key: "4",
              icon: <AiOutlineVideoCamera />,
              label: <Link to="/admin/user">User</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenu />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
