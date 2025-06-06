import { Button, Form, Input, Card } from "antd";
// import useAppStore from "../../store/useAppStore";
import { useNavigate } from "react-router-dom";
import useAuth from "../../store/useAuth";
const LoginPage = () => {
  const login = useAuth((state) => state.login);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLogin = (values: any) => {
    const { email, password } = values;
    if (email === "admin@dms.com" && password === "admin123") {
      login();
      alert("Login Successful...");
      navigate("/app/documents");
    } else {
      alert("invalid credentials");
    }
  };

  return (
    <div>
      <Card title={<h2>Admin Login</h2>}>
        <Form name="login" onFinish={onLogin} layout="vertical">
          <Form.Item
            name="email"
            label="email"
            rules={[{ required: true, message: "Please enter a email" }]}
          >
            <Input placeholder="Enter a email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter a Password" }]}
          >
            <Input.Password placeholder="Enter a Password" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
