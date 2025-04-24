// vite.config.js
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:5050', // Proxy requests to backend
    },
  },
};
