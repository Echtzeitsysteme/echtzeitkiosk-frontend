import { AuthProvider } from "react-admin";
import axios from "axios";
import jwtDecode from "jwt-decode";

import { API_URL } from "./utils/API_URL";
import Swal from "sweetalert2";

const authProvider: AuthProvider = {
  login: ({ email, password }) => {
    const url = `${API_URL}/auth/login`;

    const options = {
      method: "POST",
      url,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(
        password
      )}`,
    };

    // TODO take precautions to prevent XSS attacks. Use cookies with httpOnly. Do not use url-encoded method, use JSON.
    return axios
      .request(options)
      .then(function (response) {
        if (response.data.message === "Token successfully created.") {
          const decodedToken: any = jwtDecode(response.data.data);

          storeAuthenticationItems({
            token: response.data.data,
            role: decodedToken.role,
            userId: decodedToken.id,
          });

          Promise.resolve();
        } else {
          Promise.reject(response.data.message);
        }
      })
      .catch(function (error) {
        // console.error(error);
        Swal.fire({
          title: "Error",
          text: error.response.data.errors[0],
          icon: "error",
        });
        throw new Error(error);
      });
  },
  logout: () => {
    return Promise.resolve(removeAuthenticationItems());
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    // localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),

    // check if there is a token in localStorage and if it is still valid
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token); // Returns with the JwtPayload type

      if (decodedToken?.exp * 1000 < new Date().getTime()) {
        removeAuthenticationItems();
        return Promise.reject();
      }
      return Promise.resolve();
    }
    return Promise.reject();
  },
  getPermissions: () => Promise.reject("Unknown method"),
  getIdentity: () =>
    Promise.resolve({
      id: "user",
      fullName:
        localStorage.getItem("role") === "SUPERUSER" ? "SUPERUSER" : "STANDARD",
      userRole: localStorage.getItem("role"),
      ...(localStorage.getItem("role") === "SUPERUSER" && {
        avatar:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAKBueIx4ZKCMgoy0qqC+8P//8Nzc8P//////////////////////////////////////////////////////////2wBDAaq0tPDS8P//////////////////////////////////////////////////////////////////////////////wAARCAC4AMgDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAIBAwT/xAAsEAEBAAIBAwMCBQQDAAAAAAAAAQIRMQMSIUFRYSJxEzJCgZEzUqHwcrHh/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAHREBAQEAAgMBAQAAAAAAAAAAAAERAjESIUFhUf/aAAwDAQACEQMRAD8A7AAAAAAAAAAAUGb8/DWRoAAAAAAAAAAAAAAAAAAAAAG9AMOQCctZGgBZtHcluCxkyaaACgAAAAAAAAAAAADMqluBctJl2jzlfhOX05eE/aruOUzvuqZ+8a0xbUyy8Uu7lrepoRW9coswzrdY/wDK/wA/+F3uXWpx/IJmNxvvFwnsXxWbM9q0ZGtRAAAAAAAAAAAAC8OV+rLTpUa1az3Vb9uEdSbm4ot8N1HKHc3Ka1J6umOEx+7Mmrp0sdebzVZzi+3/AE2Ns3NKgnLLHWrefbydnvbU43ttk8/YFY7uPnbbwz6viG96S9DZy1kaToAFAAAAAAAAAC3UBnqi8tmW7Sz1SeqqLl6QjLNeYyZz18HLVmKs9fZcu4iWXit6d+k4lXFIbebu6jTLPG73ef8AfZsyl4Zvz9M/37s8y7BWyTRJ7syvzpjuq2ZefPqpxsmvE8+7phluNYigAAAAAAAAAHPqZbuorPLtny5NSDZVy7c2py46LuPsjLCXmNmVV3xnbO4rl+H7VeM1NK3j8H0/B5fiYzbb5s8G5PY7p6Hl/IrfJ4jNp358mW9irdzSJ5m2nbl6cNSYjZ5y0nG6vj0Xhjce61zWDvLubHLHLV+HVLMABAAAAALdTdHHqZ911OIsmjLd3dYxWONyvhsIuYW8+FfT08duWWeWfxGd3oXrCc5N7NzeN25SSOnS9T2JF9TmIICt6iW+ihu34Zol8G56ArCb3leGZZW+ulYeelPs51J7F4ZW45S+dIV0+cp8IWfQdOnl+m/s5ep+4PSJ6efdPlTAAAAzPKY47BHVz1NTmuTLbbujcmCsZ3XTv4wx9ono46x37p618yJfYrL8PPW8p/LOzG8ZORqGDr+F7VeM7Zpwm5xbG9+U8bMorO7z+IlkauDTd4jC+lKGp6+S/YLfcFdLLV7b+zpljMnDmeVY9TLHnzP8pg3Lp2eZ5RXbHqY5eOL7I6uOvMJRzYDSNxyuN29GNmU3HmX08+2+eKliu4DAPP1M+7L4X1s/0z93FqQaMa0j04fkn2cur+dvT6kk1kvLsynmz+WOqrgOnZ09/m/yuYY4eWvITjjMJ3ZIyy7rvXhmeXffhhJ9GgKjTmMaKzyaawFdObz+ybzV9H9Vc0ndCu2V7ulu+zlJcrqOnUvbhMS9wcmA0gAo69LP9N/YcpvfjkYvFV5dLLnlFlnM09RZLynkPIPReljePCL0cpx5XYOYWWczRNbm+FR16WH6r+yepn3XU4n+W59SWduLmzIrRjWkAAaMbAAAdOj4mVvuWdO3e5/Ken/TzQzIrr344z6fLlbbd1g1JiArHDLLiOmPSk58lsg5TG5cR0x6P91dZNcDN5VWTGY8QaMgAAAAi9LG+mvssBxvRs4u0XGzmPSLo8o9F6eN9NfZF6N9K1o5jbjlOYlUa2MIDWNJLeFG9PKSZS+qXTHpW8+HTHGY8RnZFccenlefDrj08cflQzbaACAAAAAAAAAAAAAAAm4Y30AEXo+1T+HlvWgXaLx6X91dJJOIBoAIAAAAAAAAP//Z",
      }),
    }),
};

export default authProvider;

const removeAuthenticationItems = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
};

function storeAuthenticationItems(authElement: any) {
  authElement.token && localStorage.setItem("token", authElement.token || "");
  authElement.role &&
    localStorage.setItem("role", authElement.role || "STANDARD");
  authElement.userId &&
    localStorage.setItem("userId", authElement.userId || "");
}
