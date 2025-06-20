import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";

interface RenameModalProps {
  visible: boolean;
  initialName: string;
  onCancel: () => void;
  onRename: (newName: string) => void;
}

const RenameModal: React.FC<RenameModalProps> = ({
  visible,
  initialName,
  onCancel,
  onRename,
}) => {
  const [newName, setNewName] = useState(initialName);

  useEffect(() => {
    setNewName(initialName);
  }, [initialName]);

  const handleOk = () => {
    if (newName.trim()) {
      onRename(newName.trim());
    }
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
        autoFocus
      />
    </Modal>
  );
};

export default RenameModal;
