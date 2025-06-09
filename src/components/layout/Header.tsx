import { Layout, Button } from "antd";
import useAuth from "../../store/useAuth";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
const { Header: AntHeader } = Layout;

const Header = () => {
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
  logout();
  navigate("/login");
};

  return (
    <AntHeader className="bg-grey border-b border-orange-200 flex items-center justify-between">
      <div className="text-black-400">Dashboard</div>
      <div className="ml-auto">
      <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Button>
      </div>
    </AntHeader>
  );
};

export default Header;
