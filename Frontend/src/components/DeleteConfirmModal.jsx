import Button from "./Button";

function DeleteConfirmModal({ user, onCancel, onConfirm }) {
  if (!user) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal confirm">
        <h2>Delete user?</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className="modal-actions">
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" className="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
