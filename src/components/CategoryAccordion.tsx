import { Collapse, List } from 'antd';
import { FolderOutlined, FileOutlined, EyeOutlined } from '@ant-design/icons';
import type { Document } from '../types';

const { Panel } = Collapse;

interface CategoryAccordionProps {
  documents: Document[];
}

const CategoryAccordion = ({ documents }: CategoryAccordionProps) => {
  const categories = Array.from(new Set(documents.map(doc => doc.category)));

  return (
    <Collapse accordion>
      {categories.map((category) => {
        const categoryDocs = documents.filter(doc => doc.category === category);
        return (
          <Panel
            key={category}
            header={
              <span>
                <FolderOutlined className="mr-2" />
                {category}
              </span>
            }
          >
            <List
              dataSource={categoryDocs}
              renderItem={(doc) => (
                <List.Item
                  actions={[
                    <EyeOutlined key="preview-icon" />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<FileOutlined />}
                    title={`${doc.title}.${doc.fileType}`}
                    description={`Uploaded: ${new Date(doc.uploadDate).toLocaleDateString()}`}
                  />
                </List.Item>
              )}
            />
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default CategoryAccordion;
