function LoadingModal({ open, label = "Loading..." }) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal loading-modal">
        <div className="spinner" />
        <p>{label}</p>
      </div>
    </div>
  );
}

export default LoadingModal;
