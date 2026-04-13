function UserRow({ user, checked, onToggle, onDelete }) {
  return (
    <tr>
      <td>
        <input type="checkbox" checked={checked} onChange={() => onToggle(user.id)} />
      </td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>
        <button type="button" className="text-btn" onClick={() => onDelete(user)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UserRow;
