export const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const INITIAL_STATE = {
  users: [],
  selectedIds: [],
  isLoadingUsers: false,
  isExporting: false,
  isSubmitting: false,
  showSignupModal: false,
  formValues: INITIAL_FORM,
  formErrors: {},
  deleteTarget: null,
  notice: "",
  sortBy: "firstName",
  sortDirection: "asc",
  currentPage: 1,
};

export function userManagementReducer(state, action) {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "SET_FORM_VALUE":
      return {
        ...state,
        formValues: { ...state.formValues, [action.field]: action.value },
      };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_SELECTED_IDS":
      return { ...state, selectedIds: action.payload };
    case "RESET_FORM":
      return { ...state, formValues: INITIAL_FORM, formErrors: {} };
    default:
      return state;
  }
}
