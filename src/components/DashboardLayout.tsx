import React from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';  // Import inside the component
import SidebarItems from '../constants/SidebarItems';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate(); // Moved inside the component
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/Login");
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout} key="1">Logout</Menu.Item>
      <Menu.Item key="2">Profile</Menu.Item>
    </Menu>
  );

  // Sidebar style
  const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
  };

  // Handle menu item clicks
  const onMenuClick: MenuProps['onClick'] = (menuItem) => {
    const selectedItem = SidebarItems.find((item) => item.key === menuItem.key);
    if (selectedItem?.path) {
      navigate(selectedItem.path); // Navigate to the corresponding path
    }
  };

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        {/* Sidebar Header */}
        <div style={{ padding: '16px', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          My Dashboard
        </div>

        {/* Sidebar Menu */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={onMenuClick} // Attach the click handler
          items={SidebarItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
        />
      </Sider>

      <Layout style={{ marginLeft: 200 }}>
        {/* Header */}
        <Header style={{ background: '#fff', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {/* User Profile Dropdown */}
            <Dropdown overlay={menu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <UserOutlined />
                  محمد أحمد
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>

        {/* Content */}
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
