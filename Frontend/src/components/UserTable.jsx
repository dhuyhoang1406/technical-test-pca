import UserRow from "./UserRow";

function UserTable({
  isLoading,
  users,
  selectedIds,
  allCurrentPageSelected,
  onToggleSelectCurrentPage,
  onToggleSelectOne,
  onToggleSort,
  onDeleteUser,
}) {
  return (
    <div className="table-wrapper">
      {isLoading ? (
        <div className="loader">Loading users...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allCurrentPageSelected}
                  onChange={onToggleSelectCurrentPage}
                />
              </th>
              <th>
                <button type="button" className="sort-btn" onClick={() => onToggleSort("firstName")}>
                  First Name
                </button>
              </th>
              <th>
                <button type="button" className="sort-btn" onClick={() => onToggleSort("lastName")}>
                  Last Name
                </button>
              </th>
              <th>
                <button type="button" className="sort-btn" onClick={() => onToggleSort("email")}>
                  Email
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-cell">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  checked={selectedIds.includes(user.id)}
                  onToggle={onToggleSelectOne}
                  onDelete={onDeleteUser}
                />
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserTable;
