import axios from "axios";
const baseApi = 'http://localhost:5000/api/v1/'
export default baseApi;

// export const public_api = axios.create({
//     baseURL: "http://localhost:5000/api/v1/",
//     timeout: 10000, //max response time in mile second
// });

export const public_api = () => {
    return axios.create({
        baseURL: 'http://localhost:5000/api/v1/',
        // baseURL: "http://192.168.0.103:4000/api/v1/",
        // baseURL: "https://payment-doctors-backend-production.up.railway.app/api/v1",
        timeout: 10000,
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('SavedToken')} ${localStorage.getItem('SavedWebToken')}`
        //   }
    });

}