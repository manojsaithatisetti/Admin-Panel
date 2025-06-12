import { Button, Form, Input, Card } from "antd";
import { useNavigate } from "react-router-dom";
import useAuth from "../../store/useAuth";
const LoginPage = () => {
 const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values: { email: string; password: string }) => {
    const { email, password } = values;
    const isValid = login(email, password);
    if (isValid) {
      alert('Login successful');
      navigate('/app/documents');
    } else {
      alert('Invalid credentials');
    }
  };

  if (isLoggedIn) {
    navigate('/app/documents');
    return null;
  }


  return (
    <div>
      <Card title={<h2>Admin Login</h2>}>
        <Form name="login" onFinish={onFinish} layout="vertical">
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
