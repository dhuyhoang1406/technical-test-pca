import Button from "./Button";

function SignupModal({
  open,
  formValues,
  formErrors,
  isSubmitting,
  onChange,
  onClose,
  onSubmit,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Sign Up Form</h2>
        <form onSubmit={onSubmit}>
          <label>
            First Name
            <input value={formValues.firstName} onChange={(event) => onChange("firstName", event.target.value)} />
            {formErrors.firstName ? <small>{formErrors.firstName}</small> : null}
          </label>
          <label>
            Last Name
            <input value={formValues.lastName} onChange={(event) => onChange("lastName", event.target.value)} />
            {formErrors.lastName ? <small>{formErrors.lastName}</small> : null}
          </label>
          <label>
            Email
            <input value={formValues.email} onChange={(event) => onChange("email", event.target.value)} />
            {formErrors.email ? <small>{formErrors.email}</small> : null}
          </label>
          <label>
            Password
            <input
              type="password"
              value={formValues.password}
              onChange={(event) => onChange("password", event.target.value)}
            />
            {formErrors.password ? <small>{formErrors.password}</small> : null}
          </label>
          <label>
            Re-type Password
            <input
              type="password"
              value={formValues.confirmPassword}
              onChange={(event) => onChange("confirmPassword", event.target.value)}
            />
            {formErrors.confirmPassword ? <small>{formErrors.confirmPassword}</small> : null}
          </label>
          <div className="modal-actions">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupModal;
