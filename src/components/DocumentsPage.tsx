import { useState, useEffect } from "react";
import { Layout, Tabs, Card } from "antd";
import { FileOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DocumentTable from "./DocumentTable";
import CategoryAccordion from "./CategoryAccordion";
import UploadModal from "./UploadModal";
import type { Document } from "../types";

const { Content } = Layout;
const { TabPane } = Tabs;

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploadModalVisible, setIsUploadModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    const sampleData: Document[] = [
      {
        id: "1",
        filename: "java",
        title: "guide",
        category: "engineering",
        uploadDate: new Date("2023-01-15").toISOString(),
        size: 1024,
        fileType: "pdf",
      },
      {
        id: "2",
        filename: "marketing",
        title: "specs",
        category: "marketing",
        uploadDate: new Date("2023-02-20").toISOString(),
        size: 2048,
        fileType: "docx",
      },
    ];
    setDocuments(sampleData);
  }, []);

  const handleUpload = (file: File, title: string, category: string): void => {
    const newDocument: Document = {
      id: Date.now().toString(),
      filename: file.name,
      title,
      category,
      uploadDate: new Date().toISOString(),
      size: file.size,
      fileType: file.name.split(".").pop() || "",
    };
    setDocuments((prev) => [newDocument, ...prev]);
    setIsUploadModalVisible(false);
  };

  const handleDelete = (id: string): void => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const existingCategories: string[] = Array.from(
    new Set(documents.map((doc) => doc.category))
  );

  const recentlyUploaded: Document[] = [...documents]
    .sort(
      (a, b) =>
        new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    )
    .slice(0, 5);

  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <Layout>
        <Header onUploadClick={() => setIsUploadModalVisible(true)} />
        <Content className="p-6 bg-gray-50">
          <Tabs defaultActiveKey="1">
            <TabPane tab="All Documents" key="1">
              <DocumentTable
                documents={documents}
                onDelete={handleDelete}
<<<<<<< HEAD
                onRename={function (_id: string, newName: string): void {
=======
                onRename={function (_id: string): void {
>>>>>>> e6c9d57 (task done)
                  throw new Error("Function not implemented.");
                }}
                onPreview={function (id: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </TabPane>
            <TabPane tab="By Category" key="2">
              <CategoryAccordion documents={documents} />
            </TabPane>
            <TabPane tab="Recently Uploaded" key="3">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recentlyUploaded.map((doc) => (
                  <Card key={doc.id} hoverable>
                    <Card.Meta
                      avatar={<FileOutlined />}
                      title={`${doc.title}.${doc.fileType}`}
                      description={
                        <>
                          <div>{doc.category}</div>
                          <div>
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </div>
                        </>
                      }
                    />
                  </Card>
                ))}
              </div>
            </TabPane>
          </Tabs>

          <UploadModal
            visible={isUploadModalVisible}
            onCancel={() => setIsUploadModalVisible(false)}
            onUpload={handleUpload}
            existingCategories={existingCategories}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DocumentsPage;
