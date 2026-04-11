import api from "./api";

const authService = {
  register: async (formData) => {
    const response = await api.post("/user/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/user/signin", credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.get("/user/signout");
    return response.data;
  },

  getMyProfile: async () => {
    const response = await api.get("/user/my-profile");
    return response.data;
  },

  getUser: async (id) => {
    const response = await api.get(`/user/get-user/${id}`);
    return response.data;
  },
};

export default authService;
