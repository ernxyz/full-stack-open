import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const addBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blog, config);

  return response.data;
};

const addComment = async (blogAndContent) => {
  const config = {
    headers : { Authorization: token },
  }

  console.log(blogAndContent)

  const res = await axios.post(`${baseUrl}/${blogAndContent.blog.id}/comments`, { content: blogAndContent.content }, config)

  return res.data
}

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);

  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.status;
};

export default { getAll, setToken, addBlog, updateBlog, deleteBlog, addComment };
