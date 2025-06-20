import {
  Table,
  Tag,
  Space,
  Button,
  Input,
  Select,
  Modal,
  Form,
  Input as AntInput,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface Document {
  id: string;
  filename: string;
  fileType: string;
  title: string;
  category: string;
  uploadDate: string;
  size: number;
}

const initialDocuments: Document[] = [
  {
    id: "1",
    filename: "guide.pdf",
    fileType: "pdf",
    title: "guide",
    category: "engineering",
    uploadDate: "2023-01-15T00:00:00.000Z",
    size: 1024,
  },
  {
    id: "2",
    filename: "specs.docx",
    fileType: "docx",
    title: "specs",
    category: "marketing",
    uploadDate: "2023-02-20T00:00:00.000Z",
    size: 2048,
  },
];

const DocumentTable = () => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [renamingDocId, setRenamingDocId] = useState<string | null>(null);
  const [renamingTitle, setRenamingTitle] = useState("");

  const categories = Array.from(new Set(documents.map((doc) => doc.category)));

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.filename.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory
      ? doc.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const handleEditClick = (id: string, currentTitle: string) => {
    setRenamingDocId(id);
    setRenamingTitle(currentTitle);
    setRenameModalVisible(true);
  };

  const handleRename = (newTitle: string) => {
    if (renamingDocId) {
      setDocuments((prevDocs) =>
        prevDocs.map((doc) =>
          doc.id === renamingDocId
            ? {
                ...doc,
                title: newTitle,
                filename: `${newTitle}.${doc.fileType}`,
              }
            : doc
        )
      );
    }
    setRenameModalVisible(false);
    setRenamingDocId(null);
  };

  const handleDelete = (id: string) => {
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
  };

  const handlePreview = (id: string) => {
    const doc = documents.find((d) => d.id === id);
    if (doc) {
      alert(`Previewing: ${doc.filename}`);
    }
  };

  const columns: ColumnsType<Document> = [
    {
      title: "Filename",
      dataIndex: "filename",
      key: "filename",
      render: (_, record) => (
        <div className="flex items-center">
          <span className="font-medium">{record.title}</span>
          <span className="text-gray-500 ml-1">.{record.fileType}</span>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Upload Date",
      dataIndex: "uploadDate",
      key: "uploadDate",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size) => `${(size / 1024).toFixed(2)} KB`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => handlePreview(record.id)} />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record.id, record.title)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search documents..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-64"
        />
        <Select
          placeholder="Filter by category"
          options={categories.map((cat) => ({ value: cat, label: cat }))}
          allowClear
          onChange={(value) => setSelectedCategory(value)}
          className="w-48"
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredDocuments}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />

      <Modal
        open={renameModalVisible}
        title="Rename Document"
        onCancel={() => setRenameModalVisible(false)}
        onOk={() => handleRename(renamingTitle)}
        okText="Save"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="New Document Title" required>
            <AntInput
              value={renamingTitle}
              onChange={(e) => setRenamingTitle(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DocumentTable;
