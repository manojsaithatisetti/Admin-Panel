import { Layout, Menu } from 'antd';
import {
  FileOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import useUI from '../store/useUI';
import useAuth from '../store/useAuth';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  const { isSidebarCollapsed, toggleSidebar } = useUI();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={isSidebarCollapsed}
      width={250}
      
      className="h-screen bg-blue border-r"
    >
      <div className="flex items-center justify-between p-4">
        {!isSidebarCollapsed && (
<<<<<<< HEAD
          <h1>Admin</h1>
=======
          <h1></h1>
>>>>>>> e6c9d57 (task done)
        )}
        <button onClick={toggleSidebar} className="text-gray-500">
          {isSidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      <Menu
        theme="light"
        mode="inline"
        items={[
          {
            key: '1',
            icon: <FileOutlined />,
            label: 'Documents',
            onClick: () => navigate('/app/documents'),
          },
          {
            key: '2',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: handleLogout,
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;