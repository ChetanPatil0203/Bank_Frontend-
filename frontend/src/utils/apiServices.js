// Base URL 

const BASE_URL = "http://localhost:5000/api/v1";

const apiCall = async (endpoint, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Body only POST/PUT madhe pathavto
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data     = await response.json();

    console.log(`Status: ${response.status}`);
    console.log(`[API] Response:`, data);

    return {
      ok:     response.ok,
      status: response.status,
      data,
    };

  } catch (error) {
    console.error(`[API] Network Error:`, error);
    return {
      ok:     false,
      status: 500,
      data:   { message: "Cannot connect to server. Please try again later." },
    };
  }
};

//  1. REGISTER API
export const registerUser = async (formData) => {
  return await apiCall("/auth/register", "POST", {
    full_name:     formData.name,
    email:         formData.email,
    mobile_number: formData.mobile,
    gender:        formData.gender,
    password:      formData.password,
  });
};

//  2. LOGIN API
export const loginUser = async (email, password) => {
  return await apiCall("/auth/login", "POST", {
    email,
    password,
  });
};