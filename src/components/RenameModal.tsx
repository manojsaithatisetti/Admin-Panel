
<<<<<<< HEAD
const RenameModal = () => {
  return (
    <div>
      
    </div>
  )
}

export default RenameModal
=======
import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";

interface RenameModalProps {
  visible: boolean;
  initialName: string;
  onCancel: () => void;
  onRename: (newName: string) => void;
}

const RenameModal = ({
  visible,
  initialName,
  onCancel,
  onRename,
}: RenameModalProps) => {
  const [newName, setNewName] = useState(initialName);

  useEffect(() => {
    setNewName(initialName);
  }, [initialName]);

  const handleOk = () => {
    onRename(newName);
  };

  return (
    <Modal
      title="Rename Document"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Rename"
    >
      <Input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter new name"
      />
    </Modal>
  );
};

export default RenameModal;

>>>>>>> e6c9d57 (task done)
