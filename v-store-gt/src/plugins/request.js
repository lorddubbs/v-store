import Vue from "vue";
import axios from "axios";

const devInstance = createInstance(process.env.API_URL);

function createInstance(baseURL) {
  let token = localStorage.getItem("token");
  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

axios.interceptors.response.use((response) => {
   return response
}, function (error) {
   if (error.response.status === 401) {
       localStorage.clear();
       router.push('/login');
   }
   return Promise.reject(error);
});

export default {
  install() {
    Vue.prototype.$axios = devInstance;
  }
};
