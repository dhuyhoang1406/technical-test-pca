import apiClient from "./apiClient";

export const getUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const createUser = async (payload) => {
  const response = await apiClient.post("/users", payload);
  return response.data;
};

export const deleteUserById = async (userId) => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
};

export const exportUsers = async (userIds) => {
  const response = await apiClient.post(
    "/users/export",
    { userIds },
    { responseType: "blob" },
  );
  return response.data;
};
