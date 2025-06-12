import { Modal, Form, Input, Select, Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";

interface UploadModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpload: (file: File, title: string, category: string) => void;
  existingCategories: string[];
}

const UploadModal: React.FC<UploadModalProps> = ({
  visible,
  onCancel,
  onUpload,
  existingCategories,
}) => {
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const beforeUpload = (file: File) => {
    setSelectedFile(file);
    form.setFieldsValue({ title: file.name.split(".")[0] });
    return false;
  };

  const handleUpload = () => {
    form.validateFields().then((values) => {
      if (!selectedFile) {
        message.error("Please select a file first.");
        return;
      }
      onUpload(selectedFile, values.title, values.category);
      form.resetFields();
      setSelectedFile(null);
    });
  };

  return (
    <Modal
      title="Upload Document"
      open={visible}
      onCancel={onCancel}
      onOk={handleUpload}
      okText="Upload"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="file"
          label="File"
          rules={[{ required: true, message: "Please select a file" }]}
        >
          <Upload beforeUpload={beforeUpload} maxCount={1}>
            <Button icon={<UploadOutlined />}> Please Select File</Button>
          </Upload>
        </Form.Item>

        {selectedFile && <div>Selected: {selectedFile.name}</div>}

        <Form.Item
          name="title"
          label="Document name"
          rules={[{ required: true, message: "enter  title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: " category" }]}
        >
          <Select
            placeholder="Select category"
            options={existingCategories.map((user) => ({
              label: user,
              value: user,
            }))}
            showSearch
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadModal;
