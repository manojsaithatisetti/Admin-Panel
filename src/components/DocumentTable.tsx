import { Table, Tag, Space, Button, Input, Select } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import type { Document } from "../types";

interface DocumentTableProps {
  documents: Document[];
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
}

const DocumentTable = ({ documents, onDelete }: DocumentTableProps) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const columns: ColumnsType<Document> = [
    {
      title: "Filename",
      dataIndex: "filename",
      key: "filename",
      render: (text, record) => (
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
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} />
          <Button icon={<EditOutlined />} onClick={() => {}} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
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
    </div>
  );
};

export default DocumentTable;
