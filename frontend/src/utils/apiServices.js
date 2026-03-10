const BASE_URL = "http://localhost:5000/api/v1";

const apiCall = async (endpoint, method = "GET", body = null, auth = false) => {
  try {
    const headers = { "Content-Type": "application/json" };

    // ✅ Auth token add करतो
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
    name:          formData.name,          // ✅ backend ला "name" हवं
    email:         formData.email,
    mobile:        formData.mobile,        // ✅ "mobile_number" नाही
    gender:        formData.gender,
    date_of_birth: formData.date_of_birth, // ✅ DOB add केला
    password:      formData.password,
    confirmPassword: formData.confirmPassword,
  });
};

// ── 2. LOGIN ─────────────────────────────────────────────
export const loginUser = async (email, password) => {
  return await apiCall("/auth/login", "POST", { email, password });
};

// ── 3. GET PROFILE ───────────────────────────────────────
export const getProfile = async () => {
  return await apiCall("/users/profile", "GET", null, true);
};

// ── 4. UPDATE PROFILE ────────────────────────────────────
export const updateProfile = async (data) => {
  return await apiCall("/users/profile", "PUT", data, true);
};

// ── 5. OPEN ACCOUNT ──────────────────────────────────────
export const openAccount = async (data) => {
  return await apiCall("/users/open-account", "POST", data, true);
};

// ── 6. SEND OTP ──────────────────────────────────────────
export const sendOtp = async (email) => {
  return await apiCall("/auth/send-otp", "POST", { email });
};

// ── 7. VERIFY OTP ────────────────────────────────────────
export const verifyOtp = async (email, otp) => {
  return await apiCall("/auth/verify-otp", "POST", { email, otp });
};

// ── 8. RESET PASSWORD ────────────────────────────────────
export const resetPassword = async (email, newPass, confirmPass) => {
  return await apiCall("/auth/reset-password", "POST", {
    email, newPass, confirmPass
  });
};