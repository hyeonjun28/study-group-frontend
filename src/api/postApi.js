import axios from "axios";

const postApi = axios.create({
  baseURL: "http://localhost:8081", // ✅ /api 제거함
  withCredentials: false,
});

// ✅ 전체 조회
postApi.getPosts = () => postApi.get("/posts");

// ✅ 글 작성
postApi.createPost = (data) => postApi.post("/posts", data);

// ✅ 단건 조회
postApi.getPostById = (id) => postApi.get(`/posts/${id}`);

// ✅ 글 수정
postApi.updatePost = (id, data) => postApi.put(`/posts/${id}`, data);

// ✅ 글 삭제
postApi.deletePost = (id) => postApi.delete(`/posts/${id}`);

export default postApi;
