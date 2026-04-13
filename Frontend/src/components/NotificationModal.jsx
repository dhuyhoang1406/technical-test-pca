import Button from "./Button";

function NotificationModal({ message, onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal notice-modal">
        <h2>Notification</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <Button type="button" className="btn-primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
