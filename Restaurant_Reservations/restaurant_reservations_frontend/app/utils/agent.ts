import axios, { AxiosError, AxiosResponse } from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { Testowy } from "../models/test";
import { store } from "./redux/store";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

// Funkcja do wyciągania danych z odpowiedzi
const responseBody = (response: AxiosResponse) => response.data;

// Interceptor żądań Axios - dodaje token autoryzacji do nagłówków
axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000); // Symulowanie opóźnienia dla demonstracji

    if (response.data.message) {
      toast.success(response.data.message);
    }

    // const pagination = response.headers["pagination"];
    // if (pagination) {
    //   response.data = new PaginatedResult(
    //     response.data,
    //     JSON.parse(pagination)
    //   );
    // }
    return response;
  },
  (error: AxiosError) => {
    if (!error.response) {
      toast.error("Network error, please try again later.");
      return Promise.reject(error);
    }

    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          toast.error("Bad request errors occurred.");
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("Unauthorized access.");
        break;
      case 403:
        toast.error("Access forbidden.");
        break;
      case 404:
        toast.error("Resource not found.");
        break;
      case 500:
        toast.error("Server error.");
        // store.dispatch(setServerError(data));
        break;
      default:
        toast.error("An unexpected error occurred.");
    }
    return Promise.reject(error);
  }
);

// Metody HTTP
const request = {
  get: <T>(url: string, params?: URLSearchParams) =>
    axios.get<T>(url, { params }).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  postRegister: <T>(url: string) => axios.post<T>(url).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios.post(url, data, {
      headers: { "Content-type": "multipart/form-data" },
    }),
  putForm: <T>(url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
};

// Funkcja do tworzenia obiektu FormData z obiektu JavaScript
function createFormData(item: any) {
  const formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}

const Test = { getStates: () => request.get<Testowy>("test/all/") };

const Account = {
  login: (values: any) => request.post("account/login", values),
  // registerPatient: (values: any) =>
  //   request.post("account/registerpatient", values),
  // registerDietician: (values: any) =>
  //   request.post("account/registerdietician", values),
  // registerAdmin: (values: any) => request.post("admin/createAdmin", values),
  // registerConfirm: (userId: string, token: string) =>
  //   request.postRegister<void>(
  //     /account/registerConfirm?userId=${userId}&token=${token}
  //   ),
  currentUser: () => request.get("account/currentUser"),
  // updatePassword: (userId: number, password: ChangePassword) =>
  //   request.put<void>(/account/changePassword/${userId}, password),
};

const agent = {
  Test,
  Account,
};

export default agent;
