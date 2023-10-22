import axios from "axios";
import generateBrowserFingerprint from "./browser-fingerprint";
const BASE_URL = import.meta.env.VITE_APP_URL || "http://127.0.0.1:3000";

export const client = axios.create({
  baseURL: BASE_URL,
  validateStatus(status) {
    return true;
  },
  headers: {
    // fingerprint был убран из за того что когда мы реализовали одна-два-три разовые статьи
    // то тогда бы нюдсы можно было бы с трёх разных компов а не три раза просмотреть
    "X-Browser-Fingerprint": `${Math.random()}` + `${Math.random()}` +
      `${Math.random()}` + `${Math.random()}` + `${Math.random()}`,
  },
});
