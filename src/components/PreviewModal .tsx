
<<<<<<< HEAD
const PreviewModal  = () => {
  return (
    <div>
      
    </div>
  )
}

export default PreviewModal 
=======
import { Modal } from 'antd';
import { FilePdfOutlined, FileWordOutlined, FileImageOutlined, FileTextOutlined } from '@ant-design/icons';

interface CustomDocument {
  filename: string;
  fileType: string;
  size: number;
  uploadDate: string | number | Date;
}

interface PreviewModalProps {
  visible: boolean;
  document: CustomDocument | null;
  onCancel: () => void;
}

const PreviewModal = ({ visible, document, onCancel }: PreviewModalProps) => {
  const getFileIcon = () => {
    if (!document) return <FileTextOutlined />;
    
    const type = document.fileType.toLowerCase();
    if (type === 'pdf') return <FilePdfOutlined />;
    if (['doc', 'docx'].includes(type)) return <FileWordOutlined />;
    if (['jpg', 'jpeg', 'png', 'gif'].includes(type)) return <FileImageOutlined />;
    return <FileTextOutlined />;
  };

  return (
    <Modal
      title="Document Preview"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width="80%"
    >
      {document ? (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="text-6xl mb-4">{getFileIcon()}</div>
          <h2 className="text-xl font-semibold">{document.filename}</h2>
          <div className="mt-4 text-gray-600">
            <p>Type: {document.fileType.toUpperCase()}</p>
            <p>Size: {(document.size / 1024).toFixed(2)} KB</p>
            <p>Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</p>
          </div>
          <div className="mt-8 p-4 border rounded bg-gray-50 w-full text-center">
            <p>Preview content would be displayed here</p>
            <p className="text-sm text-gray-500 mt-2">
              Note: This is a demo. In a real application, you would integrate with a document viewer.
            </p>
          </div>
        </div>
      ) : (
        <p>No document selected</p>
      )}
    </Modal>
  );
};

export default PreviewModal;
>>>>>>> e6c9d57 (task done)
