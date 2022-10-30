const base_url = "https://auth.nomoreparties.co/";

const request = ({ url, method = "POST", data, token }) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  
    const config = {
      method,
      headers,
    };
  
    if (data) {
      config.body = JSON.stringify(data);
    }
  
    return fetch(`${base_url}${url}`, config).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status)
      }
    });
};
  
export const registration = (data) => {
    return request({
      url: "signup",
      data,
    });
};
  
export const authorization = (data) => {
    return request({
      url: "signin",
      data,
    });
};
  
export const getContent = (token) => {
    return request({
      url: "users/me",
      method: "GET",
      token,
    });
};