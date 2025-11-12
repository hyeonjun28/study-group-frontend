import axios from "axios";

const postApi = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// ✅ 전체 조회
postApi.getPosts = () => postApi.get("/posts");

// ✅ 글 작성
postApi.createPost = (data) => {
  const token = localStorage.getItem("accessToken");
  return postApi.post("/posts", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ 단건 조회
postApi.getPostById = (id) => {
  const token = localStorage.getItem("accessToken");
  return postApi.get(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ 글 수정
postApi.updatePost = (id, data) => {
  const token = localStorage.getItem("accessToken");
  return postApi.put(`/posts/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ 글 삭제 (JWT 토큰으로 로그인 사용자 확인)
postApi.deletePost = (id) => {
  const token = localStorage.getItem("accessToken");
  return postApi.delete(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default postApi;
