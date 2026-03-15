const BASE_URL = "http://localhost:5000/api/v1";

const apiCall = async (endpoint, method = "GET", body = null, auth = false) => {
  try {
    const headers = { "Content-Type": "application/json" };

    if (auth) {
      const token = localStorage.getItem("payzen_token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data     = await response.json();

    console.log(`[API] ${method} ${endpoint} → ${response.status}`, data);
    return { ok: response.ok, status: response.status, data };

  } catch (error) {
    console.error(`[API] Network Error:`, error);
    return { ok: false, status: 500, data: { message: "Server connect होत नाही" } };
  }
};

// ── 1. REGISTER ──────────────────────────────────────────
export const registerUser = async (formData) => {
  return await apiCall("/auth/register", "POST", {
    name:            formData.name,
    email:           formData.email,
    mobile:          formData.mobile,
    gender:          formData.gender,
    date_of_birth:   formData.date_of_birth,
    password:        formData.password,
    confirmPassword: formData.confirmPassword,
  });
};

// ── 2. LOGIN ─────────────────────────────────────────────
export const loginUser = async (email, password) => {
  return await apiCall("/auth/login", "POST", { email, password });
};

// ── 3. LOGOUT ────────────────────────────────────────────
// Backend ला POST /auth/logout → user_sessions मध्ये is_active = 0
export const logoutUser = async () => {
  return await apiCall("/auth/logout", "POST", null, true);
};

// ── 4. GET PROFILE ───────────────────────────────────────
export const getProfile = async () => {
  return await apiCall("/users/profile", "GET", null, true);
};

// ── 5. UPDATE PROFILE ────────────────────────────────────
export const updateProfile = async (data) => {
  return await apiCall("/users/profile", "PUT", data, true);
};

// ── 6. OPEN ACCOUNT ──────────────────────────────────────
export const openAccount = async (data) => {
  return await apiCall("/users/open-account", "POST", data, true);
};

// ── 7. SEND OTP ──────────────────────────────────────────
export const sendOtp = async (email) => {
  return await apiCall("/auth/send-otp", "POST", { email });
};

// ── 8. VERIFY OTP ────────────────────────────────────────
export const verifyOtp = async (email, otp) => {
  return await apiCall("/auth/verify-otp", "POST", { email, otp });
};

// ── 9. RESET PASSWORD ────────────────────────────────────
export const resetPassword = async (email, newPass, confirmPass) => {
  return await apiCall("/auth/reset-password", "POST", {
    email, newPass, confirmPass
  });
};

// apiServices.js madhye he function add kar (loginUser chya khali)

export const loginAdmin = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    return { ok: false, data: { message: "Network error. Please try again." } };
  }
};