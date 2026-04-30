import api from "./api";

const blogService = {
  create: async (formData) => {
    const response = await api.post("/blog/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/blog/all");
    return response.data;
  },

  getMyBlogs: async () => {
    const response = await api.get("/blog/myBlogs");
    return response.data;
  },

  getSingle: async (id) => {
    const response = await api.get(`/blog/singleBlog/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/blog/update/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/blog/delete/${id}`);
    return response.data;
  },
};

export default blogService;
