import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';
const API_URL = API_BASE ? `${API_BASE}/api` : '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const mcqService = {
  getAllMCQs: () => api.get('/mcqs'),
  getMCQById: (id) => api.get(`/mcqs/${id}`),
  getMCQsByCategory: (category) => api.get(`/mcqs/category/${category}`),
  getMCQsByDifficulty: (difficulty) => api.get(`/mcqs/difficulty/${difficulty}`),
  searchMCQs: (keyword) => api.get('/mcqs/search', { params: { keyword } }),
  filterMCQs: (category, difficulty) => 
    api.get('/mcqs/filter', { params: { category, difficulty } }),
  createMCQ: (data) => api.post('/mcqs', data),
  updateMCQ: (id, data) => api.put(`/mcqs/${id}`, data),
  deleteMCQ: (id) => api.delete(`/mcqs/${id}`),
};

export const codingQuestionService = {
  getAllCodingQuestions: () => api.get('/coding'),
  getCodingQuestionById: (id) => api.get(`/coding/${id}`),
  getCodingQuestionsByTopic: (topic) => api.get(`/coding/topic/${topic}`),
  getCodingQuestionsByDifficulty: (difficulty) => 
    api.get(`/coding/difficulty/${difficulty}`),
  searchCodingQuestions: (keyword) => 
    api.get('/coding/search', { params: { keyword } }),
  filterCodingQuestions: (topic, difficulty) => 
    api.get('/coding/filter', { params: { topic, difficulty } }),
  createCodingQuestion: (data) => api.post('/coding', data),
  updateCodingQuestion: (id, data) => api.put(`/coding/${id}`, data),
  deleteCodingQuestion: (id) => api.delete(`/coding/${id}`),
};

export const quizService = {
  submitQuiz: (data) => api.post('/quiz/submit', data),
  getAllResults: () => api.get('/quiz/results'),
  getResultById: (id) => api.get(`/quiz/results/${id}`),
  getResultsByCategory: (category) => 
    api.get(`/quiz/results/category/${category}`),
  getOverallStats: () => api.get('/quiz/stats'),
};

export default api;
