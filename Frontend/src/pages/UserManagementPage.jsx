import { useEffect, useMemo, useReducer } from "react";
import "../App.css";
import Button from "../components/Button";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import LoadingModal from "../components/LoadingModal";
import NotificationModal from "../components/NotificationModal";
import Pagination from "../components/Pagination";
import SignupModal from "../components/SignupModal";
import UserTable from "../components/UserTable";
import {
  createUser as createUserApi,
  deleteUserById,
  exportUsers as exportUsersApi,
  getUsers,
} from "../services/userApi";
import {
  INITIAL_STATE,
  userManagementReducer,
} from "../state/userManagementState";

const PAGE_SIZE = 5;

const getErrorMessage = (error, fallbackMessage) => {
  return error?.response?.data?.message || error?.message || fallbackMessage;
};

function UserManagementPage() {
  const [state, dispatch] = useReducer(userManagementReducer, INITIAL_STATE);
  const {
    users,
    selectedIds,
    isLoadingUsers,
    isExporting,
    isSubmitting,
    showSignupModal,
    formValues,
    formErrors,
    deleteTarget,
    notice,
    sortBy,
    sortDirection,
    currentPage,
  } = state;

  const fetchUsers = async () => {
    dispatch({ type: "SET_STATE", payload: { isLoadingUsers: true } });
    try {
      const data = await getUsers();

      dispatch({ type: "SET_USERS", payload: data });
      dispatch({
        type: "SET_SELECTED_IDS",
        payload: selectedIds.filter((id) => data.some((user) => user.id === id)),
      });
    } catch (error) {
      dispatch({
        type: "SET_STATE",
        payload: { notice: getErrorMessage(error, "Failed to load users.") },
      });
    } finally {
      dispatch({ type: "SET_STATE", payload: { isLoadingUsers: false } });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const left = String(a[sortBy] || "").toLowerCase();
      const right = String(b[sortBy] || "").toLowerCase();
      const compareResult = left.localeCompare(right);
      return sortDirection === "asc" ? compareResult : compareResult * -1;
    });
  }, [users, sortBy, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / PAGE_SIZE));
  const pagedUsers = sortedUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      dispatch({ type: "SET_STATE", payload: { currentPage: totalPages } });
    }
  }, [currentPage, totalPages]);

  const allUsersSelected =
    users.length > 0 && users.every((user) => selectedIds.includes(user.id));

  const validateForm = () => {
    const errors = {};
    if (!formValues.firstName.trim()) errors.firstName = "First name is required.";
    if (!formValues.lastName.trim()) errors.lastName = "Last name is required.";
    if (!formValues.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      errors.email = "Email format is invalid.";
    }
    if (!formValues.password) {
      errors.password = "Password is required.";
    } else if (formValues.password.length < 6) {
      errors.password = "Password must contain at least 6 characters.";
    }
    if (!formValues.confirmPassword) {
      errors.confirmPassword = "Please re-type password.";
    } else if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    dispatch({ type: "SET_STATE", payload: { formErrors: errors } });
    return Object.keys(errors).length === 0;
  };

  const toggleSort = (field) => {
    if (field === sortBy) {
      dispatch({
        type: "SET_STATE",
        payload: { sortDirection: sortDirection === "asc" ? "desc" : "asc" },
      });
      return;
    }
    dispatch({
      type: "SET_STATE",
      payload: { sortBy: field, sortDirection: "asc" },
    });
  };

  const toggleSelectOne = (userId) => {
    const next = selectedIds.includes(userId)
      ? selectedIds.filter((id) => id !== userId)
      : [...selectedIds, userId];
    dispatch({ type: "SET_SELECTED_IDS", payload: next });
  };

  const toggleSelectAllUsers = () => {
    if (allUsersSelected) {
      dispatch({ type: "SET_SELECTED_IDS", payload: [] });
      return;
    }

    dispatch({
      type: "SET_SELECTED_IDS",
      payload: users.map((user) => user.id),
    });
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    dispatch({ type: "SET_STATE", payload: { isSubmitting: true } });
    try {
      const { confirmPassword, ...payload } = formValues;
      const data = await createUserApi(payload);

      dispatch({
        type: "SET_STATE",
        payload: {
          notice: data.message || "User created successfully.",
          showSignupModal: false,
        },
      });
      dispatch({ type: "RESET_FORM" });
      await fetchUsers();
    } catch (error) {
      dispatch({
        type: "SET_STATE",
        payload: { notice: getErrorMessage(error, "Failed to create user.") },
      });
    } finally {
      dispatch({ type: "SET_STATE", payload: { isSubmitting: false } });
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteTarget) return;
    try {
      const data = await deleteUserById(deleteTarget.id);

      dispatch({
        type: "SET_STATE",
        payload: { notice: data.message || "User deleted successfully.", deleteTarget: null },
      });
      await fetchUsers();
    } catch (error) {
      dispatch({
        type: "SET_STATE",
        payload: { notice: getErrorMessage(error, "Failed to delete user.") },
      });
    }
  };

  const handleExportUsers = async () => {
    if (!selectedIds.length) return;
    dispatch({ type: "SET_STATE", payload: { isExporting: true } });
    try {
      const blob = await exportUsersApi(selectedIds);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "users.csv";
      link.click();
      window.URL.revokeObjectURL(url);
      dispatch({ type: "SET_STATE", payload: { notice: "Export completed successfully." } });
    } catch (error) {
      dispatch({
        type: "SET_STATE",
        payload: { notice: getErrorMessage(error, "Failed to export users.") },
      });
    } finally {
      dispatch({ type: "SET_STATE", payload: { isExporting: false } });
    }
  };

  const loadingLabel = isExporting
    ? "Exporting data, please wait..."
    : isLoadingUsers
      ? "Loading users, please wait..."
      : isSubmitting
        ? "Saving user, please wait..."
        : "";

  return (
    <>
      <header className="header-row">
        <h1>Users Table</h1>
        <div className="actions-row">
          <Button
            type="button"
            className="btn-primary"
            onClick={() => dispatch({ type: "SET_STATE", payload: { showSignupModal: true } })}
          >
            Sign Up
          </Button>
          <Button type="button" disabled={!selectedIds.length || isExporting} onClick={handleExportUsers}>
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </header>

      <UserTable
        isLoading={isLoadingUsers}
        users={pagedUsers}
        selectedIds={selectedIds}
        allCurrentPageSelected={allUsersSelected}
        onToggleSelectCurrentPage={toggleSelectAllUsers}
        onToggleSelectOne={toggleSelectOne}
        onToggleSort={toggleSort}
        onDeleteUser={(user) => dispatch({ type: "SET_STATE", payload: { deleteTarget: user } })}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => dispatch({ type: "SET_STATE", payload: { currentPage: currentPage - 1 } })}
        onNext={() => dispatch({ type: "SET_STATE", payload: { currentPage: currentPage + 1 } })}
      />

      <SignupModal
        open={showSignupModal}
        formValues={formValues}
        formErrors={formErrors}
        isSubmitting={isSubmitting}
        onChange={(field, value) => dispatch({ type: "SET_FORM_VALUE", field, value })}
        onClose={() => {
          dispatch({ type: "SET_STATE", payload: { showSignupModal: false } });
          dispatch({ type: "RESET_FORM" });
        }}
        onSubmit={handleCreateUser}
      />

      <DeleteConfirmModal
        user={deleteTarget}
        onCancel={() => dispatch({ type: "SET_STATE", payload: { deleteTarget: null } })}
        onConfirm={handleDeleteUser}
      />

      <NotificationModal
        message={notice}
        onClose={() => dispatch({ type: "SET_STATE", payload: { notice: "" } })}
      />

      <LoadingModal open={Boolean(loadingLabel)} label={loadingLabel} />
    </>
  );
}

export default UserManagementPage;
