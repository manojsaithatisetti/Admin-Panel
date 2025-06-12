import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface HeaderProps {
  onUploadClick: () => void;
}

const Header = ({ onUploadClick }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <h1 className="text-xl font-semibold">App documents</h1>
      <Button
        type="primary"
        icon={<UploadOutlined />}
        onClick={onUploadClick}
      >
        Upload Document
      </Button>
    </header>
  );
};

export default Header;