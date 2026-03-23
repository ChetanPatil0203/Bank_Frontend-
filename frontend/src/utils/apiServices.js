export const BASE_URL = "http://localhost:5000/api/v1";

// ─── Helper ──────────────────────────────────────────────────────────────────
async function request(endpoint, method = "GET", body = null, auth = false) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = localStorage.getItem("payzen_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: { message: "Network error. Please try again." } };
  }
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const registerUser   = (body) => request("/auth/register",  "POST", body);

// Login saathi api (email aani password separate parametrs madhe pass hotat)
export const loginUser      = (email, password) => request("/auth/login", "POST", { email, password });

export const logoutUser     = ()     => request("/auth/logout",    "POST", null, true);

// ─── USER ─────────────────────────────────────────────────────────────────────
export const getProfile     = ()     => request("/users/profile",  "GET",  null, true);
export const updateProfile  = (body) => request("/users/profile",  "PUT",  body, true);
export const sendOtp        = (body) => request("/auth/send-otp",  "POST", body);
export const verifyOtp      = (body) => request("/auth/verify-otp","POST", body);
export const resetPassword  = (body) => request("/auth/reset-password","POST", body);

// ─── ACCOUNT ──────────────────────────────────────────────────────────────────
export const openAccount       = (body) => request("/users/open-account",   "POST", body, true);
export const getAccountStatus  = ()     => request("/users/account-status", "GET",  null, true);

// ─── ADMIN — ACCOUNT REQUESTS ─────────────────────────────────────────────────
export const adminGetRequests  = (status = "") =>
  request(`/admin/account-requests${status ? `?status=${status}` : ""}`, "GET", null, false);

export const adminApproveRequest = (requestId) =>
  request(`/admin/account-requests/${requestId}/approve`, "POST", null, false);

export const adminRejectRequest = (requestId, remark = "") =>
  request(`/admin/account-requests/${requestId}/reject`, "POST", { remark }, false);

// ─── ADMIN — BANK ACCOUNTS ────────────────────────────────────────────────────
export const adminGetBankAccounts = () =>
  request("/admin/bank-accounts", "GET", null, false);

export const adminToggleAccountStatus = (accountId, status) =>
  request(`/admin/bank-accounts/${accountId}/status`, "PATCH", { status }, false);

// apiServices.js मध्ये
export const OpenAccountPage = (body) =>
  request("/account/open", "POST", body, true);